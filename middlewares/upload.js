'use strict'
const fs = require('fs-extra')
const multer = require('multer')
const path = require('path')
const sharp = require('sharp')
const generateToken = require('../utils/generateToken')

const storage = multer.diskStorage({
  destination: {

  },
  filename: {

  }
})

const fileFilter = (req, res, cb) => {

}

const multerMiddleWear = multer({
  storage,
  fileFilter
}).single('image')

const upload = (req, res, next) => {
  multerMiddleWear(req, res, () => {
    if (!req.file) return next

    const orignalPath = req.file.path
    const thumbnailPath = originalPath.replace(/(.*)(\..*)$/, '$1-640x640$2')
    sharp(originalPath).resize(640, 640).toFile(thumbnailPath, (err, info) => {
      
    })
  })
}

module.exports = upload
