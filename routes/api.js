const express = require('express')
const router = express.Router()
const models = require('../models')
const auth = require('../middlewares/auth')

router.get('/images', auth, (req, res) => {
  models.Image.findOne().then((image) => {
    res.json({image: image})
  })
})

module.exports = router
