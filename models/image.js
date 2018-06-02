'use strict';
module.exports = (sequelize, DataTypes) => {
  var Image = sequelize.define('Image', {
    fieldname: DataTypes.STRING,
    originalname: DataTypes.STRING,
    encoding: DataTypes.STRING,
    mimetype: DataTypes.STRING,
    destination: DataTypes.STRING,
    filename: DataTypes.STRING,
    size: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Image.associate = (models) => {
    Image.belongsTo(models.User, {foreignKey: 'userId'})
    Image.hasMany(models.Rating, {foreignKey: 'imageId'})
  }
  return Image;
};
