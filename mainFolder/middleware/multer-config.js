const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = '/home/azureuser/images';

    // Assure-toi que le dossier existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = path.extname(file.originalname);
    callback(null, `${Date.now()}_${name}${extension}`);
  }
});

module.exports = multer({ storage }).single('image');
