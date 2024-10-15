const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../connections');

class ImageMaster extends Model {};

ImageMaster.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement :true,
    allowNull: false
  },
  data: { 
    type: DataTypes.BLOB, 
    allowNull: false 
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  filename: {
    type: DataTypes.STRING(200)
  },
  compressed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdBy: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.now,
  },
  updatedBy: {
    type: DataTypes.INTEGER,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.now,
  },
},{
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  sequelize,
  modelName: 'ImageMaster'
});


module.exports.ImageMaster = sequelize.models.ImageMaster;