import {
  subscribeMailclub,
  findMailclubByUserId,
  pauseMailclub,
  resumeMailclub,
  cancelMailclub,
  createDesabonnement
} from '../models/mailclubModel.js'

// POST /mailclub - Inscription
export async function subscribe(req, res) {
  try {
    const { id: utilisateurId, email, prenom } = req.user

    // Vérifier si déjà inscrit
    const existing = await findMailclubByUserId(utilisateurId)
    if (existing) {
      return res.status(409).json({ error: 'Vous êtes déjà inscrit au Mail Club' })
    }

    const mailclubId = await subscribeMailclub(utilisateurId, email, prenom)
    res.status(201).json({ message: 'Inscription au Mail Club réussie', id: mailclubId })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de l\'inscription au Mail Club' })
  }
}

// GET /user/mailclub - Statut de l'abonnement
export async function getStatus(req, res) {
  try {
    const { id: utilisateurId } = req.user

    const abonnement = await findMailclubByUserId(utilisateurId)
    if (!abonnement) {
      return res.status(404).json({ error: 'Aucun abonnement Mail Club trouvé' })
    }

    res.json(abonnement)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'abonnement' })
  }
}

// PATCH /user/mailclub/pause - Mettre en pause
export async function pause(req, res) {
  try {
    const { id: utilisateurId } = req.user

    const abonnement = await findMailclubByUserId(utilisateurId)
    if (!abonnement) {
      return res.status(404).json({ error: 'Aucun abonnement Mail Club trouvé' })
    }

    if (abonnement.statut === 'resilie') {
      return res.status(400).json({ error: 'Impossible de mettre en pause un abonnement résilié' })
    }

    await pauseMailclub(utilisateurId)
    res.json({ message: 'Abonnement mis en pause pour ce mois' })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la mise en pause' })
  }
}

// PATCH /user/mailclub/resume - Réactiver
export async function resume(req, res) {
  try {
    const { id: utilisateurId } = req.user

    const abonnement = await findMailclubByUserId(utilisateurId)
    if (!abonnement) {
      return res.status(404).json({ error: 'Aucun abonnement Mail Club trouvé' })
    }

    await resumeMailclub(utilisateurId)
    res.json({ message: 'Abonnement réactivé' })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la réactivation' })
  }
}

// DELETE /user/mailclub - Désabonnement
export async function cancel(req, res) {
  try {
    const { id: utilisateurId } = req.user
    const { raison, commentaire } = req.body

    const raisonsValides = ['trop_cher', 'peu_contenu', 'autre']
    if (!raison || !raisonsValides.includes(raison)) {
      return res.status(400).json({ error: 'Raison invalide. Valeurs acceptées : trop_cher, peu_contenu, autre' })
    }

    const abonnement = await findMailclubByUserId(utilisateurId)
    if (!abonnement) {
      return res.status(404).json({ error: 'Aucun abonnement Mail Club trouvé' })
    }

    await cancelMailclub(abonnement.id)
    await createDesabonnement(abonnement.id, raison, commentaire)

    res.json({ message: 'Désabonnement effectué. Merci pour votre retour.' })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors du désabonnement' })
  }
}