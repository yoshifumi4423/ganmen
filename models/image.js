'use strict'
module.exports = (sequelize, DataTypes) => {
  var Image = sequelize.define('Image', {
    mimetype: DataTypes.STRING,
    originalUrl: DataTypes.STRING,
    thumbnailUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {})
  Image.associate = (models) => {
    Image.belongsTo(models.User, {foreignKey: 'userId'})
    Image.hasMany(models.Rating, {foreignKey: 'imageId'})
  }
  return Image
}
