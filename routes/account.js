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

router.post('/', auth, (req, res) => {
  if (!req.user) {
    return res.send('error: please login.')
  }

  console.log('email    ' + req.body.email)

  const currentPw = req.body.currentPassword
  const newPw = req.body.newPassword
  const newPwConfirmation = req.body.newPasswordConfirmation

  console.log('currentPw    ' + currentPw)
  console.log('newPw    ' + newPw)
  console.log('newPwConfirmation    ' + newPwConfirmation)
  console.log('req.user.password    ' + req.user.password)

  if (currentPw || newPw || newPwConfirmation) {
    bcrypt.compare(currentPw, req.user.password).then((same) => {
      if (!same) {
        return res.render('account', {
          form: {
            email: req.body.email,
          },
          errors: ["正しい現在のパスワードを入力してください。"]
        })
      }
      if (newPw.length < 8 || newPwConfirmation < 8) {
        return res.render('account', {
          form: {
            email: req.body.email,
          },
          errors: ["新しいパスワードを8文字以上で入力してください。"]
        })
      }
      if (newPw !== newPwConfirmation) {
        return res.render('account', {
          form: {
            email: req.body.email
          },
          errors: ["新しいパスワードと新しいパスワードの確認を等しくしてください。"]
        })
      }

      bcrypt.hash(newPw, 10).then((hash) => {
        req.user.update({
          email: req.body.email,
          password: hash
        })
      })
    })
  } else {
    req.user.update({
      email: req.body.email
    })
  }

  res.render('account', {
    form: {
      email: req.body.email,
    },
    errors: []
  })
})

module.exports = router
