import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__container">

          {/* Logo + description */}
          <div className="footer__brand">
            <img src="/logo.png" alt="La Brodeuse d'Étoiles" className="footer__logo" />
            <p>Un univers fantastique brodé à la main, pour les âmes qui rêvent.</p>
          </div>

          {/* Navigation */}
          <div className="footer__col">
            <h4>Boutique</h4>
            <ul>
              <li><Link to="/catalogue">Catalogue</Link></li>
              <li><Link to="/mail-club">Mail Club</Link></li>
              <li><Link to="/a-propos">À propos</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Mon compte */}
          <div className="footer__col">
            <h4>Mon compte</h4>
            <ul>
              <li><Link to="/connexion">Connexion</Link></li>
              <li><Link to="/inscription">Inscription</Link></li>
              <li><Link to="/mon-espace">Mon espace</Link></li>
            </ul>
          </div>

          {/* Réseaux */}
          <div className="footer__col">
            <h4>Nous suivre</h4>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
            </ul>
          </div>

          {/* Mentions légales */}
          <div className="footer__col">
            <h4>Mentions légales</h4>
            <ul>
                <li><Link to="/confidentialite">Politique de confidentialité</Link></li>
                <li><Link to="/expedition">Politique d'expédition</Link></li>
                <li><Link to="/cookies">Préférences en terme de cookies</Link></li>
                <li><Link to="/remboursement">Politique de remboursement</Link></li>
                <li><Link to="/cgv">Conditions générales de vente</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="footer__bottom">
        <div className="footer__container">
          <p>© 2025 La Brodeuse d'Étoiles — Tous droits réservés</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer