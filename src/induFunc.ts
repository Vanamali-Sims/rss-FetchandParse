import axios from 'axios';
import { parseString } from 'xml2js';
import * as cheerio from 'cheerio';
import { websites } from "./websites";

interface RSSItem {
    title: string;
    description: string;
    link:string;
  }
  


function fetchAndParseBitcoinMarkethJournal(): Promise<void> {
    const url = websites.BITCOINMARKETHOURNAL;
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(response => {
          parseString(response.data, (err, result) => {
            if (err) {
              console.error('Error parsing XML for Bitcoin Market Journal', err);
              reject(err);
              return;
            }
  
            const items = result.rss.channel[0].item;
  
            items.forEach((item: any, index: number) => {
              const rssItem: RSSItem = {
                link:item.link[0],
                title: item.title[0],
                description: item.description[0]
              };

              function extractImageUrlFromHTML(html: string): string | undefined {
                const $ = cheerio.load(html);
                const imgTag = $('img').first(); // Select the first img tag in the HTML content
                if (imgTag.length > 0) {
                  return imgTag.attr('src');
                }
                return undefined; // Return undefined if no img tag is found
              }
  
              const $ = cheerio.load(rssItem.description);
              const imageUrl = $('img').attr('src');
              const descriptionText = $('body').text().trim();
              const pubDate = item.pubDate ? item.pubDate[0] : '';
              
              const author = item['dc:creator'][0];
              const contentEncoded = item['content:encoded'] ? item['content:encoded'][0] : '';
              const encodedImageUrl = extractImageUrlFromHTML(contentEncoded);



              console.log(`Bitcoin Market Journal - Item ${index + 1}:`);
              console.log(`Title: ${rssItem.title}`);
              console.log(`Author: ${author}`);
              console.log(`Image URL : ${encodedImageUrl}`);
              console.log(`Description: ${descriptionText}`);
              console.log(`Publish Date: ${pubDate}`);
              console.log(`Website: ${rssItem.link}`);
              console.log('------------------------------------------');
            });
  
            resolve(); // Resolve the promise when parsing is done
          });
        })
        .catch(error => {
          console.error('Error fetching Bitcoin Market Journal RSS feed', error.message);
          reject(error);
        });
    });
  }
 
function fetchAndParseTrustNodes(): Promise<void> {
    const url = websites.TRUSTNODES;
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                parseString(response.data, (err, result) => {
                    if (err) {
                        console.error('Error parsing XML for Trustnodes', err);
                        reject(err);
                        return;
                    }

                    const items = result.rss.channel[0].item;

                    items.forEach((item: any, index: number) => {
                        const rssItem: RSSItem = {
                            title: item.title[0],
                            description: item.description[0],
                            link: item.link[0] // Extracting the link from the XML
                        };

                        const $ = cheerio.load(rssItem.description);
                        const descriptionText = $('body').text().trim();
                        const pubDate = item.pubDate ? item.pubDate[0] : '';
                        const author = item['dc:creator'][0];
                        const imageUrl = $('img').attr('src');
                        

                        console.log(`Bitcoin Market Journal - Item ${index + 1}:`);
                        console.log(`Title: ${rssItem.title}`);
                        console.log(`Author: ${author}`);
                        console.log(`Image URL: ${imageUrl}`);
                        console.log(`Description: ${descriptionText}`);
                        console.log(`Publish Date: ${pubDate}`);
                        console.log(`Website: ${rssItem.link}`);
                        console.log('------------------------------------------');
                    });

                    resolve(); // Resolve the promise when parsing is done
                });
            })
            .catch(error => {
                console.error('Error fetching Trustnodes RSS feed', error.message);
                reject(error);
            });
    });
}


