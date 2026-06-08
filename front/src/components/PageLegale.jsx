import '../styles/PageLegale.css'

function PageLegale({ titre, children }) {
  return (
    <div className="legale">
      <section className="legale__hero">
        <div className="container">
          <p className="section-label">Informations légales</p>
          <div className="ornament"><span>✦</span></div>
          <h1>{titre}</h1>
        </div>
      </section>
      <section className="legale__content">
        <div className="container">
          {children}
        </div>
      </section>
    </div>
  )
}

export default PageLegale