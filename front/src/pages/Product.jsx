import '../styles/Product.css'
import { useState, useEffect } from 'react'
import api from '../api/axios'
import { useCart } from '../context/CartContext'
import { useParams, useNavigate } from 'react-router-dom'

function Product() {
  const { id } = useParams()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [produit, setProduit] = useState(null)
  const [avis, setAvis] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantite, setQuantite] = useState(1)
  const [avisForm, setAvisForm] = useState({ note: 5, titre: '', texte: '' })
  const [avisEnvoye, setAvisEnvoye] = useState(false)
  const [avisError, setAvisError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [produitRes, avisRes] = await Promise.all([
          api.get(`/produits/${id}`),
          api.get(`/produits/${id}/avis`)
        ])
        setProduit(produitRes.data)
        setAvis(avisRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleAvisChange = (e) => {
    setAvisForm({ ...avisForm, [e.target.name]: e.target.value })
  }

  const handleAvisSubmit = async (e) => {
    e.preventDefault()
    setAvisError(null)
    try {
      await api.post(`/produits/${id}/avis`, {
        note: avisForm.note,
        titre: avisForm.titre,
        contenu: avisForm.texte
      })
      setAvisEnvoye(true)
    } catch (err) {
      setAvisError(err.response?.data?.error || 'Une erreur est survenue')
    }
  }

  if (loading) {
    return <div className="product"><p style={{ textAlign: 'center', padding: '100px 0', color: 'var(--color-cream-dim)' }}>Chargement...</p></div>
  }

  if (!produit) {
    return <div className="product"><p style={{ textAlign: 'center', padding: '100px 0', color: 'var(--color-cream-dim)' }}>Produit introuvable</p></div>
  }

  return (
    <div className="product">

      {/* PRODUIT */}
      <section className="product__section">
        <div className="container">
          <div className="product__grid">

            {/* Image */}
            <div className="product__image">
              <img src={`/${produit.image_url}`} alt={produit.nom} />
            </div>

            {/* Infos */}
            <div className="product__info">
              <p className="product__cat">{produit.categorie_nom}</p>
              <h1>{produit.nom}</h1>
              <p className="product__price">{parseFloat(produit.prix).toFixed(2)} €</p>
              <p className="product__taxes">Taxes incluses. Frais d'expédition calculés lors de l'expédition.</p>
              <p className="product__desc">{produit.description}</p>

              {/* Stock */}
              {produit.stock === 0 && (
                <p style={{ color: 'var(--color-terracotta)', fontFamily: 'var(--font-heading)', fontSize: 'var(--text-sm)' }}>
                  Rupture de stock
                </p>
              )}

              {/* Quantité + Ajout panier */}
              <div className="product__actions">
                <div className="product__qty">
                  <button onClick={() => setQuantite(Math.max(1, quantite - 1))}>−</button>
                  <span>{quantite}</span>
                  <button onClick={() => setQuantite(quantite + 1)}>+</button>
                </div>
                <button
                  className="btn-accent product__add"
                  disabled={produit.stock === 0}
                  onClick={() => {
                    addItem(produit, quantite)
                    navigate('/paiement')
                  }}
                >
                  {produit.stock === 0 ? 'Indisponible' : 'Ajouter au panier'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* AVIS */}
      <section className="product__avis">
        <div className="container">
          <p className="section-label">Les Murmures</p>
          <div className="ornament"><span>✦</span></div>

          {/* Liste avis */}
          {avis.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-cream-dim)', fontStyle: 'italic', marginBottom: 'var(--space-2xl)' }}>
              Aucun avis pour le moment. Soyez la première à partager votre expérience !
            </p>
          ) : (
            <div className="product__avis-grid">
              {avis.map(item => (
                <div key={item._id} className="murmure-card">
                  <div className="murmure-card__stars">{'★'.repeat(item.note)}{'☆'.repeat(5 - item.note)}</div>
                  <p className="product__avis-titre">{item.titre}</p>
                  <p className="murmure-card__texte">"{item.contenu}"</p>
                  {item.reponse_admin && (
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-terracotta)', fontStyle: 'italic', paddingTop: 'var(--space-sm)', borderTop: '1px solid var(--color-forest-light)' }}>
                      ✦ Réponse de la boutique : {item.reponse_admin}
                    </p>
                  )}
                  <div className="murmure-card__divider" />
                  <div className="murmure-card__author">
                    <div className="murmure-card__avatar">{item.utilisateur_prenom.charAt(0)}</div>
                    <div className="murmure-card__info">
                      <span className="murmure-card__nom">{item.utilisateur_prenom}</span>
                      <span className="murmure-card__produit">{new Date(item.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Formulaire avis */}
          <div className="product__avis-form">
            <h3>Laisser un avis</h3>
            {avisEnvoye ? (
              <div className="product__avis-success">
                <p>✦ Merci pour votre avis !</p>
              </div>
            ) : (
              <form onSubmit={handleAvisSubmit}>
                {avisError && (
                  <p style={{ color: 'var(--color-terracotta)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-md)' }}>
                    {avisError}
                  </p>
                )}
                <div className="product__avis-note">
                  <label>Note</label>
                  <div className="product__stars-select">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        type="button"
                        key={n}
                        className={`product__star ${n <= avisForm.note ? 'product__star--active' : ''}`}
                        onClick={() => setAvisForm({ ...avisForm, note: n })}
                      >★</button>
                    ))}
                  </div>
                </div>
                <div className="auth__field">
                  <label htmlFor="titre">Titre</label>
                  <input type="text" id="titre" name="titre" value={avisForm.titre} onChange={handleAvisChange} placeholder="Résumez votre avis" required />
                </div>
                <div className="auth__field">
                  <label htmlFor="texte">Votre avis</label>
                  <textarea
                    id="texte"
                    name="texte"
                    value={avisForm.texte}
                    onChange={handleAvisChange}
                    placeholder="Partagez votre expérience..."
                    rows={4}
                    required
                    className="product__textarea"
                  />
                </div>
                <button type="submit" className="btn-accent">Publier mon avis</button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  )
}

export default Product