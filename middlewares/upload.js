'use strict'
const multer = require('multer')

// 指定の画像ファイルのみを受け付ける
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed.'), false)
  }
  cb(null, true)
}

// ミドルウェア
const upload = multer({
  dest: 'uploads/',
  fileFilter: fileFilter,
}).single('faceImage')

module.exports = upload
