import '../styles/About.css'

function About() {
  return (
    <div className="about">

      {/* HERO ABOUT */}
      <section className="about__hero">
        <div className="about__hero-overlay" />
        <div className="container">
          <p className="section-label">À propos</p>
          <div className="ornament"><span>✦</span></div>
          <h1>L'Artisane des Étoiles</h1>
        </div>
      </section>

      {/* PRÉSENTATION */}
      <section className="about__intro">
        <div className="container">
          <div className="about__grid">
            <div className="about__image">
              <img src="/about.jpg" alt="La Brodeuse d'Étoiles" />
            </div>
            <div className="about__content">
              <h2>Bonjour, je suis Laurène</h2>
              <div className="ornament" style={{ justifyContent: 'flex-start' }}><span>✦</span></div>
              <p>Créatrice de La Brodeuse d'Étoiles, je suis une illustratrice passionnée par les univers fantastiques, les forêts enchantées et les légendes oubliées.</p>
              <p>Chaque création naît d'une histoire, d'un rêve ou d'une émotion que je souhaite partager avec vous. Mes stickers, illustrations et papeterie sont imaginés et réalisés à la main, avec soin et intention.</p>
              <p>La Brodeuse d'Étoiles c'est avant tout un univers — un endroit où la magie du quotidien se mêle à la fantaisie des mondes imaginaires.</p>
              <div className="about__signature">
                <span>✦ Laurène</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="about__values">
        <div className="container">
          <p className="section-label">Mes valeurs</p>
          <div className="ornament"><span>✦</span></div>
          <div className="about__values-grid">
            <div className="about__value">
              <h4>✦ Artisanat</h4>
              <p>Chaque pièce est créée à la main, avec des matériaux soigneusement choisis.</p>
            </div>
            <div className="about__value">
              <h4>✦ Univers</h4>
              <p>Un imaginaire cohérent et profond, inspiré des grandes œuvres de la fantasy.</p>
            </div>
            <div className="about__value">
              <h4>✦ Soin</h4>
              <p>Chaque commande est emballée avec amour et expédiée dans les meilleurs délais.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About