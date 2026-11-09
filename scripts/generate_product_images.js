const fs = require('fs');
const path = require('path');
const sharp = require('../node_modules/sharp');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const imagesToProcess = [
  // Amazing Grace Hoodie
  {
    src: '/Users/gemma.skevington/Downloads/Cream Amazing Grace Hoodie Mockup.png',
    dest: 'amazing-grace-hoodie.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Amazing Grace Garden Portrait.png',
    dest: 'amazing-grace-hoodie-lifestyle.webp',
  },

  // Faith Over Fear Hoodie
  {
    src: '/Users/gemma.skevington/Downloads/Faith over fear hoodie/PNG/copy-of-copy-of-copy-of-copy-of-copy-of-back-view-mockup-of-a-hoodie-lying-over-a-solid-surface-33900.png',
    dest: 'faith-over-fear-christian-hoodie.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith over fear hoodie/PNG/copy-of-copy-of-copy-of-copy-of-copy-of-back-view-mockup-of-a-hoodie-lying-over-a-solid-surface-33900.png',
    dest: 'faith-over-fear-christian-hoodie-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith over fear hoodie/PNG/copy-of-copy-of-copy-of-copy-of-copy-of-back-view-mockup-of-a-hoodie-lying-over-a-solid-surface-33900-3.png',
    dest: 'faith-over-fear-christian-hoodie-grey.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith over fear hoodie/PNG/copy-of-copy-of-copy-of-copy-of-copy-of-back-view-mockup-of-a-hoodie-lying-over-a-solid-surface-33900-2.png',
    dest: 'faith-over-fear-christian-hoodie-sand.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith over fear hoodie/PNG/copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-back-view-mockup-of-a-woman-wearing-a-hoodie-while-sitting-in-nature-30491.png',
    dest: 'faith-over-fear-christian-hoodie-lifestyle-1.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith over fear hoodie/PNG/copy-of-copy-of-copy-of-copy-of-back-view-pullover-hoodie-mockup-featuring-an-ai-created-man-standing-in-a-bakery-shop-m51324.png',
    dest: 'faith-over-fear-christian-hoodie-lifestyle-2.webp',
  },

  // He Left the 99 Hoodie
  {
    src: '/Users/gemma.skevington/Downloads/99 hoodie/PNG/back-view-mockup-of-a-hoodie-lying-over-a-solid-surface-33900.png',
    dest: 'he-left-the-99-christian-hoodie.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/99 hoodie/PNG/back-view-mockup-of-a-hoodie-lying-over-a-solid-surface-33900.png',
    dest: 'he-left-the-99-christian-hoodie-grey.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/99 hoodie/PNG/back-view-mockup-of-a-hoodie-lying-over-a-solid-surface-33900-2.png',
    dest: 'he-left-the-99-christian-hoodie-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/99 hoodie/PNG/back-view-mockup-of-a-hoodie-lying-over-a-solid-surface-33900-4.png',
    dest: 'he-left-the-99-christian-hoodie-navy.webp',
  },

  // Need Prayer Hoodie
  {
    src: '/Users/gemma.skevington/Downloads/Need prayer hoodie/PNG/copy-of-copy-of-back-view-mockup-of-a-hoodie-lying-over-a-solid-surface-33900.png',
    dest: 'need-prayer-christian-hoodie.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Need prayer hoodie/PNG/copy-of-copy-of-back-view-mockup-of-a-hoodie-lying-over-a-solid-surface-33900.png',
    dest: 'need-prayer-christian-hoodie-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Need prayer hoodie/PNG/copy-of-copy-of-back-view-mockup-of-a-hoodie-lying-over-a-solid-surface-33900-2.png',
    dest: 'need-prayer-christian-hoodie-sand.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Need prayer hoodie/PNG/copy-of-copy-of-back-view-mockup-of-a-hoodie-lying-over-a-solid-surface-33900-3.png',
    dest: 'need-prayer-christian-hoodie-grey.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Need prayer hoodie/PNG/mockup-of-the-back-of-a-girl-wearing-a-hoodie-while-crossing-the-street-a9441-b.png',
    dest: 'need-prayer-christian-hoodie-lifestyle-1.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Need prayer hoodie/PNG/mockup-of-the-back-of-a-hipster-wearing-a-hoodie-a9269b.png',
    dest: 'need-prayer-christian-hoodie-lifestyle-2.webp',
  },

  // Pray Hoodie
  {
    src: '/Users/gemma.skevington/Downloads/Pray Hoodie/PNG/mockup-of-a-pullover-hoodie-placed-on-a-customizable-surface-33899.png',
    dest: 'pray-christian-hoodie.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Pray Hoodie/PNG/mockup-of-a-pullover-hoodie-placed-on-a-customizable-surface-33899-2.png',
    dest: 'pray-christian-hoodie-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Pray Hoodie/PNG/mockup-of-a-pullover-hoodie-placed-on-a-customizable-surface-33899-3.png',
    dest: 'pray-christian-hoodie-grey.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Pray Hoodie/PNG/mockup-of-a-pullover-hoodie-placed-on-a-customizable-surface-33899-4.png',
    dest: 'pray-christian-hoodie-white.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Pray Hoodie/PNG/pullover-hoodie-mockup-of-a-woman-reading-a-book-33881.png',
    dest: 'pray-christian-hoodie-lifestyle-1.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Pray Hoodie/PNG/hoodie-mockup-of-a-man-with-glasses-leaning-on-a-couch-m24806.png',
    dest: 'pray-christian-hoodie-lifestyle-2.webp',
  },

  // Faith Over Fear T-Shirt
  {
    src: '/Users/gemma.skevington/Downloads/Faith over fear/PNG/copy-of-copy-of-copy-of-minimal-mockup-featuring-the-back-of-a-t-shirt-on-a-solid-color-surface-166-el.png',
    dest: 'faith-over-fear-christian-t-shirt.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith over fear/PNG/copy-of-copy-of-copy-of-minimal-mockup-featuring-the-back-of-a-t-shirt-on-a-solid-color-surface-166-el.png',
    dest: 'faith-over-fear-christian-t-shirt-sand.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith over fear/PNG/copy-of-copy-of-minimal-mockup-featuring-the-back-of-a-t-shirt-on-a-solid-color-surface-166-el.png',
    dest: 'faith-over-fear-christian-t-shirt-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith over fear/PNG/copy-of-minimal-mockup-featuring-the-back-of-a-t-shirt-on-a-solid-color-surface-166-el.png',
    dest: 'faith-over-fear-christian-t-shirt-white.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith over fear/PNG/copy-of-copy-of-copy-of-copy-of-back-of-a-man-carrying-a-book-wearing-a-t-shirt-mockup-at-the-park-a11314b.png',
    dest: 'faith-over-fear-christian-t-shirt-lifestyle-1.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith over fear/PNG/back-view-mockup-of-a-woman-wearing-a-t-shirt-in-the-woods-1846-el1.png',
    dest: 'faith-over-fear-christian-t-shirt-lifestyle-2.webp',
  },

  // Pray T-Shirt
  {
    src: '/Users/gemma.skevington/Downloads/Pray Tee/copy-of-copy-of-copy-of-copy-of-copy-of-mockup-of-a-t-shirt-lying-flat-on-a-color-customizable-surface-208-el1.png',
    dest: 'pray-christian-t-shirt.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Pray Tee/copy-of-copy-of-copy-of-copy-of-copy-of-mockup-of-a-t-shirt-lying-flat-on-a-color-customizable-surface-208-el1.png',
    dest: 'pray-christian-t-shirt-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Pray Tee/copy-of-copy-of-copy-of-copy-of-copy-of-mockup-of-a-t-shirt-lying-flat-on-a-color-customizable-surface-208-el1 (1).png',
    dest: 'pray-christian-t-shirt-white.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Pray Tee/copy-of-copy-of-copy-of-copy-of-copy-of-mockup-of-a-t-shirt-lying-flat-on-a-color-customizable-surface-208-el1 (2).png',
    dest: 'pray-christian-t-shirt-grey.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Pray Tee/middle-aged-woman-without-shoes-sitting-down-while-wearing-a-tshirt-mockup-a15917.png',
    dest: 'pray-christian-t-shirt-lifestyle-1.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Pray Tee/copy-of-copy-of-copy-of-copy-of-smiling-man-wearing-a-tshirt-mockup-at-a-4th-of-july-bbq-a20840.png',
    dest: 'pray-christian-t-shirt-lifestyle-2.webp',
  },

  // Need Prayer T-Shirt
  {
    src: '/Users/gemma.skevington/Downloads/Need prayer tee/copy-of-copy-of-mockup-of-the-back-of-a-t-shirt-against-a-plain-background-219-el.png',
    dest: 'need-prayer-christian-t-shirt.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Need prayer tee/copy-of-copy-of-mockup-of-the-back-of-a-t-shirt-against-a-plain-background-219-el (1).png',
    dest: 'need-prayer-christian-t-shirt-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Need prayer tee/copy-of-copy-of-mockup-of-the-back-of-a-t-shirt-against-a-plain-background-219-el (2).png',
    dest: 'need-prayer-christian-t-shirt-white.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Need prayer tee/copy-of-copy-of-mockup-of-the-back-of-a-t-shirt-against-a-plain-background-219-el (3).png',
    dest: 'need-prayer-christian-t-shirt-navy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Need prayer tee/back-view-mockup-of-a-woman-with-locs-wearing-a-bella-canvas-t-shirt-m39805.png',
    dest: 'need-prayer-christian-t-shirt-lifestyle-1.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Need prayer tee/copy-of-copy-of-back-view-tee-mockup-of-a-man-working-from-home-m15519-r-el2.png',
    dest: 'need-prayer-christian-t-shirt-lifestyle-2.webp',
  },

  // The Lord Is My Light T-Shirt
  {
    src: '/Users/gemma.skevington/Downloads/Light and sal tee/bella-canvas-t-shirt-mockup-featuring-a-colorful-surface-m30578.png',
    dest: 'the-lord-is-my-light-christian-t-shirt.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Light and sal tee/bella-canvas-t-shirt-mockup-featuring-a-colorful-surface-m30578.png',
    dest: 'the-lord-is-my-light-christian-t-shirt-white.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Light and sal tee/bella-canvas-t-shirt-mockup-featuring-a-colorful-surface-m30578 (1).png',
    dest: 'the-lord-is-my-light-christian-t-shirt-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Light and sal tee/bella-canvas-t-shirt-mockup-featuring-a-colorful-surface-m30578 (2).png',
    dest: 'the-lord-is-my-light-christian-t-shirt-sand.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Light and sal tee/copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-t-shirt-mockup-featuring-a-woman-in-the-woods-1841-el1.png',
    dest: 'the-lord-is-my-light-christian-t-shirt-lifestyle.webp',
  },

  // He Left the 99 T-Shirt
  {
    src: '/Users/gemma.skevington/Downloads/99 tee/mockup-featuring-the-back-of-a-tee-against-a-plain-background-220-el1.png',
    dest: 'he-left-the-99-christian-t-shirt.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/99 tee/mockup-featuring-the-back-of-a-tee-against-a-plain-background-220-el1.png',
    dest: 'he-left-the-99-christian-t-shirt-sand.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/99 tee/mockup-featuring-the-back-of-a-tee-against-a-plain-background-220-el1 (1).png',
    dest: 'he-left-the-99-christian-t-shirt-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/99 tee/mockup-featuring-the-back-of-a-tee-against-a-plain-background-220-el1 (2).png',
    dest: 'he-left-the-99-christian-t-shirt-green.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/99 tee/copy-of-copy-of-back-view-mockup-featuring-a-man-wearing-a-bella-canvas-t-shirt-m50065.png',
    dest: 'he-left-the-99-christian-t-shirt-lifestyle.webp',
  },

  // Faith Can Move Mountains T-Shirt
  {
    src: '/Users/gemma.skevington/Downloads/Faith can move mountains/faith move mountains png/closeup-view-mockup-of-a-flat-laid-tee-on-a-solid-surface-25631.png',
    dest: 'faith-can-move-mountains-christian-t-shirt.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith can move mountains/faith move mountains png/closeup-view-mockup-of-a-flat-laid-tee-on-a-solid-surface-25631.png',
    dest: 'faith-can-move-mountains-christian-t-shirt-navy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith can move mountains/faith move mountains png/closeup-view-mockup-of-a-flat-laid-tee-on-a-solid-surface-25631 (1).png',
    dest: 'faith-can-move-mountains-christian-t-shirt-sand.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith can move mountains/faith move mountains png/closeup-view-mockup-of-a-flat-laid-tee-on-a-solid-surface-25631 (2).png',
    dest: 'faith-can-move-mountains-christian-t-shirt-white.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Faith can move mountains/faith move mountains png/copy-of-copy-of-copy-of-copy-of-t-shirt-mockup-featuring-a-woman-in-the-woods-1841-el1.png',
    dest: 'faith-can-move-mountains-christian-t-shirt-lifestyle.webp',
  },

  // Jesus T-Shirt
  {
    src: '/Users/gemma.skevington/Downloads/closeup-view-mockup-of-a-flat-laid-tee-on-a-solid-surface-25631-10.png',
    dest: 'jesus-christian-t-shirt.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/closeup-view-mockup-of-a-flat-laid-tee-on-a-solid-surface-25631-10.png',
    dest: 'jesus-christian-t-shirt-navy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/closeup-view-mockup-of-a-flat-laid-tee-on-a-solid-surface-25631-11.png',
    dest: 'jesus-christian-t-shirt-lightblue.webp',
  },

  // Tote Bags Lifestyle Mockups
  {
    src: '/Users/gemma.skevington/Downloads/sublimated-canvas-tote-bag-mockup-of-a-woman-texting-a11495.webp',
    dest: 'the-true-vine-tote-lifestyle.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/tote-bag-mockup-of-a-woman-with-headphones-in-the-city-29453.png',
    dest: 'amazing-grace-tote-lifestyle.webp',
  },
];

