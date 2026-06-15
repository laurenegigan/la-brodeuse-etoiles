import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import pool from './db.js'

dotenv.config()

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value
    const prenom = profile.name.givenName || profile.displayName
    const googleId = profile.id

    // Chercher si l'utilisateur existe déjà (par email)
    const [rows] = await pool.query('SELECT * FROM utilisateurs WHERE email = ?', [email])
    let user = rows[0]

    if (!user) {
      // Créer un nouvel utilisateur
      const [result] = await pool.query(
        'INSERT INTO utilisateurs (prenom, email, google_id, role) VALUES (?, ?, ?, ?)',
        [prenom, email, googleId, 'user']
      )
      const [newRows] = await pool.query('SELECT * FROM utilisateurs WHERE id = ?', [result.insertId])
      user = newRows[0]
    } else if (!user.google_id) {
      // Lier le compte existant à Google
      await pool.query('UPDATE utilisateurs SET google_id = ? WHERE id = ?', [googleId, user.id])
      user.google_id = googleId
    }

    return done(null, user)
  } catch (error) {
    return done(error, null)
  }
}))

export default passport