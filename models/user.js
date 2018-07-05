'use strict'
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "メールアドレス形式で入力してください。\n（例）*******@***.com"
        },
        notEmpty: {
          msg: "メールアドレスを入力してください。"
        }
      },
      unique: {
        msg: "このメールアドレスはすでに使用されています。別のメールアドレスを使用してください。"
      }
    },
    password: DataTypes.STRING,
    birthday: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "誕生日を入力してください。"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "性別を入力してください。"
        }
      }
    },
    countryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "国を入力してください。"
        }
      }
    }
  }, {})
  User.associate = (models) => {
    User.belongsTo(models.Country, {foreignKey: 'countryId'})
    User.hasMany(models.Image, {foreignKey: 'userId'})
    User.hasMany(models.Rating, {foreignKey: 'userId'})
  }
  return User
}
