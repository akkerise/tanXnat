import {
  Body,
  Controller,
  Param,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@dataui/crud';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RolePerms } from '@Constant/role.constant';
import { CurrentUser, Identity, TokenGuard } from '@Decorator/auth.decorator';
import { RolesGuard } from '@Decorator/role.decorator';
import { HasPerm } from '@Decorator/hasPerm.decorator';
import { UserEntity } from '@Entities/user.entity';
import { CreateUserDto } from './dto/create.dto';
import { UserService } from './service/user.service';
import { UpdateUserDto } from './dto/update.dto';
import { fileFilter } from '@Util/check.until';
import { CBadRequestException } from '@/common/exception/400.exception';
import { ErrorCodes } from '@/common/constant/error.constant';
import { LoggerService } from '@/logger/logger.service';

@ApiTags('User')
@Controller('users')
@ApiBearerAuth()
@Crud({
  model: {
    type: UserEntity,
  },
  routes: {
    only: [
      'getManyBase',
      'getOneBase',
      'createOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
    getOneBase: {
      decorators: [
        UseGuards(TokenGuard, RolesGuard),
        HasPerm(RolePerms.GET_USER),
      ],
    },
    getManyBase: {
      decorators: [
        UseGuards(TokenGuard, RolesGuard),
        HasPerm(RolePerms.GET_USER),
      ],
    },
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    exclude: ['password'],
    sort: [
      {
        field: 'createdAt',
        order: 'DESC',
      },
    ],
    join: {
      role: {
        allow: ['name', 'id'],
        eager: true,
      },
      accommodation: {
        allow: ['id', 'address', 'apartment'],
        eager: true,
      },
    },
    alwaysPaginate: true,
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
})
export class UserController {
  constructor(
    public readonly service: UserService,
    private loggerService: LoggerService,
  ) {}

  get base(): CrudController<UserEntity> {
    return this;
  }

  @Override('getOneBase')
  @UseGuards(TokenGuard, RolesGuard)
  @HasPerm(RolePerms.GET_USER)
  async getOne(@Param('id') id: string) {
    return await this.service.fetchProfile(id);
  }

  @Override('getManyBase')
  @UseGuards(TokenGuard, RolesGuard)
  @HasPerm(RolePerms.GET_USER)
  async getMany(
    @ParsedRequest() req: CrudRequest,
    @CurrentUser() user: Identity,
  ) {
    if (user?.roleId === 3) {
      // if user push wrong query throw forbidden
      // query create at pages/user/index.tsx
      if (
        !req?.parsed?.filter?.find(
          (f) => f.field === 'company.userId' && f.value === user?.id,
        )
      ) {
        throw new CBadRequestException(ErrorCodes.FORBIDDEN);
      }

      req.parsed.join.push({
        field: 'contracts',
      });
      req.parsed.join.push({
        field: 'contracts.company',
      });
    }
    try {
      return await this.service.getMany(req);
    } catch (error) {
      error = this.loggerService.getLog(error);
      throw new CBadRequestException(
        error.message || ErrorCodes.SOMETHING_WENT_WRONG,
      );
    }
  }

  @Override('deleteOneBase')
  @UseGuards(TokenGuard, RolesGuard)
  @HasPerm(RolePerms.DELETE_USER)
  async deleteOne(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Override('createOneBase')
  @UseGuards(TokenGuard, RolesGuard)
  @HasPerm(RolePerms.CREATE_UPDATE_USER)
  async createOne(@Body() body: CreateUserDto) {
    return await this.service.create(body);
  }
}
