'use strict'
const fs = require('fs-extra')
const multer = require('multer')
const generateToken = require('../utils/generateToken')
const path = require('path')
const sharp = require('sharp')

// 画像の保存先とファイル名を指定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const date = new Date()
    const year = date.getFullYear()
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)

    const uploadPath = `uploads/${year}/${month}/${day}`

    fs.mkdirs(uploadPath).then(() => {
      cb(null, uploadPath)
    }).catch(cb)
  },
  filename: (req, file, cb) => {
    generateToken(16).then((token) => {
      cb(null, token + path.extname(file.originalname))
    }).catch(cb)
  }
})

// 指定の画像ファイルのみを受け付ける
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed.'), false)
  }
  cb(null, true)
}

// ミドルウェア
const multerMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single('faceImage')

// 画像のリサイズとfileオブジェクトの整形
const upload = (req, res, next) => {
  multerMiddleware(req, res, () => {
    if (!req.file) return next()

    const originalPath = req.file.path
    const thumbnailPath = originalPath.replace(/(.*)(\..*)$/, '$1-640x640$2')
    sharp(originalPath).resize(640, 640).toFile(thumbnailPath, (err, info) => {
      if (err) return next(err)

      const pathToUrl = (path) => {
        return path.replace(/^uploads/, `${req.protocol}://${req.get('host')}`)
      }

      req.file = {
        mimetype: req.file.mimetype,
        originalUrl: pathToUrl(originalPath),
        thumbnailUrl: pathToUrl(thumbnailPath)
      }

      next()
    })
  })
}


module.exports = upload
