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
  res.render('images/new')
})

router.post('/', upload, (req, res, next) => {
  req.file.userId = req.user.id
  models.Image.create(req.file).then(function(image){
    res.send('res_send')
  }).catch(next)
})

module.exports = router
