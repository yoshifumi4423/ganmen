'use strict'
const express = require('express')
const router = express.Router()
const models = require('../../models')
const auth = require('../../middlewares/auth')
const sequelize = require('sequelize')

router.get('/images', auth, (req, res, next) => {
  models.Image.findAll({
    where: {
      // 条件1：自分の画像でない
      userId: {
        $not: req.user.id
      },
      // 条件2：自分が評価した画像は対象外
      id: {
        $notIn: sequelize.literal(
          '(select "imageId" from "Ratings" where "userId" = ' + req.user.id + ')'
        )
      }
    },
    include: [{
      model: models.Rating,
      required: false,  // left outer join
    }],
    subQuery: false,
    // 条件3：10個
    limit: 10,
  }).then((images) => {
    res.json({images: images})
  }).catch(next)
})

module.exports = router