function fetchAndParseBitPinas(): Promise<void> {
    const url = websites.BITPINAS;
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(response => {
          parseString(response.data, (err, result) => {
            if (err) {
              console.error('Error parsing XML for Bitcoin Market Journal', err);
              reject(err);
              return;
            }
  
            const items = result.rss.channel[0].item;
            const imageInfo = result.rss.channel[0].image[0];
            const imageUrl = imageInfo.url[0];
            items.forEach((item: any, index: number) => {
              const rssItem: RSSItem = {
                link:item.link[0],
                title: item.title[0],
                description: item.description[0]
              };
  
              const $ = cheerio.load(rssItem.description);
            //   const imageUrl = $('img').attr('src');
              const descriptionText = $('body').text().trim();
              const pubDate = item.pubDate ? item.pubDate[0] : '';
              const author = item['dc:creator'][0];
              const thumbnailUrlPattern = /<media:thumbnail\s+url="([^"]+)"\s*\/>/;
              const match = item.description[0].match(thumbnailUrlPattern);
              const thumbnailUrl = match ? match[1] : undefined;

            //   const imageUrl = item['media:content'] ? item['media:content'][0].$.url : 'Unknown';

  
              console.log(`BitPinas - Item ${index + 1}:`);
              console.log(`Title: ${rssItem.title}`);
              console.log(`Author: ${author}`);
              console.log(`Image URL: ${thumbnailUrl}`);
              console.log(`Description: ${descriptionText}`);
              console.log(`Publish Date: ${pubDate}`);
              console.log(`Website: ${rssItem.link}`);
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

function fetchAndParseCoinLabz(): Promise<void> {
    const url = websites.COINLABZ;
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
            const imageInfo = result.rss.channel[0].image[0];
            const imageUrl = imageInfo.url[0];
            items.forEach((item: any, index: number) => {
              const rssItem: RSSItem = {
                link:item.link[0],
                title: item.title[0],
                description: item.description[0]
              };
  
              const $ = cheerio.load(rssItem.description);
            //   const imageUrl = $('img').attr('src');
              const descriptionText = $('body').text().trim();
              const pubDate = item.pubDate ? item.pubDate[0] : '';
              const author = item['dc:creator'][0];
            //   const imageUrl = item['media:content'] ? item['media:content'][0].$.url : 'Unknown';

  
              console.log(`Bitcoin Market Journal - Item ${index + 1}:`);
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
          console.error('Error fetching Bitcoin Market Journal RSS feed', error.message);
          reject(error);
        });
    });
  }

function fetchAndParseCoinbackyard(): Promise<void> {
    const url = websites.COINBACKYARD;
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
            const imageInfo = result.rss.channel[0].image[0];
            const imageUrl = imageInfo.url[0];
            items.forEach((item: any, index: number) => {
              const rssItem: RSSItem = {
                link:item.link[0],
                title: item.title[0],
                description: item.description[0]
              };
  
              const $ = cheerio.load(rssItem.description);
            //   const imageUrl = $('img').attr('src');
              const descriptionText = $('body').text().trim();
              const pubDate = item.pubDate ? item.pubDate[0] : '';
              const author = item['dc:creator'][0];
            //   const imageUrl = item['media:content'] ? item['media:content'][0].$.url : 'Unknown';

  
              console.log(`Bitcoin Market Journal - Item ${index + 1}:`);
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
          console.error('Error fetching Bitcoin Market Journal RSS feed', error.message);
          reject(error);
        });
    });
  }

function fetchAndParseCoinzene(): Promise<void> {
    const url = websites.COINZENE;
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
            const imageInfo = result.rss.channel[0].image[0];
            const imageUrl = imageInfo.url[0];
            items.forEach((item: any, index: number) => {
              const rssItem: RSSItem = {
                link:item.link[0],
                title: item.title[0],
                description: item.description[0]
              };
  
              const $ = cheerio.load(rssItem.description);
            //   const imageUrl = $('img').attr('src');
              const descriptionText = $('body').text().trim();
              const pubDate = item.pubDate ? item.pubDate[0] : '';
              const author = item['dc:creator'][0];
            //   const imageUrl = item['media:content'] ? item['media:content'][0].$.url : 'Unknown';

  
              console.log(`Bitcoin Market Journal - Item ${index + 1}:`);
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
          console.error('Error fetching Bitcoin Market Journal RSS feed', error.message);
          reject(error);
        });
    });
  }

