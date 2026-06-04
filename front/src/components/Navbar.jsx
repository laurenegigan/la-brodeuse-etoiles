import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, User, Menu, X } from 'lucide-react'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

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
        </nav>

        {/* Icônes droite */}
        <div className="navbar__actions">
          <Link to="/connexion" className="navbar__icon" aria-label="Mon compte">
            <User size={20} />
          </Link>
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