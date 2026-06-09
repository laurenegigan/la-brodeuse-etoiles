import '../styles/Auth.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: '', motdepasse: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Connexion :', form)
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
        <button className="auth__google">
          <img src="/google.svg" alt="Google" />
          Continuer avec Google
        </button>
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