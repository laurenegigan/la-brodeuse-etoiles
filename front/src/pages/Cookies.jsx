import PageLegale from '../components/PageLegale'

function Cookies() {
  return (
    <PageLegale titre="Préférences en terme de Cookies">
      <h2>Qu'est-ce qu'un cookie ?</h2>
      <p>Un cookie est un petit fichier texte déposé sur votre appareil lors de votre visite sur notre site. Il permet de mémoriser vos préférences et d'améliorer votre expérience de navigation.</p>

      <h2>Cookies utilisés</h2>
      <p>La Brodeuse d'Étoiles utilise uniquement des cookies techniques strictement nécessaires au bon fonctionnement du site :</p>
      <ul>
        <li>Cookie de session pour maintenir votre connexion</li>
        <li>Cookie de panier pour conserver vos articles</li>
        <li>Cookie de préférences pour mémoriser vos paramètres</li>
      </ul>

      <h2>Cookies tiers</h2>
      <p>Aucun cookie publicitaire ou de tracking tiers n'est utilisé sur ce site.</p>

      <h2>Gestion des cookies</h2>
      <p>Vous pouvez à tout moment modifier vos préférences de cookies depuis les paramètres de votre navigateur. La désactivation des cookies techniques peut affecter le bon fonctionnement du site.</p>
    </PageLegale>
  )
}

export default Cookies