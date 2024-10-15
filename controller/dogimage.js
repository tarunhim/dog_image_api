
const sharp = require('sharp');
const { ImageMaster } = require("../models/imageMaster");
const { createJsonResponse } = require("../services/response");
module.exports.addImage = async (req, res) => {
    try {
      const compressedBuffer = await sharp(req.file.buffer).resize({ width: 800 }).toBuffer();
    
      const dogPic = await ImageMaster.create({
        filename: req.file.originalname,
        compressed: true,
        data: compressedBuffer,
        userId: 1
      });

      res.status(201).send(createJsonResponse(true, 'Image uploaded successfully', null, dogPic));

    } catch (error) {
      console.error(error);
      res.status(500).send(createJsonResponse(false, 'Error uploading file', error, null));
    }
}

module.exports.updateImage = async (req, res) => {
    try {
        console.log(req.file, req.query)
      const compressedBuffer = await sharp(req.file.buffer).resize({ width: 800 })
    
      const dogPic = await ImageMaster.update({
        filename: req.file.originalname,
        compressed: true,
        data: compressedBuffer,
        userId: 1
      }, {
        where: {
          id: req.query.id,
          isActive: true
        }
      });

      if(dogPic[0] == 0){
        return res.status(404).send(createJsonResponse(false, 'Image not found', null, null));
      }

      res.status(201).send(createJsonResponse(true, 'Image updated successfully', null, null));

    } catch (error) {
      console.error(error);
      res.status(500).send(createJsonResponse(false, 'Error uploading file', error, null));
    }
}

module.exports.deleteImage = async (req, res) => {
    try {
      const dogPic = await ImageMaster.update({
        isActive: false
      },{
        where: {
          id: req.query.id,
          isActive: true
        }
      })

      if(dogPic[0] == 0){
        return res.status(404).send(createJsonResponse(false, 'Image not found', null, null));
      }

      return res.status(201).send(createJsonResponse(true, 'Image deleted successfully', null, null));

    } catch (error) {
      console.error(error);
      res.status(500).send(createJsonResponse(false, 'Error uploading file', error, null));
    }
}

module.exports.getImageDetails = async (req, res) => {
    try {
      const dogPic = await ImageMaster.findOne({
        where: {
          id: req.query.id,
          isActive: true
        }
      })

      if(!dogPic){
        return res.status(404).send(createJsonResponse(false, 'Image not found', null, null));
      }

      return res.status(201).send(createJsonResponse(true, 'Image found successfully', null, dogPic));

    } catch (error) {
      console.error(error);
      res.status(500).send(createJsonResponse(false, 'Error uploading file', error, null));
    }
}

module.exports.getImageList = async (req, res) => {
  try {
    const dogPic = await ImageMaster.findAll({
      where: {
        isActive: true
      }
    })

    if(!dogPic){
      return res.status(404).send(createJsonResponse(false, 'Image not found', null, null));
    }
    
    return res.status(201).send(createJsonResponse(true, 'Image found successfully', null, dogPic));

  } catch (error) {
    console.error(error);
    res.status(500).send(createJsonResponse(false, 'Error uploading file', error, null));
  }
}

module.exports.getBuffer = async (req, res) => {
  try {
    const dogPic = await ImageMaster.findOne({
      where: {
        id: req.query.id,
        isActive: true
      }
    })

    if(!dogPic){
      return res.status(404).send({ error: 'Image not found' });
    }

    const compressedBuffer = dogPic.data;
    res.set('Content-Type', 'image/jpeg');
    return res.status(200).send(compressedBuffer);

  } catch (error) {
    console.error(error);
    res.status(500).send(createJsonResponse(false, 'Error uploading file', error, null));
  }
}