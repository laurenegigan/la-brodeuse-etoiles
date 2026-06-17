import '../styles/Admin.css'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

function Admin() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('produits')

  const [produits, setProduits] = useState([])
  const [commandes, setCommandes] = useState([])
  const [abonnes, setAbonnes] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({ nom: '', description: '', categorie_id: 1, prix: '', stock: '', image_url: '' })

  useEffect(() => {
    if (!user || user.role !== 'admin') return

    const fetchAll = async () => {
      try {
        setLoading(true)
        const [produitsRes, commandesRes, abonnesRes, messagesRes] = await Promise.all([
          api.get('/produits'),
          api.get('/admin/commandes'),
          api.get('/admin/mailclub'),
          api.get('/admin/messages'),
        ])
        setProduits(produitsRes.data)
        setCommandes(commandesRes.data)
        setAbonnes(abonnesRes.data)
        setMessages(messagesRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [user])

  // Calcul des raisons de désabonnement à partir des abonnés résiliés
  const raisons = ['trop_cher', 'peu_contenu', 'autre'].map(r => ({
    raison: r === 'trop_cher' ? 'Trop cher' : r === 'peu_contenu' ? 'Pas assez de contenus' : 'Autre',
    count: abonnes.filter(a => a.raison === r).length
  })).filter(r => r.count > 0)

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
    setProductForm({ nom: '', description: '', categorie_id: 1, prix: '', stock: '', image_url: '' })
    setShowProductModal(true)
  }

  const openEditProduct = (produit) => {
    setEditingProduct(produit)
    setProductForm({
      nom: produit.nom,
      description: produit.description || '',
      categorie_id: produit.categorie_id,
      prix: produit.prix,
      stock: produit.stock,
      image_url: produit.image_url || ''
    })
    setShowProductModal(true)
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await api.put(`/admin/produits/${editingProduct.id}`, productForm)
        setProduits(produits.map(p => p.id === editingProduct.id ? { ...p, ...productForm } : p))
      } else {
        const response = await api.post('/admin/produits', productForm)
        setProduits([...produits, { ...productForm, id: response.data.id }])
      }
      setShowProductModal(false)
    } catch (err) {
      alert(err.response?.data?.error || 'Une erreur est survenue')
    }
  }

  const handleDeleteProduct = async (id) => {
    if (confirm('Supprimer ce produit ?')) {
      try {
        await api.delete(`/admin/produits/${id}`)
        setProduits(produits.filter(p => p.id !== id))
      } catch (err) {
        alert(err.response?.data?.error || 'Une erreur est survenue')
      }
    }
  }

  const tabs = [
    { id: 'produits', label: 'Produits', count: produits.length },
    { id: 'commandes', label: 'Commandes', count: commandes.length },
    { id: 'abonnes', label: 'Abonnés', count: abonnes.length },
    { id: 'messages', label: 'Messages', count: messages.length },
    { id: 'raisons', label: 'Raisons désabo', count: raisons.length },
  ]

  if (!user) {
    return (
      <div className="admin">
        <section className="admin__section">
          <div className="container">
            <p style={{ textAlign: 'center', color: 'var(--color-cream-dim)' }}>Vous devez être connectée pour accéder à cette page.</p>
          </div>
        </section>
      </div>
    )
  }

  if (user.role !== 'admin') {
    return (
      <div className="admin">
        <section className="admin__section">
          <div className="container">
            <p style={{ textAlign: 'center', color: 'var(--color-terracotta)' }}>Accès réservé aux administratrices.</p>
          </div>
        </section>
      </div>
    )
  }

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
              <span className="admin__stat-value">{abonnes.filter(a => a.statut === 'actif').length}</span>
              <span className="admin__stat-label">Abonnés actifs</span>
            </div>
            <div className="admin__stat">
              <span className="admin__stat-value">{messages.length}</span>
              <span className="admin__stat-label">Messages</span>
            </div>
            <div className="admin__stat">
              <span className="admin__stat-value">{abonnes.filter(a => a.statut === 'resilie').length}</span>
              <span className="admin__stat-label">Résiliations</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <section className="admin__section">
        <div className="container">

          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--color-cream-dim)' }}>Chargement...</p>
          ) : (
            <>
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
                    <button className="btn-accent" onClick={openAddProduct}>+ Ajouter un produit</button>
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
                                <img src={`/${p.image_url}`} alt={p.nom} className="admin__produit-thumb" />
                                <span>{p.nom}</span>
                              </div>
                            </td>
                            <td>{p.categorie_nom}</td>
                            <td className="admin__total">{parseFloat(p.prix).toFixed(2)} €</td>
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
                              <span>{cmd.prenom}</span>
                              <span className="admin__client-email">{cmd.email}</span>
                            </div>
                          </td>
                          <td>{new Date(cmd.date_commande).toLocaleDateString('fr-FR')}</td>
                          <td>{cmd.produits.map(p => p.nom).join(', ')}</td>
                          <td className="admin__total">{parseFloat(cmd.total).toFixed(2)} €</td>
                          <td>
                            <span className="profile__statut profile__statut--actif">
                              {cmd.statut === 'en_attente' ? 'En attente' : cmd.statut === 'envoye' ? 'Envoyé' : 'Livré'}
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
                          <td>{new Date(abo.date_inscription).toLocaleDateString('fr-FR')}</td>
                          <td>
                            <span className="profile__statut profile__statut--actif">
                              {abo.statut === 'actif' ? 'Actif' : abo.statut === 'en_pause' ? 'En pause' : 'Résilié'}
                            </span>
                          </td>
                          <td>{abo.commentaire_desabo || abo.raison || '—'}</td>
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
                        <span className="admin__message-date">{new Date(msg.date_envoi).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <p className="admin__message-texte">"{msg.message}"</p>
                    </div>
                  ))}
                </div>
              )}

              {/* RAISONS DÉSABO */}
              {activeTab === 'raisons' && (
                <div className="admin__raisons">
                  {raisons.length === 0 ? (
                    <p style={{ color: 'var(--color-cream-dim)' }}>Aucune résiliation enregistrée.</p>
                  ) : (
                    raisons.map((r, i) => (
                      <div key={i} className="admin__raison">
                        <div className="admin__raison-info">
                          <span className="admin__raison-label">{r.raison}</span>
                          <span className="admin__raison-count">{r.count} résiliation{r.count > 1 ? 's' : ''}</span>
                        </div>
                        <div className="admin__raison-bar-wrapper">
                          <div className="admin__raison-bar" style={{ width: `${(r.count / raisons.reduce((a, b) => a + b.count, 0)) * 100}%` }} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}

        </div>
      </section>

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
                <label htmlFor="categorie_id">Catégorie</label>
                <select id="categorie_id" name="categorie_id" value={productForm.categorie_id} onChange={handleProductFormChange}>
                  <option value={1}>Illustration</option>
                  <option value={2}>Papeterie</option>
                  <option value={3}>Sticker</option>
                </select>
              </div>
              <div className="auth__field">
                <label htmlFor="prix">Prix</label>
                <input type="number" step="0.01" id="prix" name="prix" value={productForm.prix} onChange={handleProductFormChange} placeholder="14.00" required />
              </div>
              <div className="auth__field">
                <label htmlFor="stock">Stock</label>
                <input type="number" id="stock" name="stock" value={productForm.stock} onChange={handleProductFormChange} placeholder="0" min="0" required />
              </div>
              <div className="auth__field">
                <label htmlFor="image_url">Image (nom du fichier)</label>
                <input type="text" id="image_url" name="image_url" value={productForm.image_url} onChange={handleProductFormChange} placeholder="product-5.jpg" />
              </div>
              <div className="profile__modal-btns">
                <button type="submit" className="btn-accent">{editingProduct ? 'Enregistrer' : 'Ajouter'}</button>
                <button type="button" className="btn-primary" onClick={() => setShowProductModal(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default Admin