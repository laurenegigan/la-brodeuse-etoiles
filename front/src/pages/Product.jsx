import '../styles/Product.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const PRODUITS = [
  { id: 1, img: 'product-1.jpg', cat: 'Illustration', name: 'La Forêt des Songes', price: '14,00 €', description: 'Une illustration fantastique représentant une forêt enchantée baignée de lumière dorée. Imprimée sur papier mat 300g, format A4.', details: ['Format A4 (21x29,7cm)', 'Impression sur papier mat 300g', 'Expédition sous 48h', 'Emballage soigné'] },
  { id: 2, img: 'product-2.jpg', cat: 'Papeterie', name: 'Carnet "Lune de Minuit"', price: '9,00 €', description: 'Un carnet à couverture illustrée inspiré des nuits fantastiques. Pages blanches, idéal pour vos notes, croquis et pensées magiques.', details: ['A5 (148x210mm)', '100 pages blanches', 'Couverture rigide illustrée', 'Expédition sous 48h'] },
  { id: 3, img: 'product-3.jpg', cat: 'Sticker', name: 'Pack "Créatures des Bois"', price: '6,00 €', description: 'Un pack de 5 stickers illustrés représentant les créatures fantastiques des forêts enchantées. Vinyle waterproof, finition mate.', details: ['5 stickers par pack', 'Vinyle waterproof', 'Finition mate', 'Diamètre 5-8cm'] },
  { id: 4, img: 'product-4.jpg', cat: 'Illustration', name: 'Le Royaume Oublié', price: '14,00 €', description: 'Une illustration épique d\'un royaume fantastique perdu dans les brumes du temps. Imprimée sur papier mat 300g, format A4.', details: ['Format A4 (21x29,7cm)', 'Impression sur papier mat 300g', 'Expédition sous 48h', 'Emballage soigné'] },
]

const AVIS = [
  { id: 1, note: 5, titre: 'Absolument magnifique', texte: 'La qualité d\'impression est incroyable, les couleurs sont vibrantes. Je suis ravie de mon achat !', nom: 'Mathilde R.', date: 'Mars 2025' },
  { id: 2, note: 5, titre: 'Parfait, je recommande', texte: 'Emballage soigné, livraison rapide. Le produit est encore plus beau en vrai qu\'en photo.', nom: 'Léa V.', date: 'Février 2025' },
  { id: 3, note: 4, titre: 'Très belle illustration', texte: 'Très contente de mon achat, l\'illustration est magnifique. Petite déception sur le délai mais le résultat en vaut la peine.', nom: 'Sophie D.', date: 'Janvier 2025' },
]

function Product() {
  const { id } = useParams()
  const produit = PRODUITS.find(p => p.id === parseInt(id)) || PRODUITS[0]
  const [quantite, setQuantite] = useState(1)
  const [avisForm, setAvisForm] = useState({ note: 5, titre: '', texte: '' })
  const [avisEnvoye, setAvisEnvoye] = useState(false)

  const handleAvisChange = (e) => {
    setAvisForm({ ...avisForm, [e.target.name]: e.target.value })
  }

  const handleAvisSubmit = (e) => {
    e.preventDefault()
    console.log('Avis envoyé :', avisForm)
    setAvisEnvoye(true)
  }

  return (
    <div className="product">

      {/* PRODUIT */}
      <section className="product__section">
        <div className="container">
          <div className="product__grid">

            {/* Image */}
            <div className="product__image">
              <img src={`/${produit.img}`} alt={produit.name} />
            </div>

            {/* Infos */}
            <div className="product__info">
              <p className="product__cat">{produit.cat}</p>
              <h1>{produit.name}</h1>
              <p className="product__price">{produit.price}</p>
              <p className="product__taxes">Taxes incluses. Frais d'expédition calculés lors de l'expédition.</p>
              <p className="product__desc">{produit.description}</p>

              {/* Détails */}
              <ul className="product__details">
                {produit.details.map((d, i) => (
                  <li key={i}><span>✦</span> {d}</li>
                ))}
              </ul>

              {/* Quantité + Ajout panier */}
              <div className="product__actions">
                <div className="product__qty">
                  <button onClick={() => setQuantite(Math.max(1, quantite - 1))}>−</button>
                  <span>{quantite}</span>
                  <button onClick={() => setQuantite(quantite + 1)}>+</button>
                </div>
                <button className="btn-accent product__add">
                  Ajouter au panier
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
          <div className="product__avis-grid">
            {AVIS.map(avis => (
              <div key={avis.id} className="murmure-card">
                <div className="murmure-card__stars">{'★'.repeat(avis.note)}{'☆'.repeat(5 - avis.note)}</div>
                <p className="product__avis-titre">{avis.titre}</p>
                <p className="murmure-card__texte">"{avis.texte}"</p>
                <div className="murmure-card__divider" />
                <div className="murmure-card__author">
                  <div className="murmure-card__avatar">{avis.nom.charAt(0)}</div>
                  <div className="murmure-card__info">
                    <span className="murmure-card__nom">{avis.nom}</span>
                    <span className="murmure-card__produit">{avis.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire avis */}
          <div className="product__avis-form">
            <h3>Laisser un avis</h3>
            {avisEnvoye ? (
              <div className="product__avis-success">
                <p>✦ Merci pour votre avis !</p>
              </div>
            ) : (
              <form onSubmit={handleAvisSubmit}>
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