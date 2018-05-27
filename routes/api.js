const express = require('express')
const router = express.Router()
const models = require('../models')
const auth = require('../middlewares/auth')

router.get('/images', auth, (req, res) => {
  models.Image.findAll({
    where: {
      userId: {
        $not: req.user.id
      }
    },
    limit: 10,
  })
  .then((images) => {
    res.json({images: images})
  })
})

module.exports = router
