import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.route.js'

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

app.use(cors({origin: '*',credentials: true}))
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/api/health', (req, res) => {
 res.json({ status: 'OK', message: 'Server is running' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

