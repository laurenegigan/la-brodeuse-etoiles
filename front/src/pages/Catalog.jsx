import '../styles/Catalog.css'
import { useState } from 'react'

const PRODUITS = [
  { id: 1, img: 'product-1.jpg', cat: 'Illustration', name: 'La Forêt des Songes', price: '14,00 €' },
  { id: 2, img: 'product-2.jpg', cat: 'Papeterie', name: 'Carnet "Lune de Minuit"', price: '9,00 €' },
  { id: 3, img: 'product-3.jpg', cat: 'Sticker', name: 'Pack "Créatures des Bois"', price: '6,00 €' },
  { id: 4, img: 'product-4.jpg', cat: 'Illustration', name: 'Le Royaume Oublié', price: '14,00 €' },
  { id: 5, img: 'product-1.jpg', cat: 'Sticker', name: 'Pack "Étoiles Filantes"', price: '6,00 €' },
  { id: 6, img: 'product-2.jpg', cat: 'Papeterie', name: 'Marque-pages "Grimoire"', price: '4,00 €' },
  { id: 7, img: 'product-3.jpg', cat: 'Illustration', name: 'La Dragonnière', price: '14,00 €' },
  { id: 8, img: 'product-4.jpg', cat: 'Sticker', name: 'Pack "Créatures Célestes"', price: '6,00 €' },
]

const CATEGORIES = ['Tous', 'Illustration', 'Papeterie', 'Sticker']

function Catalog() {
  const [activecat, setActivecat] = useState('Tous')

  const produitsFiltres = activecat === 'Tous'
    ? PRODUITS
    : PRODUITS.filter(p => p.cat === activecat)

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

          {/* Grille */}
          <div className="catalog__grid">
            {produitsFiltres.map(item => (
              <a href={`/produit/${item.id}`} key={item.id} className="product-card">
                <div className="product-card__image">
                  <img src={`/${item.img}`} alt={item.name} />
                  <div className="product-card__overlay" />
                </div>
                <div className="product-card__info">
                  <p className="product-card__category">{item.cat}</p>
                  <h4 className="product-card__name">{item.name}</h4>
                  <p className="product-card__price">{item.price}</p>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}

export default Catalog