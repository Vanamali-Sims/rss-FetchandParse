"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const xml2js_1 = require("xml2js");
const cheerio = require("cheerio");
const websites_1 = require("./websites");
const rssFeedUrls = Object.values(websites_1.websites);
function fetchAndParseRSS(url) {
    return new Promise((resolve, reject) => {
        axios_1.default.get(url)
            .then(response => {
            (0, xml2js_1.parseString)(response.data, (err, result) => {
                if (err) {
                    console.error('Error parsing XML', err);
                    reject(err);
                    return;
                }
                const items = result.rss.channel[0].item;
                items.forEach((item, index) => {
                    const rssItem = {
                        title: item.title[0],
                        description: item.description[0]
                    };
                    // Parse data based on the website URL
                    switch (url) {
                        // case websites.BLOCKCHAINNEWS:
                        //  parseBlockchainNews(rssItem, item, index);
                        //   break;
                        case websites_1.websites.FEEDBURNER:
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
function parseCryptominingNews(rssItem, item, index) {
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
function parseCryptoquarrtetNews(rssItem, item, index) {
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
function parseFeedburnerNews(rssItem, item, index) {
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
function parseBlockchainNews(rssItem, item, index) {
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
function parseCryptocurrencyNews(rssItem, item, index) {
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
// Execute RSS feed parsing for each URL
const promises = rssFeedUrls.map(url => fetchAndParseRSS(url));
// Wait for all promises to resolve
Promise.all(promises)
    .then(() => {
    console.log("All RSS feeds fetched and parsed successfully.");
})
    .catch((error) => {
    console.error('Error fetching or parsing one or more RSS feeds:', error);
});
