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

  try {
    const user_data = await user.findUnique({
      where: {
        email: email,
      },
      include: {
        access_level: true,
      },
    })

    if (user_data) {
      console.log(await bcrypt.compare(password, user_data.password))
      if (await bcrypt.compare(password, user_data.password)) {
        res.json({
          id: user_data.id,
          username: user_data.username,
          email: user_data.email,
          first_name: user_data.first_name,
          last_name: user_data.last_name,
          image_path: user_data.image_path,
          password: user_data.password,
          access_level: user_data.access_level,
          token: generateToken(user_data.id, user_data.email),
        })
      } else {
        res.status(401).json({ message: 'Invalid credentials' })
      }
    }
  } catch (error) {
    res.status(404).json({ message: `${error.message}` })
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

  console.log(access_level.map((access_level) => access_level))

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
      password: new_user_data.password,
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

  if (user) {
    res.json({
      id: user_data.id,
      username: user_data.username,
      email: user_data.email,
      first_name: user_data.first_name,
      last_name: user_data.last_name,
      image_path: user_data.image_path,
    })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

export { authUser, getUserProfile, registerUser }
