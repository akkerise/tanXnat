import { Identity } from '@/common/decorator/auth.decorator';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

export class CheckRoleService {
  constructor(
    @InjectRolesBuilder()
    private rolesBuilder: RolesBuilder,
  ) {}

  checkRole(user: Identity, roles: string[]): boolean {
    const grants = this.rolesBuilder.getGrants();
    const role = user?.roleId || '';
    if (role === '') return false;
    const userRole = grants[role];
    if (!userRole) return false;
    if (userRole['all']) return true;
    return roles?.some((r) => userRole[r]);
  }
}

export function checkRole(roles: string[], userRole: any): boolean {
  if (!userRole) return false;
  if (userRole['all']) return true;
  return roles?.some((r) => userRole[r]);
}
