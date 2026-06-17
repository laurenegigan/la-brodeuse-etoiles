import '../styles/Auth.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [form, setForm] = useState({ email: '', motdepasse: '' })
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await api.post('/auth/login', form)
      login(response.data.token, response.data.user)

      if (response.data.user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/mon-espace')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue')
    }
  }

  return (
    <div className="auth">
      <div className="auth__form-side">
        <div className="auth__card">
          <div className="auth__logo">
            <img src="/logo.png" alt="La Brodeuse d'Étoiles" />
          </div>
          <p className="section-label">Bon retour</p>
          <div className="ornament"><span>✦</span></div>
          <h1>Connexion</h1>
          {error && (
            <p style={{ color: 'var(--color-terracotta)', fontSize: 'var(--text-sm)', textAlign: 'center' }}>
              {error}
            </p>
          )}
          <form className="auth__form" onSubmit={handleSubmit}>
            <div className="auth__field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" required />
            </div>
            <div className="auth__field">
              <label htmlFor="motdepasse">Mot de passe</label>
              <input type="password" id="motdepasse" name="motdepasse" value={form.motdepasse} onChange={handleChange} placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn-accent auth__btn">Se connecter</button>
          </form>
          <div className="auth__divider"><span>ou</span></div>
          <a href={`${import.meta.env.VITE_API_URL}/auth/google`} className="auth__google">
            <img src="/google.svg" alt="Google" />
            Continuer avec Google
          </a>
          <p className="auth__switch">Pas encore de compte ?{' '}<Link to="/inscription">Créer un compte</Link></p>
        </div>
      </div>
      <div className="auth__image-side">
        <img src="/login.jpg" alt="Connexion" />
      </div>
    </div>
  )
}

export default Login