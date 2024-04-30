"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const xml2js_1 = require("xml2js");
const cheerio = require("cheerio");
const websites_1 = require("./websites");
function fetchAndContentencoded() {
    const url = websites_1.websites.FUNEXCLUB_BLOG;
    return new Promise((resolve, reject) => {
        axios_1.default.get(url)
            .then(response => {
            (0, xml2js_1.parseString)(response.data, (err, result) => {
                if (err) {
                    console.error('Error parsing XML for CoinLabz', err);
                    reject(err);
                    return;
                }
                const items = result.rss.channel[0].item;
                items.forEach((item, index) => {
                    const rssItem = {
                        link: item.link[0],
                        title: item.title[0],
                        description: item.description[0]
                    };
                    const $ = cheerio.load(rssItem.description);
                    const descriptionText = $('body').text().trim();
                    const pubDate = item.pubDate ? item.pubDate[0] : '';
                    const author = item['dc:creator'][0];
                    // Extract image URL from the content:encoded tag
                    const contentEncoded = item['content:encoded'][0];
                    const $content = cheerio.load(contentEncoded);
                    const imgElement = $content('div.wp-block-image figure img');
                    const imageUrl = imgElement.attr('src');
                    console.log(`CryptoGeni - Item ${index + 1}:`);
                    console.log(`Title: ${rssItem.title}`);
                    console.log(`Author: ${author}`);
                    console.log(`Image URL: ${imageUrl}`);
                    console.log(`Description: ${descriptionText}`);
                    console.log(`Publish Date: ${pubDate}`);
                    console.log(`Website: ${rssItem.link}`);
                    console.log('------------------------------------------');
                });
                resolve();
            });
        })
            .catch(error => {
            console.error('Error fetching CryptoGeni RSS feed', error.message);
            reject(error);
        });
    });
}
