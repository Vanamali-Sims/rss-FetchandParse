import cheerio from 'cheerio';

// // Function to extract image URL from the RSS feed item
// const extractImageUrl = (xmlContent: string): string | null => {
//     // Load the XML content into cheerio
//     const $ = cheerio.load(xmlContent, { xmlMode: true });

//     // Locate the content:encoded section within the item
//     const contentEncoded = $('item > content\\:encoded').html();

//     if (contentEncoded) {
//         // Parse the HTML content from the content:encoded section
//         const content = cheerio.load(contentEncoded);

//         // Find the figure tag and the img tag within it
//         const imgElement = content('figure img');

//         // Get the src attribute of the img tag
//         const imageUrl = imgElement.attr('src');

//         // Return the image URL or null if not found
//         return imageUrl || null;
//     }

//     // Return null if the content:encoded section is not found
//     return null;
// };

// // Sample XML content (RSS feed)
// const xmlContent = `
// <?xml version="1.0" encoding="UTF-8"?>
// <rss version="2.0"
//     xmlns:content="http://purl.org/rss/1.0/modules/content/"
//     xmlns:wfw="http://wellformedweb.org/CommentAPI/"
//     xmlns:dc="http://purl.org/dc/elements/1.1/"
//     xmlns:atom="http://www.w3.org/2005/Atom"
//     xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
//     xmlns:slash="http://purl.org/rss/1.0/modules/slash/">

// <channel>
//     <title>BitcoinChaser</title>
//     <atom:link href="https://bitcoinchaser.com/feed/" rel="self" type="application/rss+xml" />
//     <link>https://bitcoinchaser.com</link>
//     <description>Chasing the Bitcoin Dream!</description>
//     <lastBuildDate>Wed, 24 Apr 2024 08:07:26 +0000</lastBuildDate>
//     <language>en-US</language>
//     <sy:updatePeriod>hourly</sy:updatePeriod>
//     <sy:updateFrequency>1</sy:updateFrequency>
//     <generator>https://wordpress.org/?v=6.5.2</generator>

//     <item>
//         <title>Win Big with Bitsler’s Jackpot 30% Rakeback</title>
//         <link>https://bitcoinchaser.com/bitslers-jackpot-30-rakeback/</link>
//         <comments>https://bitcoinchaser.com/bitslers-jackpot-30-rakeback/#respond</comments>
//         <dc:creator><![CDATA[Bitcoin Chaser]]></dc:creator>
//         <pubDate>Wed, 24 Apr 2024 08:00:39 +0000</pubDate>
//         <category><![CDATA[Bonus Events]]></category>
//         <guid isPermaLink="false">https://bitcoinchaser.com/?p=89727</guid>
//         <description><![CDATA[<p>Join Bitsler's Jackpot that gives you the opportunity to win big and at the same time claim a 30% rakeback.</p>
//         <p>The post <a href="https://bitcoinchaser.com/bitslers-jackpot-30-rakeback/">Win Big with Bitsler’s Jackpot 30% Rakeback</a> appeared first on <a href="https://bitcoinchaser.com">BitcoinChaser</a>.</p>]]></description>
//         <content:encoded><![CDATA[
//             <p>Bitsler, a leading online crypto-gambling site, is running a special promotion until the end of April by offering a 30% rakeback bonus to anyone who opts into a Jackpot on any of Bitsler's original games.</p>
//             <figure class="wp-block-image size-full">
//                 <img data-dominant-color="45506d" data-has-transparency="false" style="--dominant-color: #45506d;" fetchpriority="high" decoding="async" width="800" height="288" src="https://bitcoinchaser.com/wp-content/uploads/2024/04/bitsler-games__800-jpg.webp" alt="Bitsler games" />
//                 <figcaption class="wp-element-caption">A selection of Bitsler's original games you can claim the rakeback bonus on.</figcaption>
//             </figure>
//             <!-- More HTML content can be here -->
//         ]]></content:encoded>
//         <wfw:commentRss>https://bitcoinchaser.com/bitslers-jackpot-30-rakeback/feed/</wfw:commentRss>
//         <slash:comments>0</slash:comments>
//     </item>
// </channel>
// </rss>
// `;

// const imageUrl = extractImageUrl(xmlContent);
// console.log('Extracted image URL:', imageUrl);


// Sample HTML snippet
const htmlSnippet = `
<figure class="wp-block-image size-full">
    <img data-dominant-color="45506d" data-has-transparency="false" style="--dominant-color: #45506d;" fetchpriority="high" decoding="async" width="800" height="288" src="https://bitcoinchaser.com/wp-content/uploads/2024/04/bitsler-games__800-jpg.webp" alt="Bistler games that you can win the rakeback on" class="not-transparent wp-image-89754" srcset="https://bitcoinchaser.com/wp-content/uploads/2024/04/bitsler-games__800-jpg.webp 800w, https://bitcoinchaser.com/wp-content/uploads/2024/04/bitsler-games__800-300x108.webp 300w, https://bitcoinchaser.com/wp-content/uploads/2024/04/bitsler-games__800-768x276.webp 768w" sizes="(max-width: 800px) 100vw, 800px" />
    <figcaption class="wp-element-caption">A selection of Bitslers original games you can claim the rakeback bonus on.</figcaption>
</figure>
`;

// Parse the HTML snippet
const $ = cheerio.load(htmlSnippet);

// Use CSS selector to find the img element inside the figure element with the given class
const imgElement = $('figure.wp-block-image.size-full img');

// Extract the src attribute (URL)
const imgUrl = imgElement.attr('src');

// Log the extracted URL
console.log('Extracted Image URL:', imgUrl);
