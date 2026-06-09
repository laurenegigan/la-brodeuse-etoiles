import '../styles/MailClub.css'
import { useState } from 'react'

function MailClub() {
  const [form, setForm] = useState({ prenom: '', email: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Inscription :', form)
    setSent(true)
    setForm({ prenom: '', email: '' })
  }

  return (
    <div className="mailclub-page">

      {/* HERO */}
      <section className="mailclub-page__hero">
        <div className="container">
          <p className="section-label">Abonnement mensuel</p>
          <div className="ornament"><span>✦</span></div>
          <h1>Le Grimoire de<br />la Dragonnière</h1>
          <p className="mailclub-page__sub">9€ / mois · Taxes incluses</p>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="mailclub-page__desc">
        <div className="container">
          <div className="mailclub-page__grid">

            {/* Image */}
            <div className="mailclub-page__image">
              <img src="/mailclub.jpg" alt="Le Grimoire de la Dragonnière" />
            </div>

            {/* Contenu */}
            <div className="mailclub-page__content">
              <h2>Qu'est-ce que le Mail Club ?</h2>
              <div className="ornament" style={{ justifyContent: 'flex-start' }}><span>✦</span></div>
              <p>Ouvrez les pages du Grimoire de la Dragonnière et partez à la découverte des créatures magiques, légendes oubliées et secrets fantastiques consignés au fil de ses voyages.</p>
              <p>Chaque mois, recevez un envoi soigneusement préparé, emballé avec amour et rempli de créations exclusives introuvables ailleurs.</p>

              <h3>Ce que contient votre envoi</h3>
              <ul className="mailclub-page__list">
                <li><span>✦</span> 3 à 5 stickers exclusifs</li>
                <li><span>✦</span> Une illustration inédite</li>
                <li><span>✦</span> Des éléments de papeterie</li>
                <li><span>✦</span> Une surprise fantastique</li>
                <li><span>✦</span> Un message de la Brodeuse</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* MODALITÉS */}
      <section className="mailclub-page__modalites">
        <div className="container">
          <p className="section-label">Les modalités</p>
          <div className="ornament"><span>✦</span></div>
          <div className="mailclub-page__modalites-grid">
            <div className="mailclub-page__modalite">
              <h4>✦ Abonnement mensuel</h4>
              <p>9€ / mois, prélevé automatiquement chaque mois à la date de votre inscription.</p>
            </div>
            <div className="mailclub-page__modalite">
              <h4>✦ Pause possible</h4>
              <p>Vous pouvez mettre votre abonnement en pause pour un mois depuis votre espace personnel.</p>
            </div>
            <div className="mailclub-page__modalite">
              <h4>✦ Résiliation libre</h4>
              <p>Résiliez à tout moment depuis votre espace personnel, sans frais ni engagement.</p>
            </div>
            <div className="mailclub-page__modalite">
              <h4>✦ Expédition</h4>
              <p>Les envois sont expédiés entre le 1er et le 5 de chaque mois. Frais d'expédition inclus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULAIRE INSCRIPTION */}
      <section className="mailclub-page__inscription">
        <div className="container">
          <div className="mailclub-page__form-wrapper">
            <p className="section-label">Rejoindre le grimoire</p>
            <div className="ornament"><span>✦</span></div>
            <h2>Prêt·e à rejoindre<br />l'aventure ?</h2>

            {sent ? (
              <div className="mailclub-page__success">
                <p>✦ Bienvenue dans le Grimoire de la Dragonnière !</p>
                <p>Vous recevrez un email de confirmation dans quelques instants.</p>
              </div>
            ) : (
              <form className="mailclub-page__form" onSubmit={handleSubmit}>
                <div className="mailclub-page__fields">
                  <div className="contact__field">
                    <label htmlFor="prenom">Prénom</label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={form.prenom}
                      onChange={handleChange}
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn-accent">
                  S'abonner au Mail Club — 9€ / mois
                </button>
                <p className="mailclub-page__legal">
                  En vous inscrivant, vous acceptez nos <a href="/cgv">CGV</a> et notre <a href="/confidentialite">politique de confidentialité</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}

export default MailClub