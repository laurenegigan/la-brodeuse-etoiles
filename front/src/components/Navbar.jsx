import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingBag, User, Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="navbar__container">

        {/* Logo gauche */}
        <Link to="/" className="navbar__logo">
          <img src="/logo.png" alt="La Brodeuse d'Étoiles" />
        </Link>

        {/* Navigation liens centrés */}
        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          <NavLink to="/catalogue" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
            Catalogue
          </NavLink>
          <NavLink to="/a-propos" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
            À Propos
          </NavLink>
          <NavLink to="/mail-club" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
            Mail Club
          </NavLink>
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
              Admin
            </NavLink>
          )}
        </nav>

        {/* Icônes droite */}
        <div className="navbar__actions">
          {user ? (
            <>
              <Link to="/mon-espace" className="navbar__user" aria-label="Mon espace">
                <User size={18} />
                <span>{user.prenom}</span>
              </Link>
              <button onClick={handleLogout} className="navbar__icon" aria-label="Se déconnecter">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/connexion" className="navbar__icon" aria-label="Mon compte">
              <User size={20} />
            </Link>
          )}
          <Link to="/panier" className="navbar__icon" aria-label="Panier">
            <ShoppingBag size={20} />
          </Link>
          <button
            className="navbar__burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>
    </header>
  )
}

export default Navbar