function fetchAndParseCryptogeni(): Promise<void> {
    const url = websites.CRYPTOGENI;
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
                        const rssItem: RSSItem = {
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
                        const imageUrl = $content('div.image-box-header img').attr('src');

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

function fetchAndParseBitcoinNews(): Promise<void> {
  const url = websites.BITCOIN_NEWS;
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
                      const descriptionText = $('body').text().trim(); // Extracting text from the description HTML body
                      const pubDate = item.pubDate ? item.pubDate[0] : '';
                      const author = item['dc:creator'] ? item['dc:creator'][0] : 'Unknown';
                      const imageUrl: string | undefined = $('img').attr('src');

                      console.log(`Bitcoin News - Item ${index + 1}:`);
                      console.log(`Title: ${rssItem.title}`);
                      console.log(`Author: ${author}`);
                      console.log(`Description: ${descriptionText}`);
                      console.log(`Publish Date: ${pubDate}`);
                      console.log(`Website: ${rssItem.link}`);
                      console.log(`Image URL: ${imageUrl}`);
                      console.log('------------------------------------------');
                  });

                  resolve();
              });
          })
          .catch(error => {
              console.error('Error fetching Bitcoin News RSS feed', error.message);
              reject(error);
          });
  });
}


function fetchAndParseBitcoinik(): Promise<void> {
    const url = websites.BITCOINIK;
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
            const imageInfo = result.rss.channel[0].image[0];
            const imageUrl = imageInfo.url[0];
            items.forEach((item: any, index: number) => {
              const rssItem: RSSItem = {
                link:item.link[0],
                title: item.title[0],
                description: item.description[0]
              };
  
              const $ = cheerio.load(rssItem.description);
              const imageUrl = $('img').attr('src');
              const descriptionText = $('body').text().trim();
              const pubDate = item.pubDate ? item.pubDate[0] : '';
              const author = item['dc:creator'][0];
            //   const imageUrl = item['media:content'] ? item['media:content'][0].$.url : 'Unknown';

  
              console.log(`Bitcoinik - Item ${index + 1}:`);
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
          console.error('Error fetching Bitcoink RSS feed', error.message);
          reject(error);
        });
    });
  }


