import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'

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

app.use('/categories', categoryRoutes)

app.listen(PORT, () => {
  console.log(`✦ Serveur lancé sur http://localhost:${PORT}`)
})