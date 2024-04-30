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
                resolve();
            });
        })
            .catch(error => {
            console.error('Error fetching RSS feed', error.message);
            reject(error);
        });
    });
}
function executeRSSFeed(url) {
    return new Promise((resolve, reject) => {
        switch (url) {
            case websites_1.websites.BITCOINCHASER:
            case websites_1.websites.FEEDBURNER:
            case websites_1.websites.BITCOINIK:
            case websites_1.websites.BITCOINIST:
            case websites_1.websites.BITCOINMARKETHOURNAL:
            case websites_1.websites.BITCOINNEWS:
            case websites_1.websites.BITPINAS:
            case websites_1.websites.TRUSTNODES:
            case websites_1.websites.COINIDOL:
            case websites_1.websites.COINCHECKUP:
            case websites_1.websites.BITMEX_BLOG:
            case websites_1.websites.CRYPTOSLATE:
            case websites_1.websites.BITFINEX_BLOG:
            case websites_1.websites.BITCOIN_NEWS:
            case websites_1.websites.MEDIUM_COINMONKS:
            case websites_1.websites.CRYPTOGENI:
            case websites_1.websites.COINLABZ:
            case websites_1.websites.COINZENE:
            case websites_1.websites.THECRYPTOTIME:
            case websites_1.websites.FUNEXCLUB_BLOG:
            case websites_1.websites.COINBACKYARD:
            case websites_1.websites.ALLINCRYPTO:
            case websites_1.websites.COINBOLD:
            case websites_1.websites.SWAPS_BLOG:
            case websites_1.websites.BESTAICRYPTOCURRENCY:
            case websites_1.websites.CRYPTOBRIEFING:
            case websites_1.websites.BITCOINMAGAZINE:
            case websites_1.websites.CRYPTOPOTATO:
            case websites_1.websites.COINSPEAKER_NEWS:
            case websites_1.websites.NEWSBTC:
            case websites_1.websites.CRYPTODAILY:
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
const promises = rssFeedUrls.map(url => executeRSSFeed(url));
Promise.all(promises)
    .then(() => {
    console.log("All RSS feeds fetched and parsed successfully.");
})
    .catch((error) => {
    console.error('Error fetching or parsing one or more RSS feeds:', error);
});
