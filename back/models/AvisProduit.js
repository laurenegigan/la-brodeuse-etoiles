import mongoose from 'mongoose'

const avisSchema = new mongoose.Schema({
  produit_id: {
    type: Number,
    required: true
  },
  utilisateur_id: {
    type: Number,
    required: true
  },
  utilisateur_prenom: {
    type: String,
    required: true
  },
  note: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  titre: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  contenu: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  reponse_admin: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const AvisProduit = mongoose.model('AvisProduit', avisSchema)

export default AvisProduit