function fetchAndParseNewsBitcoin(): Promise<void> {
    const url = websites.BITCOINNEWS;
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
                        const imageUrl = $('img').attr('src')


                        console.log(`Bitcoin Market Journal - Item ${index + 1}:`);
                        console.log(`Title: ${rssItem.title}`);
                        console.log(`Author: ${author}`);
                        console.log(`Description: ${descriptionText}`);
                        console.log(`Publish Date: ${pubDate}`);
                        console.log(`Website: ${rssItem.link}`);
                        console.log(`Image URL: ${imageUrl}`);
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

function fetchAndParseSwapsBlog(): Promise<void> {
  const url = websites.ALLINCRYPTO;
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
                      const imageUrl = $('img').attr('src')


                      console.log(`Bitcoin Market Journal - Item ${index + 1}:`);
                      console.log(`Title: ${rssItem.title}`);
                      console.log(`Author: ${author}`);
                      console.log(`Description: ${descriptionText}`);
                      console.log(`Publish Date: ${pubDate}`);
                      console.log(`Website: ${rssItem.link}`);
                      console.log(`Image URL: ${imageUrl}`);
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

function fetchAndParseCoinMonks(): Promise<void> {
  const url = websites.MEDIUM_COINMONKS; // Use the new website's RSS feed URL here
  return new Promise((resolve, reject) => {
      axios.get(url)
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
                      const imageUrl = $('img').attr('src') || 'No image URL available';
                      const pubDate = item.pubDate ? item.pubDate[0] : 'Unknown publish date';
                      const author = item['dc:creator'] ? item['dc:creator'][0] : 'Unknown author';

                      // Display the extracted information
                      console.log(`New Website - Item ${index + 1}:`);
                      console.log(`Title: ${rssItem.title}`);
                      console.log(`Author: ${author}`);
                      console.log(`Description: ${descriptionText}`);
                      console.log(`Publish Date: ${pubDate}`);
                      console.log(`Website: ${rssItem.link}`);
                      console.log(`Image URL: ${imageUrl}`);
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

function fetchAndParseNewsbtc(): Promise<void> {
  const url = websites.NEWSBTC; // Use the new website's RSS feed URL here
  return new Promise((resolve, reject) => {
      axios.get(url)
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
                      const imageUrl = $('img').attr('src') || 'No image URL available';
                      const pubDate = item.pubDate ? item.pubDate[0] : 'Unknown publish date';
                      const author = item['dc:creator'] ? item['dc:creator'][0] : 'Unknown author';

                      // Display the extracted information
                      console.log(`New Website - Item ${index + 1}:`);
                      console.log(`Title: ${rssItem.title}`);
                      console.log(`Author: ${author}`);
                      console.log(`Description: ${descriptionText}`);
                      console.log(`Publish Date: ${pubDate}`);
                      console.log(`Website: ${rssItem.link}`);
                      console.log(`Image URL: ${imageUrl}`);
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

function fetchAndParseCoinSpeaker(): Promise<void> {
  const url = websites.COINSPEAKER_NEWS; // Use the new website's RSS feed URL here
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
                      const imageUrl = $('img').attr('src') || 'No image URL available';
                      const pubDate = item.pubDate ? item.pubDate[0] : 'Unknown publish date';
                      const author = item['dc:creator'] ? item['dc:creator'][0] : 'Unknown author';

                      // Display the extracted information
                      console.log(`New Website - Item ${index + 1}:`);
                      console.log(`Title: ${rssItem.title}`);
                      console.log(`Author: ${author}`);
                      console.log(`Description: ${descriptionText}`);
                      console.log(`Publish Date: ${pubDate}`);
                      console.log(`Website: ${rssItem.link}`);
                      console.log(`Image URL: ${imageUrl}`);
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
                      const mediaContent = item['media:content'][0];
                      const imageUrl = mediaContent.$.url     
                      // const imageUrl = $('img').attr('src') || 'No image URL available';
                      const pubDate = item.pubDate ? item.pubDate[0] : 'Unknown publish date';
                      const author = item['dc:creator'] ? item['dc:creator'][0] : 'Unknown author';

                      // Display the extracted information
                      console.log(`New Website - Item ${index + 1}:`);
                      console.log(`Title: ${rssItem.title}`);
                      console.log(`Author: ${author}`);
                      console.log(`Description: ${descriptionText}`);
                      console.log(`Publish Date: ${pubDate}`);
                      console.log(`Website: ${rssItem.link}`);
                      console.log(`Image URL: ${imageUrl}`);
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


function fetchAndParseFunexBlog(): Promise<void> {
  const url = websites.FUNEXCLUB_BLOG;
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
                      const rssItem: RSSItem = {
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

function fetchAndParseCoinCheckup(): Promise<void> {
  const url = websites.COINCHECKUP; // Use the new website's RSS feed URL here
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
                      const imageUrl = $('img').attr('src') || 'No image URL available';
                      const pubDate = item.pubDate ? item.pubDate[0] : 'Unknown publish date';
                      const author = item['dc:creator'] ? item['dc:creator'][0] : 'Unknown author';

                      // Display the extracted information
                      console.log(`New Website - Item ${index + 1}:`);
                      console.log(`Title: ${rssItem.title}`);
                      console.log(`Author: ${author}`);
                      console.log(`Description: ${descriptionText}`);
                      console.log(`Publish Date: ${pubDate}`);
                      console.log(`Website: ${rssItem.link}`);
                      console.log(`Image URL: ${imageUrl}`);
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

function fetchAndParseBitcoinIst(): Promise<void> {
  const url = websites.BITCOINIST; // Use the new website's RSS feed URL here
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
                      

                      const mediaContent = item['media:content'] || [];
                      const imageUrl = mediaContent.find((content: any) => content.$.medium === 'image')?.$?.url || 'No image URL available';

                      const pubDate = item.pubDate ? item.pubDate[0] : 'Unknown publish date';
                      const author = item['dc:creator'] ? item['dc:creator'][0] : 'Unknown author';

                      // Display the extracted information
                      console.log(`New Website - Item ${index + 1}:`);
                      console.log(`Title: ${rssItem.title}`);
                      console.log(`Author: ${author}`);
                      console.log(`Description: ${descriptionText}`);
                      console.log(`Publish Date: ${pubDate}`);
                      console.log(`Website: ${rssItem.link}`);
                      console.log(`Image URL: ${imageUrl}`);
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

function fetchAndParseAllInCrypto(): Promise<void> {
  const url = websites.ALLINCRYPTO; // Use the new website's RSS feed URL here
  return new Promise((resolve, reject) => {
      axios.get(url)
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
                      const imageUrl = $('img').attr('src') || 'No image URL available';
                      const pubDate = item.pubDate ? item.pubDate[0] : 'Unknown publish date';
                      const author = item['dc:creator'] ? item['dc:creator'][0] : 'Unknown author';

                      // Display the extracted information
                      console.log(`New Website - Item ${index + 1}:`);
                      console.log(`Title: ${rssItem.title}`);
                      console.log(`Author: ${author}`);
                      console.log(`Description: ${descriptionText}`);
                      console.log(`Publish Date: ${pubDate}`);
                      console.log(`Website: ${rssItem.link}`);
                      console.log(`Image URL: ${imageUrl}`);
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

function fetchAndParseBitcoinMagazine(): Promise<void> {
  const url = websites.BITCOINMAGAZINE; // URL of the RSS feed

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
              const enclosure = $(element).find('enclosure');
              const imageUrl = enclosure.attr('url') || 'No image URL available';
              const pubDate = $(element).find('pubDate').text() || 'Unknown publish date';
              const author = $(element).find('dc\\:creator').text() || 'Unknown author';

              // Display the extracted information
              console.log(`Bitcoin Magazine - Item ${index + 1}:`);
              console.log(`Title: ${rssItem.title}`);
              console.log(`Author: ${author}`);
              console.log(`Description: ${rssItem.description}`);
              console.log(`Publish Date: ${pubDate}`);
              console.log(`Website: ${rssItem.link}`);
              console.log(`Image URL: ${imageUrl}`);
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
                      const imageUrl = $('img').attr('src')


                      console.log(`Bitcoin Market Journal - Item ${index + 1}:`);
                      console.log(`Title: ${rssItem.title}`);
                      console.log(`Author: ${author}`);
                      console.log(`Description: ${descriptionText}`);
                      console.log(`Publish Date: ${pubDate}`);
                      console.log(`Website: ${rssItem.link}`);
                      console.log(`Image URL: ${imageUrl}`);
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

// fetchAndParseNewsbtc()  /no image
// fetchAndParseCoinzene() // no image
// fetchAndParseCoinbackyard()//no image
// fetchAndParseBitPinas() //no image
fetchAndParseCoinLabz() //no image
// fetchAndParseCoinMonks()
// fetchAndParseAllInCrypto()s
// fetchAndParseCoinCheckup()//no image

// fetchAndParseBitcoinChaser()



//Working Perfectly - below

// fetchAndParseNewsBtc()
// fetchAndParseBitcoinik()
// fetchAndParseCryptogeni()
// fetchAndParseNewsBitcoin()
// fetchAndParseBitcoinNews()
// fetchAndParseBitcoinMarkethJournal()
// fetchAndParseTrustNodes()
// fetchAndParseBitcoinMagazine()
// fetchAndParseBitcoinIst()
// fetchAndParseFunexBlog() //few items do not have images