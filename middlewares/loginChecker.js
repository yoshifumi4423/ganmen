'use strict'
const loginChecker = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/')
  }

  next()
}

module.exports = loginChecker
