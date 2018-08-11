'use strict'
module.exports = (sequelize, DataTypes) => {
  var Country = sequelize.define('Country', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          
        }
      }
    }
  }, {})
  Country.associate = (models) => {
    Country.hasMany(models.User, {foreignKey: 'countryId'})
  }
  return Country
}