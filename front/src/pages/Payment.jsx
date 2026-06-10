import '../styles/Payment.css'
import { useState } from 'react'

function Payment() {
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', adresse: '', ville: '', codepostal: '', pays: 'France'
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Commande :', form)
  }

  // Panier fictif pour la maquette
  const panier = [
    { id: 1, name: 'La Forêt des Songes', price: 14.00, qty: 1, img: 'product-1.jpg' },
    { id: 2, name: 'Carnet "Lune de Minuit"', price: 9.00, qty: 2, img: 'product-2.jpg' },
  ]

  const sousTotal = panier.reduce((acc, item) => acc + item.price * item.qty, 0)
  const fraisPort = 4.50
  const total = sousTotal + fraisPort

  return (
    <div className="payment">

      {/* HERO */}
      <section className="payment__hero">
        <div className="container">
          <h1>Paiement</h1>
          <div className="ornament"><span>✦</span></div>
        </div>
      </section>

      {/* CONTENU */}
      <section className="payment__section">
        <div className="container">
          <div className="payment__grid">

            {/* Formulaire */}
            <div className="payment__form-wrapper">
              <h3>Informations de livraison</h3>
              <form className="payment__form" onSubmit={handleSubmit}>
                <div className="payment__row">
                  <div className="auth__field">
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" id="prenom" name="prenom" value={form.prenom} onChange={handleChange} placeholder="Votre prénom" required />
                  </div>
                  <div className="auth__field">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" name="nom" value={form.nom} onChange={handleChange} placeholder="Votre nom" required />
                  </div>
                </div>
                <div className="auth__field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" required />
                </div>
                <div className="auth__field">
                  <label htmlFor="adresse">Adresse</label>
                  <input type="text" id="adresse" name="adresse" value={form.adresse} onChange={handleChange} placeholder="Votre adresse" required />
                </div>
                <div className="payment__row">
                  <div className="auth__field">
                    <label htmlFor="codepostal">Code postal</label>
                    <input type="text" id="codepostal" name="codepostal" value={form.codepostal} onChange={handleChange} placeholder="75000" required />
                  </div>
                  <div className="auth__field">
                    <label htmlFor="ville">Ville</label>
                    <input type="text" id="ville" name="ville" value={form.ville} onChange={handleChange} placeholder="Paris" required />
                  </div>
                </div>
                <div className="auth__field">
                  <label htmlFor="pays">Pays</label>
                  <select id="pays" name="pays" value={form.pays} onChange={handleChange}>
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Luxembourg">Luxembourg</option>
                  </select>
                </div>
                <button type="submit" className="btn-accent payment__btn">
                  Confirmer la commande
                </button>
                <p className="payment__legal">
                  En confirmant votre commande, vous acceptez nos <a href="/cgv">CGV</a>.
                </p>
              </form>
            </div>

            {/* Récapitulatif */}
            <div className="payment__recap">
              <h3>Récapitulatif</h3>
              <div className="payment__items">
                {panier.map(item => (
                  <div key={item.id} className="payment__item">
                    <div className="payment__item-img">
                      <img src={`/${item.img}`} alt={item.name} />
                      <span className="payment__item-qty">{item.qty}</span>
                    </div>
                    <div className="payment__item-info">
                      <p className="payment__item-name">{item.name}</p>
                      <p className="payment__item-price">{(item.price * item.qty).toFixed(2)} €</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="payment__divider" />
              <div className="payment__totals">
                <div className="payment__total-line">
                  <span>Sous-total</span>
                  <span>{sousTotal.toFixed(2)} €</span>
                </div>
                <div className="payment__total-line">
                  <span>Frais de port</span>
                  <span>{fraisPort.toFixed(2)} €</span>
                </div>
                <div className="payment__divider" />
                <div className="payment__total-line payment__total-line--final">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Payment