async function run() {
  console.log(`Processing ${imagesToProcess.length} images...`);
  for (const item of imagesToProcess) {
    if (!fs.existsSync(item.src)) {
      console.warn(`WARNING: Source not found: ${item.src}`);
      continue;
    }
    const outputPath = path.join(targetDir, item.dest);
    try {
      await sharp(item.src)
        .resize(1000, 1250, { fit: 'cover', position: 'center' })
        .webp({ quality: 85, effort: 4 })
        .toFile(outputPath);
      const stat = fs.statSync(outputPath);
      console.log(`✓ Processed ${item.dest} (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`✗ Error processing ${item.dest}:`, err.message);
    }
  }
  console.log('All image processing complete!');
}

run();

const gymAndChristmasImages = [
  // Kingdom Athlete Hoodie
  {
    src: '/Users/gemma.skevington/Downloads/Black Kingdom Athlete Hoodie.png',
    dest: 'kingdom-athlete-christian-hoodie.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Black Kingdom Athlete Hoodie.png',
    dest: 'kingdom-athlete-christian-hoodie-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Burgundy Kingdom Athlete Hoodie Flat Lay.png',
    dest: 'kingdom-athlete-christian-hoodie-burgundy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Navy Kingdom Athlete Hoodie Mockup.png',
    dest: 'kingdom-athlete-christian-hoodie-navy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Kingdom Athlete Teal Hoodie Mockup.png',
    dest: 'kingdom-athlete-christian-hoodie-green.webp',
  },

  // Kingdom Athlete Sweatshirt
  {
    src: '/Users/gemma.skevington/Downloads/Kingdom Athletes Trackside Rest.png',
    dest: 'kingdom-athlete-christian-sweatshirt.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Kingdom Athletes Trackside Rest.png',
    dest: 'kingdom-athlete-christian-sweatshirt-grey.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Burgundy Kingdom Athlete Hoodie Flat Lay.png',
    dest: 'kingdom-athlete-christian-sweatshirt-burgundy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Navy Kingdom Athlete Hoodie Mockup.png',
    dest: 'kingdom-athlete-christian-sweatshirt-navy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Kingdom Athlete Teal Hoodie Mockup.png',
    dest: 'kingdom-athlete-christian-sweatshirt-green.webp',
  },

  // Kingdom Athlete Men's Performance Tank
  {
    src: '/Users/gemma.skevington/Downloads/Kingdom Athlete Performance Vest.png',
    dest: 'kingdom-athlete-mens-performance-tank.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Teal Kingdom Athlete Tank Mockup.png',
    dest: 'kingdom-athlete-mens-performance-tank-sapphireblue.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Navy Kingdom Athlete Tank Top.png',
    dest: 'kingdom-athlete-mens-performance-tank-navy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Kingdom Athlete Tank Top Mockup.png',
    dest: 'kingdom-athlete-mens-performance-tank-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Kingdom Athlete Gym Portrait.png',
    dest: 'kingdom-athlete-mens-performance-tank-lifestyle.webp',
  },

  // Run the Race Women's Racerback Tank
  {
    src: '/Users/gemma.skevington/Downloads/Purple Racerback Tank with Inspirational Print.png',
    dest: 'run-the-race-womens-racerback-tank.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Purple Racerback Tank with Inspirational Print.png',
    dest: 'run-the-race-womens-racerback-tank-purple.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Navy Racerback Tank_ Run the Race.png',
    dest: 'run-the-race-womens-racerback-tank-navy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/White Racerback Tank_ Run the Race.png',
    dest: 'run-the-race-womens-racerback-tank-white.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/bella-canvas-tank-top-mockup-of-a-happy-woman-in-a-running-styled-outfit-m39677.png',
    dest: 'run-the-race-womens-racerback-tank-lifestyle.webp',
  },

  // Run the Race Christian Men's Tank
  {
    src: '/Users/gemma.skevington/Downloads/Navy Run the Race Athletic Tank.png',
    dest: 'run-the-race-christian-mens-tank.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Navy Run the Race Athletic Tank.png',
    dest: 'run-the-race-christian-mens-tank-navy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Black Run the Race Athletic Tank.png',
    dest: 'run-the-race-christian-mens-tank-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/White Athletic Tank Top with Run the Race Graphic.png',
    dest: 'run-the-race-christian-mens-tank-white.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Blue Athletic Tank with Run the Race Graphic.png',
    dest: 'run-the-race-christian-mens-tank-sapphireblue.webp',
  },

  // Run the Race Christian Men's T-Shirt
  {
    src: '/Users/gemma.skevington/Downloads/Navy Run the Race T-Shirt Mockup.png',
    dest: 'run-the-race-christian-mens-t-shirt.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Navy Run the Race T-Shirt Mockup.png',
    dest: 'run-the-race-christian-mens-t-shirt-navy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Run the Race Christian T-Shirt Mockup.png',
    dest: 'run-the-race-christian-mens-t-shirt-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/White Athletic Tank Top Mockup with RUN THE RACE Design.png',
    dest: 'run-the-race-christian-mens-t-shirt-white.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Sky-Blue T-Shirt_ Run the Race.png',
    dest: 'run-the-race-christian-mens-t-shirt-sapphireblue.webp',
  },

  // ARMOUR Christian Men's T-Shirt
  {
    src: '/Users/gemma.skevington/Downloads/French Navy Armour T-Shirt Mockup.png',
    dest: 'armour-christian-mens-t-shirt.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/French Navy Armour T-Shirt Mockup.png',
    dest: 'armour-christian-mens-t-shirt-navy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/ARMOUR Faith T-Shirt Mockup.png',
    dest: 'armour-christian-mens-t-shirt-white.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Armour Ephesians 6_11 T-Shirt Mockup.png',
    dest: 'armour-christian-mens-t-shirt-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Blue Armour Faith T-Shirt Flat Lay.png',
    dest: 'armour-christian-mens-t-shirt-sapphireblue.webp',
  },

  // ARMOUR Christian Men's Performance Tank
  {
    src: '/Users/gemma.skevington/Downloads/Armour Ephesians 6_11 T-Shirt Mockup.png',
    dest: 'armour-christian-mens-performance-tank.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/ARMOUR Faith T-Shirt Mockup.png',
    dest: 'armour-christian-mens-performance-tank-white.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Armour Ephesians 6_11 T-Shirt Mockup.png',
    dest: 'armour-christian-mens-performance-tank-black.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/French Navy Armour T-Shirt Mockup.png',
    dest: 'armour-christian-mens-performance-tank-navy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Blue Armour Faith T-Shirt Flat Lay.png',
    dest: 'armour-christian-mens-performance-tank-sapphireblue.webp',
  },

  // ARMOUR Christian Women's Racerback Tank
  {
    src: '/Users/gemma.skevington/Downloads/Navy Racerback Tank_ Run the Race.png',
    dest: 'armour-christian-womens-racerback-tank.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Navy Racerback Tank_ Run the Race.png',
    dest: 'armour-christian-womens-racerback-tank-navy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Purple Racerback Tank with Inspirational Print.png',
    dest: 'armour-christian-womens-racerback-tank-purple.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/White Racerback Tank_ Run the Race.png',
    dest: 'armour-christian-womens-racerback-tank-white.webp',
  },

  // Train. Pray. Repeat. Women's Racerback Tank
  {
    src: '/Users/gemma.skevington/Downloads/mockup-of-a-racerback-tank-top-lying-over-a-surface-23850-2.png',
    dest: 'train-pray-repeat-womens-racerback-tank.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/mockup-of-a-racerback-tank-top-lying-over-a-surface-23850-2.png',
    dest: 'train-pray-repeat-womens-racerback-tank-purple.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/mockup-of-a-racerback-tank-top-lying-over-a-surface-23850-3.png',
    dest: 'train-pray-repeat-womens-racerback-tank-navy.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/mockup-of-a-racerback-tank-top-lying-over-a-surface-23850-4.png',
    dest: 'train-pray-repeat-womens-racerback-tank-white.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/mockup-of-a-racerback-tank-top-lying-over-a-surface-23850-5.png',
    dest: 'train-pray-repeat-womens-racerback-tank-black.webp',
  },

  // O Holy Night Christmas Sweatshirt
  {
    src: '/Users/gemma.skevington/Downloads/Cosy Christmas Sweatshirt Portrait.png',
    dest: 'o-holy-night-christmas-sweatshirt.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Cosy Christmas Sweatshirt Portrait.png',
    dest: 'o-holy-night-christmas-sweatshirt-blue.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/O Holly Night/O Holly Night 1.png',
    dest: 'o-holy-night-christmas-sweatshirt-white.webp',
  },

  // Hope was Born Christmas Sweatshirt
  {
    src: '/Users/gemma.skevington/Downloads/Hope Was Born_ Cosy Christmas Moment.png',
    dest: 'hope-was-born-christmas-sweatshirt.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/Hope Was Born_ Cosy Christmas Moment.png',
    dest: 'hope-was-born-christmas-sweatshirt-black.webp',
  },

  // Amazing Grace Christian T-Shirt
  {
    src: '/Users/gemma.skevington/Downloads/simple-mockup-of-a-round-neck-tee-placed-over-a-flat-surface-41331-r-el2(5).png',
    dest: 'amazing-grace-christian-t-shirt.webp',
  },
  {
    src: '/Users/gemma.skevington/Downloads/simple-mockup-of-a-round-neck-tee-placed-over-a-flat-surface-41331-r-el2(5).png',
    dest: 'amazing-grace-christian-t-shirt-grey.webp',
  },
];

async function processGymAndChristmas() {
  console.log(`Processing ${gymAndChristmasImages.length} gym & Christmas images...`);
  for (const item of gymAndChristmasImages) {
    if (!fs.existsSync(item.src)) {
      console.warn(`WARNING: Source not found: ${item.src}`);
      continue;
    }
    const outputPath = path.join(targetDir, item.dest);
    try {
      await sharp(item.src)
        .resize(1000, 1250, { fit: 'cover', position: 'center' })
        .webp({ quality: 85, effort: 4 })
        .toFile(outputPath);
      const stat = fs.statSync(outputPath);
      console.log(`✓ Processed ${item.dest} (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`✗ Error processing ${item.dest}:`, err.message);
    }
  }
  console.log('Gym & Christmas image processing complete!');
}

processGymAndChristmas();
