import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const productImageStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/product/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${path.parse(file.originalname).name}-${Date.now()}${path.extname(
        file.originalname
      )}`
    )
  },
})

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/user/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${path.parse(file.originalname).name}-${Date.now()}${path.extname(
        file.originalname
      )}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Image Only with type JPG, JPEG, PNG and WEBP')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

const uploadProductImage = multer({
  storage: productImageStorage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

router.post('/product', uploadProductImage.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
