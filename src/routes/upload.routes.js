const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

// Use memory storage; we only send file buffer to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload/image
// Expects multipart/form-data with field `image`
router.post('/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'sports-scoreboard',
        resource_type: 'image'
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ success: false, message: 'Image upload failed' });
        }

        return res.json({
          success: true,
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    );

    // Write the buffer to the Cloudinary upload stream
    stream.end(req.file.buffer);
  } catch (err) {
    console.error('Upload route error:', err);
    return res.status(500).json({ success: false, message: 'Unexpected error while uploading image' });
  }
});

module.exports = router;
