import '../styles/Home.css'
import { useState, useEffect } from 'react'
import api from '../api/axios'

function Home() {

  const [produits, setProduits] = useState([])

useEffect(() => {
  const fetchProduits = async () => {
    try {
      const response = await api.get('/produits')
      setProduits(response.data.slice(0, 4)) // Les 4 premiers produits
    } catch (err) {
      console.error(err)
    }
  }
  fetchProduits()
}, [])

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <img src="/hero.jpg" alt="La Brodeuse d'Étoiles" />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content">
          <h1>La Brodeuse d'Étoiles</h1>
          <p className="hero__sub">Stickers ✦ Papeterie ✦ Illustrations</p>
          <div className="hero__actions">
            <a href="/catalogue" className="btn-accent">Découvrir la boutique</a>
            <a href="/mail-club" className="btn-primary">Rejoindre le Mail Club</a>
          </div>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="categories">
        <div className="container">
          <p className="section-label">Explorez les royaumes</p>
          <div className="ornament"><span>✦</span></div>
          <div className="categories__grid">
            <a href="/catalogue?categorie=illustrations" className="categories__item">
              <div className="categories__arch">
                <img src="/cat-illustrations.jpg" alt="Illustrations" />
                <div className="categories__overlay" />
              </div>
              <h3>Illustrations</h3>
            </a>
            <a href="/catalogue?categorie=papeterie" className="categories__item">
              <div className="categories__arch">
                <img src="/cat-papeterie.jpg" alt="Papeterie" />
                <div className="categories__overlay" />
              </div>
              <h3>Papeterie</h3>
            </a>
            <a href="/catalogue?categorie=stickers" className="categories__item">
              <div className="categories__arch">
                <img src="/cat-stickers.jpg" alt="Stickers" />
                <div className="categories__overlay" />
              </div>
              <h3>Stickers</h3>
            </a>
          </div>
        </div>
      </section>

      {/* MAIL CLUB */}
      <section className="mailclub">
        <div className="container">
          <div className="mailclub__grid">
            <div className="mailclub__image">
              <img src="/mailclub.jpg" alt="Mail Club - Le Grimoire de la Dragonnière" />
            </div>
            <div className="mailclub__content">
              <p className="mailclub__tag">Abonnement mensuel</p>
              <h2>Mail Club :<br />Le Grimoire de la Dragonnière</h2>
              <p className="mailclub__price">9€ / mois</p>
              <p className="mailclub__taxes">Taxes incluses. Frais d'expédition calculés lors de l'expédition.</p>
              <p className="mailclub__desc">
                Ouvrez les pages du Grimoire de la Dragonnière et partez à la découverte 
                des créatures magiques, légendes oubliées et secrets fantastiques 
                consignés au fil de ses voyages.
              </p>
              <ul className="mailclub__perks">
                <li><span>✦</span> Créations exclusives chaque mois</li>
                <li><span>✦</span> Emballage soigné et personnalisé</li>
                <li><span>✦</span> Pause ou résiliation à tout moment</li>
              </ul>
              <div className="mailclub__actions">
                <a href="/inscription" className="btn-accent">S'abonner</a>
                <a href="/mail-club" className="btn-primary">En savoir plus</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="collection">
        <div className="collection__banner">
          <p className="section-label">Les nouvelles reliques</p>
          <div className="ornament"><span>✦</span></div>
        </div>
        <div className="collection__inner">
          <div className="collection__grid">
          {produits.map((item) => (
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
          <div className="collection__cta">
            <a href="/catalogue" className="btn-primary">Voir toute la collection</a>
          </div>
        </div>
      </section>

     {/* 3 COLONNES */}
      <section className="features">
        <div className="features__grid">
          <div className="features__item">
            <div className="features__icon">
              <img src="/icon-1.jpg" alt="Tissé à la main" />
            </div>
            <div className="features__divider" />
            <h4>Tissé à la main</h4>
            <p>Chaque création naît de mes mains, dessinée et façonnée avec soin et intention.</p>
          </div>
          <div className="features__item">
            <div className="features__icon">
              <img src="/icon-2.jpg" alt="Envoyé avec soin" />
            </div>
            <div className="features__divider" />
            <h4>Envoyé avec soin</h4>
            <p>Vos commandes sont préparées et expédiées sous 48h, emballées avec tendresse.</p>
          </div>
          <div className="features__item">
            <div className="features__icon">
              <img src="/icon-3.jpg" alt="Imprégné de magie" />
            </div>
            <div className="features__divider" />
            <h4>Imprégné de magie</h4>
            <p>Un univers fantastique brodé dans chaque illustration, pour les âmes qui rêvent.</p>
          </div>
        </div>
      </section>

      {/* LES MURMURES */}
      <section className="murmures">
        <div className="container">
          <p className="section-label">Les Murmures</p>
          <div className="ornament"><span>✦</span></div>
          <div className="murmures__grid">
            {[
              {
                id: 1,
                note: 5,
                texte: "Un vrai coup de cœur. Le sticker est encore plus beau en vrai, les détails sont incroyables. On sent vraiment l'univers fantastique dans chaque trait.",
                nom: "Mathilde R.",
                produit: 'Sticker "Forêt enchantée"'
              },
              {
                id: 2,
                note: 5,
                texte: "Le carnet est absolument magnifique, la couverture illustrée est une œuvre à elle seule. L'emballage soigné m'a touchée, on voit vraiment l'amour du travail bien fait.",
                nom: "Léa V.",
                produit: 'Carnet "Lune de minuit"'
              },
              {
                id: 3,
                note: 5,
                texte: "Abonnée au mail club depuis 3 mois et à chaque envoi c'est la même magie. Des créations uniques qu'on ne trouve nulle part ailleurs. Je recommande les yeux fermés !",
                nom: "Sophie D.",
                produit: "Abonnement Mail Club"
              },
            ].map((avis) => (
              <div key={avis.id} className="murmure-card">
                <div className="murmure-card__stars">
                  {'★'.repeat(avis.note)}
                </div>
                <p className="murmure-card__texte">"{avis.texte}"</p>
                <div className="murmure-card__divider" />
                <div className="murmure-card__author">
                  <div className="murmure-card__avatar">
                    {avis.nom.charAt(0)}
                  </div>
                  <div className="murmure-card__info">
                    <span className="murmure-card__nom">{avis.nom}</span>
                    <span className="murmure-card__produit">{avis.produit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home