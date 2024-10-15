
const sharp = require('sharp');
const { ImageMaster } = require("../models/imageMaster");
module.exports.addImage = async (req, res) => {
    try {
      const compressedBuffer = await sharp(req.file.buffer).resize({ width: 800 })
    
      const dogPic = await ImageMaster.create({
        filename: req.file.originalname,
        compressed: true,
        data: compressedBuffer,
        userId: 1
      });
      res.status(201).send(dogPic);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error uploading file' });
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
        return res.status(404).send({ error: 'Image not found' });
      }
      res.status(201).send(dogPic);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error uploading file' });
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
        return res.status(404).send({ error: 'Image not found' });
      }
      return res.status(201).send(dogPic);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error uploading file' });
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
        return res.status(404).send({ error: 'Image not found' });
      }
      return res.status(201).send(dogPic);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error uploading file' });
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
      return res.status(404).send({ error: 'Image not found' });
    }
    return res.status(201).send(dogPic);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error uploading file' });
  }
}