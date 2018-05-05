'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rating = sequelize.define('Rating', {
    like: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER
  }, {});
  Rating.associate = (models) => {
//    Rating.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Rating;
};
