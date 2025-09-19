#!/bin/bash

# Test script for Qidian Crawler API
# This script demonstrates how to use the crawler functionality

API_BASE="http://localhost:3003/api"
AUTH_TOKEN=""  # You'll need to get this from login

echo "🚀 Testing Qidian Crawler API"
echo "================================"

# Step 1: Login to get auth token (you'll need to replace with actual credentials)
echo "Step 1: Login to get authentication token..."
echo "POST $API_BASE/auth/login"
echo '{"username": "nathan", "password": "password"}'
echo ""

# For now, let's assume you have a token. Replace this with actual token
if [ -z "$AUTH_TOKEN" ]; then
    echo "⚠️  Please set AUTH_TOKEN variable with your JWT token"
    echo "   You can get it by calling: POST $API_BASE/auth/login"
    echo "   with your username and password"
    echo ""
fi

# Step 2: Create a test story
echo "Step 2: Create a story for the crawled content..."
STORY_PAYLOAD='{
  "title": "Qidian Test Story",
  "description": "Story crawled from Qidian.com for testing",
  "author": "Test Author"
}'

echo "POST $API_BASE/stories"
echo "$STORY_PAYLOAD"
echo ""

# Step 3: Crawl chapters from Qidian
echo "Step 3: Crawl chapters from Qidian..."
QIDIAN_URL="https://www.qidian.com/chapter/1931432/32397445/"
STORY_ID="your-story-id-here"  # Replace with actual story ID from step 2

echo "POST $API_BASE/stories/$STORY_ID/crawl-qidian?url=$QIDIAN_URL&startChapter=1&endChapter=30"
echo "Authorization: Bearer $AUTH_TOKEN"
echo ""

# Step 4: Check the crawled chapters
echo "Step 4: Verify crawled chapters..."
echo "GET $API_BASE/stories/$STORY_ID/chapters"
echo ""

echo "📋 Manual Testing Instructions:"
echo "1. First, get your auth token by logging in:"
echo "   curl -X POST '$API_BASE/auth/login' \\"
echo "        -H 'Content-Type: application/json' \\"
echo "        -d '{\"username\": \"nathan\", \"password\": \"password\"}'"
echo ""

echo "2. Create a story:"
echo "   curl -X POST '$API_BASE/stories' \\"
echo "        -H 'Content-Type: application/json' \\"
echo "        -H 'Authorization: Bearer YOUR_TOKEN_HERE' \\"
echo "        -d '$STORY_PAYLOAD'"
echo ""

echo "3. Use the story ID from step 2 to crawl chapters:"
echo "   curl -X POST '$API_BASE/stories/STORY_ID/crawl-qidian?url=$QIDIAN_URL&endChapter=30' \\"
echo "        -H 'Authorization: Bearer YOUR_TOKEN_HERE'"
echo ""

echo "4. Check the results:"
echo "   curl -X GET '$API_BASE/stories/STORY_ID/chapters' \\"
echo "        -H 'Authorization: Bearer YOUR_TOKEN_HERE'"
echo ""

echo "✅ Crawler features implemented:"
echo "   - HTTP module added to story module"
echo "   - CrawlerService created with Cheerio for HTML parsing"
echo "   - New endpoint: POST /api/stories/:id/crawl-qidian"
echo "   - Automatic content extraction and cleaning"
echo "   - Rate limiting (2s delays between requests)"
echo "   - Error handling and logging"
echo "   - Duplicate chapter detection and updating"
echo ""

echo "🎯 Ready to crawl from: $QIDIAN_URL"
echo "   Target chapters: 1-30"
echo "   Server running on: http://localhost:3003"
echo "   API docs: http://localhost:3003/swagger (if enabled)"