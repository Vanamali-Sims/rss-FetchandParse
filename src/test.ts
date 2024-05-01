import axios from 'axios';
import { parseString } from 'xml2js';
import * as cheerio from 'cheerio';
import { websites } from "./websites";

interface RSSItem {
    title: string;
    description: string;
    link: string;
}

interface RSSItem2 {
    title: string;

    link: string;
}


function fetchAndContentencoded(): Promise<void> {
    const url = websites.MEDIUM_COINMONKS;
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                parseString(response.data, (err, result) => {
                    if (err) {
                        console.error('Error parsing XML for CoinLabz', err);
                        reject(err);
                        return;
                    }

                    const items = result.rss.channel[0].item;
                    items.forEach((item: any, index: number) => {
                        const rssItem2: RSSItem2 = {
                            link: item.link[0],
                            title: item.title[0],
                        };

                        
                        // const descriptionText = $('body').text().trim();
                        const pubDate = item.pubDate ? item.pubDate[0] : '';
                        const author = item['dc:creator'][0];
                        
                        // Extract image URL from the content:encoded tag
                        const contentEncoded = item['content:encoded'][0];
                        const $content = cheerio.load(contentEncoded);
                        const imgElement = $content('content\\:encoded figure img');
                        const imageUrl = imgElement.attr('src');

                        console.log(`CryptoGeni - Item ${index + 1}:`);
                        console.log(`Title: ${rssItem2.title}`);
                        console.log(`Author: ${author}`);
                        console.log(`Image URL: ${imageUrl}`);
                        // console.log(`Description: ${descriptionText}`);
                        console.log(`Publish Date: ${pubDate}`);
                        console.log(`Website: ${rssItem2.link}`);
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

function fetchAndParseCoinMonks1(): Promise<void> {
    const url = 'https://medium.com/feed/coinmonks'; // RSS feed URL
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                parseString(response.data, (err, result) => {
                    if (err) {
                        console.error('Error parsing XML for RSS feed', err);
                        reject(err);
                        return;
                    }

                    const items = result.rss.channel[0].item;

                    items.forEach((item: any, index: number) => {
                        // Extract title, link, and content encoded
                        const title = item.title ? item.title[0] : 'No title';
                        const link = item.link ? item.link[0] : 'No link';
                        const contentEncoded = item['content:encoded'] ? item['content:encoded'][0] : 'No content encoded';

                        // Parse the content encoded field with Cheerio
                        const $ = cheerio.load(contentEncoded);

                        // Extract description text from <p> tags
                        let descriptionText = '';
                        $('p').each((i, element) => {
                            descriptionText += $(element).text().trim() + ' ';
                        });

                        // Trim any leading or trailing spaces
                        descriptionText = descriptionText.trim();

                        // Extract image URL from figure tag
                        const imageUrl = $('figure img').attr('src') || 'No image URL available';

                        // Create an RSSItem object with the extracted information
                        const rssItem: RSSItem = {
                            title,
                            description: descriptionText,
                            link
                        };

                        console.log(`Item ${index + 1}:`);
                        console.log(`Title: ${rssItem.title}`);
                        console.log(`Description: ${rssItem.description}`);
                        console.log(`Image URL: ${imageUrl}`);
                        console.log(`Link: ${rssItem.link}`);
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


function fetchAndParseNewsBtc(): Promise<void> {
    const url = websites.NEWSBTC; // Use the new website's RSS feed URL here
    return new Promise((resolve, reject) => {
        axios.get(url,{headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.110 Safari/537.36',
        }})
            .then(response => {
                parseString(response.data, (err, result) => {
                    if (err) {
                        console.error('Error parsing XML for new website', err);
                        reject(err);
                        return;
                    }
  
                    const items = result.rss.channel[0].item;
  
                    items.forEach((item: any, index: number) => {
                        const rssItem: RSSItem = {
                            link: item.link ? item.link[0] : 'No link',
                            title: item.title ? item.title[0] : 'No title',
                            description: item.description ? item.description[0] : 'No description'
                        };
  
                        // Parse description HTML with cheerio to extract text and image URL
                        const $ = cheerio.load(rssItem.description);
                        const descriptionText = $.root().text().trim(); // Extracting all text from description HTML
                        
                        // const mediaContent = item['media:content'][0];
                        // const $media = cheerio.load(mediaContent);
                        // const imageUrl = $media('media\\:content').attr('url');
                        // const mediaContent = item['media:content'][0];
                        // const imageUrl = mediaContent.$.url     
                        // const imageUrl = $('img').attr('src') || 'No image URL available';
                        const pubDate = item.pubDate ? item.pubDate[0] : 'Unknown publish date';
                        const author = item['dc:creator'] ? item['dc:creator'][0] : 'Unknown author';
                        const contentEncoded = item['content:encoded'] ? item['content:encoded'][0] : '';
                        const encodedImageUrl = extractImageUrlFromHTML(contentEncoded);




                        



                        // Display the extracted information
                        console.log(`New Website - Item ${index + 1}:`);
                        console.log(`Title: ${rssItem.title}`);
                        console.log(`Author: ${author}`);
                        console.log(`Description: ${descriptionText}`);
                        console.log(`Publish Date: ${pubDate}`);
                        console.log(`Website: ${rssItem.link}`);
                        console.log(`Image URL: ${encodedImageUrl}`);
                        console.log('------------------------------------------');
                    });
  
                    resolve();
                });
            })
            .catch(error => {
                console.error('Error fetching new website RSS feed', error.message);
                reject(error);
            });
    });
  }
  
  function fetchAndParseBitcoinChaser(): Promise<void> {
    const url = websites.BITCOINCHASER;
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                parseString(response.data, (err, result) => {
                    if (err) {
                        console.error('Error parsing XML for Bitcoin News', err);
                        reject(err);
                        return;
                    }
  
                    const items = result.rss.channel[0].item;
                    items.forEach((item: any, index: number) => {
                        const rssItem: RSSItem = {
                            link: item.link[0],
                            title: item.title[0],
                            description: item.description[0]
                        };

                        

  
                        const $ = cheerio.load(rssItem.description);
                        const descriptionText = $.root().text().trim(); // Extracting all text from description HTML
                        const pubDate = item.pubDate ? item.pubDate[0] : '';
                        const author = item['dc:creator'] ? item['dc:creator'][0] : 'Unknown';
                        const contentEncoded = item['content:encoded'] ? item['content:encoded'][0] : '';
                        const $content = cheerio.load(contentEncoded)
                        // const imgElement = $content('figure.wp-block-image figure img')
                        const imgElement = $content('figure.wp-block-image.size-full img')
                        const imageUrl = imgElement.attr('src');
                        

                        
                        console.log(`Bitcoin Market Journal - Item ${index + 1}:`);
                        console.log(`Title: ${rssItem.title}`);
                        console.log(`Author: ${author}`);
                        console.log(`Description: ${descriptionText}`);
                        console.log(`Publish Date: ${pubDate}`);
                        console.log(`Website: ${rssItem.link}`);
                        console.log(`Image URL: ${imageUrl}`);
                        // console.log(`Image Element: ${imgElement}`);
                        console.log('------------------------------------------');
                    });
  
                    resolve();
                });
            })
            .catch(error => {
                console.error('Error fetching Bitcoin Market Journal RSS feed', error.message);
                reject(error);
            });
    });
  }
  
  
  function extractImageUrlFromHTML(html: string): string | undefined {
      const $ = cheerio.load(html);
      const imgTag = $('img').first(); // Select the first img tag in the HTML content
      if (imgTag.length > 0) {
          return imgTag.attr('src');
        }
        return undefined; // Return undefined if no img tag is found
    }
    
    function fetchAndParseBitcoinMagazine(): Promise<void> {
        const url = websites.BITCOINMARKETHOURNAL; // URL of the RSS feed
        
        return new Promise((resolve, reject) => {
            axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.110 Safari/537.36',
                },
            })
            .then(response => {
                // Load the entire RSS feed data into a cheerio instance
                const $ = cheerio.load(response.data, { xmlMode: true });
                
                // Query and process each item in the feed
                $('item').each((index, element) => {
                    // Extract necessary information from each item
                    const rssItem: RSSItem = {
                        title: $(element).find('title').text(),
                        description: $(element).find('description').text(),
                        link: $(element).find('link').text(),
                    };
                    
                    // Additional data extraction
                    const figure = $(element).find('p');
                    const ImageLink = (figure).find('img');
                    const imageUrl = ImageLink.attr('url') || 'No image URL available';
                    const pubDate = $(element).find('pubDate').text() || 'Unknown publish date';
                    const author = $(element).find('dc\\:creator').text() || 'Unknown author';
                    
                    // Display the extracted information
                    console.log(`Bitcoin Magazine - Item ${index + 1}:`);
                    console.log(`Title: ${rssItem.title}`);
                    console.log(`Author: ${author}`);
                    console.log(`Description: ${rssItem.description}`);
                    console.log(`Publish Date: ${pubDate}`);
                    console.log(`Website: ${rssItem.link}`);
                    console.log(`Image URL: ${figure}`);
                    console.log('------------------------------------------');
                });
                
                resolve();
            })
            .catch(error => {
                console.error('Error fetching RSS feed:', error.message);
                reject(error);
            });
        });
    }
    
    
    
     fetchAndParseBitcoinChaser()
      