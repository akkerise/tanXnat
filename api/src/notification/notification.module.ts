import { NotificationEntity } from '@/entities/notification.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './notification.controller';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './service/notification.service';
import { LoggerService } from '@/logger/logger.service';
@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway, LoggerService],
  exports: [NotificationService],
})
export class NotificationModule {}
