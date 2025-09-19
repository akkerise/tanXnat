import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { CreateChapterDto } from './dto/create-chapter.dto';

@Controller('stories')
@ApiTags('Stories')
export class StoryController {
  constructor(
    private readonly storyService: StoryService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List stories' })
  list() {
    return this.storyService.listStories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get story by id' })
  get(@Param('id') id: string) {
    return this.storyService.getStoryWithChapters(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create story' })
  create(@Body() dto: CreateStoryDto) {
    return this.storyService.createStory(dto);
  }

  @Get(':id/chapters')
  @ApiOperation({ summary: 'List chapters of a story' })
  listChapters(@Param('id') id: string) {
    return this.storyService.listChapters(id);
  }

  @Get(':id/chapters/:number')
  @ApiOperation({ summary: 'Get a chapter by number' })
  getChapter(@Param('id') id: string, @Param('number') number: string) {
    return this.storyService.getChapter(id, Number(number));
  }

  @Post(':id/chapters')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a chapter for a story' })
  createChapter(@Param('id') id: string, @Body() dto: CreateChapterDto) {
    return this.storyService.createChapter(id, dto);
  }

}

