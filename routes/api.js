'use strict'
const express = require('express')
const router = express.Router()
const models = require('../models')
const auth = require('../middlewares/auth')

const imageRouter = require('./api/images')
const ratingRouter = require('./api/ratings')

router.use('/', imageRouter)
router.use('/', ratingRouter)


module.exports = router
