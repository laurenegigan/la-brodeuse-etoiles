import '../styles/Catalog.css'
import { useState, useEffect } from 'react'
import api from '../api/axios'

const CATEGORIES = ['Tous', 'Illustration', 'Papeterie', 'Sticker']

function Catalog() {
  const [activecat, setActivecat] = useState('Tous')
  const [produits, setProduits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setLoading(true)
        const url = activecat === 'Tous' ? '/produits' : `/produits?categorie=${activecat}`
        const response = await api.get(url)
        setProduits(response.data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError('Impossible de charger les produits')
      } finally {
        setLoading(false)
      }
    }

    fetchProduits()
  }, [activecat])

  return (
    <div className="catalog">

      {/* HERO */}
      <section className="catalog__hero">
        <div className="container">
          <p className="section-label">Explorez les royaumes</p>
          <div className="ornament"><span>✦</span></div>
          <h1>Catalogue</h1>
        </div>
      </section>

      {/* FILTRES + GRILLE */}
      <section className="catalog__section">
        <div className="container">

          {/* Filtres */}
          <div className="catalog__filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`catalog__filter ${activecat === cat ? 'catalog__filter--active' : ''}`}
                onClick={() => setActivecat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* États de chargement / erreur */}
          {loading && <p style={{ textAlign: 'center', color: 'var(--color-cream-dim)' }}>Chargement des trésors...</p>}
          {error && <p style={{ textAlign: 'center', color: 'var(--color-terracotta)' }}>{error}</p>}

          {/* Grille */}
          {!loading && !error && (
            <div className="catalog__grid">
              {produits.map(item => (
                <a href={`/produit/${item.id}`} key={item.id} className="product-card">
                  <div className="product-card__image">
                    <img src={`/${item.image_url}`} alt={item.nom} />
                    <div className="product-card__overlay" />
                  </div>
                  <div className="product-card__info">
                    <p className="product-card__category">{item.categorie_nom}</p>
                    <h4 className="product-card__name">{item.nom}</h4>
                    <p className="product-card__price">{parseFloat(item.prix).toFixed(2)} €</p>
                  </div>
                </a>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  )
}

export default Catalog