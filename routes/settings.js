const express = require('express')
const router = express.Router()
const auth = require("../middlewares/auth")
const loginChecker = require("../middlewares/loginChecker")

router.use(auth)
router.use(loginChecker)

router.get('/', (req, res) => {
  res.render('settings')
})

module.exports = router
