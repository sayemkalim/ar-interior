const sharp = require('sharp');
const fs = require('fs');

// Create a square favicon from the rectangular image
sharp('public/favicon.jpeg')
  .resize(512, 512, {
    fit: 'contain',
    background: { r: 255, g: 255, b: 255, alpha: 1 }
  })
  .toFile('public/favicon.ico', (err, info) => {
    if (err) {
      console.error('Error creating favicon:', err);
    } else {
      console.log('Favicon created successfully');
      // Also copy to app directory
      fs.copyFileSync('public/favicon.ico', 'src/app/favicon.ico');
      console.log('Copied to src/app/favicon.ico');
    }
  });
