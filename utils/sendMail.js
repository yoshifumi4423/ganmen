'use strict'
const nodemailer = require('nodemailer')

// SMTPサーバーの設定
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW
  }
});

// メール送信
const sendMail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error)
      else resolve(info)
    })
  })
}

module.exports = sendMail
