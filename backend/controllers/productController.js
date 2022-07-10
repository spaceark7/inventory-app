import asyncHandler from 'express-async-handler'
import Prisma from '@prisma/client'
import moment from 'moment-timezone'

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
    // res.status(404).json({message: 'oops'})
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
// @route   POST /api/products/new
// @access  Private/only for user
const createProduct = asyncHandler(async (req, res) => {
  const {
    product_name,
    product_image,
    product_type,
    product_SN,
    status,
    brand,
    model,
    price,
    SKU,
    specification,
    created_at,
    created_by,
  } = req.body

  try {
    const productExist = await product.findFirst({
      where: {
        product_name: {
          contains: product_name,
        },
        SKU: {
          contains: SKU,
        },
      },
    })

    if (productExist) {
      res.status(203).json({ message: 'Produk sudah ada' })
    } else {
      const new_product = await product.create({
        data: {
          product_name: product_name,
          SKU: SKU,
          price: parseInt(price),
          brand: brand,
          model: model,
          specification: specification,
          product_SN: product_SN,
          product_image: product_image,
          product_type: product_type,
          status: status,
          deleted: false,
          created_at: created_at,
          updated_at: created_at,
          createdBy: created_by,
        },
      })
      res.status(201).json(new_product)
    }
  } catch (error) {
    res.status(500).json({ msg: `error : ${error}` })
  }
})

// @desc    POST search product by name SN or brand
// @route   POST /api/products/search
// @access  Private/only for user

const searchProducts = asyncHandler(async (req, res) => {
  const { query } = req.body

  let result = []
  try {
    const product_data_by_name = await product.findMany({
      where: {
        product_name: {
          contains: query,
        },
      },
    })

    result = result.concat(product_data_by_name)

    const product_data_by_SN = await product.findMany({
      where: {
        product_SN: query,
      },
    })
    result = result.concat(product_data_by_SN)

    const product_data_by_model = await product.findMany({
      where: {
        model: query,
      },
    })
    result = result.concat(product_data_by_model)

    const product_data_by_brand = await product.findMany({
      where: {
        brand: query,
      },
    })
    result = result.concat(product_data_by_brand)

    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ msg: `error : ${error}` })
    console.log(error)
  }
})

// @desc    PUT edit product by id
// @route   PUT /api/products/id
// @access  Private/only for user

const updateProductById = asyncHandler(async (req, res) => {
  const d = moment.tz('Asia/Jakarta').format()
  const {
    id,
    product_name,
    product_image,
    product_type,
    product_SN,
    status,
    brand,
    model,
    price,
    SKU,
    specification,
    update_user_id,
    updated_at,
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
        price: parseInt(price) || product_data.price,
        brand: brand || product_data.brand,
        model: model || product_data.model,
        specification: specification || product_data.specification,
        product_SN: product_SN || product_data.product_SN,
        product_image: product_image || product_data.product_image,
        product_type: product_type || product_data.product_type,
        status: status || product_data.status,
        updated_at: updated_at,
        update_user_id: update_user_id,
      },
    })

    res.status(201).json(updated_data)
  } catch (error) {
    res.status(500).json({ msg: `error : ${error}` })
    console.log(error)
  }
})

// @desc    PUT soft delete product by id
// @route   PUT /api/products/id
// @access  Private/only for user

const softDeleteProductById = asyncHandler(async (req, res) => {
  const { deleted, deleted_at } = req.body
  const d = moment().tz('Asia/Jakarta').format()
  console.log(d)
  try {
    const product_data = await product.findMany({
      where: {
        id: parseInt(req.params.id),
      },
    })

    const updated_data = await product.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        deleted: deleted || product_data.deleted,
        deleted_at: d,
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
  searchProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  softDeleteProductById,
}
