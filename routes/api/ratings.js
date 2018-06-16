const express = require('express')
const router = express.Router()
const models = require('../../models')
const auth = require('../../middlewares/auth')

router.post('/like', auth, function(req, res){
  if (!req.user) {
    return res.json({result: false})
  }

  models.Rating.create({
    like: true,
    userId: req.user.id,
    imageId: req.body.imageId
  }).then((rating) => {
    console.log('=== rating ===')
    console.log(rating)
    res.json({result: true})
  })
})

router.post('/skip', auth, (req, res) => {
  if(!req.user){
    return res.json({result: false})
  }

  models.Rating.create({
    like: false,
    userId: req.user.id,
    imageId: req.body.imageId
  }).then((rating) => {
    console.log('=== rating ===')
    console.log(rating)
    res.json({result: true})
  })
})


module.exports = router
