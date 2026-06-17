import '../styles/Profile.css'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

function Profile() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('commandes')
  const [commandes, setCommandes] = useState([])
  const [mailclub, setMailclub] = useState(null)
  const [loadingCommandes, setLoadingCommandes] = useState(true)
  const [loadingMailclub, setLoadingMailclub] = useState(true)
  const [showDesaboModal, setShowDesaboModal] = useState(false)
  const [desaboForm, setDesaboForm] = useState({ raison: '', commentaire: '' })
  const [desaboEnvoye, setDesaboEnvoye] = useState(false)

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const response = await api.get('/commandes')
        setCommandes(response.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingCommandes(false)
      }
    }
    fetchCommandes()
  }, [])

  useEffect(() => {
    const fetchMailclub = async () => {
      try {
        const response = await api.get('/mailclub')
        setMailclub(response.data)
      } catch (err) {
        // 404 = pas d'abonnement, c'est normal
        setMailclub(null)
      } finally {
        setLoadingMailclub(false)
      }
    }
    fetchMailclub()
  }, [])

  const handlePause = async () => {
    try {
      await api.patch('/mailclub/pause')
      setMailclub({ ...mailclub, statut: 'en_pause' })
      alert('Abonnement mis en pause pour ce mois !')
    } catch (err) {
      alert(err.response?.data?.error || 'Une erreur est survenue')
    }
  }

  const handleDesaboChange = (e) => {
    setDesaboForm({ ...desaboForm, [e.target.name]: e.target.value })
  }

  const handleDesaboSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.delete('/mailclub', { data: desaboForm })
      setDesaboEnvoye(true)
      setMailclub({ ...mailclub, statut: 'resilie' })
    } catch (err) {
      alert(err.response?.data?.error || 'Une erreur est survenue')
    }
  }

  if (!user) {
    return (
      <div className="profile">
        <section className="profile__section">
          <div className="container">
            <p style={{ textAlign: 'center', color: 'var(--color-cream-dim)' }}>
              Vous devez être connectée pour accéder à votre espace.
            </p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="profile">

      {/* HERO */}
      <section className="profile__hero">
        <div className="container">
          <p className="section-label">Mon espace</p>
          <div className="ornament"><span>✦</span></div>
          <h1>Bonjour, {user.prenom} ✦</h1>
          <p className="profile__email">{user.email}</p>
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
              {loadingCommandes ? (
                <p style={{ textAlign: 'center', color: 'var(--color-cream-dim)' }}>Chargement...</p>
              ) : commandes.length === 0 ? (
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
                        <span className="profile__commande-date">
                          {new Date(cmd.date_commande).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="profile__commande-right">
                        <span className={`profile__statut profile__statut--${cmd.statut === 'en_attente' ? 'en-attente' : cmd.statut === 'envoye' ? 'envoyé' : 'livré'}`}>
                          {cmd.statut === 'en_attente' ? 'En attente' : cmd.statut === 'envoye' ? 'Envoyé' : 'Livré'}
                        </span>
                        <span className="profile__commande-total">{parseFloat(cmd.total).toFixed(2)} €</span>
                      </div>
                    </div>
                    <ul className="profile__commande-produits">
                      {cmd.produits.map((p, i) => (
                        <li key={i}><span>✦</span> {p.nom} (x{p.quantite})</li>
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
              {loadingMailclub ? (
                <p style={{ textAlign: 'center', color: 'var(--color-cream-dim)' }}>Chargement...</p>
              ) : !mailclub ? (
                <div className="profile__empty">
                  <p>Vous n'êtes pas encore inscrite au Mail Club.</p>
                  <a href="/mail-club" className="btn-accent">Rejoindre le Mail Club</a>
                </div>
              ) : !desaboEnvoye ? (
                <>
                  <div className="profile__mailclub-card">
                    <div className="profile__mailclub-info">
                      <h3>Le Grimoire de la Dragonnière</h3>
                      <div className="profile__mailclub-details">
                        <div className="profile__mailclub-detail">
                          <span className="profile__mailclub-label">Statut</span>
                          <span className={`profile__statut profile__statut--${mailclub.statut === 'actif' ? 'actif' : mailclub.statut === 'en_pause' ? 'en-pause' : 'résilié'}`}>
                            {mailclub.statut === 'actif' ? 'Actif' : mailclub.statut === 'en_pause' ? 'En pause' : 'Résilié'}
                          </span>
                        </div>
                        <div className="profile__mailclub-detail">
                          <span className="profile__mailclub-label">Inscrite depuis</span>
                          <span className="profile__mailclub-value">
                            {new Date(mailclub.date_inscription).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="profile__mailclub-detail">
                          <span className="profile__mailclub-label">Tarif</span>
                          <span className="profile__mailclub-value">9€ / mois</span>
                        </div>
                      </div>
                    </div>
                    {mailclub.statut !== 'resilie' && (
                      <div className="profile__mailclub-actions">
                        <button className="btn-primary" onClick={handlePause}>
                          Mettre en pause
                        </button>
                        <button className="profile__desabo-btn" onClick={() => setShowDesaboModal(true)}>
                          Se désabonner
                        </button>
                      </div>
                    )}
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