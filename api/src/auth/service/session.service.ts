import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { ErrorCodes } from '@Constant/error.constant';
import { JWT_LOG_OUT } from '@Constant/jwt.constant';
import { CBadRequestException } from '@Exception/400.exception';
import { makeRandomString } from '@Util/string.until';
import { SessionEntity } from '@Entities/session.entity';
import { UserEntity } from '@Entities/user.entity';
import { IsNull, Repository } from 'typeorm';
import { LogoutDto } from '../dto/logout.dto';
import { RefreshDto } from '../dto/refresh.dto';
import { AuthRes } from '../res/token.res';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Identity } from '@/common/decorator/auth.decorator';
import { LoggerService } from '@/logger/logger.service';

@Injectable()
export class SessionService {
  private readonly logger: Logger = new Logger(SessionService.name);

  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepo: Repository<SessionEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    protected cacheManager: Cache,
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private loggerService: LoggerService,
  ) {}

  async createTokenLogin(
    user: UserEntity,
    agent: string,
    ip?: string,
    line?: { lineToken?: string; lineRefreshToken?: string },
  ): Promise<AuthRes> {
    try {
      const refreshToken = `${makeRandomString(60, 'Aa#')}.${user.id}`;
      const payloadSign: Identity = {
        id: user.id,
        phone: user?.phone,
        role: user?.role?.permissions.map((perm) => perm && perm.trim()),
        roleId: user?.role?.id,
        username: user?.username || user?.name || user?.phone,
      };
      const accessToken = this.jwtService.sign(payloadSign);
      await this.sessionRepo.save({
        refreshToken,
        token: accessToken,
        ip,
        agent,
        userId: user.id,
        ...line,
      });
      const decode = this.jwtService.decode(accessToken);
      return {
        accessToken,
        refreshToken,
        expiresIn: 86400,
        expiresAt: decode['exp'],
        user: payloadSign,
      };
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(ErrorCodes.SOMETHING_WENT_WRONG);
    }
  }

  async refreshToken(payload: RefreshDto): Promise<AuthRes> {
    try {
      const tokens = payload.refreshToken.split('.');
      if (!tokens || tokens.length !== 2) {
        throw new CBadRequestException(ErrorCodes.SOMETHING_WENT_WRONG);
      }
      const session = await this.sessionRepo.findOne({
        where: {
          userId: tokens[1] || '',
          refreshToken: payload.refreshToken || '',
          deletedAt: IsNull(),
        },
      });
      if (!session) {
        throw new CBadRequestException(ErrorCodes.SOMETHING_WENT_WRONG);
      }
      const user = await this.userRepo.findOne({
        where: {
          id: session.userId,
        },
        relations: ['role'],
      });
      const refreshToken = `${makeRandomString(60, 'Aa#')}.${user.id}`;
      const payloadSign: Identity = {
        id: user.id,
        phone: user?.phone,
        roleId: user?.roleId,
        role: user?.role?.permissions,
        username: user?.username,
      };
      const token = this.jwtService.sign(payloadSign);
      await this.sessionRepo.update(session.id, {
        refreshToken,
        token,
        updatedAt: new Date(),
      });
      const decode = this.jwtService.decode(token);
      const auth = {
        accessToken: token,
        refreshToken: refreshToken,
        expiresIn: 86400,
        expiresAt: decode['exp'],
      };
      return {
        ...auth,
        user: payloadSign,
      };
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(ErrorCodes.SOMETHING_WENT_WRONG);
    }
  }

  async deleteToken(payload: LogoutDto): Promise<void> {
    try {
      const decode = this.jwtService.decode(payload.token);
      const session = await this.sessionRepo.findOne({
        where: {
          userId: decode['id'] || '',
          token: payload.token || '',
          deletedAt: IsNull(),
        },
      });

      if (session) {
        await this.sessionRepo.update(session.id, { deletedAt: new Date() });
        await this.cacheManager.set(
          `${JWT_LOG_OUT}.${payload.token}`,
          JWT_LOG_OUT,
        );
        if (session?.lineToken) {
          const lineChanel = this.configService.get<string>('line.loginChanel');
          const secret = this.configService.get<string>('line.secret');
          const revokeLink = this.configService.get<string>('line.revoke');
          await firstValueFrom(
            this.httpService.post(revokeLink, {
              access_token: session?.lineToken,
              client_id: lineChanel,
              client_secret: secret,
            }),
          );
        }
      }
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(ErrorCodes.SOMETHING_WENT_WRONG);
    }
  }

  async deleteAllToken(userId: string): Promise<void> {
    try {
      const sessions = await this.sessionRepo.find({
        where: {
          userId,
          deletedAt: IsNull(),
        },
      });
      if (sessions && sessions.length > 0) {
        for (const s of sessions) {
          await this.cacheManager.set(`${JWT_LOG_OUT}.${s.token}`, JWT_LOG_OUT);
        }
      }
      await this.sessionRepo.update({ userId }, { deletedAt: new Date() });
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(ErrorCodes.SOMETHING_WENT_WRONG);
    }
  }

  async verifyToken(token: string) {
    try {
      const decode = this.jwtService.decode(token);
      if (!decode) return false;
      const session = await this.sessionRepo.findOne({
        where: {
          userId: decode['id'],
          token,
          deletedAt: IsNull(),
        },
      });
      if (session) {
        if (decode['exp'] * 1000 < Date.now()) {
          this.sessionRepo.save({
            ...session,
            deletedAt: Date.now(),
          });
          return false;
        }
        return true;
      }
      return false;
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(ErrorCodes.SOMETHING_WENT_WRONG);
    }
  }
}
