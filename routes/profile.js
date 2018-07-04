'use strict'

const express = require('express')
const router = express.Router()
const models = require('../models')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auth')
const countries = require('../middlewares/countries')

router.get('/', auth, countries, (req, res) => {
  if (!req.user) {
    return res.send('error: please login.')
  }

  res.render('profile', {
    params: {
      email: req.user.email,
      password1: "",
      password2: "",
      birthday: req.user.birthday,
      gender: req.user.gender,
      countryId: req.user.countryId,
    },
    countries: req.countries,
    errors: []
  })
})

router.post('/', auth, countries, (req, res) => {
  if (!req.user) {
    return res.send('error: please login.')
  }

  let updateData = {}

  // email変更
  const email = req.body.email
  if (email && email !== req.user.email) {
    updateData.email = email
  }

  // password変更
  const pw1 = req.body.password1
  const pw2 = req.body.password2
  if (pw1 || pw2) {
    if (!pw1 || !pw2) {
      return res.render('profile', {
        params: req.body,
        countries: req.countries,
        errors: ["パスワードを変更する場合は新規パスワードと確認パスワードを入力してください。"]
      })
    }
    if (pw1.length < 8 || pw2.length < 8) {
      return res.render('profile', {
        params: req.body,
        countries: req.countries,
        errors: ['パスワードを変更する場合は8文字以上で入力してください。']
      })
    }
    if (pw1 !== pw2) {
      return res.render('profile', {
        params: req.body,
        countries: req.countries,
        errors: ['パスワードを変更する場合は新規パスワードと確認用パスワードを等しくしてください。']
      })
    }
    updateData.password = pw1
  }

  // birthday変更
  const birthday = req.body.birthday
  if (birthday && birthday !== req.user.birthday) {
    updateData.birthday = birthday
  }

  // gender変更
  const gender = req.body.gender
  if (gender && gender !== req.user.gender) {
    updateData.gender = gender
  }

  // countryId変更
  const countryId = Number(req.body.countryId)
  if (countryId && countryId !== req.user.countryId) {
    updateData.countryId = countryId
  }

  // 更新
  if ('password' in updateData) {
    bcrypt.hash(updateData.password, 10).then((hash) => {
      updateData.password = hash
    }).then(() => {
      req.user.update(updateData)
    })
  } else {
    req.user.update(updateData)
  }

  let errors = ""
  if (Object.keys(updateData).length === 0) errors = ["何も変更しませんでした。"]
  res.render('profile', {
    params: {
      email: req.body.email,
      password1: "",
      password2: "",
      birthday: req.body.birthday,
      gender: req.body.gender,
      countryId: req.body.countryId,
    },
    countries: req.countries,
    errors: errors
  })
})

module.exports = router
