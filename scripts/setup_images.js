import fs from 'fs';
import path from 'path';
import https from 'https';

const dirs = [
  'public/images/home',
  'public/images/services',
  'public/images/transformations',
  'public/images/about',
  'public/images/locations',
  'public/images/blog',
  'public/images/industries',
];

dirs.forEach((dir) => {
  fs.mkdirSync(path.join(process.cwd(), dir), { recursive: true });
});

const imagesToDownload = [
  // Home
  { path: 'public/images/home/hero-banner.jpg', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80' },
  { path: 'public/images/home/hero-cleaner.jpg', url: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/home/stats-bg.jpg', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },

  // Services
  { path: 'public/images/services/residential-deep.jpg', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/services/office-commercial.jpg', url: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/services/sofa-upholstery.jpg', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/services/carpet-shampoo.jpg', url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/services/mattress-cleaning.jpg', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/services/post-construction.jpg', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/services/pest-control.jpg', url: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/services/water-tank.jpg', url: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/services/window-facade.jpg', url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/services/pressure-washing.jpg', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/services/curtain-steaming.jpg', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/services/institutional.jpg', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' },

  // Transformations
  { path: 'public/images/transformations/sofa-before.jpg', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80' },
  { path: 'public/images/transformations/sofa-after.jpg', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80' },
  { path: 'public/images/transformations/postconst-before.jpg', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80' },
  { path: 'public/images/transformations/postconst-after.jpg', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
  { path: 'public/images/transformations/carpet-before.jpg', url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80' },
  { path: 'public/images/transformations/carpet-after.jpg', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80' },
  { path: 'public/images/transformations/watertank-before.jpg', url: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=600&q=80' },
  { path: 'public/images/transformations/watertank-after.jpg', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80' },

  // About
  { path: 'public/images/about/team-office.jpg', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/about/equipment-steam.jpg', url: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/about/about-hero.jpg', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },

  // Locations
  { path: 'public/images/locations/nakuru-cbd.jpg', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/locations/milimani.jpg', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/locations/kiamunyi.jpg', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/locations/section-58.jpg', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/locations/lanet.jpg', url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/locations/naka-pipeline.jpg', url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/locations/naivasha.jpg', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/locations/gilgil.jpg', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/locations/njoro-kabarak.jpg', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/locations/greater-nakuru.jpg', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },

  // Blog
  { path: 'public/images/blog/sofa-care-guide.jpg', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/blog/post-construction-checklist.jpg', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/blog/water-tank-hygiene.jpg', url: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/blog/pest-prevention.jpg', url: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/blog/airbnb-turnover.jpg', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80' },

  // Industries
  { path: 'public/images/industries/hotels.jpg', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/industries/offices.jpg', url: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/industries/airbnbs.jpg', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/industries/schools.jpg', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80' },
  { path: 'public/images/industries/factories.jpg', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting downloading ${imagesToDownload.length} image files into category folders...`);
  for (const item of imagesToDownload) {
    const fullPath = path.join(process.cwd(), item.path);
    try {
      await downloadFile(item.url, fullPath);
      console.log(`✓ Saved: ${item.path}`);
    } catch (err) {
      console.error(`✗ Failed ${item.path}:`, err.message);
    }
  }
  console.log('Finished setting up structured category images!');
}

run();
