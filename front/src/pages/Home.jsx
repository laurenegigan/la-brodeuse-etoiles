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
    </div>
  )
}

export default Home