import { RoleEntity } from '@Entities/role.entity';
import { RolePerms } from '../constant/role.constant';

export const roleData: RoleEntity[] = [
  {
    id: 1,
    name: 'Admin',
    slug: 'admin',
    permissions: ['all'],
    isCanEdit: false,
  },
  {
    id: 2,
    name: 'Member',
    slug: 'member',
    permissions: [],
    isCanEdit: false,
    roleId: 1,
  },
  {
    id: 3,
    name: 'Company manager',
    slug: 'company_manager',
    permissions: [
      RolePerms.GET_COMPANY,
      RolePerms.GET_NOTIFICATION,
      RolePerms.GET_LOCATION,
      RolePerms.GET_LIVING,
      RolePerms.CREATE_UPDATE_LIVING,
      RolePerms.CREATE_UPDATE_COMPANY,
      RolePerms.CREATE_UPDATE_CONTRACT,
    ],
    isCanEdit: false,
    roleId: 1,
  },
  {
    id: 4,
    name: 'Building manager',
    slug: 'building_manager',
    permissions: [
      RolePerms.GET_LIVING,
      RolePerms.CREATE_UPDATE_LIVING,
      RolePerms.DELETE_LIVING,
    ],
    isCanEdit: false,
    roleId: 1,
  },
];

export const INIT_ROLE_DATA: RoleEntity[] = [
  {
    slug: 'admin',
    name: 'Admin',
    permissions: ['all'],
    isCanEdit: true,
    isActive: true,
    roleId: 0,
  },
];
