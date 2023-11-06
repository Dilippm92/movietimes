const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'drog3carp',
  api_key: '675639854955223',
  api_secret: '_9ABkqLyhSZLh5bAjCpQ-0uy9X4',
});

module.exports = cloudinary;