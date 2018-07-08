const express = require('express')
const models = require('../models')
const auth = require('../middlewares/auth')
const upload = require('../middlewares/upload')
const router = express.Router()

router.get('/', auth, (req, res) => {
  if (!req.user) {
    return res.send('error: please login.')
  }

  res.render('images/index')
})

router.get('/new', auth, (req, res) => {
  if (!req.user) {
    return res.send('error: please login.')
  }

  res.render('images/new')
})

router.post('/', auth, upload, (req, res) => {
  if (!req.user) {
    return res.send('error: please login.')
  }

  req.file.userId = req.user.id
  models.Image.create(req.file).then(function(image){
    res.send('res_send')
  })
})

module.exports = router
