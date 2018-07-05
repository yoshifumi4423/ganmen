'use strict'
const models = require('../models')

const countries = (req, res, next) => {
  models.Country.findAll().then((countries) => {
    req.countries = countries
    next()
  })
}

module.exports = countries
