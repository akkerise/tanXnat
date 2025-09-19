import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';

export interface ChapterData {
  number: number;
  title: string;
  content: string;
  url: string;
}

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);

  constructor(private readonly httpService: HttpService) { }

  /**
   * Crawl a single chapter from Qidian
   */
  async crawlQidianChapter(url: string): Promise<ChapterData | null> {
    try {
      this.logger.log(`Crawling chapter from: ${url}`);

      const response: AxiosResponse<string> = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language':
              'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
            'Accept-Encoding': 'gzip, deflate',
            Connection: 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
          },
          timeout: 10000,
        })
      );

      const $ = cheerio.load(response.data);

      // Extract chapter number from URL or title
      const urlMatch = url.match(/\/(\d+)\/$/);
      const chapterNumber = urlMatch ? parseInt(urlMatch[1]) : 1;

      // Extract title - try multiple selectors for Qidian
      let title =
        $('.j_chapterName').text().trim() ||
        $('.chapter-title').text().trim() ||
        $('h1.title').text().trim() ||
        $('h1').text().trim() ||
        `Chapter ${chapterNumber}`;

      // Extract content - try multiple selectors for Qidian
      let content = $('.j_readContent').html() ||
        $('.read-content').html() ||
        $('.chapter-content').html() ||
        $('#content').html() ||
        $('.content').html();

      if (!content) {
        this.logger.warn(`No content found for URL: ${url}`);
        return null;
      }

      // Clean up the content
      const contentText = this.cleanContent(content);

      if (!contentText || contentText.length < 100) {
        this.logger.warn(`Content too short or empty for URL: ${url}`);
        return null;
      }

      this.logger.log(`Successfully crawled chapter ${chapterNumber}: ${title}`);

      return {
        number: chapterNumber,
        title: title,
        content: contentText,
        url: url,
      };
    } catch (error) {
      this.logger.error(`Failed to crawl chapter from ${url}:`, error.message);
      return null;
    }
  }

  /**
   * Crawl multiple chapters from Qidian starting from a base URL
   */
  async crawlQidianChapters(baseUrl: string, startChapter: number, endChapter: number): Promise<ChapterData[]> {
    const chapters: ChapterData[] = [];

    // Extract base URL pattern from the provided URL
    // Example: https://www.qidian.com/chapter/1931432/32397445/ -> https://www.qidian.com/chapter/1931432/
    const baseUrlMatch = baseUrl.match(/(.*\/chapter\/\d+\/)\d+\/?$/);
    if (!baseUrlMatch) {
      this.logger.error(`Invalid Qidian URL format: ${baseUrl}`);
      return chapters;
    }

    const basePattern = baseUrlMatch[1];

    // Extract starting chapter ID from URL
    const chapterIdMatch = baseUrl.match(/\/(\d+)\/?$/);
    const startingChapterId = chapterIdMatch ? parseInt(chapterIdMatch[1]) : 32397445;

    this.logger.log(`Starting crawl from chapter ${startChapter} to ${endChapter}`);

    for (let chapterNum = startChapter; chapterNum <= endChapter; chapterNum++) {
      // Calculate chapter ID (assuming sequential IDs)
      const chapterId = startingChapterId + (chapterNum - startChapter);
      const chapterUrl = `${basePattern}${chapterId}/`;

      const chapterData = await this.crawlQidianChapter(chapterUrl);

      if (chapterData) {
        // Update the chapter number to match our sequence
        chapterData.number = chapterNum;
        chapters.push(chapterData);

        // Add delay between requests to be respectful to the server
        await this.delay(2000);
      } else {
        this.logger.warn(`Failed to crawl chapter ${chapterNum} at ${chapterUrl}`);
        // Try alternative ID calculation or skip
        continue;
      }
    }

    this.logger.log(`Successfully crawled ${chapters.length} chapters`);
    return chapters;
  }

  /**
   * Crawl multiple chapters by following "下一章" (Next Chapter) links from Qidian
   */
  async crawlQidianChaptersByNavigation(startUrl: string, maxChapters: number = 5): Promise<ChapterData[]> {
    const chapters: ChapterData[] = [];
    let currentUrl = startUrl;
    let chapterCount = 0;

    this.logger.log(`Starting navigation-based crawl from: ${startUrl}`);
    this.logger.log(`Will crawl maximum ${maxChapters} chapters`);

    while (currentUrl && chapterCount < maxChapters) {
      try {
        this.logger.log(`Crawling chapter ${chapterCount + 1}/${maxChapters} from: ${currentUrl}`);
        
        const response: AxiosResponse<string> = await firstValueFrom(
          this.httpService.get(currentUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
              'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
              'Accept-Encoding': 'gzip, deflate, br',
              'Connection': 'keep-alive',
              'Upgrade-Insecure-Requests': '1',
              'Sec-Fetch-Dest': 'document',
              'Sec-Fetch-Mode': 'navigate',
              'Sec-Fetch-Site': 'none',
              'Cache-Control': 'max-age=0',
            },
            timeout: 15000,
            validateStatus: (status) => status < 500,
          })
        );

        if (response.status >= 400) {
          this.logger.warn(`HTTP ${response.status} for URL: ${currentUrl}`);
          break;
        }

        const $ = cheerio.load(response.data);
        
        // Log page title for debugging
        const pageTitle = $('title').text();
        this.logger.log(`Page title: ${pageTitle}`);
        
        // Extract chapter number (use sequence number)
        const chapterNumber = chapterCount + 1;
        
        // Extract chapter title - try multiple selectors for Qidian
        let title = $('.j_chapterName').text().trim() || 
                    $('.chapter-title').text().trim() ||
                    $('h1.title').text().trim() ||
                    $('h1').text().trim() ||
                    $('.read-title').text().trim() ||
                    $('.chapter-name').text().trim() ||
                    $('.book-read-title').text().trim() ||
                    pageTitle.split('_')[0] ||
                    `Chapter ${chapterNumber}`;
        
        // Extract content - try multiple selectors for Qidian
        let content = $('main').text();                    

        // If no content found, try getting text content directly
        if (!content) {
          const bodyText = $('body').text();
          this.logger.log(`Body text length: ${bodyText.length}`);
          
          // Try to find any substantial text content
          const paragraphs = $('p').map((i, el) => $(el).text()).get().join('\n\n');
          if (paragraphs && paragraphs.length > 200) {
            content = paragraphs;
            this.logger.log('Using paragraph content as fallback');
          } else {
            this.logger.warn(`No content found for ${currentUrl}, creating placeholder`);
            content = `Content could not be extracted from: ${currentUrl}\n\nPage title: ${pageTitle}\n\nThis is chapter ${chapterNumber} content placeholder.`;
          }
        }

        // Clean up the content
        const contentText = this.cleanContent(content);
        
        const chapterData: ChapterData = {
          number: chapterNumber,
          title: title,
          content: contentText,
          url: currentUrl,
        };
        
        chapters.push(chapterData);
        chapterCount++;
        
        this.logger.log(`✅ Successfully extracted chapter ${chapterNumber}: ${title} (${contentText.length} chars)`);
        
        // Find the "下一章" (Next Chapter) link
        const nextChapterLink = this.findNextChapterLink($);
        
        if (nextChapterLink) {
          // Convert relative URL to absolute if needed
          currentUrl = nextChapterLink.startsWith('http') 
            ? nextChapterLink 
            : `https://www.qidian.com${nextChapterLink}`;
          
          this.logger.log(`Found next chapter link: ${currentUrl}`);
          
          // Add delay between requests to be respectful
          if (chapterCount < maxChapters) {
            this.logger.log('Waiting 3 seconds before next request...');
            await this.delay(3000);
          }
        } else {
          this.logger.log('No next chapter link found, stopping crawl');
          break;
        }
        
      } catch (error) {
        this.logger.error(`Failed to crawl chapter from ${currentUrl}:`, error.message);
        
        // Create a fallback chapter on error
        const chapterData: ChapterData = {
          number: chapterCount + 1,
          title: `Chapter ${chapterCount + 1} (Error Recovery)`,
          content: `Failed to crawl content from: ${currentUrl}\n\nError: ${error.message}\n\nThis is a placeholder chapter created due to crawling error.`,
          url: currentUrl,
        };
        
        chapters.push(chapterData);
        chapterCount++;
        break;
      }
    }
    
    this.logger.log(`✅ Navigation-based crawl completed: ${chapters.length} chapters extracted`);
    return chapters;
  }

  /**
   * Find the "下一章" (Next Chapter) link on Qidian page
   */
  private findNextChapterLink($: cheerio.CheerioAPI): string | null {
    // Try multiple selectors for "下一章" (Next Chapter) link
    const nextLinkSelectors = [
      'a:contains("下一章")',
      'a:contains("下一页")',
      'a:contains("下章")',
      '.j_nextChapter',
      '.next-chapter',
      '.chapter-nav-next',
      '.j_nextPage',
      'a[title*="下一章"]',
      'a[title*="下一页"]',
      '.read-nav .next',
      '.chapter-pager .next',
      '.pager-next',
    ];
    
    for (const selector of nextLinkSelectors) {
      const link = $(selector).first();
      if (link.length > 0) {
        const href = link.attr('href');
        if (href && href.trim() !== '' && href !== '#') {
          this.logger.log(`Found next chapter link using selector: ${selector}`);
          return href;
        }
      }
    }
    
    // If specific selectors fail, try to find any link that might be "next chapter"
    const allLinks = $('a');
    for (let i = 0; i < allLinks.length; i++) {
      const link = $(allLinks[i]);
      const text = link.text().trim();
      const title = link.attr('title') || '';
      
      if (text.includes('下一章') || text.includes('下一页') || 
          title.includes('下一章') || title.includes('下一页')) {
        const href = link.attr('href');
        if (href && href.trim() !== '' && href !== '#') {
          this.logger.log(`Found next chapter link by text content: "${text}"`);
          return href;
        }
      }
    }
    
    this.logger.warn('No next chapter link found with any selector');
    return null;
  }

  /**
   * Clean and format the content text
   */
  private cleanContent(htmlContent: string): string {
    const $ = cheerio.load(htmlContent);

    // Remove unwanted elements
    $('script, style, .ad, .advertisement, .comment, .social').remove();

    // Get text content and clean it up
    let text = $.text();

    // Clean up whitespace and formatting
    text = text
      .replace(/\s+/g, ' ')              // Replace multiple whitespace with single space
      .replace(/\n\s*\n/g, '\n\n')       // Clean up line breaks
      .replace(/^\s+|\s+$/g, '')         // Trim start and end
      .replace(/　/g, ' ')                // Replace full-width spaces
      .replace(/\r\n/g, '\n')            // Normalize line endings
      .replace(/\r/g, '\n');             // Normalize line endings

    // Split into paragraphs and rejoin with proper formatting
    const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
    return paragraphs.join('\n\n');
  }

  /**
   * Utility method to add delay between requests
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Parse Qidian URL to extract book ID and chapter ID
   */
  parseQidianUrl(url: string): { bookId?: string; chapterId?: string } | null {
    // Pattern: https://www.qidian.com/chapter/{bookId}/{chapterId}/
    const match = url.match(/\/chapter\/(\d+)\/(\d+)\/?$/);

    if (match) {
      return {
        bookId: match[1],
        chapterId: match[2],
      };
    }

    return null;
  }
}