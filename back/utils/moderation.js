// Liste de mots interdits (insultes, termes offensants)
// Liste non exhaustive, à enrichir selon les besoins
const MOTS_INTERDITS = [
  'merde', 'putain', 'connard', 'connasse', 'salope', 'enculé',
  'pute', 'bâtard', 'enfoiré', 'crétin', 'débile', 'idiot',
  'nazi', 'hitler', 'raciste',
  // Ajoute d'autres termes selon tes besoins
]

/**
 * Vérifie si un texte contient des mots interdits
 * @param {string} texte
 * @returns {boolean}
 */
export function containsForbiddenWords(texte) {
  if (!texte) return false

  const texteNormalise = texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // retire les accents

  return MOTS_INTERDITS.some(mot => texteNormalise.includes(mot))
}