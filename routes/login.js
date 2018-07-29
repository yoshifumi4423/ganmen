'use strict'
const express = require('express')
const models = require('../models')
const bcrypt = require("bcrypt")
const auth = require('../middlewares/auth')
const logoutChecker = require('../middlewares/logoutChecker')
const router = express.Router()

router.use(auth)
router.use(logoutChecker)

router.get('/', function(req, res){
  console.log("session : ", req.session.user)
  res.render('login')
})

router.post('/', function(req, res){
  console.log("session : ", req.session.user)
  models.User.findOne({
    where:{
      email:req.body.email
    }
  }).then((user) => {
    bcrypt.compare(req.body.password, user.password).then((same) => {
      req.session.user_id = user.id
      res.send('res_send')
    })
  }).catch((errorObj) => {
    
  })
})

module.exports = router