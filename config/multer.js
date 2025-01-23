
const cloudinary = require("./cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const Projects = require("../models/projectSchema");

// Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const ext = file.mimetype.split('/')[1]
        return {
            folder: 'hero-section',
            public_id: `${file.fieldname}-${Date.now()}`,
            resource_type: 'raw',
            format: ext,
        };
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 25 * 1024 * 1024 }
});

module.exports = upload;