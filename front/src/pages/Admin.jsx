import '../styles/Admin.css'
import { useState } from 'react'

function Admin() {
  const [activeTab, setActiveTab] = useState('commandes')

  // Données fictives
  const commandes = [
    { id: 1, client: 'Mathilde R.', email: 'mathilde@email.com', date: '12 mars 2025', statut: 'Envoyé', total: '23,00 €', produits: ['La Forêt des Songes', 'Pack "Créatures des Bois"'] },
    { id: 2, client: 'Léa V.', email: 'lea@email.com', date: '28 janvier 2025', statut: 'Livré', total: '14,00 €', produits: ['Le Royaume Oublié'] },
    { id: 3, client: 'Sophie D.', email: 'sophie@email.com', date: '5 avril 2025', statut: 'En attente', total: '9,00 €', produits: ['Carnet "Lune de Minuit"'] },
  ]

  const abonnes = [
    { id: 1, prenom: 'Mathilde', email: 'mathilde@email.com', statut: 'Actif', date: '1 janvier 2025' },
    { id: 2, prenom: 'Léa', email: 'lea@email.com', statut: 'En pause', date: '15 février 2025' },
    { id: 3, prenom: 'Sophie', email: 'sophie@email.com', statut: 'Résilié', date: '3 mars 2025', raison: 'Trop cher' },
  ]

  const messages = [
    { id: 1, nom: 'Emma L.', email: 'emma@email.com', message: 'Bonjour, est-il possible de commander une illustration personnalisée ?', date: '10 avril 2025' },
    { id: 2, nom: 'Clara M.', email: 'clara@email.com', message: 'Je n\'ai pas reçu ma commande du mois de mars, pouvez-vous vérifier ?', date: '5 avril 2025' },
  ]

  const raisons = [
    { raison: 'Trop cher', count: 3 },
    { raison: 'Pas assez de contenus', count: 1 },
    { raison: 'Autre', count: 2 },
  ]

  const signalements = [
    { id: 1, type: 'Avis', auteur: 'User_xXx99', contenu: 'Ce produit est nul, arnaque totale, vendeur incompétent !!!', produit: 'La Forêt des Songes', date: '8 avril 2025', motif: 'Langage agressif' },
    { id: 2, type: 'Pseudo', auteur: 'P*tain_de_compte', contenu: '—', produit: '—', date: '6 avril 2025', motif: 'Pseudo offensant' },
  ]

const [produits, setProduits] = useState([
  { id: 1, nom: 'La Forêt des Songes', categorie: 'Illustration', prix: '14,00 €', stock: 12, img: 'product-1.jpg' },
  { id: 2, nom: 'Carnet "Lune de Minuit"', categorie: 'Papeterie', prix: '9,00 €', stock: 3, img: 'product-2.jpg' },
  { id: 3, nom: 'Pack "Créatures des Bois"', categorie: 'Sticker', prix: '6,00 €', stock: 0, img: 'product-3.jpg' },
  { id: 4, nom: 'Le Royaume Oublié', categorie: 'Illustration', prix: '14,00 €', stock: 8, img: 'product-4.jpg' },
])

const [showProductModal, setShowProductModal] = useState(false)
const [editingProduct, setEditingProduct] = useState(null)
const [productForm, setProductForm] = useState({ nom: '', categorie: 'Illustration', prix: '', stock: '' })

const getStockStatus = (stock) => {
  if (stock === 0) return 'rupture'
  if (stock <= 5) return 'faible'
  return 'ok'
}

const handleProductFormChange = (e) => {
  setProductForm({ ...productForm, [e.target.name]: e.target.value })
}

const openAddProduct = () => {
  setEditingProduct(null)
  setProductForm({ nom: '', categorie: 'Illustration', prix: '', stock: '' })
  setShowProductModal(true)
}

const openEditProduct = (produit) => {
  setEditingProduct(produit)
  setProductForm({ nom: produit.nom, categorie: produit.categorie, prix: produit.prix, stock: produit.stock })
  setShowProductModal(true)
}

const handleProductSubmit = (e) => {
  e.preventDefault()
  if (editingProduct) {
    setProduits(produits.map(p => p.id === editingProduct.id ? { ...p, ...productForm, stock: parseInt(productForm.stock) } : p))
  } else {
    setProduits([...produits, { id: Date.now(), ...productForm, stock: parseInt(productForm.stock), img: 'product-1.jpg' }])
  }
  setShowProductModal(false)
}

const handleDeleteProduct = (id) => {
  if (confirm('Supprimer ce produit ?')) {
    setProduits(produits.filter(p => p.id !== id))
  }
}

  const tabs = [
    { id: 'produits', label: 'Produits', count: produits.length },
    { id: 'commandes', label: 'Commandes', count: commandes.length },
    { id: 'abonnes', label: 'Abonnés', count: abonnes.length },
    { id: 'messages', label: 'Messages', count: messages.length },
    { id: 'raisons', label: 'Raisons désabo', count: raisons.length },
    { id: 'moderation', label: 'Modération', count: signalements.length },
  ]

  return (
    <div className="admin">

      {/* HERO */}
      <section className="admin__hero">
        <div className="container">
          <p className="section-label">Espace administration</p>
          <div className="ornament"><span>✦</span></div>
          <h1>Tableau de bord</h1>
        </div>
      </section>

      {/* STATS */}
      <section className="admin__stats">
        <div className="container">
          <div className="admin__stats-grid">
            <div className="admin__stat">
              <span className="admin__stat-value">{commandes.length}</span>
              <span className="admin__stat-label">Commandes</span>
            </div>
            <div className="admin__stat">
              <span className="admin__stat-value">{abonnes.filter(a => a.statut === 'Actif').length}</span>
              <span className="admin__stat-label">Abonnés actifs</span>
            </div>
            <div className="admin__stat">
              <span className="admin__stat-value">{messages.length}</span>
              <span className="admin__stat-label">Messages</span>
            </div>
            <div className="admin__stat">
              <span className="admin__stat-value">{abonnes.filter(a => a.statut === 'Résilié').length}</span>
              <span className="admin__stat-label">Résiliations</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <section className="admin__section">
        <div className="container">

          {/* Onglets */}
          <div className="admin__tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`admin__tab ${activeTab === tab.id ? 'admin__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                <span className="admin__tab-count">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* PRODUITS */}
          {activeTab === 'produits' && (
            <div className="admin__produits">
              <div className="admin__produits-header">
                <button className="btn-accent" onClick={openAddProduct}>
                  + Ajouter un produit
                </button>
              </div>
              <div className="admin__table-wrapper">
                <table className="admin__table">
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Catégorie</th>
                      <th>Prix</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produits.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div className="admin__produit-cell">
                            <img src={`/${p.img}`} alt={p.nom} className="admin__produit-thumb" />
                            <span>{p.nom}</span>
                          </div>
                        </td>
                        <td>{p.categorie}</td>
                        <td className="admin__total">{p.prix}</td>
                        <td>
                          <span className={`admin__stock admin__stock--${getStockStatus(p.stock)}`}>
                            {p.stock === 0 ? 'Rupture de stock' : `${p.stock} en stock`}
                          </span>
                        </td>
                        <td>
                          <div className="admin__produit-actions">
                            <button className="admin__action-btn" onClick={() => openEditProduct(p)}>Modifier</button>
                            <button className="admin__action-btn admin__action-btn--danger" onClick={() => handleDeleteProduct(p.id)}>Supprimer</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODAL PRODUIT */}
          {showProductModal && (
            <div className="profile__modal-overlay" onClick={() => setShowProductModal(false)}>
              <div className="profile__modal" onClick={e => e.stopPropagation()}>
                <h3>{editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}</h3>
                <form onSubmit={handleProductSubmit}>
                  <div className="auth__field">
                    <label htmlFor="nom">Nom du produit</label>
                    <input type="text" id="nom" name="nom" value={productForm.nom} onChange={handleProductFormChange} placeholder="Nom du produit" required />
                  </div>
                  <div className="auth__field">
                    <label htmlFor="categorie">Catégorie</label>
                    <select id="categorie" name="categorie" value={productForm.categorie} onChange={handleProductFormChange}>
                      <option value="Illustration">Illustration</option>
                      <option value="Papeterie">Papeterie</option>
                      <option value="Sticker">Sticker</option>
                    </select>
                  </div>
                  <div className="auth__field">
                    <label htmlFor="prix">Prix</label>
                    <input type="text" id="prix" name="prix" value={productForm.prix} onChange={handleProductFormChange} placeholder="14,00 €" required />
                  </div>
                  <div className="auth__field">
                    <label htmlFor="stock">Stock</label>
                    <input type="number" id="stock" name="stock" value={productForm.stock} onChange={handleProductFormChange} placeholder="0" min="0" required />
                  </div>
                  <div className="profile__modal-btns">
                    <button type="submit" className="btn-accent">{editingProduct ? 'Enregistrer' : 'Ajouter'}</button>
                    <button type="button" className="btn-primary" onClick={() => setShowProductModal(false)}>Annuler</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* COMMANDES */}
          {activeTab === 'commandes' && (
            <div className="admin__table-wrapper">
              <table className="admin__table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Produits</th>
                    <th>Total</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {commandes.map(cmd => (
                    <tr key={cmd.id}>
                      <td>#{cmd.id}</td>
                      <td>
                        <div className="admin__client">
                          <span>{cmd.client}</span>
                          <span className="admin__client-email">{cmd.email}</span>
                        </div>
                      </td>
                      <td>{cmd.date}</td>
                      <td>{cmd.produits.join(', ')}</td>
                      <td className="admin__total">{cmd.total}</td>
                      <td>
                        <span className={`profile__statut profile__statut--${cmd.statut.toLowerCase().replace(' ', '-')}`}>
                          {cmd.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ABONNÉS */}
          {activeTab === 'abonnes' && (
            <div className="admin__table-wrapper">
              <table className="admin__table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Date inscription</th>
                    <th>Statut</th>
                    <th>Raison résiliation</th>
                  </tr>
                </thead>
                <tbody>
                  {abonnes.map(abo => (
                    <tr key={abo.id}>
                      <td>#{abo.id}</td>
                      <td>{abo.prenom}</td>
                      <td>{abo.email}</td>
                      <td>{abo.date}</td>
                      <td>
                        <span className={`profile__statut profile__statut--${abo.statut.toLowerCase().replace(' ', '-')}`}>
                          {abo.statut}
                        </span>
                      </td>
                      <td>{abo.raison || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* MESSAGES */}
          {activeTab === 'messages' && (
            <div className="admin__messages">
              {messages.map(msg => (
                <div key={msg.id} className="admin__message">
                  <div className="admin__message-header">
                    <div>
                      <span className="admin__message-nom">{msg.nom}</span>
                      <span className="admin__message-email">{msg.email}</span>
                    </div>
                    <span className="admin__message-date">{msg.date}</span>
                  </div>
                  <p className="admin__message-texte">"{msg.message}"</p>
                </div>
              ))}
            </div>
          )}

          {/* RAISONS DÉSABO */}
          {activeTab === 'raisons' && (
            <div className="admin__raisons">
              {raisons.map((r, i) => (
                <div key={i} className="admin__raison">
                  <div className="admin__raison-info">
                    <span className="admin__raison-label">{r.raison}</span>
                    <span className="admin__raison-count">{r.count} résiliation{r.count > 1 ? 's' : ''}</span>
                  </div>
                  <div className="admin__raison-bar-wrapper">
                    <div
                      className="admin__raison-bar"
                      style={{ width: `${(r.count / raisons.reduce((a, b) => a + b.count, 0)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MODÉRATION */}
          {activeTab === 'moderation' && (
            <div className="admin__moderation">
              {signalements.length === 0 ? (
                <div className="admin__empty">
                  <p>✦ Aucun signalement en attente. Tout va bien !</p>
                </div>
              ) : (
                signalements.map(sig => (
                  <div key={sig.id} className="admin__signalement">
                    <div className="admin__signalement-header">
                      <div>
                        <span className="admin__signalement-type">{sig.type}</span>
                        <span className="admin__signalement-motif">{sig.motif}</span>
                      </div>
                      <span className="admin__message-date">{sig.date}</span>
                    </div>
                    <div className="admin__signalement-body">
                      <p className="admin__signalement-auteur">Auteur : <strong>{sig.auteur}</strong></p>
                      {sig.produit !== '—' && <p className="admin__signalement-produit">Produit concerné : {sig.produit}</p>}
                      {sig.contenu !== '—' && <p className="admin__signalement-contenu">"{sig.contenu}"</p>}
                    </div>
                    <div className="admin__signalement-actions">
                      <button className="btn-accent" onClick={() => alert('Contenu supprimé')}>
                        Supprimer le contenu
                      </button>
                      <button className="profile__desabo-btn" onClick={() => alert('Utilisateur banni')}>
                        Bannir l'utilisateur
                      </button>
                      <button className="admin__signalement-ignore" onClick={() => alert('Signalement ignoré')}>
                        Ignorer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </section>

    </div>
  )
}

export default Admin