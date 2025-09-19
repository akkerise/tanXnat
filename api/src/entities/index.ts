import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SessionEntity } from './session.entity';
import { FileEntity } from './file.entity';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';
import { NotificationEntity } from './notification.entity';
import { FCMEntity } from './fcm.entity';
import { Chapter } from './chapter.entity';
import { Story } from './story.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FCMEntity,
      FileEntity,
      NotificationEntity,
      RoleEntity,
      SessionEntity,
      UserEntity,
      Chapter,
      Story,
    ]),
  ],
})
export class EModule {}
