const express   = require('express');
const router    = express.Router();

const multer = require('multer');
const maxSize = process.env.MAX_FILE_SIZE || 2000000;

const { addImage, updateImage, deleteImage, getImageDetails, getImageList } = require("../controller/dogimage");

const upload = multer({ 
  limits: { fileSize: maxSize }, 
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('File must be an image'));
    }
    cb(null, true);
  }
});


/**
* API routes for audittrails operation
*/
router.post('/add', upload.single('dogPic') , addImage);

router.patch('/update', upload.single('dogPic') , updateImage);

router.delete('/delete', deleteImage);

router.get('/details', getImageDetails);

router.get('/list', getImageList);

module.exports = router;
