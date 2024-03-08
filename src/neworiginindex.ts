import axios from 'axios';
import { parseString } from 'xml2js';
import * as cheerio from 'cheerio';
import { websites } from "./websites";

const rssFeedUrls = Object.values(websites);

interface RSSItem {
  title: string;
  description: string;
}

function fetchAndParseRSS(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        parseString(response.data, (err, result) => {
          if (err) {
            console.error('Error parsing XML', err);
            reject(err);
            return;
          }

          const items = result.rss.channel[0].item;

          items.forEach((item: any, index: number) => {
            const rssItem: RSSItem = {
              title: item.title[0],
              description: item.description[0]
            };

            const $ = cheerio.load(rssItem.description);
            const imageUrl = $('img').attr('src');
            const descriptionText = $('body').text().trim();
            const pubDate = item.pubDate ? item.pubDate[0] : '';
            const authorMatch = item.description[0].match(/by (.+?)</i);
            const author = authorMatch ? authorMatch[1] : 'Unknown';

            console.log(`Item ${index + 1}:`);
            console.log(`Title: ${rssItem.title}`);
            console.log(`Author: ${author}`);
            console.log(`Image URL: ${imageUrl}`);
            console.log(`Description: ${descriptionText}`);
            console.log(`Publish Date: ${pubDate}`);
            console.log(`Website: ${url}`);
            console.log('------------------------------------------');
          });

          resolve(); // Resolve the promise when parsing is done
        });
      })
      .catch(error => {
        console.error('Error fetching RSS feed', error.message);
        reject(error);
      });
  });
}

function executeRSSFeed(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    switch (url) {
      case websites.BITCOINCHASER:
      case websites.FEEDBURNER:
      case websites.BITCOINIK:
      case websites.BITCOINIST:
      case websites.BITCOINMARKETHOURNAL:
      case websites.BITCOINNEWS:
      case websites.BITPINAS:
      case websites.TRUSTNODES:
      case websites.COINIDOL:
      case websites.COINCHECKUP:
      case websites.BITMEX_BLOG:
      case websites.CRYPTOSLATE:
      case websites.BITFINEX_BLOG:
      case websites.BITCOIN_NEWS:
      case websites.MEDIUM_COINMONKS:
      case websites.CRYPTOGENIUS:
      case websites.COINLABZ:
      case websites.COINZENE:
      case websites.THECRYPTOTIME:
      case websites.FUNEXCLUB_BLOG:
      case websites.COINBACKYARD:
      case websites.ALLINCRYPTO:
      case websites.COINBOLD:
      case websites.SWAPS_BLOG:
      case websites.BESTAICRYPTOCURRENCY:
      case websites.CRYPTOBRIEFING:
      case websites.BITCOINMAGAZINE:
      case websites.CRYPTOPOTATO:
      case websites.COINSPEAKER_NEWS:
      case websites.NEWSBTC:
      case websites.CRYPTODAILY:

        fetchAndParseRSS(url)
          .then(() => resolve())
          .catch(error => reject(error));
        break;
      default:
        console.error('Unsupported RSS feed URL:', url);
        reject(new Error('Unsupported RSS feed URL'));
    }
  });
}

// Execute RSS feed parsing for each URL
const promises = rssFeedUrls.map(url => executeRSSFeed(url));

// Wait for all promises to resolve
Promise.all(promises)
  .then(() => {
    console.log("All RSS feeds fetched and parsed successfully.");
  })
  .catch((error) => {
    console.error('Error fetching or parsing one or more RSS feeds:', error);
  });
