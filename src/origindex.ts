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

            // Parse data based on the website URL
            switch (url) {
              // case websites.BLOCKCHAINNEWS:
              //  parseBlockchainNews(rssItem, item, index);
              //   break;
            
              
              case websites.FEEDBURNER:
                parseFeedburnerNews(rssItem, item, index);
                break;
              // case websites.CRYPTOQUARRTET:
              //   parseCryptoquarrtetNews(rssItem, item, index);
              //   break;
              // case websites.CRYPTOQUARRTET:
              //   parseCryptoquarrtetNews(rssItem, item, index);
              //   break;
              
              default:
                console.error('Unsupported RSS feed URL:', url);
                break;
            }
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

// Parsing function for Blockchain News website
// function parseCryptominingNews(rssItem: RSSItem, item: any, index: number) {
//   // Check if the title contains a specific keyword before processing
//   if (rssItem.title.toLowerCase().includes('bitcoin')) {
//     const $ = cheerio.load(rssItem.description);
//     const imageUrl = $('img').attr('src');
//     const descriptionText = $('body').text().trim();
//     const pubDate = item.pubDate ? item.pubDate[0] : '';
//     const authorMatch = item.description[0].match(/by (.+?)</i);
//     const author = authorMatch ? authorMatch[1] : 'Unknown';

//     console.log(`Item ${index + 1}:`);
//     console.log(`Title: ${rssItem.title}`);
//     console.log(`Author: ${author}`);
//     console.log(`Image URL: ${imageUrl}`);
//     console.log(`Description: ${descriptionText}`);
//     console.log(`Publish Date: ${pubDate}`);
//     console.log('------------------------------------------');
//   }
// }

function parseCryptominingNews(rssItem: RSSItem, item: any, index: number) {
  

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
    console.log('------------------------------------------');
  
}

function parseCryptoquarrtetNews(rssItem: RSSItem, item: any, index: number) {
  // Check if the title contains a specific keyword before processing
  if (rssItem.title.toLowerCase().includes('bitcoin')) {
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
    console.log('------------------------------------------');
  }
}

function parseFeedburnerNews(rssItem: RSSItem, item: any, index: number) {
  // Check if the title contains a specific keyword before processing
  if (rssItem.title.toLowerCase().includes('bitcoin')) {
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
    console.log('------------------------------------------');
  }
}

function parseBlockchainNews(rssItem: RSSItem, item: any, index: number) {
  // Checking if the title contains a specific keyword before processing
  if (rssItem.title.toLowerCase().includes('bitcoin')) {
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
    console.log('------------------------------------------');
  }
}

function parseCryptocurrencyNews(rssItem: RSSItem, item: any, index: number) {
  if (rssItem.description.toLowerCase().includes('ethereum')) {
    const $ = cheerio.load(rssItem.description);
    const imageUrl = $('img').attr('src');
    // const descriptionText = $('div.mh-excerpt').text().trim();
    let descriptionText = $('div.mh-excerpt').text().trim();
    descriptionText = descriptionText.replace(/\s+/g, ' ');
    const pubDate = item.pubDate ? item.pubDate[0] : '';
    const authorMatch = item.description[0].match(/by (.+?)</i);
    const author = authorMatch ? authorMatch[1] : 'Unknown';

    console.log(`Website: ${item}`);
    console.log(`Item ${index + 1}:`);
    console.log(`Title: ${rssItem.title}`);
    console.log(`Author: ${author}`);
    console.log(`Image URL: ${imageUrl}`);
    console.log(`Description: ${descriptionText}`);
    console.log(`Publish Date: ${pubDate}`);
    console.log('------------------------------------------');
  }
}



const promises = rssFeedUrls.map(url => fetchAndParseRSS(url));


Promise.all(promises)
  .then(() => {
    console.log("All RSS feeds fetched and parsed successfully.");
  })
  .catch((error) => {
    console.error('Error fetching or parsing one or more RSS feeds:', error);
  });
