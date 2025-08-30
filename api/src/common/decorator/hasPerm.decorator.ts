import { SetMetadata } from '@nestjs/common';
/**
 * Define an access information required for this route.
 * Notice that all Roles must be satisfied/passed
 */
// UserRoleHasPerm
export const HasPerm = (...roles: string[]) => SetMetadata('roles', roles);
