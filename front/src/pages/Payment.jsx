import '../styles/Payment.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import api from '../api/axios'

function Payment() {
  const { items, total, clearCart, removeItem } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleCommande = async () => {
    setError(null)
    setLoading(true)
    try {
      await api.post('/commandes', {
        items: items.map(i => ({ produit_id: i.id, quantite: i.quantite }))
      })
      clearCart()
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue lors de la commande')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="payment">
        <section className="payment__section">
          <div className="container">
            <div className="payment__success">
              <p className="section-label">Pré-commande confirmée</p>
              <div className="ornament"><span>✦</span></div>
              <h1>Merci ✦</h1>
              <p>Votre pré-commande a bien été enregistrée. Vous pouvez suivre son statut dans votre espace personnel.</p>
              <a href="/mon-espace" className="btn-accent">Voir mes commandes</a>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="payment">
        <section className="payment__section">
          <div className="container">
            <p style={{ textAlign: 'center', color: 'var(--color-cream-dim)' }}>
              Votre panier est vide.
            </p>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
              <a href="/catalogue" className="btn-accent">Découvrir la boutique</a>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="payment">

      {/* HERO */}
      <section className="payment__hero">
        <div className="container">
          <p className="section-label">Pré-commande</p>
          <div className="ornament"><span>✦</span></div>
          <h1>Votre panier</h1>
        </div>
      </section>

      {/* CONTENU */}
      <section className="payment__section">
        <div className="container">
          <div className="payment__grid">

            {/* Liste produits */}
            <div className="payment__items">
              {items.map(item => (
                <div key={item.id} className="payment__item">
                  <img src={`/${item.image_url}`} alt={item.nom} className="payment__item-img" />
                  <div className="payment__item-info">
                    <h4>{item.nom}</h4>
                    <p>Quantité : {item.quantite}</p>
                  </div>
                  <div className="payment__item-price">
                    {(parseFloat(item.prix) * item.quantite).toFixed(2)} €
                  </div>
                  <button className="payment__item-remove" onClick={() => removeItem(item.id)}>
                    Retirer
                  </button>
                </div>
              ))}
            </div>

            {/* Récapitulatif */}
            <div className="payment__summary">
              <h3>Récapitulatif</h3>
              <div className="payment__summary-row">
                <span>Sous-total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              <div className="payment__summary-row">
                <span>Frais d'expédition</span>
                <span>Calculés ultérieurement</span>
              </div>
              <div className="payment__summary-total">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>

              {error && (
                <p style={{ color: 'var(--color-terracotta)', fontSize: 'var(--text-sm)' }}>
                  {error}
                </p>
              )}

              <button className="btn-accent payment__submit" onClick={handleCommande} disabled={loading}>
                {loading ? 'Validation...' : 'Valider la pré-commande'}
              </button>
              <p className="payment__note">
                Ceci est une pré-commande sans paiement réel, conformément au concept de la boutique.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Payment