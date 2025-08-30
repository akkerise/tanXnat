import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { RoleEntity } from '@Entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService extends TypeOrmCrudService<RoleEntity> {
  constructor(@InjectRepository(RoleEntity) repo: Repository<RoleEntity>) {
    super(repo);
  }
}
