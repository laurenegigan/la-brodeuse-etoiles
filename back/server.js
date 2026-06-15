import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import authRoutes from './routes/authRoutes.js'
import mailclubRoutes from './routes/mailclubRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { connectMongo } from './config/mongo.js'
import avisRoutes from './routes/avisRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares globaux
app.use(helmet())
app.use(cors())
app.use(express.json())


// Route de test
app.get('/', (req, res) => {
  res.json({ message: "API La Brodeuse d'Étoiles 🌟" })
})

app.use('/produits', productRoutes)

app.use('/auth', authRoutes)

app.use('/mailclub', mailclubRoutes)

app.use('/commandes', orderRoutes)

app.use('/', avisRoutes)

app.use('/contact', contactRoutes)

app.use('/admin', adminRoutes)

connectMongo()

app.listen(PORT, () => {
  console.log(`✦ Serveur lancé sur http://localhost:${PORT}`)
})

