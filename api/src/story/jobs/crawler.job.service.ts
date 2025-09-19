import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StoryService } from '../story.service';

@Injectable()
export class CrawlerJobService {
  // private readonly logger = new Logger(CrawlerJobService.name);
  // private crawlingInProgress = false;

  // constructor(
  //   private readonly storyService: StoryService,
  //   private readonly crawlerService: CrawlerService,
  // ) {}

  // /**
  //  * Auto-crawl job that runs once to crawl from Qidian
  //  * You can trigger this manually or set it to run at startup
  //  */
  // async crawlQidianStory() {
  //   if (this.crawlingInProgress) {
  //     this.logger.warn('Crawling already in progress, skipping...');
  //     return;
  //   }

  //   this.crawlingInProgress = true;
  //   this.logger.log('🚀 Starting background crawl job for Qidian story...');

  //   try {
  //     // Configuration for the crawl job
  //     const config = {
  //       qidianUrl: 'https://www.qidian.com/chapter/1931432/32397548/',
  //       startChapter: 1,
  //       endChapter: 5, // Limited to 5 chapters as requested
  //       storyTitle: 'Qidian Crawled Story',
  //       storyDescription: 'Story automatically crawled from Qidian.com using navigation',
  //       storyAuthor: 'Qidian Author'
  //     };

  //     this.logger.log(`📖 Crawling chapters ${config.startChapter}-${config.endChapter} from: ${config.qidianUrl}`);

  //     // Step 1: Create or find the story
  //     let story = await this.findOrCreateStory(config.storyTitle, config.storyDescription, config.storyAuthor);
      
  //     this.logger.log(`📚 Using story: ${story.title} (ID: ${story.id})`);

  //     // Step 2: Use the real crawler service to extract content from Qidian
  //     this.logger.log(`🕷️ Starting real crawl from Qidian using CrawlerService...`);
      
  //     const result = await this.storyService.crawlAndAddChapters(
  //       story.id,
  //       config.qidianUrl,
  //       config.startChapter,
  //       config.endChapter
  //     );

  //     this.logger.log(`✅ Crawling completed successfully!`);
  //     this.logger.log(`📊 Results: ${result.success} chapters crawled, ${result.failed} failed`);
      
  //     if (result.chapters.length > 0) {
  //       this.logger.log(`📝 Sample chapters crawled:`);
  //       result.chapters.slice(0, 3).forEach(chapter => {
  //         this.logger.log(`   - Chapter ${chapter.number}: ${chapter.title}`);
  //       });
  //     }

  //     // Log the story ID for desktop app usage
  //     this.logger.log(`🎯 Story ID for desktop app: ${story.id}`);
  //     this.logger.log(`🌐 Access via API: GET /api/stories/${story.id}`);

  //     return {
  //       success: true,
  //       storyId: story.id,
  //       story: story,
  //       crawlResult: result
  //     };

  //   } catch (error) {
  //     this.logger.error('❌ Crawling job failed:', error.message);
  //     throw error;
  //   } finally {
  //     this.crawlingInProgress = false;
  //     this.logger.log('🏁 Crawling job completed');
  //   }
  // }

  // /**
  //  * Uncomment this if you want the job to run automatically at startup
  //  * @Cron('0 0 * * *') // Run daily at midnight
  //  */
  // // async handleDailyCrawl() {
  // //   await this.crawlQidianStory();
  // // }

  // /**
  //  * Manual trigger method for testing
  //  */
  // async triggerCrawl() {
  //   this.logger.log('🔧 Manual crawl triggered');
  //   return await this.crawlQidianStory();
  // }

  // /**
  //  * Find existing story or create a new one
  //  */
  // private async findOrCreateStory(title: string, description: string, author: string) {
  //   // Try to find existing story by title
  //   const stories = await this.storyService.listStories();
  //   let existingStory = stories.find(s => s.title === title);

  //   if (existingStory) {
  //     this.logger.log(`📖 Found existing story: ${title}`);
  //     return existingStory;
  //   }

  //   // Create new story if not found
  //   this.logger.log(`📝 Creating new story: ${title}`);
  //   const newStory = await this.storyService.createStory({
  //     title,
  //     description,
  //     author
  //   });

  //   this.logger.log(`✅ Created story with ID: ${newStory.id}`);
  //   return newStory;
  // }

  // /**
  //  * Get the status of the current crawling process
  //  */
  // getCrawlingStatus() {
  //   return {
  //     inProgress: this.crawlingInProgress,
  //     timestamp: new Date().toISOString()
  //   };
  // }
}