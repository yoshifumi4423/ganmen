'use strict'
class AppError extends Error {
  constructor (message) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
    this.name = this.constructor.name
  }
}

module.exports = AppError
