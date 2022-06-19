import asyncHandler from 'express-async-handler'
import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const { product } = new PrismaClient()

// @desc    Get all products
// @route   GET /api/products
// @access  Private/only for user

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products_data = await product.findMany({
      where: {
        deleted: false,
      },
    })

    res.json(products_data)
  } catch (error) {
    res.status(404).json({ message: `${error.message}` })
  }
})

// @desc    Get products by id
// @route   GET /api/products/id
// @access  Private/only for user

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product_data = await product.findMany({
      where: {
        id: parseInt(req.params.id),
      },
    })

    if (product_data.length > 0) {
      res.json(product_data[0])
    } else {
      res.status(404)
      throw new Error('No product found with that ID')
    }
  } catch (error) {
    res.status(500).json({ message: `${error}` })
  }
})

// @desc    POST create new product
// @route   POST /api/products/
// @access  Private/only for user
const createProduct = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.data)
  try {
    const product_data = await product.create({
      data: {
        product_name: data.product_name,
        SKU: data.SKU,
        price: data.price,
        specification: data.specification,
        product_SN: data.product_SN,
        product_image: data.product_image,
        product_type: data.product_type,
        status: data.status,
      },
    })
    res.status(201).json(product_data)
  } catch (error) {
    res.status(500).json({ msg: `error : ${error}` })
  }
})

// @desc    PUT edit product by id
// @route   PUT /api/products/id
// @access  Private/only for user

const updateProductById = asyncHandler(async (req, res) => {
  console.log(req.body)
  const {
    id,
    product_name,
    product_image,
    product_type,
    product_SN,
    status,
    price,
    SKU,
    specification,
    deleted,
    deleted_at,
  } = req.body

  try {
    const product_data = await product.findMany({
      where: {
        id: parseInt(id),
      },
    })

    const updated_data = await product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        product_name: product_name || product_data.product_name,
        SKU: SKU || product_data.SKU,
        price: price || product_data.price,
        specification: specification || product_data.specification,
        product_SN: product_SN || product_data.product_SN,
        product_image: product_image || product_data.product_image,
        product_type: product_type || product_data.product_type,
        status: status || product_data.status,
        deleted: deleted || product_data.deleted,
        deleted_at: deleted ? deleted_at : product_data.deleted_at,
        updated_at: new Date(),
      },
    })
    res.status(201).json(updated_data)
  } catch (error) {
    res.status(500).json({ msg: `error : ${error}` })
    console.log(error)
  }
})

// @desc    DELETE delete product by id
// @route   DELETE /api/products/id
// @access  Private/only for user

const deleteProductById = asyncHandler(async (req, res) => {
  try {
    const product_data = await product.delete({
      where: {
        id: parseInt(req.params.id),
      },
    })
    res.json(product_data)
  } catch (error) {
    res.status(400).json({ error: `${error}` })
  }
})

export {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
}
