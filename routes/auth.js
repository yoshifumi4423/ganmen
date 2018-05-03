const express = require('express')
const models = require('../models')
const bcrypt = require("bcrypt")
const auth = require('../middlewares/auth')
const router = express.Router()

router.get('/signup', auth, function(req, res){
  res.render('signup');
})

router.post('/signup', auth, function(req, res){
  bcrypt.hash(req.body.password, 10).then(function(hash){
    models.User.create({
      email:req.body.email,
      password:hash
    }).then(function(user){
      res.send('res_send');
    })
  })
})

router.get('/login', auth, function(req, res){
  console.log("session : ", req.session.user)
  res.render('login')
})

router.post('/login', auth, function(req, res){
  console.log("session : ", req.session.user)
  models.User.findOne({
    where:{
      email:req.body.email
    }
  }).then(function(user){
    bcrypt.compare(req.body.password, user.password).then(function(same){
      if (same) {
        console.log("認証！")
      }
      req.session.user_id = user.id
      res.send('res_send')
    })
  })
})

router.get('/logout', auth, function(req, res){
  if (!req.user) {
    return res.redirect('/')
  }

  req.session.destroy()
  res.send('res_send')
})

module.exports = router
