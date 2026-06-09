import '../styles/Contact.css'
import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Message envoyé :', form)
    setSent(true)
    setForm({ nom: '', email: '', message: '' })
  }

  return (
    <div className="contact">

      {/* HERO */}
      <section className="contact__hero">
        <div className="container">
          <p className="section-label">Glissez moi un parchemin</p>
          <div className="ornament"><span>✦</span></div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="contact__section">
        <div className="container">
          <div className="contact__grid">

            {/* Infos */}
            <div className="contact__info">
              <h2>Une question ?<br />Un message ?</h2>
              <p>N'hésitez pas à me contacter pour toute question relative à une commande, un produit ou simplement pour partager votre univers fantastique.</p>
              <div className="contact__details">
                <div className="contact__detail">
                  <span>✦</span>
                  <p>Réponse sous 48h ouvrées</p>
                </div>
                <div className="contact__detail">
                  <span>✦</span>
                  <p>labrodeusedeltoiles@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="contact__form-wrapper">
              {sent ? (
                <div className="contact__success">
                  <p>✦ Votre message a bien été envoyé !</p>
                  <p>Je vous répondrai dans les meilleurs délais.</p>
                  <button onClick={() => setSent(false)} className="btn-primary">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form className="contact__form" onSubmit={handleSubmit}>
                  <div className="contact__field">
                    <label htmlFor="nom">Nom</label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      placeholder="Votre nom"
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
                  <div className="contact__field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Votre message..."
                      rows={6}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-accent">
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Contact