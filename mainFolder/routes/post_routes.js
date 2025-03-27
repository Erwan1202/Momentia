const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');
const multer = require('multer');
const path = require('path');

// Config Multer
const storage = multer.diskStorage({
    destination: '/home/azureuser/images',
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// Route POST avec image
router.post('/', upload.single('image'), postController.createPost);

module.exports = router;
