const models = require('../models')

const auth = (req, res, next) => {
  const id = req.session.user_id
  if (!id) {
    return next();
  }

  models.User.findById(id).then(user => {
    req.user = user
    next();
  })
}

module.exports = auth
