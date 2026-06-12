import AvisProduit from '../models/AvisProduit.js'

// GET /produits/:id/avis - Liste des avis d'un produit
export async function getAvisByProduct(req, res) {
  try {
    const { id } = req.params
    const avis = await AvisProduit.find({ produit_id: Number(id) }).sort({ date: -1 })
    res.json(avis)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des avis' })
  }
}

// POST /produits/:id/avis - Déposer un avis
export async function createAvis(req, res) {
  try {
    const { id } = req.params
    const { note, titre, contenu } = req.body
    const { id: utilisateurId, prenom } = req.user

    // Validation
    if (!note || !titre || !contenu) {
      return res.status(400).json({ error: 'Note, titre et contenu sont requis' })
    }

    if (note < 1 || note > 5) {
      return res.status(400).json({ error: 'La note doit être comprise entre 1 et 5' })
    }

    // Vérifier qu'il n'y a pas déjà un avis de cet utilisateur sur ce produit
    const existingAvis = await AvisProduit.findOne({
      produit_id: Number(id),
      utilisateur_id: utilisateurId
    })

    if (existingAvis) {
      return res.status(409).json({ error: 'Vous avez déjà laissé un avis pour ce produit' })
    }

    const avis = new AvisProduit({
      produit_id: Number(id),
      utilisateur_id: utilisateurId,
      utilisateur_prenom: prenom,
      note,
      titre,
      contenu
    })

    await avis.save()
    res.status(201).json(avis)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la création de l\'avis' })
  }
}

// DELETE /avis/:id - Supprimer un avis (auteur ou admin)
export async function deleteAvis(req, res) {
  try {
    const { id } = req.params
    const { id: utilisateurId, role } = req.user

    const avis = await AvisProduit.findById(id)
    if (!avis) {
      return res.status(404).json({ error: 'Avis introuvable' })
    }

    // Vérifier que c'est l'auteur ou un admin
    if (avis.utilisateur_id !== utilisateurId && role !== 'admin') {
      return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à supprimer cet avis' })
    }

    await AvisProduit.findByIdAndDelete(id)
    res.json({ message: 'Avis supprimé' })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'avis' })
  }
}

// PATCH /avis/:id/reponse - Répondre à un avis (admin)
export async function respondToAvis(req, res) {
  try {
    const { id } = req.params
    const { reponse } = req.body

    if (!reponse) {
      return res.status(400).json({ error: 'La réponse est requise' })
    }

    const avis = await AvisProduit.findByIdAndUpdate(
      id,
      { reponse_admin: reponse },
      { new: true }
    )

    if (!avis) {
      return res.status(404).json({ error: 'Avis introuvable' })
    }

    res.json(avis)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la réponse à l\'avis' })
  }
}