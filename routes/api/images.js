const express = require('express')
const router = express.Router()
const models = require('../../models')
const auth = require('../../middlewares/auth')

router.get('/images', auth, (req, res) => {
  models.Image.findAll({
    where: {
      // 条件1：自分の画像でない
      userId: {
        $not: req.user.id
      },
      // 条件2：未評価の画像
      '$"Ratings"."userId"$': {
        $or: {
          $not: req.user.id,
          $eq: null,
        }
      }
    },
    include: [{
      model: models.Rating,
      required: false,
    }],
    subQuery: false,
    // 条件3：10個
    limit: 10,
  })
  .then((images) => {
    res.json({images: images})
  })
})


module.exports = router
