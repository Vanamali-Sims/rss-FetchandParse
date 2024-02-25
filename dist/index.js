"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const xml2js_1 = require("xml2js");
const cheerio = require("cheerio");
const websites_1 = require("./websites");
const rssFeedUrls = Object.values(websites_1.websites);
function fetchAndParseRSS(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(url);
            (0, xml2js_1.parseString)(response.data, (err, result) => {
                if (err) {
                    console.error('Error parsing XML', err);
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
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching RSS feed', error.message);
            }
            else {
                console.error('Unknown error fetching RSS Feed');
            }
        }
    });
}
function executeRSSFeed(url) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (url) {
            case websites_1.websites.CRYPTOCURRENCYNEWS:
                yield fetchAndParseRSS(url);
                break;
            case websites_1.websites.CRYPTOMINING:
                yield fetchAndParseRSS(url);
                break;
            case websites_1.websites.CRYPTOQUARRTET:
                yield fetchAndParseRSS(url);
                break;
            case websites_1.websites.FEEDBURNER:
                yield fetchAndParseRSS(url);
                break;
            // case websites.BLOCKCHAINNEWS :
            //   await fetchAndParseRSS(url);
            //   break;
            default:
                console.error('Unsupported RSS feed URL:', url);
                break;
        }
    });
}
rssFeedUrls.forEach((url) => __awaiter(void 0, void 0, void 0, function* () {
    yield executeRSSFeed(url);
}));
