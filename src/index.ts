import axios from 'axios';
import { parseString } from 'xml2js';
import * as cheerio  from 'cheerio';
import { websites } from "./websites";



const rssFeedUrls = Object.values(websites);


interface RSSItem {
  title: string;
  description: string;
}


async function fetchAndParseRSS(url: string): Promise<void> {
  try {
    const response = await axios.get(url);
    parseString(response.data, (err, result) => {
      if (err) {
        console.error('Error parsing XML', err);
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
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching RSS feed', error.message);
    } else {
      console.error('Unknown error fetching RSS Feed');
    }
  }
}


async function executeRSSFeed(url: string): Promise<void> {
  switch (url) {
    
    
    case websites.CRYPTOCURRENCYNEWS :
      await fetchAndParseRSS(url);
      break;

    case websites.CRYPTOMINING :
      await fetchAndParseRSS(url);
      break;

    case websites.CRYPTOQUARRTET :
      await fetchAndParseRSS(url);
      break;
    
    case websites.FEEDBURNER :
      await fetchAndParseRSS(url);
      break;

    case websites.BITCOIN4U:
      await fetchAndParseRSS(url);
      break;

    case websites.BITCOINCHASER :
      await fetchAndParseRSS(url);
      break;
    
    case websites.BITCOINCORE :
      await fetchAndParseRSS(url);
      break;

    case websites.BITCOINEXCHANGEGUIDE:
      await fetchAndParseRSS(url);
      break;

    case websites.BITCOINGOLDPRICE :
      await fetchAndParseRSS(url);
      break;
    
    case websites.BITCOINIK :
      await fetchAndParseRSS(url);
      break;
    
    case websites.BITCOINIST :
      await fetchAndParseRSS(url);
      break;

    case websites.BITCOINNFT:
      await fetchAndParseRSS(url);
      break;
    
    default:
      console.error('Unsupported RSS feed URL:', url);
      break;
  }
}


rssFeedUrls.forEach(async (url) => {
  await executeRSSFeed(url);
});

