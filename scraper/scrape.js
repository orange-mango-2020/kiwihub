/**
 * KiwiHub Product Scraper v2
 * Run: node scrape.js
 * Output: products_raw.json (in same folder)
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://computerworldkuilsriver.co.za';

// Rotate user agents to avoid blocks
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
];

const delay = ms => new Promise(res => setTimeout(res, ms));
const randomDelay = () => delay(800 + Math.random() * 1200);
const randomAgent = () => USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

function makeHeaders(referer = BASE_URL) {
  return {
    'User-Agent': randomAgent(),
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-ZA,en-GB;q=0.9,en;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': referer,
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Cache-Control': 'max-age=0',
  };
}

async function fetchPage(url, referer) {
  try {
    const res = await axios.get(url, {
      headers: makeHeaders(referer || url),
      timeout: 20000,
      maxRedirects: 5,
    });
    return res.data;
  } catch (err) {
    const status = err.response ? err.response.status : 'no-response';
    console.error(`  ✗ [${status}] ${url}`);
    return null;
  }
}

// Fix relative URLs
function toAbsolute(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return BASE_URL + (url.startsWith('/') ? url : '/' + url);
}

// Scrape a shop/category listing page — extract all product data available
async function scrapeListing(url, referer) {
  const html = await fetchPage(url, referer);
  if (!html) return { products: [], nextPage: null };

  const $ = cheerio.load(html);
  const products = [];

  $('li.product, article.product, .product-grid-item').each((_, el) => {
    const $el = $(el);

    const name = $el.find([
      '.woocommerce-loop-product__title',
      'h2.woocommerce-loop-product__title',
      '.product-title',
      'h2',
      'h3',
    ].join(', ')).first().text().trim();

    // Get all price amounts — first is sale, del is original
    const salePrice = $el.find('.price ins .woocommerce-Price-amount bdi, .price .woocommerce-Price-amount bdi').first().text().trim();
    const originalPrice = $el.find('.price del .woocommerce-Price-amount bdi').first().text().trim();

    const link = toAbsolute(
      $el.find('a.woocommerce-LoopProduct-link').attr('href') ||
      $el.find('a').first().attr('href')
    );

    // Try multiple image sources
    const imgEl = $el.find('img').first();
    const image =
      imgEl.attr('data-large_image') ||
      imgEl.attr('data-src') ||
      imgEl.attr('src') ||
      '';

    const badge = $el.find('.onsale').text().trim() || '';

    const category = $el.find('.woocommerce-loop-category__title').text().trim() || '';

    if (name && link) {
      products.push({ name, salePrice, originalPrice, link, image, badge, category });
    }
  });

  // Fix next page URL
  let nextPage = $('a.next.page-numbers').attr('href') ||
    $('.pagination a[rel="next"]').attr('href') || null;
  if (nextPage) nextPage = toAbsolute(nextPage);

  return { products, nextPage };
}

// Scrape individual product page for description + specs
async function scrapeProductPage(url) {
  await randomDelay();
  const html = await fetchPage(url, BASE_URL + '/shop/');
  if (!html) return {};

  const $ = cheerio.load(html);

  const description = [
    '.woocommerce-product-details__short-description',
    '.product-short-description',
    '.entry-summary .short-description',
  ].reduce((acc, sel) => acc || $(sel).text().trim(), '');

  const longDesc = $('#tab-description').text().trim().slice(0, 500);

  const sku = $('.sku').text().replace('SKU:', '').trim();

  const specs = [];
  $('.woocommerce-product-attributes tr').each((_, row) => {
    const label = $(row).find('th').text().trim();
    const value = $(row).find('td').text().trim().replace(/\s+/g, ' ');
    if (label && value) specs.push({ label, value });
  });

  // Better image extraction
  const images = [];
  $('.woocommerce-product-gallery__image img, .woocommerce-product-gallery img').each((_, img) => {
    const src = $(img).attr('data-large_image') || $(img).attr('src');
    if (src && !src.includes('placeholder') && !images.includes(src)) images.push(src);
  });

  return { description: description || longDesc, sku, specs, images };
}

// Known category pages to scrape
const CATEGORY_PAGES = [
  '/shop/',
  '/product-category/laptops/',
  '/product-category/desktop-computers/',
  '/product-category/keyboards/',
  '/gaming-pcs/',
  '/micro-desktops/',
  '/upgrade-kit/',
  '/desktop-computers/',
];

async function main() {
  console.log('🥝 KiwiHub Product Scraper v2');
  console.log('==============================');

  const seen = new Set();
  const listings = []; // products from listing pages

  // Step 1: Collect all product listings
  console.log('\n🕷️  Collecting product listings...');

  for (const catPath of CATEGORY_PAGES) {
    let pageUrl = toAbsolute(catPath);
    let pageNum = 1;

    while (pageUrl) {
      console.log(`  [page ${pageNum}] ${pageUrl}`);
      const { products, nextPage } = await scrapeListing(pageUrl, BASE_URL + catPath);
      let newCount = 0;

      for (const p of products) {
        if (p.link && !seen.has(p.link)) {
          seen.add(p.link);
          listings.push(p);
          newCount++;
        }
      }

      console.log(`    → ${newCount} new products (${listings.length} total)`);
      pageUrl = nextPage;
      pageNum++;
      await delay(600);
    }
  }

  console.log(`\n📦 Found ${listings.length} unique products`);

  // Step 2: Try to get details for each product
  console.log('\n🔍 Fetching product details (description, specs, images)...');
  const allProducts = [];

  for (let i = 0; i < listings.length; i++) {
    const p = listings[i];
    process.stdout.write(`  [${i + 1}/${listings.length}] ${p.name.slice(0, 50)}... `);

    const detail = await scrapeProductPage(p.link);

    const price = parseFloat((p.salePrice || '').replace(/[^0-9.]/g, '')) || 0;
    const origPrice = parseFloat((p.originalPrice || '').replace(/[^0-9.]/g, '')) || null;

    allProducts.push({
      name: p.name,
      price,
      originalPrice: origPrice && origPrice !== price ? origPrice : null,
      description: detail.description || '',
      sku: detail.sku || '',
      categories: p.category || '',
      image: detail.images?.[0] || p.image || '',
      images: detail.images?.length ? detail.images : (p.image ? [p.image] : []),
      specs: detail.specs || [],
      sourceUrl: p.link,
      inStock: true,
    });

    console.log(detail.description ? '✓ +desc' : '✓');
  }

  // Save output next to scrape.js
  const outFile = path.join(__dirname, 'products_raw.json');
  fs.writeFileSync(outFile, JSON.stringify(allProducts, null, 2));

  const withDesc = allProducts.filter(p => p.description).length;
  const withImage = allProducts.filter(p => p.image).length;

  console.log('\n✅ Complete!');
  console.log(`   Products: ${allProducts.length}`);
  console.log(`   With description: ${withDesc}`);
  console.log(`   With image: ${withImage}`);
  console.log(`   Saved to: ${outFile}`);
  console.log('\nNow share products_raw.json here and tell Claude your markup %!\n');
}

main().catch(console.error);
