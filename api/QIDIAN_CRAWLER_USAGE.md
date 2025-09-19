# Qidian Crawler API Usage

## Overview
The Story module now includes functionality to crawl chapters from Qidian.com and automatically add them to your stories.

## API Endpoint

### Crawl Qidian Chapters
```
POST /stories/{storyId}/crawl-qidian
```

**Parameters:**
- `storyId` (path): The ID of the story to add chapters to
- `url` (query): The Qidian chapter URL to start crawling from
- `startChapter` (query, optional): Starting chapter number (default: 1)
- `endChapter` (query, optional): Ending chapter number (default: 30)

**Headers:**
- `Authorization: Bearer <your-jwt-token>`

## Usage Examples

### Example 1: Crawl chapters 1-30 from the provided URL
```bash
curl -X POST "http://localhost:3000/api/stories/{story-id}/crawl-qidian?url=https://www.qidian.com/chapter/1931432/32397445/&startChapter=1&endChapter=30" \
  -H "Authorization: Bearer your-jwt-token"
```

### Example 2: Using the exact URL you provided
```bash
curl -X POST "http://localhost:3000/api/stories/{story-id}/crawl-qidian?url=https://www.qidian.com/chapter/1931432/32397445/" \
  -H "Authorization: Bearer your-jwt-token"
```

### Example 3: Custom chapter range
```bash
curl -X POST "http://localhost:3000/api/stories/{story-id}/crawl-qidian?url=https://www.qidian.com/chapter/1931432/32397445/&startChapter=5&endChapter=15" \
  -H "Authorization: Bearer your-jwt-token"
```

## Response Format
```json
{
  "success": 25,
  "failed": 5,
  "chapters": [
    {
      "id": "uuid",
      "number": 1,
      "title": "Chapter Title",
      "content": "Chapter content...",
      "storyId": "story-uuid",
      "createdAt": "2025-09-08T08:00:00.000Z",
      "updatedAt": "2025-09-08T08:00:00.000Z"
    }
    // ... more chapters
  ]
}
```

## Step-by-Step Instructions

### 1. Create a Story First
```bash
curl -X POST "http://localhost:3000/api/stories" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-jwt-token" \
  -d '{
    "title": "My Qidian Story",
    "description": "Story crawled from Qidian",
    "author": "Original Author"
  }'
```

### 2. Use the Story ID from Step 1 to Crawl Chapters
Replace `{story-id}` with the actual story ID returned from step 1:

```bash
curl -X POST "http://localhost:3000/api/stories/{story-id}/crawl-qidian?url=https://www.qidian.com/chapter/1931432/32397445/&endChapter=30" \
  -H "Authorization: Bearer your-jwt-token"
```

## Features

- **Automatic Content Extraction**: Extracts chapter titles and content from Qidian pages
- **Duplicate Prevention**: Checks for existing chapters and updates them if found
- **Batch Processing**: Can crawl multiple chapters in sequence
- **Error Handling**: Continues crawling even if some chapters fail
- **Rate Limiting**: Includes 2-second delays between requests to be respectful to Qidian's servers
- **Content Cleaning**: Automatically cleans up HTML and formatting

## Important Notes

1. **Rate Limiting**: The crawler includes a 2-second delay between requests to avoid overwhelming Qidian's servers
2. **Authentication Required**: You need a valid JWT token to use this endpoint
3. **Story Must Exist**: The story must be created before crawling chapters
4. **Chapter Numbering**: The system will automatically assign chapter numbers starting from `startChapter`
5. **Content Quality**: The crawler attempts to extract clean text content, but results may vary depending on Qidian's page structure

## Troubleshooting

### Common Issues:
- **403/Forbidden**: Qidian may block requests; try using different user agents or adding delays
- **404/Not Found**: Check if the chapter URL is correct and accessible
- **Empty Content**: Some pages may have different HTML structures; check logs for details
- **Authentication Error**: Ensure your JWT token is valid and not expired

### Logs:
Check the server logs for detailed information about the crawling process:
```bash
npm run start:dev
```

The crawler will log:
- Each chapter being processed
- Success/failure status
- Content extraction details
- Any errors encountered