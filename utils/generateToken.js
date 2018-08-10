'use strict'
const crypto = require("crypto")

const generateToken = (size) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(size, (err, buf) => {
      if (err) reject(err)
      resolve(buf.toString('hex'))
    })
  })
}

module.exports = generateToken
