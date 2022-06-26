import express from 'express'
import {
  createProduct,
  getProductById,
  updateProductById,
  getProducts,
  deleteProductById,
  softDeleteProductById,
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(protect, getProductById)

router.route('/').post(createProduct)

router.route('/:id').put(protect, updateProductById)
router.route('/delete/:id').put(protect, softDeleteProductById)

router.route('/:id').delete(deleteProductById)

export default router
