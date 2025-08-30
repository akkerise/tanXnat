import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from '@Entities/session.entity';
import { FileEntity } from '@Entities/file.entity';
import { UserEntity } from '@Entities/user.entity';
import { FileService } from '@/file/service/file.service';
import { MeController } from './me.controller';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { LoggerService } from '@/logger/logger.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_LIFETIME, JWT_SECRET } from '@/common/constant/jwt.constant';
import { SessionService } from '@/auth/service/session.service';
import { HttpModule } from '@nestjs/axios';
import { FCMEntity } from '@/entities/fcm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      FileEntity,
      FCMEntity,
      SessionEntity,
    ]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: `${JWT_LIFETIME}s` },
    }),
    HttpModule,
  ],
  controllers: [UserController, MeController],
  providers: [UserService, SessionService, FileService, LoggerService],
  exports: [UserService],
})
export class UserModule {}
