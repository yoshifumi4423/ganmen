'use strict'
const express = require('express')
const models = require('../models')
const auth = require('../middlewares/auth')
const upload = require('../middlewares/upload')
const loginChecker = require('../middlewares/loginChecker')
const router = express.Router()

router.use(auth)
router.use(loginChecker)

router.get('/', (req, res) => {
  res.render('images/index')
})

router.get('/new', (req, res) => {
  res.render('images/new', {
    success: []
  })
})

router.post('/', upload, (req, res, next) => {
  req.file.userId = req.user.id
  models.Image.create(req.file).then(image => {
    res.render('images/new', {
      success: ["画像を投稿しました。"]
    })
  }).catch(next)
})

module.exports = router
