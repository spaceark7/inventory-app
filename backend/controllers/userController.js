import asyncHandler from 'express-async-handler'
import Prisma from '@prisma/client'
import generateToken from '../utils/generateTokens.js'
import bcrypt from 'bcryptjs'
const { PrismaClient } = Prisma
const { user } = new PrismaClient()

// @desc    POST user & authenticate user
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user_data = await user.findUnique({
    where: {
      email: email,
    },
    include: {
      access_level: true,
    },
  })

  if (user_data) {
    if (await bcrypt.compare(password, user_data.password)) {
      res.json({
        id: user_data.id,
        username: user_data.username,
        email: user_data.email,
        first_name: user_data.first_name,
        last_name: user_data.last_name,
        image_path: user_data.image_path,
        access_level: user_data.access_level,
        token: generateToken(user_data.id, user_data.email),
      })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    POST create user
// @route   POST /api/users
// @access  private/admin only

const registerUser = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    image_path,
    access_level,
    username,
  } = req.body

  const salt = await bcrypt.genSalt(10)

  if (!email) {
    res.status(400)
    throw new Error('Invalid data : User registration failed @noemail')
  }

  const user_data_exist = await user.findUnique({
    where: {
      email: email,
    },
  })

  if (user_data_exist) {
    res.status(400)
    throw new Error(`User with email ${email} is already exist`)
  }

  const new_user_data = await user.create({
    data: {
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: await bcrypt.hash(password, salt),
      image_path: image_path,
      access_level: {
        connect: access_level.map((access_level) => access_level),
      },
    },
    include: {
      access_level: true,
    },
  })

  if (new_user_data) {
    res.status(201).json({
      id: new_user_data.id,
      username: new_user_data.username,
      first_name: new_user_data.first_name,
      last_name: new_user_data.last_name,
      email: new_user_data.email,
      image_path: new_user_data.image_path,
      access_level: new_user_data.access_level,
      token: generateToken(new_user_data.id, new_user_data.email),
    })
  } else {
    res.status(400)
    throw new Error('Invalid data : User registration failed')
  }
})

// @desc    Get user & authenticate user
// @route   GET /api/users/profile
// @access  private

const getUserProfile = asyncHandler(async (req, res) => {
  const user_data = await user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      access_level: true,
    },
  })

  if (user_data) {
    res.json({
      id: user_data.id,
      username: user_data.username,
      email: user_data.email,
      access_level: user_data.access_level,
      password: user_data.password,
      first_name: user_data.first_name,
      last_name: user_data.last_name,
      image_path: user_data.image_path,
    })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

// @desc    PUT update user & authenticate user
// @route   GET /api/users/profile
// @access  private
const updateUserProfile = asyncHandler(async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  console.log(req.body)
  const user_data = await user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      access_level: true,
    },
  })

  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, salt)
  }

  if (user_data) {
    const updated_user = await user.update({
      where: {
        email: user_data.email,
      },
      data: {
        username: req.body.username || user_data.username,
        first_name: req.body.first_name || user_data.first_name,
        last_name: req.body.last_name || user_data.last_name,
        image_path: req.body.image_path || user_data.image_path,
        password: req.body.password || user_data.password,
        access_level: {
          set:
            req.body.access_level ||
            user_data.access_level.map((access_level) => ({
              id: access_level.id,
            })),
        },
        updated_at: new Date().toISOString(),
      },
      include: {
        access_level: true,
      },
    })
    res.json({
      id: updated_user.id,
      username: updated_user.username,
      email: updated_user.email,
      access_level: updated_user.access_level,
      first_name: updated_user.first_name,
      last_name: updated_user.last_name,
      image_path: updated_user.image_path,
      access_level: updated_user.access_level,
      updated_at: updated_user.updated_at,
      token: generateToken(updated_user.id),
    })
  } else {
    res.status(401).json({ message: 'User not found' })
  }
})

export { authUser, getUserProfile, registerUser, updateUserProfile }
