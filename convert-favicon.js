const sharp = require('sharp');
const fs = require('fs');

sharp('public/favicon.jpeg')
  .resize(32, 32)
  .toFile('public/favicon.ico', (err, info) => {
    if (err) {
      console.error('Error converting favicon:', err);
    } else {
      console.log('Favicon converted successfully:', info);
      // Also copy to app directory
      fs.copyFileSync('public/favicon.ico', 'src/app/favicon.ico');
      console.log('Copied to src/app/favicon.ico');
    }
  });
