'use strict'
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const models = require('../models')
const sendMail = require('../utils/sendMail')
const mailOptions = require('../utils/mailOptions')
const auth = require('../middlewares/auth')
const loginChecker = require('../middlewares/loginChecker')

router.use(auth)
router.use(loginChecker)

router.get('/', (req, res) => {
  res.render('account', {
    form: {
      email: req.user.email,
    },
    errors: []
  })
})

router.post('/email', (req, res, next) => {
  req.user.update(
    { email: req.body.email },
    { returning: true } // 変更後のデータを返すかどうか
  ).then((userObj) => {
    res.render('account', {
      form: {
        email: userObj.dataValues.email,
      },
      errors: []
    })
  }).catch(next)
})

router.post('/password', (req, res, next) => {
  const currentPw = req.body.currentPassword
  const newPw = req.body.newPassword
  const newPwConfirmation = req.body.newPasswordConfirmation

  bcrypt.compare(currentPw, req.user.password)
    .then((same) => {
      req.errors = []

      if (!same) {
        req.errors.push(["正しい現在のパスワードを入力してください。"])
      }
      if (newPw.length < 8 || newPwConfirmation < 8) {
        req.errors.push(["新しいパスワードを8文字以上で入力してください。"])
      }
      if (newPw !== newPwConfirmation) {
        req.errors.push(["新しいパスワードと新しいパスワードの確認を等しくしてください。"])
      }
      if (req.errors.length) return next()

      return bcrypt.hash(newPw, 10)
    })
    .then((hash) => {
      return req.user.update({
        password: hash
      })
    })
    .then(() => next())
    .catch(next)
}, (req, res) => {
  res.render('account', {
    form: {
      email: req.user.email
    },
    errors: req.errors
  })
})

router.post('/delete', (req, res, next) => {
  models.Image.findAll({
    where: {
      userId: req.user.id
    }
  }).then(images => {
    images.forEach(image => {
      // ユーザーの画像に対する評価を削除（複数のテーブルを削除するためmodelsのメソッドを使用する）
      models.Rating.destroy({
        where: {
          imageId: image.id
        }
      })
    })
  }).then(() => {
    // ユーザーの画像に対する評価を削除（複数のテーブルを削除するためmodelsのメソッドを使用する）
    models.Image.destroy({
      where: {
        userId: req.user.id
      }
    })
    console.log("no image")
  }).then(() => {
    const email = req.user.email
    // ユーザーを削除
    req.user.destroy()
    return Promise.resolve(email)
  }).then(email => {
    mailOptions.delete.to = email
    mailOptions.delete.html = mailOptions.delete.html.join("\n")
    sendMail(mailOptions.delete).then(info => {
      console.log("Sent email after user's signup.\n", info)
    }).catch(next)
  }).catch(next)

  res.redirect('../logout')
})

module.exports = router
