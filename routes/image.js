const express = require('express')
const models = require('../models')
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const auth = require('../middlewares/auth')
const router = express.Router()

router.get('/', auth, function(req, res){
  if (!req.user) {
    return res.redirect('/')
  }

  res.render('image')
})

router.post('/', auth, upload.single('faceImage'), function(req, res){
  if (!req.user) {
    return res.send('error: please login.');
  }

  req.file.userId = req.user.id
  models.Image.create(req.file).then(function(image){
    res.send('res_send');
  })
})

module.exports = router
