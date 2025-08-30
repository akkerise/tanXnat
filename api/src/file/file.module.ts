import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FileService } from './service/file.service';
import { FilesController } from './file.controller';
import { FileEntity } from '@Entities/file.entity';
import { UserEntity } from '@Entities/user.entity';
import { LoggerService } from '@/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity, UserEntity])],
  controllers: [FilesController],
  providers: [FileService, LoggerService],
  exports: [FileService],
})
export class FileModule {}
