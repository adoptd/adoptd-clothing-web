const Airtable = require('airtable');

const apiKey = process.env.AIRTABLE_API_KEY || 'patT3Mnj5qmSwnGWQ.32d265fdbb3a6a90e92da4f13c55051d54bec10373f254f3bd9ebb9047c8cc5c';
const baseId = process.env.AIRTABLE_BASE_ID || 'app4owLCwssn7Wi3M';
const base = new Airtable({ apiKey }).base(baseId);

async function crawlYoastProductData() {
  console.log('🔍 1. Crawling live WordPress sitemaps for Yoast SEO data...');
  const sitemapRes = await fetch('https://adoptdchristianclothing.co.uk/wp-sitemap-posts-product-1.xml');
  const sitemapXml = await sitemapRes.text();
  const urls = [...sitemapXml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);
  
  console.log(`Found ${urls.length} live product URLs.`);
  const seoDataBySlug = {};

  for (const url of urls) {
    try {
      const res = await fetch(url);
      const html = await res.text();
      
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const descMatch = html.match(/<meta\s+name=["\x27]description["\x27]\s+content=["\x27]([^"\x27]*)["\x27]/i) ||
                        html.match(/<meta\s+property=["\x27]og:description["\x27]\s+content=["\x27]([^"\x27]*)["\x27]/i);
      const jsonLdMatch = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
      
      let schemaDesc = '';
      if (jsonLdMatch) {
        try {
          const json = JSON.parse(jsonLdMatch[1]);
          const productNode = json['@graph']?.find(n => n['@type'] === 'Product');
          if (productNode) schemaDesc = productNode.description || '';
        } catch(e) {}
      }

      const slug = url.split('/').filter(Boolean).pop();
      let rawTitle = titleMatch ? titleMatch[1].replace(/\s*\|\s*Adoptd Christian Clothing.*$/i, '').trim() : '';
      let rawDesc = (descMatch ? descMatch[1] : '') || schemaDesc;

      // Clean HTML entities
      rawTitle = rawTitle.replace(/&#8211;/g, '–').replace(/&#8217;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"');
      rawDesc = rawDesc.replace(/&#8211;/g, '–').replace(/&#8217;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"');

      seoDataBySlug[slug] = {
        seoTitle: rawTitle,
        seoDescription: rawDesc,
        url,
      };
      console.log(`✓ Crawled Yoast SEO for [${slug}]`);
    } catch (err) {
      console.error(`Failed crawling ${url}:`, err.message);
    }
  }

  return seoDataBySlug;
}

async function updateAirtableWithSEO() {
  const yoastData = await crawlYoastProductData();
  
  console.log('\n📦 2. Fetching existing records from Airtable Products table...');
  const records = await base('Products').select().all();
  console.log(`Found ${records.length} records in Airtable.`);

  for (const record of records) {
    const slug = record.fields['Slug'] || '';
    const productName = record.fields['Product Name'] || '';
    
    // Match by slug or partial match
    let match = yoastData[slug];
    if (!match) {
      const foundKey = Object.keys(yoastData).find(k => k.includes(slug) || slug.includes(k));
      if (foundKey) match = yoastData[foundKey];
    }

    if (match && (match.seoTitle || match.seoDescription)) {
      console.log(`Updating record for: "${productName}" (${slug})`);
      console.log(`  -> SEO Title: ${match.seoTitle}`);
      console.log(`  -> SEO Desc:  ${match.seoDescription.slice(0, 70)}...`);

      const updateFields = {};
      if (match.seoTitle) updateFields['SEO Meta Title'] = match.seoTitle;
      if (match.seoDescription) updateFields['SEO Meta Description'] = match.seoDescription;

      try {
        await base('Products').update(record.id, updateFields);
        console.log(`  ✓ Updated Airtable record ${record.id}`);
      } catch (err) {
        console.error(`  ✗ Error updating record ${record.id}:`, err.message);
      }
    } else {
      console.log(`No specific Yoast match found for "${productName}" (${slug}) - keeping existing defaults.`);
    }
  }

  console.log('\n🎉 SEO Migration Complete! All Yoast titles and descriptions are synced to Airtable.');
}

updateAirtableWithSEO().catch(console.error);
