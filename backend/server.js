import express from 'express'
import dotenv from 'dotenv'
import ProductRoutes from './routes/ProductRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandlers.js'

dotenv.config()
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<p>API is Running </p>')
})

app.use('/api/products', ProductRoutes)
app.use('/api/users', userRoutes)

// Middleware to handle errors
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode at port ${PORT}`)
)
