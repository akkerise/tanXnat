import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '../entities/story.entity';
import { Chapter } from './chapter.entity';
import { CreateStoryDto } from './dto/create-story.dto';
import { CreateChapterDto } from './dto/create-chapter.dto';


@Injectable()
export class StoryService {
  private readonly logger = new Logger(StoryService.name);

  constructor(
    @InjectRepository(Story)
    private readonly storyRepo: Repository<Story>,
    @InjectRepository(Chapter)
    private readonly chapterRepo: Repository<Chapter>,
  ) {}

  async listStories(): Promise<Story[]> {
    return this.storyRepo.find({ order: { createdAt: 'DESC' } });
  }

  async getStory(id: string): Promise<Story> {
    const story = await this.storyRepo.findOne({ where: { id } });
    if (!story) throw new NotFoundException('Story not found');
    return story;
  }

  async getStoryWithChapters(
    id: string,
  ): Promise<Story & { chapters: Chapter[] }> {
    const story = await this.storyRepo.findOne({ where: { id } });
    if (!story) throw new NotFoundException('Story not found');
    const chapters = await this.chapterRepo.find({
      where: { storyId: id },
    });
    return { ...story, chapters } as any;
  }

  async createStory(dto: CreateStoryDto): Promise<Story> {
    const entity = this.storyRepo.create(dto);
    return this.storyRepo.save(entity);
  }

  async listChapters(storyId: string): Promise<Chapter[]> {
    await this.getStory(storyId);
    return this.chapterRepo.find({
      where: { storyId },
    });
  }

  async getChapter(storyId: string, chapterNumber: number): Promise<Chapter> {
    const chapter = await this.chapterRepo.findOne({
      where: { storyId },
    });
    if (!chapter) throw new NotFoundException('Chapter not found');
    return chapter;
  }

  async createChapter(
    storyId: string,
    dto: CreateChapterDto,
  ): Promise<Chapter> {
    await this.getStory(storyId);
    const entity = this.chapterRepo.create({ ...dto, storyId });
    return this.chapterRepo.save(entity);
  }
}
