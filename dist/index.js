"use strict";
//}
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
// Import the axios library to make HTTP requests.
// Import the parseString function from the xml2js library to parse XML data.
const axios_1 = require("axios");
const xml2js_1 = require("xml2js");
// Define the readRssStream function that takes a URL as input and returns a Promise with an array of items.
const readRssStream = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use axios to make a GET request to the provided URL and await the response.
        const response = yield axios_1.default.get(url);
        // Get the XML data from the response.
        const xmlData = response.data;
        // Return a new Promise to parse the XML data.
        return new Promise((resolve, reject) => {
            // Use the parseString function from xml2js to convert the XML data to a JavaScript object.
            // The result is provided as a callback function with the parsed object or an error.
            (0, xml2js_1.parseString)(xmlData, (err, result) => {
                if (err) {
                    // If there is an error parsing the XML, reject the Promise with the error.
                    reject(err);
                }
                else {
                    // If parsing is successful, extract the 'item' elements from the RSS feed.
                    const items = result.rss.channel[0].item;
                    // Resolve the Promise with the array of 'item' elements.
                    resolve(items);
                }
            });
        });
    }
    catch (error) {
        // If there's an error with the HTTP request or other issues, log the error and return an empty array.
        console.error('Error reading RSS stream:', error.message);
        return [];
    }
});
// Example usage:
// Define the URL of the RSS feed to read.
const rssUrl = 'https://feeds.feedburner.com/ndtvnews-top-stories';
// Call the readRssStream function with the RSS feed URL.
// Use .then() to handle the resolved Promise and .catch() to handle any errors.
// readRssStream(rssUrl)
//   .then((items) => {
//     // Log the array of items from the RSS feed to the console.
//     console.log(items);
//   })
//   .catch((error) => {
//     // If there's an error, log the error message to the console.
//     console.error('Error:', error.message);
//   });
// Call the readRssStream function with the RSS feed URL.
// Use the .then() method to handle the resolved Promise and .catch() to handle any errors.
readRssStream(rssUrl)
    .then((items) => {
    if (items.length > 0) { // Check if there are items in the 'items' array.
        // Use the .map() function to create a new array 'filteredItems' by processing each 'item' from the 'items' array.
        const filteredItems = items.map((item) => {
            return {
                title: item.title[0],
                link: item.link[0],
                description: item.description[0], // Extract the description property from the 'item' and store it in the 'description' property of the new object.
            };
        });
        // Now the `filteredItems` array contains the filtered data from the RSS feed.
        console.log('Filtered RSS feed items:', filteredItems);
    }
    else {
        // If no items were found in the RSS feed, log a message.
        console.log('No items found in the RSS feed.');
    }
})
    .catch((error) => {
    console.error('Error:', error.message); // Log the error message to the console.
});
