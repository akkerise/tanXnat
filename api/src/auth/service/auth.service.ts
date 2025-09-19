import { ErrorCodes } from '@/common/constant/error.constant';
import { Channels } from '@/common/constant/redis.constant';
import { Identity } from '@/common/decorator/auth.decorator';
import { LoggerService } from '@/logger/logger.service';
import { UserService } from '@/user/service/user.service';
import { RoleEntity } from '@Entities/role.entity';
import { UserEntity } from '@Entities/user.entity';
import { CBadRequestException } from '@Exception/400.exception';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { UserNotification } from '../dto/notify.dto';
import { AuthRes } from '../res/token.res';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private sessionService: SessionService,
    private userService: UserService,
    private readonly httpService: HttpService,
    private configService: ConfigService,
    private loggerService: LoggerService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    protected cacheManager: Cache,
  ) {}

  async login(payload: LoginDto, agent: string, ip: string): Promise<AuthRes> {
    const user = await this.userRepository.findOne({
      where: [{ username: payload?.username || '' }],
      select: ['id', 'username', 'password', 'active'],
      relations: ['role'],
    });

    if (!user || !user?.active) {
      throw new CBadRequestException(
        ErrorCodes.USER_NOT_ACTIVE + ' or ' + ErrorCodes.USER_NOT_FOUND,
      );
    }

    if (!bcrypt.compareSync(payload?.password, user?.password)) {
      throw new CBadRequestException(ErrorCodes.INVALID_PASSWORD);
    }
    try {
      await this.redis.publish(
        Channels.NOTIFICATION,
        JSON.stringify({
          message: `${user?.name} welcome to back in system!`,
          name: user?.name,
          userId: user?.id,
        }),
      );
      return await this.sessionService.createTokenLogin(user, agent, ip);
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(error.message || ErrorCodes.LOGIN_FAILED);
    }
  }

  async notification(user: UserNotification) {
    await this.redis.publish(
      Channels.NOTIFICATION,
      JSON.stringify({
        message: `${user?.name} - Hello every one`,
        name: user?.name,
        userId: user?.id,
      }),
    );
  }

  async logout(token: string) {
    token = token?.split(' ')?.[1];
    await this.sessionService.deleteToken({ token });
    return {
      logout: true,
    };
  }

  async verifyToken(token: string) {
    token = token?.split(' ')?.[1];
    const verify = await this.sessionService.verifyToken(token);
    const user = this.jwtService.decode(token) as Identity;
    if (verify) {
      return user;
    }
    throw new CBadRequestException(ErrorCodes.UNAUTHORIZED);
  }

  async register(
    payload: LoginDto,
    agent: string,
    ip: string,
  ): Promise<AuthRes> {
    const existingUser = await this.userRepository.findOne({
      where: [{ username: payload?.username }],
    });

    if (existingUser) {
      throw new CBadRequestException(ErrorCodes.USER_ALREADY_EXISTS);
    }

    try {
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      const newUser = this.userRepository.create({
        username: payload.username,
        password: hashedPassword,
        active: true,
      });

      const savedUser = await this.userRepository.save(newUser);

      await this.redis.publish(
        Channels.NOTIFICATION,
        JSON.stringify({
          message: `${savedUser?.username} has joined the system!`,
          name: savedUser?.username,
          userId: savedUser?.id,
        }),
      );

      const auth = await this.sessionService.createTokenLogin(
        savedUser,
        agent,
        ip,
      );
      return auth;
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(
        error.message || ErrorCodes.REGISTRATION_FAILED,
      );
    }
  }
}
