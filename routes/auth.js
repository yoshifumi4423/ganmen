const express = require('express')
const models = require('../models')
const bcrypt = require("bcrypt")
const auth = require('../middlewares/auth')
const router = express.Router()

router.get('/signup', auth, function(req, res){
  res.render('signup');
})

router.post('/signup', auth, function(req, res, next){
  const pw = req.body.password
  if(!pw){
    return res.render('signup', {
      errors: ["パスワードを入力してください。"]
    })
  }else if(pw.length < 8){
    return res.render('signup', {
      errors: ["パスワードを8文字以上で入力してください。"]
    })
  }

  bcrypt.hash(pw, 10).then((hash) => {
    models.User.create({
      email:req.body.email,
      password:hash
    }).then((user) => {
      throw new Error("テストエラー")
      res.redirect('/');
    }).catch((errorObj) => {
      if(errorObj.name === 'SequelizeValidationError' ||
         errorObj.name === 'SequelizeUniqueConstraintError'){
        console.log(errorObj)
        return res.render('signup', {
          errors: errorObj.errors.map(e => e.message)
        })
      }
      
      return next(errorObj)
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
