import { Product, BlogPost, SiteSettings } from '@/types';

export const mockSiteSettings: SiteSettings = {
  announcementBanner: "✨ Free UK Delivery on orders over £40 | Faith-Centred Christian Apparel",
  announcementActive: true,
  globalMetaTitle: "Adoptd Christian Clothing | Wear The Word. Share The Light.",
  globalMetaDescription: "ADOPTD is an independent Christian clothing brand creating apparel that carries a message of faith, hope and identity. Small brand. Big message. Jesus at the centre.",
  contactEmail: "hello@adoptdchristianclothing.co.uk",
  instagramUrl: "https://www.instagram.com/adoptdchristian",
  facebookUrl: "https://facebook.com/adoptdclothing25/",
  freeShippingThreshold: 40.00,
};

export const mockProducts: Product[] = [
  {
    id: "prod_1",
    name: "Amazing Grace Christian Hoodie",
    slug: "amazing-grace-christian-hoodie",
    category: "christian-hoodies-uk",
    categoryName: "Hoodies",
    price: 32.00,
    compareAtPrice: 38.00,
    inStock: true,
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      {
        name: "Heather Grey",
        hex: "#D3D3D3",
        images: [
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80"
        ]
      },
      {
        name: "Black",
        hex: "#111111",
        images: [
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80"
        ]
      },
      {
        name: "Sand / Natural",
        hex: "#D8C7B5",
        images: [
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80"
        ]
      }
    ],
    description: "Our signature Amazing Grace hoodie is ethically crafted from premium heavyweight organic cotton blend fabric. Designed for warmth, comfort, and bold testimony, this hoodie reminds you and everyone you meet of God's unearned, undeserved favor.",
    scriptureReference: "Ephesians 2:8-9 — 'For by grace you have been saved through faith.'",
    careInstructions: "Machine wash at 30°C inside out with like colors. Do not tumble dry. Iron inside out on low heat.",
    sizeGuideType: "unisex-hoodie",
    featuredImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_2", "prod_3", "prod_4"],
    seoTitle: "Amazing Grace Christian Hoodie | Adoptd Clothing UK",
    seoDescription: "Shop the Amazing Grace heavyweight Christian hoodie. Premium unisex faith apparel designed to spark gospel conversations."
  },
  {
    id: "prod_2",
    name: "He Makes All Things New Tote Bag",
    slug: "he-makes-all-things-new-tote-bag",
    category: "christian-bags",
    categoryName: "Tote Bags",
    price: 12.00,
    inStock: true,
    availableSizes: ["One Size"],
    colors: [
      {
        name: "Natural Canvas",
        hex: "#EAE0D5",
        images: [
          "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&auto=format&fit=crop&q=80"
        ]
      },
      {
        name: "Black",
        hex: "#111111",
        images: [
          "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80"
        ]
      }
    ],
    description: "Durable 100% natural organic cotton tote bag featuring the declaration 'He Makes All Things New'. Sturdy reinforced cross-stitched handles make it ideal for Bibles, groceries, study books, or everyday errands.",
    scriptureReference: "Revelation 21:5 — 'Behold, I am making all things new.'",
    careInstructions: "Wipe clean with a damp cloth or gentle hand wash in cold water. Air dry flat.",
    sizeGuideType: "tote-bag",
    featuredImage: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_3", "prod_4", "prod_1"],
    seoTitle: "He Makes All Things New Tote Bag | Adoptd Clothing",
    seoDescription: "Eco-friendly 100% cotton Christian tote bag carrying scripture truth for everyday errands."
  },
  {
    id: "prod_3",
    name: "The True Vine Tote Bag",
    slug: "the-true-vine-tote-bag",
    category: "christian-bags",
    categoryName: "Tote Bags",
    price: 12.00,
    inStock: true,
    availableSizes: ["One Size"],
    colors: [
      {
        name: "Natural Canvas",
        hex: "#EAE0D5",
        images: [
          "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80"
        ]
      }
    ],
    description: "A reminder of remaining rooted in Christ. Heavyweight canvas tote featuring delicate botanical illustration and scripture typography.",
    scriptureReference: "John 15:5 — 'I am the vine; you are the branches.'",
    careInstructions: "Hand wash cold. Line dry.",
    sizeGuideType: "tote-bag",
    featuredImage: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_2", "prod_4", "prod_5"],
    seoTitle: "The True Vine Tote Bag | Christian Bags UK",
    seoDescription: "Shop The True Vine tote bag. 100% heavy canvas faith accessory inspired by John 15."
  },
  {
    id: "prod_4",
    name: "More of Him Less of Me Tote Bag",
    slug: "more-of-him-less-of-me-tote-bag",
    category: "christian-bags",
    categoryName: "Tote Bags",
    price: 12.00,
    inStock: true,
    availableSizes: ["One Size"],
    colors: [
      {
        name: "Natural Canvas",
        hex: "#EAE0D5",
        images: [
          "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80"
        ]
      }
    ],
    description: "A humble prayer and bold message for everyday discipleship. Spacious, strong, and sustainably sourced.",
    scriptureReference: "John 3:30 — 'He must increase, but I must decrease.'",
    careInstructions: "Spot clean or hand wash cold.",
    sizeGuideType: "tote-bag",
    featuredImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_2", "prod_3", "prod_1"],
    seoTitle: "More of Him Less of Me Tote Bag | Adoptd Clothing",
    seoDescription: "John 3:30 inspired canvas tote bag. Simple faith statements for intentional living."
  },
  {
    id: "prod_5",
    name: "Rooted in Faith Classic T-Shirt",
    slug: "rooted-in-faith-classic-t-shirt",
    category: "tee-shirts",
    categoryName: "T-Shirts",
    price: 22.00,
    compareAtPrice: 26.00,
    inStock: true,
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      {
        name: "Black",
        hex: "#111111",
        images: [
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
        ]
      },
      {
        name: "White",
        hex: "#FFFFFF",
        images: [
          "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80"
        ]
      },
      {
        name: "Forest Green",
        hex: "#2D4A3E",
        images: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80"
        ]
      }
    ],
    description: "Soft, breathable 100% ringspun combed cotton tee with ribbed crew neck. Features minimalist chest typography and rear backprint inspired by Colossians 2.",
    scriptureReference: "Colossians 2:6-7 — 'Rooted and built up in him, strengthened in the faith.'",
    careInstructions: "Wash inside out at 30°C. Do not iron directly on print.",
    sizeGuideType: "unisex-tshirt",
    featuredImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_1", "prod_6", "prod_2"],
    seoTitle: "Rooted in Faith Christian T-Shirt | Adoptd Clothing UK",
    seoDescription: "Premium unisex Christian t-shirt made with 100% soft organic cotton. Wear the word."
  },
  {
    id: "prod_6",
    name: "Living Water Crewneck Sweater",
    slug: "living-water-crewneck-sweater",
    category: "sweaters",
    categoryName: "Sweaters",
    price: 30.00,
    inStock: true,
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      {
        name: "Navy Blue",
        hex: "#1B2A4A",
        images: [
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80"
        ]
      },
      {
        name: "Heather Grey",
        hex: "#D3D3D3",
        images: [
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80"
        ]
      }
    ],
    description: "Cozy fleece-lined crewneck sweatshirt with dropped shoulders for a relaxed streetwear drape. Subtle embroidered typography across the chest.",
    scriptureReference: "John 4:14 — 'Whoever drinks the water I give them will never thirst.'",
    careInstructions: "Machine wash cold. Hang dry.",
    sizeGuideType: "sweater",
    featuredImage: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_1", "prod_5", "prod_2"],
    seoTitle: "Living Water Christian Crewneck Sweater | Adoptd Clothing",
    seoDescription: "Warm, cozy faith-inspired crewneck sweatshirt. Designed in the UK for disciples of Jesus."
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: "post_1",
    title: "Christian Clothing That Starts Conversations",
    slug: "christian-clothing-that-starts-conversations",
    coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80",
    category: "Behind the Brand",
    excerpt: "Why what we wear in public spaces can be a quiet yet powerful catalyst for everyday gospel conversations and encouragement.",
    contentHtml: `
      <p>ADOPTD was born from a simple desire: <strong>to share Jesus with the world</strong> through everyday moments. We believe clothing is more than just fabric—it's a canvas that can prompt curious questions, spark genuine fellowship, and offer quiet hope in a noisy world.</p>
      
      <h2>Small Brand. Big Message.</h2>
      <p>When you put on a hoodie with the words <em>Amazing Grace</em> or carry a tote bag proclaiming <em>He Makes All Things New</em>, you are declaring who you belong to. In a culture driven by performance, anxiety, and brand logos, wearing the Word points people back to the only anchor that holds.</p>
      
      <blockquote>"You are the light of the world. A town built on a hill cannot be hidden." — Matthew 5:14</blockquote>
      
      <h2>Real Stories from Our Community</h2>
      <p>We receive messages every week from customers who were stopped in coffee shops, on university campuses, or on the morning commute simply because someone asked, <em>"What does your sweatshirt mean?"</em> That brief moment opened the door to pray for someone or share the hope of Christ.</p>
    `,
    publishDate: "2026-09-20",
    author: "Adoptd Team",
    readingTimeMinutes: 3,
    featuredProductIds: ["prod_1", "prod_2"],
    seoTitle: "Christian Clothing That Starts Conversations | Adoptd Blog",
    seoDescription: "Discover how faith-based apparel serves as a gentle conversation starter for Jesus in everyday life.",
    published: true
  },
  {
    id: "post_2",
    title: "Held in the Dark: Trusting God in Uncertain Seasons",
    slug: "held-in-the-dark-trusting-god",
    coverImage: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&auto=format&fit=crop&q=80",
    category: "Devotionals",
    excerpt: "When life feels heavy and clarity is absent, God's faithfulness remains unwavering. A devotional on walking by faith.",
    contentHtml: `
      <p>There are seasons in life where the path ahead seems shrouded in fog. We yearn for a map, but God gives us a lamp for our immediate step. Walking by faith means trusting the Character of the Shepherd even when the valley is shadowy.</p>
      
      <h2>The Promise of His Presence</h2>
      <p>Scripture never promises an absence of storms, but it gives an unbreakable guarantee of His presence. In Christ, we are never abandoned, never forgotten, and forever adopted as sons and daughters of God.</p>
      
      <blockquote>"The Lord is near to all who call on him, to all who call on him in truth." — Psalm 145:18</blockquote>
    `,
    publishDate: "2026-09-15",
    author: "Adoptd Pastoral Team",
    readingTimeMinutes: 4,
    featuredProductIds: ["prod_6", "prod_4"],
    seoTitle: "Held in the Dark: Trusting God in Uncertain Seasons | Devotional",
    seoDescription: "A pastoral reflection on finding peace and grounding your soul in God's steadfast love during trials.",
    published: true
  }
];
