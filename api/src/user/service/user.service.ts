import { firebaseAuth } from '@/common/config/firebase.config';
import { FileFolderNames } from '@/common/constant/file.constant';
import { REGEXP_PASSWORD } from '@/common/constant/regexp.constant';
import { CODE_TYPE } from '@/common/enum/codeType.enum';
import { SuccessRes } from '@/common/response/success.res';
import { checkBoolean } from '@/common/util/check.type';
import { convertFamily } from '@/common/util/convertFamily';
import { generateInviteCode } from '@/common/util/generateInviteCode';
import { FileService } from '@/file/service/file.service';
import { LoggerService } from '@/logger/logger.service';
import { Express } from 'express';
import { ErrorCodes } from '@Constant/error.constant';
import { USER_SALT_PASSWORD } from '@Constant/user.constant';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { FileEntity } from '@Entities/file.entity';
import { UserEntity } from '@Entities/user.entity';
import { CBadRequestException } from '@Exception/400.exception';
import { CNotFoundRequestException } from '@Exception/404.exception';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { FindOptionsWhere, In, Not, Repository } from 'typeorm';
import { CheckUsernameDto } from '../dto/check.dto';
import { CreateUserDto } from '../dto/create.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';
import { FamilyMemberRes } from '../res/family.res';
import { ProfileRes } from '../res/profile.res';
import { UserProfile } from '../res/user.res';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    @Inject(CACHE_MANAGER)
    protected cacheManager: Cache,
    private fileService: FileService,
    private loggerService: LoggerService,
  ) {
    super(userRepository);
  }

  async fetchProfile(sub: string): Promise<ProfileRes> {
    const user = await this.repo.findOne({
      where: { id: sub || '' },
      relations: {
        avatar: true,
        role: true,
      },
    });
    if (!user) {
      throw new CNotFoundRequestException(ErrorCodes.USER_NOT_FOUND);
    }

    // get family members
    let familyMembers: FamilyMemberRes[] = [];
    const family = convertFamily(user?.family);
    if (family.length) {
      const familyIds = family?.map((f) => f?.userId);
      const familyMembersFind = await this.userRepository.find({
        where: {
          id: In(familyIds),
        },
        relations: ['avatar'],
      });

      familyMembers =
        familyMembersFind?.map((f) => {
          const userFamily = family.find((u) => u.userId === f.id);
          return {
            family: f.family,
            avatar: f?.avatar,
            id: f.id,
            phone: f.phone,
            name: f.name,
            roleFamily: userFamily?.roleFamily,
            status: userFamily?.status,
          };
        }) || [];
    }
    delete user.role;
    return {
      ...user,
      familyMembers,
      permissions: user?.role?.permissions || [],
    };
  }

  async getPermissions(id: string): Promise<string[]> {
    const user = await this.repo.findOne({
      relations: ['role'],
      where: { id: id || '' },
    });

    if (!user) {
      throw new CNotFoundRequestException(ErrorCodes.USER_NOT_FOUND);
    }
    return user?.role?.permissions || [];
  }

  async delete(id: string) {
    try {
      const isDeletedFiles = await this.fileService.deleteByUserId(id);
      if (isDeletedFiles) {
        return await this.repo.delete(id);
      }
    } catch (e) {
      const error = this.loggerService.getLog(e);
      throw new CBadRequestException(
        error?.message || ErrorCodes.USER_CANNOT_DELETE,
      );
    }
  }

  async generateInviteCode() {
    const inviteCode = generateInviteCode(CODE_TYPE.FAMILY_INVITE);
    const checkInviteCode = await this.userRepository.findOne({
      where: { inviteCode: inviteCode || '' },
    });
    return !checkInviteCode ? inviteCode : await this.generateInviteCode();
  }

  async refreshInviteCode(userId: string): Promise<SuccessRes> {
    try {
      const inviteCode = await this.generateInviteCode();
      await this.userRepository.update(userId, { inviteCode });
      return {
        success: true,
      };
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(
        error?.message || ErrorCodes.SOMETHING_WENT_WRONG,
      );
    }
  }

  async create(userInfo: CreateUserDto): Promise<UserProfile> {
    try {
      if (userInfo?.password && !REGEXP_PASSWORD.test(userInfo.password)) {
        throw new CBadRequestException(ErrorCodes.INVALID_PASSWORD);
      }
      const temp = await this.userRepository.findOne({
        where: [
          { phone: userInfo?.phone || '' },
          { username: userInfo?.username || '' },
        ],
      });
      if (temp) {
        throw new CBadRequestException(ErrorCodes.USER_ALREADY_EXISTS);
      }
      userInfo.password = userInfo?.password
        ? userInfo?.password
        : 'Security@2025';
      const user = await this.userRepository.save({
        ...userInfo,
        roleId: userInfo?.roleId || 2,
        active: checkBoolean(userInfo?.active) || false,
        password: bcrypt.hashSync(userInfo.password, USER_SALT_PASSWORD),
      });

      const { id, name, gender, roleId, birthday, note, username } = user;
      return {
        id,
        username,
        name,
        gender,
        roleId,
        birthday,
        note,
      };
    } catch (e) {
      const error = this.loggerService.getLog(e);
      throw new CBadRequestException(
        error?.message || ErrorCodes.USER_CANNOT_CREATE,
      );
    }
  }

  async checkUsernameExists(payload: CheckUsernameDto): Promise<boolean> {
    const { username, id } = payload;
    const where: FindOptionsWhere<UserEntity> = {
      username: username || '',
    };

    // if is update ignore updating user
    if (id) {
      where.id = Not(id);
    }

    try {
      const user = await this.repo.findOne({ where });
      if (user) return true;
      return false;
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(
        error.message || ErrorCodes.SOMETHING_WENT_WRONG,
      );
    }
  }

  async resetPassword(body: ResetPasswordDto): Promise<SuccessRes> {
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
        body.newPassword,
      )
    ) {
      throw new CBadRequestException(ErrorCodes.INVALID_PASSWORD);
    }

    try {
      const user: UserEntity = await this.userRepository.findOne({
        where: { phone: body?.phone || '' },
        select: ['id', 'password'],
      });
      if (!user) {
        throw new CBadRequestException(ErrorCodes.USER_NOT_FOUND);
      }

      try {
        await firebaseAuth.getUser(body?.token);
        await firebaseAuth.deleteUser(body?.token);
      } catch (error) {
        throw new CBadRequestException(ErrorCodes.INVALID_TOKEN);
      }
      await this.userRepository.save({
        ...user,
        password: bcrypt.hashSync(body.newPassword, USER_SALT_PASSWORD),
      });

      return {
        success: true,
      };
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(
        error?.message || ErrorCodes.USER_CANNOT_EDIT,
      );
    }
  }
}
