const cloudinary = require('cloudinary').v2;

// Cloudinary Configuring 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_COULD_NAME,
    cloud_key: process.env.CLOUDINARY_API_KEY,
    cloud_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = cloudinary;