const express = require('express')
const models = require('../models')
const auth = require('../middlewares/auth')
const upload = require('../middlewares/upload')
const loginChecker = require('../middlewares/loginChecker')
const router = express.Router()

router.get('/', auth, loginChecker, (req, res) => {
  res.render('images/index')
})

router.get('/new', auth, loginChecker, (req, res) => {
  res.render('images/new')
})

router.post('/', auth, loginChecker, upload, function(req, res){
  req.file.userId = req.user.id
  models.Image.create(req.file).then(function(image){
    res.send('res_send')
  })
})

module.exports = router
