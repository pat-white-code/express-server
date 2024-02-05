// import {} from 'dotenv/config'
require('dotenv').config()
const cloudinary = require('cloudinary').v2
// import {v2 as cloudinary} from 'cloudinary';

const initCloudinary = () => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    return cloudinary
}

module.exports = initCloudinary