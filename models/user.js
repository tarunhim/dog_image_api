const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../connections');

class User extends Model {};

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement :true,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false
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
  modelName: 'User'
});


module.exports.User = sequelize.models.User;