import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4',
})

const [rows] = await connection.query('SELECT nom FROM produits WHERE id = 1')
console.log(rows)

await connection.end()