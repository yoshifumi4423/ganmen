'use strict'
const express = require('express')
const auth = require('../middlewares/auth')
const loginChecker = require('../middlewares/loginChecker')
const router = express.Router()

router.get('/', auth, loginChecker, (req, res) => {
  req.session.destroy()
  res.render('index')
})

module.exports = router