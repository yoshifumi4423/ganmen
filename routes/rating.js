const express = require('express')
const models = require('../models')
const auth = require('../middlewares/auth')
const router = express.Router()

router.post('/skip', auth, (req, res) => {
  if(!req.user){
    return res.redirect('/')
  }

  models.Rating.create({
    like: false,
    userId: req.user.id,
    imageId: req.body.imageId
  }).then((rating) => {
    console.log(rating)
    res.redirect('/')
  })
})

router.post('/like', auth, function(req, res){
  if (!req.user) {
    return res.redirect('/')
  }

  models.Rating.create({
    like: true,
    userId: req.user.id,
    imageId: req.body.imageId
  }).then((rating) => {
    console.log(rating)
    res.redirect('/')
  })
})

module.exports = router
