import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const router = express.Router();

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'service-connect', // Specify folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed formats
    },
});

const upload = multer({ storage: storage });

// Upload route
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // Return the uploaded image URL
    res.status(200).json({ url: req.file.path });
});

export default {router,upload};
