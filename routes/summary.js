const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const loginChecker = require('../middlewares/loginChecker')
const models = require('../models')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('test', 'yoshifumikanno', '', {
  host: 'localhost',
  dialect: 'postgres'
})

router.get('/', auth, loginChecker, (req, res, next) => {
  sequelize.query(
    `select
      "Images"."thumbnailUrl",
      case
        when coalesce("TotalRating"."count", 0) = 0 then '0%'
      else
       concat(round(coalesce("TotalLike"."count", 0.0) / "TotalRating"."count" * 100), '%')
      end as "likeRate"
    from
      "Images"
    left outer join
      (
        select
          "thumbnailUrl", count("like") as "count"
        from
          "Images"
        inner join
          "Ratings"
        on
          "Images".id = "Ratings"."imageId"
        where
          "Images"."userId" = :userId and "like" = 't'
        group by
          "thumbnailUrl"
      ) as "TotalLike"
    on
      "Images"."thumbnailUrl" = "TotalLike"."thumbnailUrl"
    inner join
      (
        select
          "thumbnailUrl", count("like") as "count"
        from
          "Images"
        inner join
          "Ratings"
        on
          "Images".id = "Ratings"."imageId"
        where
          "Images"."userId" = :userId
        group by
          "thumbnailUrl"
      ) as "TotalRating"
    on
      "Images"."thumbnailUrl" = "TotalRating"."thumbnailUrl"
    where
      "Images"."userId" = 230
    group by
      "Images"."thumbnailUrl", "TotalLike"."count", "TotalRating"."count"`,
    {
        replacements: {
          userId: req.user.id
        },
        type: Sequelize.QueryTypes.SELECT
    }
  ).then(summaries => {
    req.summaries = summaries
    next()
  }).catch(errorObj => next(errorObj))
}, (req, res) => {
  res.render('summary', {
    form: {
      summaries: req.summaries
    }
  })
})

module.exports = router
