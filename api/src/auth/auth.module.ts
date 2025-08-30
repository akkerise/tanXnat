import { FCMEntity } from '@/entities/fcm.entity';
import { LoggerService } from '@/logger/logger.service';
import { UserModule } from '@/user/user.module';
import { JWT_LIFETIME, JWT_SECRET } from '@Constant/jwt.constant';
import { NotificationEntity } from '@Entities/notification.entity';
import { RoleEntity } from '@Entities/role.entity';
import { SessionEntity } from '@Entities/session.entity';
import { UserEntity } from '@Entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './service/auth.service';
import { SessionService } from './service/session.service';
import { TokenController } from './token.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      NotificationEntity,
      FCMEntity,
      SessionEntity,
    ]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: `${JWT_LIFETIME}s` },
    }),
    HttpModule,
    ConfigModule,
    UserModule,
  ],
  controllers: [AuthController, TokenController],
  providers: [AuthService, SessionService, JwtStrategy, LoggerService],
  exports: [SessionService, AuthService],
})
export class AuthModule {}
