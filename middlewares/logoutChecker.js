const logoutChecker = (req, res, next) => {
  if (req.user) {
    return res.send('Error: Already logged in. Please logout.')
  }

  next()
}

module.exports = logoutChecker
