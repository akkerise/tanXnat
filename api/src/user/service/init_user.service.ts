import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@Entities/user.entity';
import * as bcrypt from 'bcrypt';
import { USER_SALT_PASSWORD } from '@/common/constant/user.constant';

@Injectable()
export class InitUserService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async onModuleInit() {
    // Ensure default account exists: username: nathan, password: password
    const exists = await this.userRepo.findOne({
      where: { username: 'nathan' },
      withDeleted: true,
      select: ['id'],
    });
    if (!exists) {
      const hashed = bcrypt.hashSync('password', USER_SALT_PASSWORD);
      await this.userRepo.insert({
        username: 'nathan',
        password: hashed,
        active: true,
        roleId: 2, // member
      });
    }
  }
}
