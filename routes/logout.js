'use strict'
const express = require('express')
const auth = require('../middlewares/auth')
const loginChecker = require('../middlewares/loginChecker')
const router = express.Router()

router.get('/', auth, loginChecker, function(req, res){
  req.session.destroy()
  res.send('res_send')
})

module.exports = router