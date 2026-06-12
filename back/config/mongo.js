import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✦ MongoDB connecté')
  } catch (error) {
    console.error('Erreur de connexion MongoDB :', error.message)
  }
}