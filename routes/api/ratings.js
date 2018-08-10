'use strict'
const express = require('express')
const router = express.Router()
const models = require('../../models')
const auth = require('../../middlewares/auth')

router.use(auth)

router.post('/like', function(req, res, next){
  if (!req.user) {
    return res.json({result: false})
  }

  models.Rating.create({
    like: true,
    userId: req.user.id,
    imageId: req.body.imageId
  }).then((rating) => {
    res.json({result: true})
  }).catch(errorObj => next(errorObj))
})

router.post('/skip', (req, res, next) => {
  if (!req.user) {
    return res.json({result: false})
  }

  models.Rating.create({
    like: false,
    userId: req.user.id,
    imageId: req.body.imageId
  }).then((rating) => {
    res.json({result: true})
  }).catch(errorObj => next(errorObj))
})


module.exports = router
