const Airtable = require('airtable');
const yoastSeoData = require('../src/data/yoast-seo-data.json');

const apiKey = process.env.AIRTABLE_API_KEY || 'patT3Mnj5qmSwnGWQ.32d265fdbb3a6a90e92da4f13c55051d54bec10373f254f3bd9ebb9047c8cc5c';
const baseId = process.env.AIRTABLE_BASE_ID || 'app4owLCwssn7Wi3M';
const base = new Airtable({ apiKey }).base(baseId);

async function populateSeoTable() {
  console.log('🔄 1. Clearing placeholder rows from SEO table...');
  const existingRecords = await base('SEO').select().all();
  for (const r of existingRecords) {
    await base('SEO').destroy(r.id);
  }
  console.log(`Cleared ${existingRecords.length} old rows.`);

  console.log('\n📦 2. Fetching all products from Airtable Products table...');
  const productRecords = await base('Products').select().all();
  console.log(`Found ${productRecords.length} products.`);

  const seoEntries = [];

  // A. Add Category & Landing Pages first
  seoEntries.push({
    fields: {
      'Product Name': 'Homepage',
      'Slug': '/',
      'SEO Meta Title': 'ADOPTD Christian Clothing | Faith-Based Apparel UK',
      'SEO Meta Description': 'Discover premium Christian clothing in the UK. Ethical Christian hoodies, faith graphic t-shirts, and heavy canvas tote bags that spark conversations about Jesus.',
      'Focus Keyword': 'Christian clothing UK',
    },
  });

  seoEntries.push({
    fields: {
      'Product Name': 'Christian Tote Bags Category',
      'Slug': 'shop/christian-bags',
      'SEO Meta Title': 'Christian Tote Bags UK | Heavyweight Canvas Bags | ADOPTD',
      'SEO Meta Description': 'Shop our collection of faith-inspired Christian tote bags in the UK. Heavyweight 100% natural organic canvas bags with biblical scripture reminders.',
      'Focus Keyword': 'Christian tote bags UK',
    },
  });

  seoEntries.push({
    fields: {
      'Product Name': 'Christian Hoodies Category',
      'Slug': 'shop/christian-hoodies-uk',
      'SEO Meta Title': 'Christian Hoodies UK | Premium Heavyweight Faith Hoodies | ADOPTD',
      'SEO Meta Description': 'Discover premium heavyweight Christian hoodies designed in the UK. Faith-based apparel carrying bold scripture declarations and gospel truth.',
      'Focus Keyword': 'Christian hoodies UK',
    },
  });

  seoEntries.push({
    fields: {
      'Product Name': 'Christian T-Shirts Category',
      'Slug': 'shop/tee-shirts',
      'SEO Meta Title': 'Christian T-Shirts UK | Faith Graphic Tees | ADOPTD Clothing',
      'SEO Meta Description': 'Explore our collection of unisex Christian t-shirts featuring scripture verses and timeless faith graphics. 100% soft organic cotton.',
      'Focus Keyword': 'Christian t-shirts UK',
    },
  });

  seoEntries.push({
    fields: {
      'Product Name': 'Christian Sweaters Category',
      'Slug': 'shop/sweaters',
      'SEO Meta Title': 'Christian Sweaters & Sweatshirts | ADOPTD Clothing',
      'SEO Meta Description': "Cozy fleece-lined Christian crewneck sweatshirts designed for comfort, testimony, and sharing God's word.",
      'Focus Keyword': 'Christian sweaters',
    },
  });

  seoEntries.push({
    fields: {
      'Product Name': 'Church Print Services',
      'Slug': 'church-print-services',
      'SEO Meta Title': 'Church Print Services | Custom Faith Merch & Banners | ADOPTD',
      'SEO Meta Description': 'Custom clothing printing and merchandise production for UK churches, ministries, youth camps, and worship teams.',
      'Focus Keyword': 'Church print services UK',
    },
  });

  // B. Add all Products with exact Yoast data
  for (const prod of productRecords) {
    const pName = prod.fields['Product Name'] || 'Untitled Product';
    const slug = prod.fields['Slug'] || pName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const yoastMatch = yoastSeoData.products[slug] || Object.values(yoastSeoData.products).find(p => p.liveUrl?.includes(slug));

    const seoTitle = yoastMatch?.title || `${pName} | Adoptd Christian Clothing`;
    const seoDescription = yoastMatch?.description || prod.fields['Description'] || '';

    // Derive focus keyword from product name
    const focusKeyword = pName.toLowerCase().includes('hoodie') ? 'Christian hoodie' :
                         pName.toLowerCase().includes('tote') ? 'Christian tote bag' :
                         pName.toLowerCase().includes('t-shirt') ? 'Christian t-shirt' :
                         'Christian clothing';

    seoEntries.push({
      fields: {
        'Product Name': pName,
        'Slug': slug,
        'SEO Meta Title': seoTitle,
        'SEO Meta Description': seoDescription,
        'Focus Keyword': focusKeyword,
      },
    });
  }

  console.log(`\n🚀 3. Creating ${seoEntries.length} SEO records in Airtable...`);
  
  // Airtable batch insert (chunks of 10)
  for (let i = 0; i < seoEntries.length; i += 10) {
    const chunk = seoEntries.slice(i, i + 10);
    await base('SEO').create(chunk);
    console.log(`  ✓ Inserted batch ${Math.floor(i / 10) + 1} (${chunk.length} rows)`);
  }

  console.log('\n🎉 Successfully populated SEO table in Airtable!');
}

populateSeoTable().catch(console.error);
