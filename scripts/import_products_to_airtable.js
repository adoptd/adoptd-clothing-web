const Airtable = require('airtable');

const apiKey = 'patT3Mnj5qmSwnGWQ.32d265fdbb3a6a90e92da4f13c55051d54bec10373f254f3bd9ebb9047c8cc5c';
const baseId = 'app4owLCwssn7Wi3M';
const base = new Airtable({ apiKey }).base(baseId);

const BASE_URL = 'https://adoptd-clothing-web.vercel.app';

const allProducts = [
  // --- TOTE BAGS ---
  {
    name: "He Makes All Things New Tote Bag",
    slug: "he-makes-all-things-new-tote-bag",
    category: "christian_bags",
    price: 12.00,
    sizes: ["One Size"],
    colors: [{ name: "Natural Canvas", images: ["/images/products/he-makes-all-things-new-tote.webp"] }],
    description: "100% natural heavy organic canvas bag featuring the declaration 'He Makes All Things New'. Long shoulder straps and reinforced cross-stitching.",
    scriptureReference: "Revelation 21:5 — 'Behold, I am making all things new.'",
    featuredImage: "/images/products/he-makes-all-things-new-tote.webp",
  },
  {
    name: "The True Vine Tote Bag",
    slug: "the-true-vine-tote-bag",
    category: "christian_bags",
    price: 12.00,
    sizes: ["One Size"],
    colors: [{ name: "Natural Canvas", images: ["/images/products/the-true-vine-tote.webp"] }],
    description: "Botanical branch illustration and scripture typography reminding us of remaining rooted and connected in Jesus Christ.",
    scriptureReference: "John 15:5 — 'I am the vine; you are the branches.'",
    featuredImage: "/images/products/the-true-vine-tote.webp",
  },
  {
    name: "More of Him Less of Me Tote Bag",
    slug: "more-of-him-less-of-me-tote-bag",
    category: "christian_bags",
    price: 12.00,
    sizes: ["One Size"],
    colors: [{ name: "Natural Canvas", images: ["/images/products/more-of-him-tote.webp"] }],
    description: "Spacious, durable 300gsm canvas tote carrying John the Baptist's humble discipleship prayer.",
    scriptureReference: "John 3:30 — 'He must increase, but I must decrease.'",
    featuredImage: "/images/products/more-of-him-tote.webp",
  },
  {
    name: "Amazing Grace Tote Bag",
    slug: "amazing-grace-tote-bag",
    category: "christian_bags",
    price: 12.00,
    sizes: ["One Size"],
    colors: [{ name: "Natural Canvas", images: ["/images/products/amazing-grace-tote.webp"] }],
    description: "Classic heavyweight Christian tote bag bearing the eternal anthem of grace. Comfortable long handles for everyday shoulder carry.",
    scriptureReference: "Ephesians 2:8 — 'For by grace you have been saved through faith.'",
    featuredImage: "/images/products/amazing-grace-tote.webp",
  },

  // --- HOODIES ---
  {
    name: "Amazing Grace Christian Hoodie",
    slug: "amazing-grace-christian-hoodie",
    category: "hoodies",
    price: 32.00,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Natural Canvas", images: ["/images/products/amazing-grace-hoodie.webp"] }],
    description: "Our iconic Amazing Grace hoodie reminding you of God's unearned, undeserved favor. Ethically crafted heavyweight fleece.",
    scriptureReference: "Ephesians 2:8-9 — 'For by grace you have been saved through faith.'",
    featuredImage: "/images/products/amazing-grace-hoodie.webp",
  },
  {
    name: "Faith Over Fear Christian Hoodie",
    slug: "faith-over-fear-christian-hoodie",
    category: "hoodies",
    price: 32.00,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", images: ["/images/shop-hoodies-bg.webp"] }],
    description: "Our signature Faith Over Fear Christian hoodie is crafted from premium heavyweight organic cotton blend fabric. Designed for warmth, comfort, and bold testimony.",
    scriptureReference: "Psalm 118:6 — 'The Lord is on my side; I will not fear.'",
    featuredImage: "/images/shop-hoodies-bg.webp",
  },
  {
    name: "He Left the 99 Christian Hoodie",
    slug: "he-left-the-99-christian-hoodie",
    category: "hoodies",
    price: 32.00,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", images: ["/images/shop-hoodies-bg.webp"] }],
    description: "A powerful reminder of the relentless love of the Good Shepherd who leaves the ninety-nine to pursue the one lost sheep.",
    scriptureReference: "Luke 15:4",
    featuredImage: "/images/shop-hoodies-bg.webp",
  },
  {
    name: "Need Prayer Christian Hoodie",
    slug: "need-prayer-christian-hoodie",
    category: "hoodies",
    price: 32.00,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", images: ["/images/shop-hoodies-bg.webp"] }],
    description: "A walking invitation for ministry and fellowship. Wearing this hoodie lets people around you know you are open and ready to pray.",
    scriptureReference: "James 5:16",
    featuredImage: "/images/shop-hoodies-bg.webp",
  },
  {
    name: "Pray Christian Hoodie",
    slug: "pray-christian-hoodie",
    category: "hoodies",
    price: 32.00,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", images: ["/images/shop-hoodies-bg.webp"] }],
    description: "Minimalist typography with a timeless message: Pray without ceasing. Soft brushed interior for all-day comfort and warmth.",
    scriptureReference: "1 Thessalonians 5:17",
    featuredImage: "/images/shop-hoodies-bg.webp",
  },

  // --- T-SHIRTS ---
  {
    name: "Faith Over Fear Christian T-Shirt",
    slug: "faith-over-fear-christian-t-shirt",
    category: "t-shirts",
    price: 19.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", images: ["/images/shop-tshirts-bg.webp"] }],
    description: "Breathable 100% combed ringspun cotton tee with bold typography declaring Faith Over Fear.",
    scriptureReference: "Psalm 118:6",
    featuredImage: "/images/shop-tshirts-bg.webp",
  },
  {
    name: "Pray Christian T-Shirt",
    slug: "pray-christian-t-shirt",
    category: "t-shirts",
    price: 19.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", images: ["/images/shop-tshirts-bg.webp"] }],
    description: "Clean graphic faith tee designed to encourage disciples to deepen their personal prayer life daily.",
    scriptureReference: "1 Thessalonians 5:17",
    featuredImage: "/images/shop-tshirts-bg.webp",
  },
  {
    name: "Need Prayer Christian T-Shirt",
    slug: "need-prayer-christian-t-shirt",
    category: "t-shirts",
    price: 19.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", images: ["/images/shop-tshirts-bg.webp"] }],
    description: "Gentle outreach t-shirt inviting those in distress or needing hope to ask for prayer.",
    scriptureReference: "Philippians 4:6",
    featuredImage: "/images/shop-tshirts-bg.webp",
  },
  {
    name: "The Lord Is My Light Christian T-Shirt",
    slug: "the-lord-is-my-light-christian-t-shirt",
    category: "t-shirts",
    price: 19.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", images: ["/images/shop-tshirts-bg.webp"] }],
    description: "Minimalist sun and scripture emblem illustrating Psalm 27:1.",
    scriptureReference: "Psalm 27:1",
    featuredImage: "/images/shop-tshirts-bg.webp",
  },
  {
    name: "He Left the 99 Christian T-Shirt",
    slug: "he-left-the-99-christian-t-shirt",
    category: "t-shirts",
    price: 19.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", images: ["/images/shop-tshirts-bg.webp"] }],
    description: "A wearable testimony to Jesus Christ who leaves the ninety-nine to rescue the one wandering sheep.",
    scriptureReference: "Matthew 18:12",
    featuredImage: "/images/shop-tshirts-bg.webp",
  },
  {
    name: "Faith Can Move Mountains Christian T-Shirt",
    slug: "faith-can-move-mountains-christian-t-shirt",
    category: "t-shirts",
    price: 19.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", images: ["/images/shop-tshirts-bg.webp"] }],
    description: "Hand-drawn mountain line art and bold faith declaration reminding you that even mustard-seed faith moves mountains.",
    scriptureReference: "Matthew 17:20",
    featuredImage: "/images/shop-tshirts-bg.webp",
  },
  {
    name: "Jesus Christian T-Shirt",
    slug: "jesus-christian-t-shirt",
    category: "t-shirts",
    price: 19.99,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", images: ["/images/shop-tshirts-bg.webp"] }],
    description: "The name above all names. Clean, bold typography proclaiming Jesus as the centre of all we are and do.",
    scriptureReference: "Philippians 2:9",
    featuredImage: "/images/shop-tshirts-bg.webp",
  }
];

function getFullImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

async function runImport() {
  console.log('🚀 Starting import of all live products to Airtable...');

  try {
    // 1. Fetch existing rows to avoid duplicate names
    const existing = await base('Products').select().all();
    const existingNames = new Set(existing.map(r => r.fields['Product Name']).filter(Boolean));
    console.log(`Found ${existing.length} existing rows in Products table.`);

    // 2. Filter out products that already exist
    const productsToInsert = allProducts.filter(p => !existingNames.has(p.name));
    console.log(`📦 Inserting ${productsToInsert.length} new products...`);

    const validColours = ['Black', 'White', 'Natural Canvas', 'Grey', 'Forest', 'Green', 'Burgundy', 'Navy'];
    const validSizes = ['S', 'M', 'L', 'XL', 'One Size'];

    const recordsToCreate = productsToInsert.map(p => {
      const mainImageUrl = getFullImageUrl(p.featuredImage);
      const availableColours = p.colors.map(c => c.name).filter(c => validColours.includes(c));
      const sizes = p.sizes.filter(s => validSizes.includes(s));

      const fields = {
        'Product Name': p.name,
        'Slug': p.slug,
        'Category': p.category,
        'Price (£)': p.price,
        'In Stock': true,
        'Sizes': sizes.length > 0 ? sizes : ['One Size'],
        'Available Colours': availableColours.length > 0 ? availableColours : ['Black'],
        'Main Featured Image': mainImageUrl ? [{ url: mainImageUrl }] : [],
        'Description': p.description || '',
        'Scripture Reference': p.scriptureReference || '',
        'Published': true,
      };

      return { fields };
    });

    // Insert in batches of 10
    for (let i = 0; i < recordsToCreate.length; i += 10) {
      const batch = recordsToCreate.slice(i, i + 10);
      const res = await base('Products').create(batch);
      console.log(`✅ Inserted batch ${Math.floor(i / 10) + 1} (${res.length} items)`);
    }

    console.log('🎉 All 16 live products are now in your Airtable Products table!');
  } catch (err) {
    console.error('❌ Error during import:', err);
  }
}

runImport();
