import jwt from 'jsonwebtoken'
import asycnHandler from 'express-async-handler'
import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const { user } = new PrismaClient()

const protect = asycnHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          username: true,
          first_name: true,
          last_name: true,
          email: true,
        },
      })

      next()
    } catch (error) {
      console.error('error :', error)
      res.status(401)
      throw new Error(
        'Bad Token : You are not authorized to access this resource'
      )
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Missing Token : You are not authorized')
  }
})

export { protect }
