import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';
import { RoleEntity } from '@Entities/role.entity';
import { RoleController } from './role.controller';
import { CheckRoleService } from './service/check-role.service';
import { InitRoleService } from './service/init_role.service';
import { RoleService } from './service/role.service';

const roles: RolesBuilder = new RolesBuilder();

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    AccessControlModule.forRoles(roles),
  ],
  providers: [InitRoleService, RoleService, CheckRoleService],
  controllers: [RoleController],
  exports: [CheckRoleService],
})
export class RoleModule {}
