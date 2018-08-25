'use strict'
const loginChecker = (req, res, next) => {
  if (!req.user) {
    return res.send('Error: Please login')
  }

  next()
}

module.exports = loginChecker
