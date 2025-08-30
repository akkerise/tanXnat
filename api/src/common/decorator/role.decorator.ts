import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRolesBuilder()
    private rolesBuilder: RolesBuilder,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const grants = this.rolesBuilder.getGrants();
    const { user } = context.switchToHttp().getRequest();
    const role = user?.roleId || '';
    if (role === '') return false;
    const userRole = grants[role];
    if (!userRole) return false;
    if (userRole['all']) return true;
    return roles?.some((r) => userRole[r]);
  }
}
