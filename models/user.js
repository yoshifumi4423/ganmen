'use strict';
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
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Image, {foreignKey: 'userId'})
  }
  return User;
};
