const express   = require('express');
const router    = express.Router();
const { validateAccessToken } = require("../services/auth")
const multer = require('multer');
const maxSize = process.env.MAX_FILE_SIZE || 2000000;

const { addImage, updateImage, deleteImage, getImageDetails, getImageList, getBuffer } = require("../controller/dogimage");

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
router.post('/add', validateAccessToken, upload.single('dogPic') , addImage);

router.patch('/update', validateAccessToken, upload.single('dogPic') , updateImage);

router.delete('/delete', validateAccessToken, deleteImage);

router.get('/details', validateAccessToken, getImageDetails);

router.get('/list', validateAccessToken, getImageList);

router.get('/buffer', validateAccessToken, getBuffer)

module.exports = router;
