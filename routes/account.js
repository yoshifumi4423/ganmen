'use strict'
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auth')

router.get('/', auth, (req, res) => {
  if (!req.user) {
    return res.send('error: please login.')
  }

  res.render('account', {
    form: {
      email: req.user.email,
    },
  })
})

router.post('/email', auth, (req, res, next) => {
  if (!req.user) {
    return res.send('error: please login.')
  }

  req.user.update(
    { email: req.body.email },
    { returning: true } // 変更後のデータを返すかどうか
  ).then((userObj) => {
    res.render('account', {
      form: {
        email: userObj.dataValues.email,
      },
    })
  }).catch(next)
})

router.post('/password', auth, (req, res, next) => {
  if (!req.user) {
    return res.send('error: please login.')
  }

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

module.exports = router
