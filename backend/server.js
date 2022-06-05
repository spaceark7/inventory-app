import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import ProductRoutes from './routes/ProductRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandlers.js'

dotenv.config()
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<p>API is Running </p>')
})

app.use('/api/products', ProductRoutes)
app.use('/api/users', userRoutes)
app.use('/api/uploads', uploadRoutes)

const __dirname = path.resolve()

//Making static folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Middleware to handle errors
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode at port ${PORT}`)
)
