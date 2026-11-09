import { Product, BlogPost, SiteSettings } from '@/types';

export const mockSiteSettings: SiteSettings = {
  announcementBanner: "",
  announcementActive: false,
  globalMetaTitle: "Adoptd Christian Clothing | Wear The Word. Share The Light.",
  globalMetaDescription: "ADOPTD is an independent Christian clothing brand creating apparel that carries a message of faith, hope and identity. Small brand. Big message. Jesus at the centre.",
  contactEmail: "adoptdclothing@gmail.com",
  instagramUrl: "https://www.instagram.com/adoptdchristian",
  facebookUrl: "https://www.facebook.com/adoptdclothing25/",
  freeShippingThreshold: 40.00,
};

export const mockProducts: Product[] = [
  {
    "id": "prod_bag_1",
    "name": "He Makes All Things New Tote Bag",
    "slug": "he-makes-all-things-new-tote-bag",
    "category": "christian-bags",
    "categoryName": "Tote Bags",
    "price": 12,
    "inStock": true,
    "availableSizes": [
      "One Size"
    ],
    "colors": [
      {
        "name": "Natural",
        "hex": "#D8C7B5",
        "images": [
          "/images/products/he-makes-all-things-new-tote.webp"
        ]
      }
    ],
    "description": "100% natural heavy organic canvas bag featuring the declaration 'He Makes All Things New'. Long shoulder straps and reinforced cross-stitching.",
    "scriptureReference": "Revelation 21:5 — 'Behold, I am making all things new.'",
    "careInstructions": "Wipe clean or gentle cold hand wash.",
    "sizeGuideType": "tote-bag",
    "featuredImage": "/images/products/he-makes-all-things-new-tote.webp",
    "categoryOverview": "Our collection of Christian bags UK believers love combines faith, style, and everyday practicality. Each bag features meaningful Bible verses and Christian messages designed to encourage believers and help share the message of Jesus.",
    "relatedProductIds": [
      "prod_bag_2",
      "prod_bag_3",
      "prod_hoodie_5"
    ],
    "seoTitle": "He Makes All Things New Tote Bag | Adoptd Clothing",
    "seoDescription": "Eco-friendly 100% cotton Christian tote bag for study books and daily errands."
  },
  {
    "id": "prod_bag_2",
    "name": "The True Vine Tote Bag",
    "slug": "the-true-vine-tote-bag",
    "category": "christian-bags",
    "categoryName": "Tote Bags",
    "price": 12,
    "inStock": true,
    "availableSizes": [
      "One Size"
    ],
    "colors": [
      {
        "name": "Natural",
        "hex": "#D8C7B5",
        "images": [
          "/images/products/the-true-vine-tote.webp",
          "/images/products/the-true-vine-tote-lifestyle.webp"
        ]
      }
    ],
    "description": "Botanical branch illustration and scripture typography reminding us of remaining rooted and connected in Jesus Christ.",
    "scriptureReference": "John 15:5 — 'I am the vine; you are the branches.'",
    "careInstructions": "Hand wash in cold water.",
    "sizeGuideType": "tote-bag",
    "featuredImage": "/images/products/the-true-vine-tote.webp",
    "relatedProductIds": [
      "prod_bag_1",
      "prod_bag_4",
      "prod_hoodie_2"
    ],
    "seoTitle": "The True Vine Tote Bag | Christian Bags UK",
    "seoDescription": "Shop The True Vine canvas tote bag inspired by John 15."
  },
  {
    "id": "prod_bag_3",
    "name": "More of Him Less of Me Tote Bag",
    "slug": "more-of-him-less-of-me-tote-bag",
    "category": "christian-bags",
    "categoryName": "Tote Bags",
    "price": 12,
    "inStock": true,
    "availableSizes": [
      "One Size"
    ],
    "colors": [
      {
        "name": "Natural",
        "hex": "#D8C7B5",
        "images": [
          "/images/products/more-of-him-tote.webp"
        ]
      }
    ],
    "description": "Spacious, durable 300gsm canvas tote carrying John the Baptist's humble discipleship prayer.",
    "scriptureReference": "John 3:30 — 'He must increase, but I must decrease.'",
    "careInstructions": "Spot clean with a damp cloth.",
    "sizeGuideType": "tote-bag",
    "featuredImage": "/images/products/more-of-him-tote.webp",
    "relatedProductIds": [
      "prod_bag_1",
      "prod_bag_2",
      "prod_hoodie_3"
    ],
    "seoTitle": "More of Him Less of Me Tote Bag | Adoptd Clothing",
    "seoDescription": "John 3:30 inspired canvas tote bag. Simple faith statements for intentional living."
  },
  {
    "id": "prod_bag_4",
    "name": "Amazing Grace Tote Bag",
    "slug": "amazing-grace-tote-bag",
    "category": "christian-bags",
    "categoryName": "Tote Bags",
    "price": 12,
    "inStock": true,
    "availableSizes": [
      "One Size"
    ],
    "colors": [
      {
        "name": "Natural",
        "hex": "#D8C7B5",
        "images": [
          "/images/products/amazing-grace-tote.webp",
          "/images/products/amazing-grace-tote-lifestyle.webp"
        ]
      }
    ],
    "description": "Classic heavyweight Christian tote bag bearing the eternal anthem of grace. Comfortable long handles for everyday shoulder carry.",
    "scriptureReference": "Ephesians 2:8 — 'For by grace you have been saved through faith.'",
    "careInstructions": "Spot clean or hand wash cold.",
    "sizeGuideType": "tote-bag",
    "featuredImage": "/images/products/amazing-grace-tote.webp",
    "relatedProductIds": [
      "prod_hoodie_5",
      "prod_bag_1",
      "prod_tee_7"
    ],
    "seoTitle": "Amazing Grace Tote Bag | Adoptd Christian Clothing",
    "seoDescription": "Heavy canvas Amazing Grace tote bag made for church, study, and daily shopping."
  },
  {
    "id": "prod_hoodie_5",
    "name": "Amazing Grace Christian Hoodie",
    "slug": "amazing-grace-christian-hoodie",
    "category": "christian-hoodies-uk",
    "categoryName": "Hoodies",
    "price": 32,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Natural",
        "hex": "#D8C7B5",
        "images": [
          "/images/products/amazing-grace-hoodie.webp",
          "/images/products/amazing-grace-hoodie-lifestyle.webp"
        ]
      }
    ],
    "description": "Our iconic Amazing Grace hoodie reminding you of God's unearned, undeserved favor. Ethically crafted heavyweight fleece.",
    "scriptureReference": "Ephesians 2:8-9 — 'For by grace you have been saved through faith.'",
    "careInstructions": "Machine wash 30°C inside out. Air dry recommended.",
    "sizeGuideType": "unisex-hoodie",
    "featuredImage": "/images/products/amazing-grace-hoodie.webp",
    "categoryOverview": "Our collection of Christian hoodies UK is designed to help you share your faith while staying comfortable and stylish. Premium heavyweight hoodies carrying bold scripture declarations and gospel truth.",
    "relatedProductIds": [
      "prod_bag_4",
      "prod_hoodie_1",
      "prod_tee_7"
    ],
    "seoTitle": "Amazing Grace Christian Hoodie | Adoptd Clothing UK",
    "seoDescription": "Wrap yourself in grace. Heavyweight Christian hoodie designed to start conversations."
  },
  {
    "id": "prod_hoodie_1",
    "name": "Faith Over Fear Christian Hoodie",
    "slug": "faith-over-fear-christian-hoodie",
    "category": "christian-hoodies-uk",
    "categoryName": "Hoodies",
    "price": 32,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/faith-over-fear-christian-hoodie-black.webp",
          "/images/products/faith-over-fear-christian-hoodie-lifestyle-1.webp",
          "/images/products/faith-over-fear-christian-hoodie-lifestyle-2.webp"
        ]
      },
      {
        "name": "Grey",
        "hex": "#C0C0C0",
        "images": [
          "/images/products/faith-over-fear-christian-hoodie-grey.webp"
        ]
      },
      {
        "name": "Sand",
        "hex": "#D8C7B5",
        "images": [
          "/images/products/faith-over-fear-christian-hoodie-sand.webp"
        ]
      }
    ],
    "description": "Our signature Faith Over Fear Christian hoodie is crafted from premium heavyweight organic cotton blend fabric. Designed for warmth, comfort, and bold testimony.",
    "scriptureReference": "Psalm 118:6 — 'The Lord is on my side; I will not fear.'",
    "careInstructions": "Machine wash at 30°C inside out. Do not tumble dry.",
    "sizeGuideType": "unisex-hoodie",
    "featuredImage": "/images/products/faith-over-fear-christian-hoodie.webp",
    "relatedProductIds": [
      "prod_hoodie_2",
      "prod_hoodie_5",
      "prod_tee_1"
    ],
    "seoTitle": "Faith Over Fear Christian Hoodie | Adoptd Clothing UK",
    "seoDescription": "Shop the Faith Over Fear heavyweight Christian hoodie. Premium unisex faith apparel."
  },
  {
    "id": "prod_hoodie_2",
    "name": "He Left the 99 Christian Hoodie",
    "slug": "he-left-the-99-christian-hoodie",
    "category": "christian-hoodies-uk",
    "categoryName": "Hoodies",
    "price": 32,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Grey",
        "hex": "#C0C0C0",
        "images": [
          "/images/products/he-left-the-99-christian-hoodie-grey.webp"
        ]
      },
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/he-left-the-99-christian-hoodie-black.webp"
        ]
      },
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/he-left-the-99-christian-hoodie-navy.webp"
        ]
      }
    ],
    "description": "A powerful reminder of the relentless love of the Good Shepherd who leaves the ninety-nine to pursue the one lost sheep.",
    "scriptureReference": "Luke 15:4 — 'Does he not leave the ninety-nine in the open country and go after the lost sheep until he finds it?'",
    "careInstructions": "Machine wash 30°C inside out with like colours.",
    "sizeGuideType": "unisex-hoodie",
    "featuredImage": "/images/products/he-left-the-99-christian-hoodie.webp",
    "relatedProductIds": [
      "prod_hoodie_1",
      "prod_tee_5",
      "prod_bag_1"
    ],
    "seoTitle": "He Left the 99 Christian Hoodie | Adoptd Clothing UK",
    "seoDescription": "Cozy Christian hoodie carrying the Luke 15 message of Jesus pursuing the lost one."
  },
  {
    "id": "prod_hoodie_3",
    "name": "Need Prayer Christian Hoodie",
    "slug": "need-prayer-christian-hoodie",
    "category": "christian-hoodies-uk",
    "categoryName": "Hoodies",
    "price": 32,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/need-prayer-christian-hoodie-black.webp",
          "/images/products/need-prayer-christian-hoodie-lifestyle-1.webp",
          "/images/products/need-prayer-christian-hoodie-lifestyle-2.webp"
        ]
      },
      {
        "name": "Sand",
        "hex": "#D8C7B5",
        "images": [
          "/images/products/need-prayer-christian-hoodie-sand.webp"
        ]
      },
      {
        "name": "Grey",
        "hex": "#C0C0C0",
        "images": [
          "/images/products/need-prayer-christian-hoodie-grey.webp"
        ]
      }
    ],
    "description": "A walking invitation for ministry and fellowship. Wearing this hoodie lets people around you know you are open and ready to pray.",
    "scriptureReference": "James 5:16 — 'The prayer of a righteous person is powerful and effective.'",
    "careInstructions": "Machine wash inside out at 30°C.",
    "sizeGuideType": "unisex-hoodie",
    "featuredImage": "/images/products/need-prayer-christian-hoodie.webp",
    "relatedProductIds": [
      "prod_hoodie_4",
      "prod_tee_3",
      "prod_bag_2"
    ],
    "seoTitle": "Need Prayer Christian Hoodie | Faith Apparel UK",
    "seoDescription": "Start prayer conversations wherever you go with the Need Prayer Christian hoodie."
  },
  {
    "id": "prod_hoodie_4",
    "name": "Pray Christian Hoodie",
    "slug": "pray-christian-hoodie",
    "category": "christian-hoodies-uk",
    "categoryName": "Hoodies",
    "price": 32,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/pray-christian-hoodie-black.webp",
          "/images/products/pray-christian-hoodie-lifestyle-1.webp",
          "/images/products/pray-christian-hoodie-lifestyle-2.webp"
        ]
      },
      {
        "name": "Grey",
        "hex": "#C0C0C0",
        "images": [
          "/images/products/pray-christian-hoodie-grey.webp"
        ]
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/pray-christian-hoodie-white.webp"
        ]
      }
    ],
    "description": "Minimalist typography with a timeless message: Pray without ceasing. Soft brushed interior for all-day comfort and warmth.",
    "scriptureReference": "1 Thessalonians 5:17 — 'Pray without ceasing.'",
    "careInstructions": "Wash inside out at 30°C.",
    "sizeGuideType": "unisex-hoodie",
    "featuredImage": "/images/products/pray-christian-hoodie.webp",
    "relatedProductIds": [
      "prod_hoodie_3",
      "prod_tee_2",
      "prod_bag_3"
    ],
    "seoTitle": "Pray Christian Hoodie | Adoptd Clothing UK",
    "seoDescription": "Minimalist Christian hoodie designed in the UK for believers."
  },
  {
    "id": "prod_tee_1",
    "name": "Faith Over Fear Christian T-Shirt",
    "slug": "faith-over-fear-christian-t-shirt",
    "category": "tee-shirts",
    "categoryName": "T-Shirts",
    "price": 19.99,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Sand",
        "hex": "#D8C7B5",
        "images": [
          "/images/products/faith-over-fear-christian-t-shirt-sand.webp",
          "/images/products/faith-over-fear-christian-t-shirt-lifestyle-1.webp",
          "/images/products/faith-over-fear-christian-t-shirt-lifestyle-2.webp"
        ]
      },
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/faith-over-fear-christian-t-shirt-black.webp"
        ]
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/faith-over-fear-christian-t-shirt-white.webp"
        ]
      }
    ],
    "description": "Breathable 100% combed ringspun cotton tee with bold typography declaring Faith Over Fear.",
    "scriptureReference": "Psalm 118:6 — 'The Lord is with me; I will not be afraid.'",
    "careInstructions": "Wash inside out at 30°C.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/faith-over-fear-christian-t-shirt.webp",
    "categoryOverview": "Our Christian T-Shirts are designed to help you share your faith with confidence. Each design features powerful Bible verses and inspiring messages that reflect God’s word.",
    "relatedProductIds": [
      "prod_hoodie_1",
      "prod_tee_2",
      "prod_bag_1"
    ],
    "seoTitle": "Faith Over Fear Christian T-Shirt UK | Adoptd Clothing",
    "seoDescription": "Premium organic cotton Christian t-shirt carrying Psalm 118:6."
  },
  {
    "id": "prod_tee_2",
    "name": "Pray Christian T-Shirt",
    "slug": "pray-christian-t-shirt",
    "category": "tee-shirts",
    "categoryName": "T-Shirts",
    "price": 19.99,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/pray-christian-t-shirt-black.webp",
          "/images/products/pray-christian-t-shirt-lifestyle-1.webp",
          "/images/products/pray-christian-t-shirt-lifestyle-2.webp"
        ]
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/pray-christian-t-shirt-white.webp"
        ]
      },
      {
        "name": "Grey",
        "hex": "#C0C0C0",
        "images": [
          "/images/products/pray-christian-t-shirt-grey.webp"
        ]
      }
    ],
    "description": "Clean graphic faith tee designed to encourage disciples to deepen their personal prayer life daily.",
    "scriptureReference": "1 Thessalonians 5:17 — 'Pray without ceasing.'",
    "careInstructions": "Machine wash cold inside out.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/pray-christian-t-shirt.webp",
    "relatedProductIds": [
      "prod_hoodie_4",
      "prod_tee_3",
      "prod_bag_2"
    ],
    "seoTitle": "Pray Christian T-Shirt | Faith Graphic Tee UK",
    "seoDescription": "Shop the Pray graphic Christian t-shirt made with soft organic cotton."
  },
  {
    "id": "prod_tee_3",
    "name": "Need Prayer Christian T-Shirt",
    "slug": "need-prayer-christian-t-shirt",
    "category": "tee-shirts",
    "categoryName": "T-Shirts",
    "price": 19.99,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/need-prayer-christian-t-shirt-black.webp",
          "/images/products/need-prayer-christian-t-shirt-lifestyle-1.webp",
          "/images/products/need-prayer-christian-t-shirt-lifestyle-2.webp"
        ]
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/need-prayer-christian-t-shirt-white.webp"
        ]
      },
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/need-prayer-christian-t-shirt-navy.webp"
        ]
      }
    ],
    "description": "Gentle outreach t-shirt inviting those in distress or needing hope to ask for prayer.",
    "scriptureReference": "Philippians 4:6 — 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.'",
    "careInstructions": "Wash inside out at 30°C.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/need-prayer-christian-t-shirt.webp",
    "relatedProductIds": [
      "prod_hoodie_3",
      "prod_tee_4",
      "prod_bag_3"
    ],
    "seoTitle": "Need Prayer Christian T-Shirt UK | Adoptd Clothing",
    "seoDescription": "Spread light and offer prayer with the Need Prayer graphic faith tee."
  },
  {
    "id": "prod_tee_4",
    "name": "The Lord Is My Light Christian T-Shirt",
    "slug": "the-lord-is-my-light-christian-t-shirt",
    "category": "tee-shirts",
    "categoryName": "T-Shirts",
    "price": 19.99,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/the-lord-is-my-light-christian-t-shirt-white.webp",
          "/images/products/the-lord-is-my-light-christian-t-shirt-lifestyle.webp"
        ]
      },
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/the-lord-is-my-light-christian-t-shirt-black.webp"
        ]
      },
      {
        "name": "Sand",
        "hex": "#D8C7B5",
        "images": [
          "/images/products/the-lord-is-my-light-christian-t-shirt-sand.webp"
        ]
      }
    ],
    "description": "Minimalist sun and scripture emblem illustrating Psalm 27:1.",
    "scriptureReference": "Psalm 27:1 — 'The Lord is my light and my salvation—whom shall I fear?'",
    "careInstructions": "Wash cold inside out.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/the-lord-is-my-light-christian-t-shirt.webp",
    "relatedProductIds": [
      "prod_tee_1",
      "prod_tee_5",
      "prod_bag_1"
    ],
    "seoTitle": "The Lord Is My Light Christian T-Shirt | Psalm 27:1",
    "seoDescription": "Wear the light of Christ with this Psalm 27:1 organic faith tee."
  },
  {
    "id": "prod_tee_5",
    "name": "He Left the 99 Christian T-Shirt",
    "slug": "he-left-the-99-christian-t-shirt",
    "category": "tee-shirts",
    "categoryName": "T-Shirts",
    "price": 19.99,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Sand",
        "hex": "#D8C7B5",
        "images": [
          "/images/products/he-left-the-99-christian-t-shirt-sand.webp",
          "/images/products/he-left-the-99-christian-t-shirt-lifestyle.webp"
        ]
      },
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/he-left-the-99-christian-t-shirt-black.webp"
        ]
      },
      {
        "name": "Green",
        "hex": "#2D4A3E",
        "images": [
          "/images/products/he-left-the-99-christian-t-shirt-green.webp"
        ]
      }
    ],
    "description": "A wearable testimony to Jesus Christ who leaves the ninety-nine to rescue the one wandering sheep.",
    "scriptureReference": "Matthew 18:12 — 'If a man owns a hundred sheep, and one of them wanders away, will he not leave the ninety-nine on the hills and go to look for the one that wandered off?'",
    "careInstructions": "Wash inside out at 30°C.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/he-left-the-99-christian-t-shirt.webp",
    "relatedProductIds": [
      "prod_hoodie_2",
      "prod_tee_6",
      "prod_bag_2"
    ],
    "seoTitle": "He Left the 99 Christian T-Shirt | Adoptd Clothing",
    "seoDescription": "Discover the He Left the 99 Christian t-shirt designed in the UK."
  },
  {
    "id": "prod_tee_6",
    "name": "Faith Can Move Mountains Christian T-Shirt",
    "slug": "faith-can-move-mountains-christian-t-shirt",
    "category": "tee-shirts",
    "categoryName": "T-Shirts",
    "price": 19.99,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/faith-can-move-mountains-christian-t-shirt-navy.webp",
          "/images/products/faith-can-move-mountains-christian-t-shirt-lifestyle.webp"
        ]
      },
      {
        "name": "Sand",
        "hex": "#D8C7B5",
        "images": [
          "/images/products/faith-can-move-mountains-christian-t-shirt-sand.webp"
        ]
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/faith-can-move-mountains-christian-t-shirt-white.webp"
        ]
      }
    ],
    "description": "Hand-drawn mountain line art and bold faith declaration reminding you that even mustard-seed faith moves mountains.",
    "scriptureReference": "Matthew 17:20 — 'Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, Move from here to there, and it will move.'",
    "careInstructions": "Machine wash at 30°C inside out.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/faith-can-move-mountains-christian-t-shirt.webp",
    "relatedProductIds": [
      "prod_tee_7",
      "prod_tee_1",
      "prod_bag_3"
    ],
    "seoTitle": "Faith Can Move Mountains Christian T-Shirt | Adoptd Clothing",
    "seoDescription": "Faith Can Move Mountains t-shirt inspired by Matthew 17:20."
  },
  {
    "id": "prod_tee_7",
    "name": "Jesus Christian T-Shirt",
    "slug": "jesus-christian-t-shirt",
    "category": "tee-shirts",
    "categoryName": "T-Shirts",
    "price": 19.99,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/jesus-christian-t-shirt-navy.webp"
        ]
      },
      {
        "name": "Light Blue",
        "hex": "#2B4C6F",
        "images": [
          "/images/products/jesus-christian-t-shirt-lightblue.webp"
        ]
      }
    ],
    "description": "Wear your faith and share the message of Jesus with this Christian statement T-shirt. Featuring elegant script lettering alongside the powerful words “I am the way, the truth, the life” from John 14:6.",
    "scriptureReference": "John 14:6 — 'I am the way and the truth and the life. No one comes to the Father except through me.'",
    "careInstructions": "Machine wash 30°C inside out.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/jesus-christian-t-shirt.webp",
    "relatedProductIds": [
      "prod_hoodie_5",
      "prod_tee_1",
      "prod_bag_4"
    ],
    "seoTitle": "Jesus Christian T-Shirt | Christian Clothing UK",
    "seoDescription": "Clean Jesus Christian t-shirt crafted from 100% organic combed cotton."
  },
  {
    "id": "prod_tee_8",
    "name": "Amazing Grace Christian T-Shirt",
    "slug": "amazing-grace-christian-t-shirt",
    "category": "tee-shirts",
    "categoryName": "T-Shirts",
    "price": 19.99,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Natural",
        "hex": "#D8C7B5",
        "images": [
          "/images/products/amazing-grace-christian-t-shirt.webp"
        ],
        "hasSpecificImage": true
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/amazing-grace-christian-t-shirt.webp"
        ],
        "hasSpecificImage": true
      },
      {
        "name": "Green",
        "hex": "#2D4A3E",
        "images": [
          "/images/products/amazing-grace-christian-t-shirt-green.webp"
        ],
        "hasSpecificImage": true
      },
      {
        "name": "Lilac",
        "hex": "#C8A2C8",
        "images": [
          "/images/products/amazing-grace-christian-t-shirt-lilac.webp"
        ],
        "hasSpecificImage": true
      }
    ],
    "description": "Wear the eternal song of redemption and unearned grace. Soft, breathable cotton tee with clean typography.",
    "scriptureReference": "Ephesians 2:8-9 — 'For by grace you have been saved through faith.'",
    "careInstructions": "Machine wash cold inside out.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/amazing-grace-christian-t-shirt.webp",
    "relatedProductIds": [
      "prod_hoodie_5",
      "prod_bag_4",
      "prod_tee_1"
    ],
    "seoTitle": "Amazing Grace Christian T-Shirt | Adoptd Clothing",
    "seoDescription": "Shop the Amazing Grace graphic faith t-shirt made with soft ringspun cotton."
  },
  {
    "id": "prod_gym_1",
    "name": "Kingdom Athlete Christian Hoodie",
    "slug": "kingdom-athlete-christian-hoodie",
    "category": "gym-sportswear",
    "categoryName": "Gym & Sportswear",
    "price": 34,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/kingdom-athlete-christian-hoodie-black.webp"
        ]
      },
      {
        "name": "Burgundy",
        "hex": "#6A1A24",
        "images": [
          "/images/products/kingdom-athlete-christian-hoodie-burgundy.webp"
        ]
      },
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/kingdom-athlete-christian-hoodie-navy.webp"
        ]
      },
      {
        "name": "Green",
        "hex": "#2D4A3E",
        "images": [
          "/images/products/kingdom-athlete-christian-hoodie-green.webp"
        ]
      }
    ],
    "description": "Train for what is eternal. The Kingdom Athlete Christian Hoodie is crafted for athletes, lifters and runners who pursue God's glory on and off the track. Heavyweight performance fleece.",
    "scriptureReference": "1 Corinthians 9:25 — 'Everyone who competes in the games goes into strict training. They do it to get a crown that will not last, but we do it to get a crown that will last forever.'",
    "careInstructions": "Machine wash 30°C inside out. Air dry recommended.",
    "sizeGuideType": "unisex-hoodie",
    "featuredImage": "/images/products/kingdom-athlete-christian-hoodie.webp",
    "categoryOverview": "Stay active, stay inspired and keep your faith close with our collection of Christian gym and sportswear. Designed for those who want to combine an active lifestyle with their faith, these pieces feature uplifting messages, Scripture-inspired designs and reminders to keep God at the centre of every workout.",
    "relatedProductIds": [
      "prod_gym_2",
      "prod_gym_3",
      "prod_gym_6"
    ],
    "seoTitle": "Kingdom Athlete Christian Hoodie | Faith Activewear UK",
    "seoDescription": "Train with purpose in the Kingdom Athlete Christian hoodie. Built for comfort, warmth, and faith testimony."
  },
  {
    "id": "prod_gym_2",
    "name": "Kingdom Athlete Christian Sweatshirt",
    "slug": "kingdom-athlete-christian-sweatshirt",
    "category": "gym-sportswear",
    "categoryName": "Gym & Sportswear",
    "price": 30,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Grey",
        "hex": "#C0C0C0",
        "images": [
          "/images/products/kingdom-athlete-christian-sweatshirt-grey.webp"
        ]
      },
      {
        "name": "Burgundy",
        "hex": "#6A1A24",
        "images": [
          "/images/products/kingdom-athlete-christian-sweatshirt-burgundy.webp"
        ]
      },
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/kingdom-athlete-christian-sweatshirt-navy.webp"
        ]
      },
      {
        "name": "Green",
        "hex": "#2D4A3E",
        "images": [
          "/images/products/kingdom-athlete-christian-sweatshirt-green.webp"
        ]
      }
    ],
    "description": "Athletic crewneck sweatshirt for warm-ups, cool-downs, and active rest days. Designed with our signature Kingdom Athlete graphic inspiring relentless discipleship.",
    "scriptureReference": "1 Corinthians 9:25 — 'We do it to get a crown that will last forever.'",
    "careInstructions": "Machine wash cold inside out with like colours.",
    "sizeGuideType": "sweater",
    "featuredImage": "/images/products/kingdom-athlete-christian-sweatshirt.webp",
    "relatedProductIds": [
      "prod_gym_1",
      "prod_gym_3",
      "prod_gym_5"
    ],
    "seoTitle": "Kingdom Athlete Christian Sweatshirt | Adoptd Clothing",
    "seoDescription": "Comfortable fleece-lined Christian athletic crewneck sweatshirt for workouts and daily wear."
  },
  {
    "id": "prod_gym_3",
    "name": "Kingdom Athlete Men's Performance Tank",
    "slug": "kingdom-athlete-mens-performance-tank",
    "category": "gym-sportswear",
    "categoryName": "Gym & Sportswear",
    "price": 22,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/kingdom-athlete-mens-performance-tank-black.webp",
          "/images/products/kingdom-athlete-mens-performance-tank-lifestyle.webp"
        ]
      },
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/kingdom-athlete-mens-performance-tank-navy.webp"
        ]
      },
      {
        "name": "Sapphire Blue",
        "hex": "#0F52BA",
        "images": [
          "/images/products/kingdom-athlete-mens-performance-tank-sapphireblue.webp"
        ]
      }
    ],
    "description": "Lightweight, breathable athletic training tank engineered for intense training sessions and high-output gym days. Bold Kingdom Athlete chest print.",
    "scriptureReference": "1 Timothy 4:8 — 'For physical training is of some value, but godliness has value for all things.'",
    "careInstructions": "Wash inside out at 30°C. Do not iron print.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/kingdom-athlete-mens-performance-tank.webp",
    "relatedProductIds": [
      "prod_gym_1",
      "prod_gym_5",
      "prod_gym_7"
    ],
    "seoTitle": "Kingdom Athlete Men's Performance Tank | Christian Gym Wear",
    "seoDescription": "Stay cool and train with purpose in the Kingdom Athlete performance tank top."
  },
  {
    "id": "prod_gym_4",
    "name": "Run the Race Women's Racerback Tank",
    "slug": "run-the-race-womens-racerback-tank",
    "category": "gym-sportswear",
    "categoryName": "Gym & Sportswear",
    "price": 22,
    "inStock": true,
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Purple",
        "hex": "#5B2C6F",
        "images": [
          "/images/products/run-the-race-womens-racerback-tank-purple.webp",
          "/images/products/run-the-race-womens-racerback-tank-lifestyle.webp"
        ]
      },
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/run-the-race-womens-racerback-tank-navy.webp"
        ]
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/run-the-race-womens-racerback-tank-white.webp"
        ]
      }
    ],
    "description": "This women’s racerback sports vest is designed for an active lifestyle, combining a modern athletic look with an uplifting Christian message. The sleeveless style features a comfortable rounded neckline and racerback shape, giving it a sporty silhouette that allows for natural movement during exercise.",
    "scriptureReference": "Hebrews 12:1 — 'Let us run with perseverance the race marked out for us, fixing our eyes on Jesus.'",
    "careInstructions": "Machine wash cold inside out.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/run-the-race-womens-racerback-tank.webp",
    "relatedProductIds": [
      "prod_gym_9",
      "prod_gym_10",
      "prod_gym_6"
    ],
    "seoTitle": "Run the Race Women's Racerback Tank | Adoptd Activewear",
    "seoDescription": "Women's faith racerback sports tank inspired by Hebrews 12:1. Breathable and comfortable for running and workouts."
  },
  {
    "id": "prod_gym_5",
    "name": "Run the Race Christian Men's Tank",
    "slug": "run-the-race-christian-mens-tank",
    "category": "gym-sportswear",
    "categoryName": "Gym & Sportswear",
    "price": 22,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/run-the-race-christian-mens-tank-navy.webp"
        ]
      },
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/run-the-race-christian-mens-tank-black.webp"
        ]
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/run-the-race-christian-mens-tank-white.webp"
        ]
      },
      {
        "name": "Sapphire Blue",
        "hex": "#0F52BA",
        "images": [
          "/images/products/run-the-race-christian-mens-tank-sapphireblue.webp"
        ]
      }
    ],
    "description": "Run your race with faith and purpose in the Run the Race Christian running vest. Featuring a bold cross, the words 'RUN THE RACE' and the Bible reference Hebrews 12:1.",
    "scriptureReference": "Hebrews 12:1 — 'Let us throw off everything that hinders and the sin that so easily entangles.'",
    "careInstructions": "Machine wash 30°C inside out.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/run-the-race-christian-mens-tank.webp",
    "relatedProductIds": [
      "prod_gym_6",
      "prod_gym_3",
      "prod_gym_8"
    ],
    "seoTitle": "Run the Race Christian Men's Tank | Running Vest UK",
    "seoDescription": "Men's athletic running vest carrying Hebrews 12:1. Lightweight, quick-drying Christian gym vest."
  },
  {
    "id": "prod_gym_6",
    "name": "Run the Race Christian Men's T-Shirt",
    "slug": "run-the-race-christian-mens-t-shirt",
    "category": "gym-sportswear",
    "categoryName": "Gym & Sportswear",
    "price": 24,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/run-the-race-christian-mens-t-shirt-navy.webp"
        ]
      },
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/run-the-race-christian-mens-t-shirt-black.webp"
        ]
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/run-the-race-christian-mens-t-shirt-white.webp"
        ]
      },
      {
        "name": "Sapphire Blue",
        "hex": "#0F52BA",
        "images": [
          "/images/products/run-the-race-christian-mens-t-shirt-sapphireblue.webp"
        ]
      }
    ],
    "description": "Run your race with faith and purpose in the Run the Race Christian running T-Shirt. Featuring a bold cross, the words 'RUN THE RACE' and the Bible reference Hebrews 12:1.",
    "scriptureReference": "Hebrews 12:1 — 'And let us run with perseverance the race marked out for us.'",
    "careInstructions": "Machine wash cold inside out.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/run-the-race-christian-mens-t-shirt.webp",
    "relatedProductIds": [
      "prod_gym_5",
      "prod_gym_7",
      "prod_gym_1"
    ],
    "seoTitle": "Run the Race Christian Men's T-Shirt | Adoptd Clothing",
    "seoDescription": "High-performance Christian athletic t-shirt for runners and gym enthusiasts."
  },
  {
    "id": "prod_gym_7",
    "name": "ARMOUR Christian Men's T-Shirt",
    "slug": "armour-christian-mens-t-shirt",
    "category": "gym-sportswear",
    "categoryName": "Gym & Sportswear",
    "price": 24,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/armour-christian-mens-t-shirt-navy.webp"
        ]
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/armour-christian-mens-t-shirt-white.webp"
        ]
      },
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/armour-christian-mens-t-shirt-black.webp"
        ]
      },
      {
        "name": "Sapphire Blue",
        "hex": "#0F52BA",
        "images": [
          "/images/products/armour-christian-mens-t-shirt-sapphireblue.webp"
        ]
      }
    ],
    "description": "Train with purpose and keep your faith close with the ARMOUR Christian sports T-shirt from Adoptd Christian Clothing. Designed for workouts, gym sessions and active days, this faith-inspired gym T-shirt combines a sporty look with a powerful message from Ephesians 6:11.",
    "scriptureReference": "Ephesians 6:11 — 'Put on the full armor of God, so that you can take your stand against the devil’s schemes.'",
    "careInstructions": "Machine wash cold inside out.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/armour-christian-mens-t-shirt.webp",
    "relatedProductIds": [
      "prod_gym_8",
      "prod_gym_9",
      "prod_gym_6"
    ],
    "seoTitle": "ARMOUR Christian Men's T-Shirt | Ephesians 6:11 Gym Tee",
    "seoDescription": "Armor of God performance sports T-shirt designed for heavy gym sessions and daily fitness."
  },
  {
    "id": "prod_gym_8",
    "name": "ARMOUR Christian Men's Performance Tank",
    "slug": "armour-christian-mens-performance-tank",
    "category": "gym-sportswear",
    "categoryName": "Gym & Sportswear",
    "price": 22,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/armour-christian-mens-performance-tank-black.webp"
        ]
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/armour-christian-mens-performance-tank-white.webp"
        ]
      },
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/armour-christian-mens-performance-tank-navy.webp"
        ]
      },
      {
        "name": "Sapphire Blue",
        "hex": "#0F52BA",
        "images": [
          "/images/products/armour-christian-mens-performance-tank-sapphireblue.webp"
        ]
      }
    ],
    "description": "Equip your workout with the full armor of God. High-ventilation athletic cut providing unrestricted mobility for pressing, lifting, and conditioning.",
    "scriptureReference": "Ephesians 6:11 — 'Put on the full armor of God.'",
    "careInstructions": "Wash inside out at 30°C.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/armour-christian-mens-performance-tank.webp",
    "relatedProductIds": [
      "prod_gym_7",
      "prod_gym_3",
      "prod_gym_5"
    ],
    "seoTitle": "ARMOUR Christian Men's Performance Tank | Adoptd",
    "seoDescription": "Men's athletic training vest featuring the ARMOUR Ephesians 6:11 graphic."
  },
  {
    "id": "prod_gym_9",
    "name": "ARMOUR Christian Women's Racerback Tank",
    "slug": "armour-christian-womens-racerback-tank",
    "category": "gym-sportswear",
    "categoryName": "Gym & Sportswear",
    "price": 22,
    "inStock": true,
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/armour-christian-womens-racerback-tank-navy.webp"
        ]
      },
      {
        "name": "Purple",
        "hex": "#5B2C6F",
        "images": [
          "/images/products/armour-christian-womens-racerback-tank-purple.webp"
        ]
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/armour-christian-womens-racerback-tank-white.webp"
        ]
      }
    ],
    "description": "Empowering women in faith and fitness. The ARMOUR racerback sports tank combines flattering athletic contours with Ephesians 6:11 gospel power.",
    "scriptureReference": "Ephesians 6:11 — 'Put on the full armor of God.'",
    "careInstructions": "Machine wash cold inside out.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/armour-christian-womens-racerback-tank.webp",
    "relatedProductIds": [
      "prod_gym_4",
      "prod_gym_10",
      "prod_gym_7"
    ],
    "seoTitle": "ARMOUR Christian Women's Racerback Tank | Adoptd Clothing",
    "seoDescription": "Women's Christian gym vest carrying Ephesians 6:11. Form-flattering athletic fit."
  },
  {
    "id": "prod_gym_10",
    "name": "Train. Pray. Repeat. Women's Racerback Tank",
    "slug": "train-pray-repeat-womens-racerback-tank",
    "category": "gym-sportswear",
    "categoryName": "Gym & Sportswear",
    "price": 22,
    "inStock": true,
    "availableSizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Purple",
        "hex": "#5B2C6F",
        "images": [
          "/images/products/train-pray-repeat-womens-racerback-tank-purple.webp"
        ]
      },
      {
        "name": "Navy",
        "hex": "#1B2A4A",
        "images": [
          "/images/products/train-pray-repeat-womens-racerback-tank-navy.webp"
        ]
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/train-pray-repeat-womens-racerback-tank-white.webp"
        ]
      },
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/train-pray-repeat-womens-racerback-tank-black.webp"
        ]
      }
    ],
    "description": "Daily discipline anchored in Christ. The Train. Pray. Repeat. women's racerback vest is made with featherlight breathable fabric for running, cardio, and weights.",
    "scriptureReference": "1 Thessalonians 5:17 — 'Pray continually.'",
    "careInstructions": "Machine wash 30°C inside out.",
    "sizeGuideType": "unisex-tshirt",
    "featuredImage": "/images/products/train-pray-repeat-womens-racerback-tank.webp",
    "relatedProductIds": [
      "prod_gym_4",
      "prod_gym_9",
      "prod_gym_1"
    ],
    "seoTitle": "Train. Pray. Repeat. Women's Racerback Tank | Adoptd",
    "seoDescription": "Athletic racerback workout vest reminding you to keep prayer at the heart of daily training."
  },
  {
    "id": "prod_xmas_1",
    "name": "O Holy Night Christmas Sweatshirt",
    "slug": "o-holy-night-christmas-sweatshirt",
    "category": "christmas",
    "categoryName": "Christmas",
    "price": 30,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Blue",
        "hex": "#2B4C6F",
        "images": [
          "/images/products/o-holy-night-christmas-sweatshirt-blue.webp"
        ]
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "images": [
          "/images/products/o-holy-night-christmas-sweatshirt-white.webp"
        ]
      }
    ],
    "description": "Celebrate the true meaning of Christmas with our O Holy Night Christmas sweatshirt. A cozy, fleece-lined Christian Christmas jumper designed to bring faith, joy, and festive wonder together.",
    "scriptureReference": "Luke 2:11 — 'Today in the town of David a Savior has been born to you; he is the Messiah, the Lord.'",
    "careInstructions": "Machine wash inside out at 30°C.",
    "sizeGuideType": "sweater",
    "featuredImage": "/images/products/o-holy-night-christmas-sweatshirt.webp",
    "categoryOverview": "Celebrate the true meaning of Christmas with our Christian Christmas collection, created to help you keep Jesus at the heart of the festive season. From Christmas sweatshirts and festive clothing to meaningful gifts, our designs combine Christmas style with messages of faith, hope and joy.",
    "relatedProductIds": [
      "prod_xmas_2",
      "prod_hoodie_5",
      "prod_bag_1"
    ],
    "seoTitle": "O Holy Night Christmas Sweatshirt | Christian Christmas Jumper",
    "seoDescription": "Keep Christ at the heart of Christmas with the O Holy Night cosy sweatshirt."
  },
  {
    "id": "prod_xmas_2",
    "name": "Hope Was Born Christmas Sweatshirt",
    "slug": "hope-was-born-christmas-sweatshirt",
    "category": "christmas",
    "categoryName": "Christmas",
    "price": 30,
    "inStock": true,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      {
        "name": "Black",
        "hex": "#111111",
        "images": [
          "/images/products/hope-was-born-christmas-sweatshirt-black.webp"
        ]
      }
    ],
    "description": "Celebrate the arrival of the King with this cozy Hope Was Born Christmas sweatshirt, featuring an uplifting nativity silhouette and the eternal promise of Christ's advent.",
    "scriptureReference": "Isaiah 9:6 — 'For to us a child is born, to us a son is given, and the government will be on his shoulders. And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.'",
    "careInstructions": "Machine wash cold inside out.",
    "sizeGuideType": "sweater",
    "featuredImage": "/images/products/hope-was-born-christmas-sweatshirt.webp",
    "relatedProductIds": [
      "prod_xmas_1",
      "prod_hoodie_1",
      "prod_bag_4"
    ],
    "seoTitle": "Hope Was Born Christmas Sweatshirt | Christian Christmas Jumper",
    "seoDescription": "Celebrate the true advent hope with the Hope Was Born Christian Christmas sweatshirt."
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
