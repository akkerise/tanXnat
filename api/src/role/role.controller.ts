import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@dataui/crud';
import { PermissionGroup, RolePerms } from '@Constant/role.constant';
import { ErrorCodes } from '@/common/constant/error.constant';
import { TokenGuard } from '@Decorator/auth.decorator';
import { RolesGuard } from '@Decorator/role.decorator';
import { HasPerm } from '@Decorator/hasPerm.decorator';
import { CBadRequestException } from '@Exception/400.exception';
import { RoleEntity } from '@Entities/role.entity';
import { CreateRoleDto } from './dto/create.dto';
import { InitRoleService } from './service/init_role.service';
import { RoleService } from './service/role.service';

@ApiTags('Role')
@Controller('roles')
@ApiBearerAuth()
@Crud({
  model: {
    type: RoleEntity,
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
        HasPerm(RolePerms.GET_ROLE),
      ],
    },
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
  query: {
    join: {
      parent: {
        allow: ['name', 'id'],
        eager: true,
      },
    },
    sort: [
      {
        field: 'name',
        order: 'ASC',
      },
    ],
  },
})
export class RoleController {
  constructor(
    public readonly service: RoleService,
    public readonly roleService: InitRoleService,
  ) {}
  get base(): CrudController<RoleEntity> {
    return this;
  }

  @Override()
  @UseGuards(TokenGuard, RolesGuard)
  @HasPerm(RolePerms.CREATE_UPDATE_ROLE)
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() payload: CreateRoleDto,
  ) {
    const role = new RoleEntity();
    role.name = payload.name;
    role.permissions = payload.permissions;
    role.slug = payload.slug;
    role.roleId = payload.roleId;
    const re = await this.base.createOneBase(req, role);
    this.roleService.onModuleInit();
    return re;
  }

  @Override()
  @UseGuards(TokenGuard, RolesGuard)
  @HasPerm(RolePerms.DELETE_ROLE)
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    const role = await this.base.getOneBase(req);
    if (!role.isCanEdit) {
      throw new CBadRequestException(ErrorCodes.ROLE_CANNOT_DELETE);
    }
    const re = await this.base.deleteOneBase(req);
    this.roleService.onModuleInit();
    return re;
  }

  @Override()
  @UseGuards(TokenGuard, RolesGuard)
  @HasPerm(RolePerms.CREATE_UPDATE_ROLE)
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() payload: CreateRoleDto,
  ) {
    const role = await this.base.getOneBase(req);
    if (role.isCanEdit) {
      role.name = payload.name;
      role.slug = payload.slug;
    }
    role.permissions = payload.permissions;
    role.updatedAt = new Date();
    if (role.id !== payload.roleId) {
      role.roleId = payload.roleId;
      role.parent.id = payload.roleId;
    }
    const re = await this.base.updateOneBase(req, role);
    this.roleService.onModuleInit();
    return re;
  }

  @Get('/permissions')
  @ApiOperation({
    description: 'Fetch permissions',
  })
  @UseGuards(TokenGuard)
  async getPermission() {
    return PermissionGroup;
  }
}
