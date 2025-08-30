import { Inject, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { RoleEntity } from '@Entities/role.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { roleData } from '@Data/role.data';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

interface GrantData {
  role: string;
  resource: string;
  action: string;
  attributes: string;
}

export class InitRoleService implements OnModuleInit {
  constructor(
    @InjectRolesBuilder()
    private rolesBuilder: RolesBuilder,

    @InjectRepository(RoleEntity)
    private roleRepo: Repository<RoleEntity>,
    @Inject(CACHE_MANAGER)
    protected cacheManager: Cache,
  ) {}

  async onModuleInit() {
    const roleCount = await this.roleRepo.count();
    if (roleCount === 0) {
      await this.roleRepo.insert(roleData);
    }
    const roles = await this.roleRepo.find({ where: { isActive: true } });
    const grants: GrantData[] = [];
    for (const rl of roles) {
      if (rl.permissions && rl.permissions.length > 0) {
        for (const p of rl.permissions) {
          const gr: GrantData = {
            role: rl.id.toString(),
            resource: p,
            action: 'read',
            attributes: 'any',
          };
          grants.push(gr);
        }
      }
    }

    if (grants.length > 0) {
      this.rolesBuilder.setGrants(grants);
    }
  }
}
