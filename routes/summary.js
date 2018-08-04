const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const loginChecker = require('../middlewares/loginChecker')
const models = require('../models')
const sequelize = require('sequelize')

router.use(auth)
router.use(loginChecker)

router.get('/', (req, res, next) => {
  models.Rating.findAll({
    // 条件1：集計関数でlikeを取得する
    attributes: [
      'like',
      [sequelize.fn('count', sequelize.col('like')), 'likeCount']
    ],
    group: [
      'like'
    ],
    // 条件2：ユーザーIDと一致する
    where: {
      userId: {
        $eq: req.user.id
      }
    }
  }).then(ratings => {
    if (!ratings || ratings.length === 0) {
      req.likeRate = 0
      next()
    }

    let like
    let skip
    ratings.forEach(rating => {
      if (rating.like) {
        like = Number(rating.get('likeCount'))
      } else {
        skip = Number(rating.get('likeCount'))
      }
    })
    const total = like + skip

    req.likeRate = (total === 0) ? 0 : Math.round((like / total) * 100)
    next()
  }).catch(errorObj => next(errorObj))
}, (req, res) => {
  res.render('summary', {
    form: {
      likeRate: req.likeRate,
    }
  })
})

module.exports = router
