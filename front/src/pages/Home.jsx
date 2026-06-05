import '../styles/Home.css'

function Home() {
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
            {[
            { id: 1, img: 'product-1.jpg', cat: 'Illustration', name: 'La Forêt des Songes', price: '14,00 €' },
            { id: 2, img: 'product-2.jpg', cat: 'Papeterie', name: 'Carnet "Lune de Minuit"', price: '9,00 €' },
            { id: 3, img: 'product-3.jpg', cat: 'Sticker', name: 'Pack "Créatures des Bois"', price: '6,00 €' },
            { id: 4, img: 'product-4.jpg', cat: 'Illustration', name: 'Le Royaume Oublié', price: '14,00 €' },
          ].map((item) => (
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
          <div className="collection__cta">
            <a href="/catalogue" className="btn-primary">Voir toute la collection</a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home