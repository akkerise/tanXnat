import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SessionEntity } from './session.entity';
import { FileEntity } from './file.entity';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';
import { NotificationEntity } from './notification.entity';
import { FCMEntity } from './fcm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FCMEntity,
      FileEntity,
      NotificationEntity,
      RoleEntity,
      SessionEntity,
      UserEntity,
    ]),
  ],
})
export class EModule {}
