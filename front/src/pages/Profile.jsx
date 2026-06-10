import '../styles/Profile.css'
import { useState } from 'react'

function Profile() {
  const [activeTab, setActiveTab] = useState('commandes')
  const [showDesaboModal, setShowDesaboModal] = useState(false)
  const [desaboForm, setDesaboForm] = useState({ raison: '', commentaire: '' })
  const [desaboEnvoye, setDesaboEnvoye] = useState(false)

  // Données fictives
  const utilisateur = { prenom: 'Mathilde', email: 'mathilde@email.com' }
  const commandes = [
    { id: 1, date: '12 mars 2025', statut: 'Envoyé', total: '23,00 €', produits: ['La Forêt des Songes', 'Pack "Créatures des Bois"'] },
    { id: 2, date: '28 janvier 2025', statut: 'Livré', total: '14,00 €', produits: ['Le Royaume Oublié'] },
  ]
  const mailclub = { statut: 'Actif', prochainEnvoi: '1er juillet 2025', prix: '9€ / mois' }

  const handleDesaboChange = (e) => {
    setDesaboForm({ ...desaboForm, [e.target.name]: e.target.value })
  }

  const handleDesaboSubmit = (e) => {
    e.preventDefault()
    console.log('Désabonnement :', desaboForm)
    setDesaboEnvoye(true)
  }

  return (
    <div className="profile">

      {/* HERO */}
      <section className="profile__hero">
        <div className="container">
          <p className="section-label">Mon espace</p>
          <div className="ornament"><span>✦</span></div>
          <h1>Bonjour, {utilisateur.prenom} ✦</h1>
          <p className="profile__email">{utilisateur.email}</p>
        </div>
      </section>

      {/* ONGLETS */}
      <section className="profile__section">
        <div className="container">
          <div className="profile__tabs">
            <button
              className={`profile__tab ${activeTab === 'commandes' ? 'profile__tab--active' : ''}`}
              onClick={() => setActiveTab('commandes')}
            >
              Mes commandes
            </button>
            <button
              className={`profile__tab ${activeTab === 'mailclub' ? 'profile__tab--active' : ''}`}
              onClick={() => setActiveTab('mailclub')}
            >
              Mon Mail Club
            </button>
          </div>

          {/* COMMANDES */}
          {activeTab === 'commandes' && (
            <div className="profile__commandes">
              {commandes.length === 0 ? (
                <div className="profile__empty">
                  <p>Vous n'avez pas encore de commandes.</p>
                  <a href="/catalogue" className="btn-accent">Découvrir la boutique</a>
                </div>
              ) : (
                commandes.map(cmd => (
                  <div key={cmd.id} className="profile__commande">
                    <div className="profile__commande-header">
                      <div>
                        <span className="profile__commande-id">Commande #{cmd.id}</span>
                        <span className="profile__commande-date">{cmd.date}</span>
                      </div>
                      <div className="profile__commande-right">
                        <span className={`profile__statut profile__statut--${cmd.statut.toLowerCase()}`}>
                          {cmd.statut}
                        </span>
                        <span className="profile__commande-total">{cmd.total}</span>
                      </div>
                    </div>
                    <ul className="profile__commande-produits">
                      {cmd.produits.map((p, i) => (
                        <li key={i}><span>✦</span> {p}</li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          )}

          {/* MAIL CLUB */}
          {activeTab === 'mailclub' && (
            <div className="profile__mailclub">
              {!desaboEnvoye ? (
                <>
                  <div className="profile__mailclub-card">
                    <div className="profile__mailclub-info">
                      <h3>Le Grimoire de la Dragonnière</h3>
                      <div className="profile__mailclub-details">
                        <div className="profile__mailclub-detail">
                          <span className="profile__mailclub-label">Statut</span>
                          <span className={`profile__statut profile__statut--${mailclub.statut.toLowerCase()}`}>
                            {mailclub.statut}
                          </span>
                        </div>
                        <div className="profile__mailclub-detail">
                          <span className="profile__mailclub-label">Prochain envoi</span>
                          <span className="profile__mailclub-value">{mailclub.prochainEnvoi}</span>
                        </div>
                        <div className="profile__mailclub-detail">
                          <span className="profile__mailclub-label">Tarif</span>
                          <span className="profile__mailclub-value">{mailclub.prix}</span>
                        </div>
                      </div>
                    </div>
                    <div className="profile__mailclub-actions">
                      <button className="btn-primary" onClick={() => alert('Abonnement mis en pause pour ce mois !')}>
                        Mettre en pause
                      </button>
                      <button className="profile__desabo-btn" onClick={() => setShowDesaboModal(true)}>
                        Se désabonner
                      </button>
                    </div>
                  </div>

                  {/* Modal désabonnement */}
                  {showDesaboModal && (
                    <div className="profile__modal-overlay" onClick={() => setShowDesaboModal(false)}>
                      <div className="profile__modal" onClick={e => e.stopPropagation()}>
                        <h3>Nous sommes désolés de vous voir partir</h3>
                        <p>Pour nous aider à améliorer le Mail Club, pouvez-vous nous indiquer la raison de votre départ ?</p>
                        <form onSubmit={handleDesaboSubmit}>
                          <div className="profile__modal-radios">
                            {[
                              { value: 'trop_cher', label: 'Le prix est trop élevé' },
                              { value: 'peu_contenu', label: 'Pas assez de contenus' },
                              { value: 'autre', label: 'Autre raison' },
                            ].map(option => (
                              <label key={option.value} className="profile__radio">
                                <input
                                  type="radio"
                                  name="raison"
                                  value={option.value}
                                  checked={desaboForm.raison === option.value}
                                  onChange={handleDesaboChange}
                                  required
                                />
                                <span>{option.label}</span>
                              </label>
                            ))}
                          </div>
                          <div className="auth__field">
                            <label htmlFor="commentaire">Commentaire (optionnel)</label>
                            <textarea
                              id="commentaire"
                              name="commentaire"
                              value={desaboForm.commentaire}
                              onChange={handleDesaboChange}
                              placeholder="Dites-nous en plus..."
                              rows={3}
                              className="product__textarea"
                            />
                          </div>
                          <div className="profile__modal-btns">
                            <button type="submit" className="btn-accent">Confirmer le désabonnement</button>
                            <button type="button" className="btn-primary" onClick={() => setShowDesaboModal(false)}>Annuler</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="profile__desabo-success">
                  <p>✦ Votre désabonnement a bien été pris en compte.</p>
                  <p>Nous espérons vous revoir bientôt dans le Grimoire de la Dragonnière.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </section>

    </div>
  )
}

export default Profile