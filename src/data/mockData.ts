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
  // --- HOODIES ---
  {
    id: "prod_hoodie_1",
    name: "Faith Over Fear Christian Hoodie",
    slug: "faith-over-fear-christian-hoodie",
    category: "christian-hoodies-uk",
    categoryName: "Hoodies",
    price: 32.00,
    inStock: true,
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      {
        name: "Black",
        hex: "#111111",
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
      },
      {
        name: "Sand / Natural",
        hex: "#D8C7B5",
        images: [
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80"
        ]
      }
    ],
    description: "Our signature Faith Over Fear Christian hoodie is crafted from premium heavyweight organic cotton blend fabric. Designed for warmth, comfort, and bold testimony, this hoodie serves as a constant reminder that God has not given us a spirit of fear, but of power, love, and a sound mind.",
    scriptureReference: "Psalm 118:6 — 'The Lord is on my side; I will not fear.'",
    careInstructions: "Machine wash at 30°C inside out. Do not tumble dry.",
    sizeGuideType: "unisex-hoodie",
    featuredImage: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_hoodie_2", "prod_hoodie_5", "prod_tee_1"],
    seoTitle: "Faith Over Fear Christian Hoodie | Adoptd Clothing UK",
    seoDescription: "Shop the Faith Over Fear heavyweight Christian hoodie. Premium unisex faith apparel designed to spark gospel conversations."
  },
  {
    id: "prod_hoodie_2",
    name: "He Left the 99 Christian Hoodie",
    slug: "he-left-the-99-christian-hoodie",
    category: "christian-hoodies-uk",
    categoryName: "Hoodies",
    price: 32.00,
    inStock: true,
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      {
        name: "Black",
        hex: "#111111",
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
      },
      {
        name: "Navy",
        hex: "#1B2A4A",
        images: [
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80"
        ]
      }
    ],
    description: "A powerful reminder of the relentless love of the Good Shepherd who leaves the ninety-nine to pursue the one lost sheep. Heavyweight fleece with ribbed cuffs and hem.",
    scriptureReference: "Luke 15:4 — 'What man among you, if he has a hundred sheep and loses one, does not leave the ninety-nine... and go after the lost one?'",
    careInstructions: "Machine wash 30°C inside out with like colours.",
    sizeGuideType: "unisex-hoodie",
    featuredImage: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_hoodie_1", "prod_tee_5", "prod_bag_1"],
    seoTitle: "He Left the 99 Christian Hoodie | Adoptd Clothing UK",
    seoDescription: "Cozy Christian hoodie carrying the Luke 15 message of Jesus pursuing the lost one."
  },
  {
    id: "prod_hoodie_3",
    name: "Need Prayer Christian Hoodie",
    slug: "need-prayer-christian-hoodie",
    category: "christian-hoodies-uk",
    categoryName: "Hoodies",
    price: 32.00,
    inStock: true,
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
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
    description: "A walking invitation for ministry and fellowship. Wearing this hoodie lets people around you know you are open and ready to pray with them wherever you go.",
    scriptureReference: "James 5:16 — 'Pray for one another, that you may be healed.'",
    careInstructions: "Machine wash inside out at 30°C.",
    sizeGuideType: "unisex-hoodie",
    featuredImage: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_hoodie_4", "prod_tee_3", "prod_bag_2"],
    seoTitle: "Need Prayer Christian Hoodie | Faith Apparel UK",
    seoDescription: "Start prayer conversations wherever you go with the Need Prayer Christian hoodie."
  },
  {
    id: "prod_hoodie_4",
    name: "Pray Christian Hoodie",
    slug: "pray-christian-hoodie",
    category: "christian-hoodies-uk",
    categoryName: "Hoodies",
    price: 32.00,
    inStock: true,
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      {
        name: "Black",
        hex: "#111111",
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
    description: "Minimalist typography with a timeless message: Pray without ceasing. Soft brushed interior for all-day comfort and warmth.",
    scriptureReference: "1 Thessalonians 5:17 — 'Pray without ceasing.'",
    careInstructions: "Wash inside out at 30°C. Do not iron directly on print.",
    sizeGuideType: "unisex-hoodie",
    featuredImage: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_hoodie_3", "prod_tee_2", "prod_bag_3"],
    seoTitle: "Pray Christian Hoodie | Adoptd Clothing UK",
    seoDescription: "Minimalist Christian hoodie designed in the UK for believers."
  },
  {
    id: "prod_hoodie_5",
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
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80"
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
    description: "Our iconic Amazing Grace hoodie reminding you of God's unearned, undeserved favor. Ethically crafted heavyweight fleece.",
    scriptureReference: "Ephesians 2:8-9 — 'For by grace you have been saved through faith.'",
    careInstructions: "Machine wash 30°C inside out. Air dry recommended.",
    sizeGuideType: "unisex-hoodie",
    featuredImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_bag_4", "prod_hoodie_1", "prod_tee_7"],
    seoTitle: "Amazing Grace Christian Hoodie | Adoptd Clothing UK",
    seoDescription: "Wrap yourself in grace. Heavyweight Christian hoodie designed to start conversations."
  },

  // --- T-SHIRTS ---
  {
    id: "prod_tee_1",
    name: "Faith Over Fear Christian T-Shirt",
    slug: "faith-over-fear-christian-t-shirt",
    category: "tee-shirts",
    categoryName: "T-Shirts",
    price: 19.99,
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
      }
    ],
    description: "Breathable 100% combed ringspun cotton tee with bold typography declaring Faith Over Fear across the front and rear backprint.",
    scriptureReference: "Psalm 118:6 — 'The Lord is on my side; I will not fear.'",
    careInstructions: "Wash inside out at 30°C.",
    sizeGuideType: "unisex-tshirt",
    featuredImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_hoodie_1", "prod_tee_2", "prod_bag_1"],
    seoTitle: "Faith Over Fear Christian T-Shirt UK | Adoptd Clothing",
    seoDescription: "Premium organic cotton Christian t-shirt carrying Psalm 118:6."
  },
  {
    id: "prod_tee_2",
    name: "Pray Christian T-Shirt",
    slug: "pray-christian-t-shirt",
    category: "tee-shirts",
    categoryName: "T-Shirts",
    price: 19.99,
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
      }
    ],
    description: "Clean graphic faith tee designed to encourage disciples to deepen their personal prayer life daily.",
    scriptureReference: "1 Thessalonians 5:17 — 'Pray continually.'",
    careInstructions: "Machine wash cold inside out.",
    sizeGuideType: "unisex-tshirt",
    featuredImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_hoodie_4", "prod_tee_3", "prod_bag_2"],
    seoTitle: "Pray Christian T-Shirt | Faith Graphic Tee UK",
    seoDescription: "Shop the Pray graphic Christian t-shirt made with soft organic cotton."
  },
  {
    id: "prod_tee_3",
    name: "Need Prayer Christian T-Shirt",
    slug: "need-prayer-christian-t-shirt",
    category: "tee-shirts",
    categoryName: "T-Shirts",
    price: 19.99,
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
        name: "Navy",
        hex: "#1B2A4A",
        images: [
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80"
        ]
      }
    ],
    description: "Gentle outreach t-shirt inviting those in distress or needing hope to ask for prayer in everyday public spaces.",
    scriptureReference: "Philippians 4:6 — 'In every situation, by prayer and petition, present your requests to God.'",
    careInstructions: "Wash inside out at 30°C.",
    sizeGuideType: "unisex-tshirt",
    featuredImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_hoodie_3", "prod_tee_4", "prod_bag_3"],
    seoTitle: "Need Prayer Christian T-Shirt UK | Adoptd Clothing",
    seoDescription: "Spread light and offer prayer with the Need Prayer graphic faith tee."
  },
  {
    id: "prod_tee_4",
    name: "The Lord Is My Light Christian T-Shirt",
    slug: "the-lord-is-my-light-christian-t-shirt",
    category: "tee-shirts",
    categoryName: "T-Shirts",
    price: 19.99,
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
        name: "Sand / Natural",
        hex: "#D8C7B5",
        images: [
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80"
        ]
      }
    ],
    description: "Minimalist sun and scripture emblem illustrating Psalm 27:1. Premium retail fit with soft ribbed collar.",
    scriptureReference: "Psalm 27:1 — 'The Lord is my light and my salvation—whom shall I fear?'",
    careInstructions: "Wash cold inside out.",
    sizeGuideType: "unisex-tshirt",
    featuredImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_tee_1", "prod_tee_5", "prod_bag_1"],
    seoTitle: "The Lord Is My Light Christian T-Shirt | Psalm 27:1",
    seoDescription: "Wear the light of Christ with this Psalm 27:1 organic faith tee."
  },
  {
    id: "prod_tee_5",
    name: "He Left the 99 Christian T-Shirt",
    slug: "he-left-the-99-christian-t-shirt",
    category: "tee-shirts",
    categoryName: "T-Shirts",
    price: 19.99,
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
        name: "Forest Green",
        hex: "#2D4A3E",
        images: [
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80"
        ]
      }
    ],
    description: "A wearable testimony to Jesus Christ who leaves the ninety-nine to rescue the one wandering sheep.",
    scriptureReference: "Matthew 18:12 — 'If a man owns a hundred sheep, and one of them wanders away...'",
    careInstructions: "Wash inside out at 30°C.",
    sizeGuideType: "unisex-tshirt",
    featuredImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_hoodie_2", "prod_tee_6", "prod_bag_2"],
    seoTitle: "He Left the 99 Christian T-Shirt | Adoptd Clothing",
    seoDescription: "Discover the He Left the 99 Christian t-shirt designed in the UK."
  },
  {
    id: "prod_tee_6",
    name: "Faith Can Move Mountains Christian T-Shirt",
    slug: "faith-can-move-mountains-christian-t-shirt",
    category: "tee-shirts",
    categoryName: "T-Shirts",
    price: 19.99,
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
      }
    ],
    description: "Hand-drawn mountain line art and bold faith declaration reminding you that even mustard-seed faith moves mountains.",
    scriptureReference: "Matthew 17:20 — 'Truly I tell you, if you have faith as small as a mustard seed...'",
    careInstructions: "Machine wash at 30°C inside out.",
    sizeGuideType: "unisex-tshirt",
    featuredImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_tee_7", "prod_tee_1", "prod_bag_3"],
    seoTitle: "Faith Can Move Mountains Christian T-Shirt | Adoptd Clothing",
    seoDescription: "Faith Can Move Mountains t-shirt inspired by Matthew 17:20."
  },
  {
    id: "prod_tee_7",
    name: "Jesus Christian T-Shirt",
    slug: "jesus-christian-t-shirt",
    category: "tee-shirts",
    categoryName: "T-Shirts",
    price: 19.99,
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
      }
    ],
    description: "The name above all names. Clean, bold typography proclaiming Jesus as the centre of all we are and do.",
    scriptureReference: "Philippians 2:9 — 'God exalted him to the highest place and gave him the name that is above every name.'",
    careInstructions: "Machine wash 30°C inside out.",
    sizeGuideType: "unisex-tshirt",
    featuredImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_hoodie_5", "prod_tee_1", "prod_bag_4"],
    seoTitle: "Jesus Christian T-Shirt | Christian Clothing UK",
    seoDescription: "Clean Jesus Christian t-shirt crafted from 100% organic combed cotton."
  },

  // --- TOTE BAGS ---
  {
    id: "prod_bag_1",
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
    description: "100% natural heavy organic canvas bag featuring the declaration 'He Makes All Things New'. Long shoulder straps and reinforced cross-stitching.",
    scriptureReference: "Revelation 21:5 — 'Behold, I am making all things new.'",
    careInstructions: "Wipe clean or gentle cold hand wash.",
    sizeGuideType: "tote-bag",
    featuredImage: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_bag_2", "prod_bag_3", "prod_hoodie_1"],
    seoTitle: "He Makes All Things New Tote Bag | Adoptd Clothing",
    seoDescription: "Eco-friendly 100% cotton Christian tote bag for study books and daily errands."
  },
  {
    id: "prod_bag_2",
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
    description: "Botanical branch illustration and scripture typography reminding us of remaining rooted and connected in Jesus Christ.",
    scriptureReference: "John 15:5 — 'I am the vine; you are the branches.'",
    careInstructions: "Hand wash in cold water.",
    sizeGuideType: "tote-bag",
    featuredImage: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_bag_1", "prod_bag_4", "prod_hoodie_2"],
    seoTitle: "The True Vine Tote Bag | Christian Bags UK",
    seoDescription: "Shop The True Vine canvas tote bag inspired by John 15."
  },
  {
    id: "prod_bag_3",
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
    description: "Spacious, durable 300gsm canvas tote carrying John the Baptist's humble discipleship prayer.",
    scriptureReference: "John 3:30 — 'He must increase, but I must decrease.'",
    careInstructions: "Spot clean with a damp cloth.",
    sizeGuideType: "tote-bag",
    featuredImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_bag_1", "prod_bag_2", "prod_hoodie_3"],
    seoTitle: "More of Him Less of Me Tote Bag | Adoptd Clothing",
    seoDescription: "John 3:30 inspired canvas tote bag. Simple faith statements for intentional living."
  },
  {
    id: "prod_bag_4",
    name: "Amazing Grace Tote Bag",
    slug: "amazing-grace-tote-bag",
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
    description: "Classic heavyweight Christian tote bag bearing the eternal anthem of grace. Comfortable long handles for everyday shoulder carry.",
    scriptureReference: "Ephesians 2:8 — 'For by grace you have been saved through faith.'",
    careInstructions: "Spot clean or hand wash cold.",
    sizeGuideType: "tote-bag",
    featuredImage: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&auto=format&fit=crop&q=80",
    relatedProductIds: ["prod_hoodie_5", "prod_bag_1", "prod_tee_7"],
    seoTitle: "Amazing Grace Tote Bag | Adoptd Christian Clothing",
    seoDescription: "Heavy canvas Amazing Grace tote bag made for church, study, and daily shopping."
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
    featuredProductIds: ["prod_hoodie_5", "prod_bag_1"],
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
    featuredProductIds: ["prod_hoodie_1", "prod_bag_3"],
    seoTitle: "Held in the Dark: Trusting God in Uncertain Seasons | Devotional",
    seoDescription: "A pastoral reflection on finding peace and grounding your soul in God's steadfast love during trials.",
    published: true
  }
];
