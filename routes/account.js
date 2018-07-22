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
    errors: []
  })
})

router.post('/email', auth, (req, res) => {
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
      errors: []
    })
  })
})

router.post('/password', auth, (req, res, next) => {
  if (!req.user) {
    return res.send('error: please login.')
  }

  const currentPw = req.body.currentPassword
  const newPw = req.body.newPassword
  const newPwConfirmation = req.body.newPasswordConfirmation

  if (!currentPw && !newPw && !newPwConfirmation) {
    req.errors = ["正しい現在のパスワードを入力してください。"]
    return next()
  }

  bcrypt.compare(currentPw, req.user.password).then((same) => {
    if (!same) {
      req.errors = ["正しい現在のパスワードを入力してください。"]
      return next()
      }
    else if (newPw.length < 8 || newPwConfirmation < 8) {
      req.errors = ["新しいパスワードを8文字以上で入力してください。"]
      return next()
    }
    else if (newPw !== newPwConfirmation) {
      req.errors = ["新しいパスワードと新しいパスワードの確認を等しくしてください。"]
      return next()
    }

    bcrypt.hash(newPw, 10).then((hash) => {
      req.user.update({
        password: hash
      }).then((userObj) => {
        req.errors = []
        return next()
      })
    })
  })
}, (req, res) => {
  res.render('account', {
    form: {
      email: req.user.email
    },
    errors: req.errors
  })
})

module.exports = router
