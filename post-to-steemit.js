#!/usr/bin/env node

/**
 * Steemit Blog Post Automation Script
 * Reads blog content from blog-content.json and posts to Steemit
 */

const steem = require('steem');
const fs = require('fs');
const path = require('path');

// Configuration from environment variables
const POSTING_KEY = process.env.STEEM_POSTING_KEY;
const AUTHOR = process.env.STEEM_AUTHOR || 'libertylol';

if (!POSTING_KEY) {
  console.error('❌ Error: STEEM_POSTING_KEY environment variable not set');
  process.exit(1);
}

// Initialize Steem connection
steem.api.setOptions({ url: 'https://api.steemit.com' });

// Read blog content from JSON file
function readBlogContent() {
  try {
    const contentPath = path.join(__dirname, 'blog-content.json');
    const contentData = fs.readFileSync(contentPath, 'utf8');
    return JSON.parse(contentData);
  } catch (error) {
    console.error('❌ Error reading blog-content.json:');
    console.error(error.message);
    process.exit(1);
  }
}

// Function to post
function postToSteemit() {
  const blogContent = readBlogContent();
  
  const {
    title,
    body,
    permlink,
    tags = ['libertarian', 'austrian-economics', 'government-spending', 'property-rights', 'free-market']
  } = blogContent;

  const parentAuthor = '';
  const parentPermlink = 'libertarian';

  const jsonMetadata = JSON.stringify({
    tags: tags,
    app: 'rothbard-blog-writer/1.0',
    image: ['https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Murray_Rothbard.jpg/440px-Murray_Rothbard.jpg']
  });

  console.log('\n' + '='.repeat(80));
  console.log('🚀 POSTING TO STEEMIT');
  console.log('='.repeat(80));
  console.log(`\nAuthor: ${AUTHOR}`);
  console.log(`Title: ${title}`);
  console.log(`Permlink: ${permlink}`);
  console.log('\n⏳ Broadcasting transaction to Steem blockchain...');

  // Broadcast the comment operation
  steem.broadcast.comment(
    POSTING_KEY,
    parentAuthor,
    parentPermlink,
    AUTHOR,
    permlink,
    title,
    body,
    jsonMetadata,
    (err, result) => {
      if (err) {
        console.error('\n❌ Error posting to Steemit:');
        console.error(err.message || err);
        console.error('\nTroubleshooting:');
        console.error('1. Verify your posting key is correct');
        console.error('2. Ensure your account (@' + AUTHOR + ') exists');
        console.error('3. Check Steemit API status');
        console.error('4. Verify network connectivity');
        process.exit(1);
      } else {
        console.log('\n✅ SUCCESS! Blog post published to Steemit!');
        console.log(`\nTransaction ID: ${result.id || result}`);
        console.log(`\nView your post at:`);
        console.log(`https://steemit.com/@${AUTHOR}/${permlink}`);
        console.log('\n' + '='.repeat(80));
        console.log('Post timestamp:', new Date().toISOString());
        console.log('='.repeat(80) + '\n');
        process.exit(0);
      }
    }
  );
}

// Run the posting function
postToSteemit();
