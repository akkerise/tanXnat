import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Story } from '../entities/story.entity';
import { Chapter } from './chapter.entity';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Chapter]), HttpModule],
  controllers: [StoryController],
  providers: [StoryService], 
  exports: [StoryService],
})
export class StoryModule {}

