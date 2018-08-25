'use strict'
const logoutChecker = (req, res, next) => {
  if (req.user) {
    return res.redirect('/')
  }

  next()
}

module.exports = logoutChecker
