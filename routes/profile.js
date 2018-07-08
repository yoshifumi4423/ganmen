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
    form: req.user,
    countries: req.countries,
    errors: []
  })
})

router.post('/', auth, countries, (req, res) => {
  if (!req.user) {
    return res.send('error: please login.')
  }

  req.user.update(req.body).then((user) => {
    res.render('profile', {
      form: req.body,
      countries: req.countries,
      errors: []
    })
  })
})

module.exports = router