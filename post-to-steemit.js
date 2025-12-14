#!/usr/bin/env node

/**
 * Steemit Blog Post Automation Script
 * Posts a Rothbard-style libertarian blog post to Steemit
 * Uses steem-js library
 */

const steemjs = require('steem-js');

// Configuration from environment variables
const POSTING_KEY = process.env.STEEM_POSTING_KEY;
const AUTHOR = process.env.STEEM_AUTHOR || 'jrhaseloff';

if (!POSTING_KEY) {
  console.error('❌ Error: STEEM_POSTING_KEY environment variable not set');
  process.exit(1);
}

// Initialize Steem connection
steemjs.api.setOptions({ url: 'https://api.steemit.com' });

// Blog post data
const parentAuthor = '';
const parentPermlink = 'libertarian';
const permlink = 'the-obscene-arithmetic-of-state-plunder-20474-per-person';
const title = 'The Obscene Arithmetic of State Plunder: $20,474 Per Person in Annual Theft';
const body = `![Murray Rothbard - Libertarian Economist](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Murray_Rothbard.jpg/440px-Murray_Rothbard.jpg)

---

The federal government has reached a new milestone of moral bankruptcy: $7.035 trillion in spending for fiscal year 2025, or $20,474 per person. Let that figure sink in. Every man, woman, and child in America is being conscripted to finance the machinery of state power to the tune of over twenty thousand dollars annually. This is not merely a fiscal problem—it is a fundamental violation of property rights and human liberty.

The apologists for the state will offer their usual palliatives: "The deficit narrowed!" "Revenues increased!" These are the desperate consolations of those who have surrendered their moral compass. Whether the state steals $1.8 trillion or $1.7 trillion is irrelevant to the fundamental injustice. The question is not whether government spending is slightly less obscene than last year—the question is whether the state has any legitimate right to confiscate this wealth at all.

Let us be clear about what this spending represents. It is not a voluntary exchange. It is not a contract freely entered into by consenting parties. It is coercion—the systematic extraction of wealth from productive citizens under threat of violence. The IRS does not ask politely. The state does not negotiate. It demands, and it punishes those who refuse to comply.

Where does this $7 trillion go? Into the military-industrial complex that maintains America's global empire. Into welfare bureaucracies that create dependency while enriching administrators. Into regulatory agencies that strangle entrepreneurship and innovation. Into the Federal Reserve's monetary manipulations that debase the currency and impoverish savers. Into foreign aid that enriches dictators and corrupt elites while American citizens struggle with inflation and stagnant wages.

The defenders of this system claim we need government to provide security, infrastructure, and social safety nets. But this is a false choice. The state has monopolized these functions through coercion, then claims credit for providing them. In a free market, voluntary associations and mutual aid societies would provide these services far more efficiently and ethically than the bloated bureaucratic apparatus we suffer under today.

The Austrian School of economics understood what modern statists refuse to acknowledge: government spending is not stimulus—it is capital consumption. Every dollar the state extracts from the productive sector is a dollar that cannot be invested in genuine economic growth. Every regulation imposed by federal agencies is a barrier to entrepreneurship. Every dollar printed by the Federal Reserve is a hidden tax on the savings of ordinary Americans.

We are told that this is the price of civilization. We are told that without the state, chaos would reign. But the real chaos is the chaos of a society where the government steals $20,474 from every person annually and calls it taxation. The real barbarism is a system where the productive are enslaved to finance the parasitic apparatus of political power.

There is only one moral response to this obscenity: the complete separation of state and economy. Not reform. Not compromise. Not "fiscal responsibility" within the framework of statism. Complete separation. A return to genuine free markets, sound money, and the protection of property rights as the foundation of civilization.

Murray Rothbard understood that the state is not a necessary evil—it is simply evil. And the $7 trillion annual theft is the proof.

Follow Murray Rothbard on Twitter here: https://twitter.com/MurraySuggests`;

const jsonMetadata = JSON.stringify({
  tags: ['libertarian', 'austrian-economics', 'government-spending', 'property-rights', 'free-market'],
  app: 'rothbard-blog-writer/1.0',
  image: ['https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Murray_Rothbard.jpg/440px-Murray_Rothbard.jpg']
});

// Function to post
async function postToSteemit() {
  try {
    console.log('\n' + '='.repeat(80));
    console.log('🚀 POSTING TO STEEMIT');
    console.log('='.repeat(80));
    console.log(`\nAuthor: ${AUTHOR}`);
    console.log(`Title: ${title}`);
    console.log(`Permlink: ${permlink}`);
    console.log('\n⏳ Broadcasting transaction to Steem blockchain...');

    // Broadcast the comment operation
    const result = await steemjs.broadcast.commentAsync(
      POSTING_KEY,
      parentAuthor,
      parentPermlink,
      AUTHOR,
      permlink,
      title,
      body,
      jsonMetadata
    );

    console.log('\n✅ SUCCESS! Blog post published to Steemit!');
    console.log(`\nTransaction ID: ${result.id || result}`);
    console.log(`\nView your post at:`);
    console.log(`https://steemit.com/@${AUTHOR}/${permlink}`);
    console.log('\n' + '='.repeat(80));
    console.log('Post timestamp:', new Date().toISOString());
    console.log('='.repeat(80) + '\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error posting to Steemit:');
    console.error(error.message || error);
    console.error('\nFull error:', error);
    console.error('\nTroubleshooting:');
    console.error('1. Verify your posting key is correct');
    console.error('2. Ensure your account (@' + AUTHOR + ') exists');
    console.error('3. Check Steemit API status at https://api.steemit.com');
    console.error('4. Verify network connectivity');
    process.exit(1);
  }
}

// Run the posting function
postToSteemit();
