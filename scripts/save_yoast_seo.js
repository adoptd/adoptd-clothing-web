const fs = require('fs');

async function crawlAllYoastSEO() {
  console.log('Crawling all product and category Yoast SEO from live WordPress site...');
  const sitemapRes = await fetch('https://adoptdchristianclothing.co.uk/wp-sitemap-posts-product-1.xml');
  const sitemapXml = await sitemapRes.text();
  const urls = [...sitemapXml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);

  const seoDatabase = {
    products: {},
    categories: {
      'christian-bags': {
        title: 'Christian Tote Bags UK | Adoptd Christian Clothing',
        description: 'Shop our collection of faith-inspired Christian tote bags in the UK. Heavyweight organic canvas bags with biblical scripture reminders.',
      },
      'christian-hoodies-uk': {
        title: 'Christian Hoodies UK | Adoptd Christian Clothing',
        description: 'Discover premium heavyweight Christian hoodies designed in the UK. Faith-based apparel that starts meaningful conversations.',
      },
      'tee-shirts': {
        title: 'Christian T-Shirts UK | Faith Graphic Tees | Adoptd',
        description: 'Explore our collection of unisex Christian t-shirts featuring scripture verses and timeless faith graphics.',
      },
      'sweaters': {
        title: 'Christian Sweaters & Sweatshirts | Adoptd Clothing',
        description: "Comfortable and inspiring Christian sweaters designed to share God's word.",
      },
    },
  };

  for (const url of urls) {
    try {
      const res = await fetch(url);
      const html = await res.text();
      
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
                        html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i);
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

      rawTitle = rawTitle.replace(/&#8211;/g, '–').replace(/&#8217;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"');
      rawDesc = rawDesc.replace(/&#8211;/g, '–').replace(/&#8217;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"');

      seoDatabase.products[slug] = {
        title: rawTitle,
        description: rawDesc,
        liveUrl: url,
      };
    } catch(err) {
      console.error(err);
    }
  }

  fs.writeFileSync('src/data/yoast-seo-data.json', JSON.stringify(seoDatabase, null, 2));
  console.log('Saved complete Yoast SEO database to src/data/yoast-seo-data.json with', Object.keys(seoDatabase.products).length, 'products.');
}

crawlAllYoastSEO();
