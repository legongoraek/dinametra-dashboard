import { existsSync, readFileSync } from 'node:fs';

const canonical = 'https://dinametra-dashboard.netlify.app/';
const imageUrl = `${canonical}og-image.png`;
const index = readFileSync('src/index.html', 'utf8');
const robots = readFileSync('public/robots.txt', 'utf8');
const sitemap = readFileSync('public/sitemap.xml', 'utf8');

function requireText(haystack, needle, label) {
  if (!haystack.includes(needle)) {
    throw new Error(`Missing ${label}: ${needle}`);
  }
}

requireText(index, `<link rel="canonical" href="${canonical}">`, 'canonical');
requireText(index, `<meta property="og:image" content="${imageUrl}">`, 'Open Graph image');
requireText(index, '<meta property="og:image:width" content="1200">', 'Open Graph image width');
requireText(index, '<meta property="og:image:height" content="630">', 'Open Graph image height');
requireText(index, '<meta name="twitter:card" content="summary_large_image">', 'Twitter large image card');
requireText(index, `<meta name="twitter:image" content="${imageUrl}">`, 'Twitter image');
requireText(index, '"@type": "WebSite"', 'WebSite schema');
requireText(index, '"featureList"', 'WebApplication feature list');
requireText(index, '"browserRequirements"', 'WebApplication browser requirements');
requireText(robots, `Sitemap: ${canonical}sitemap.xml`, 'robots sitemap');
requireText(sitemap, `<loc>${canonical}</loc>`, 'sitemap canonical URL');

if (!existsSync('public/llms-full.txt')) {
  throw new Error('Missing public/llms-full.txt');
}

const llmsFull = readFileSync('public/llms-full.txt', 'utf8');
requireText(llmsFull, canonical, 'llms-full canonical URL');
requireText(llmsFull, 'Angular 21', 'llms-full framework context');
requireText(llmsFull, 'CoinGecko', 'llms-full data-source context');

const imagePath = 'public/og-image.png';
if (!existsSync(imagePath)) {
  throw new Error(`Missing ${imagePath}`);
}

const png = readFileSync(imagePath);
const signature = png.subarray(0, 8).toString('hex');
if (signature !== '89504e470d0a1a0a') {
  throw new Error('public/og-image.png is not a valid PNG');
}

const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width !== 1200 || height !== 630) {
  throw new Error(`og-image.png must be 1200x630, found ${width}x${height}`);
}

console.log('SEO/GEO verification passed.');
