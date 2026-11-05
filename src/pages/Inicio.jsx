import { Link } from 'react-router-dom'

export default function Inicio() {
  return <main>
    <section className="hero-utl">
      <div className="container hero-content">
        <span className="eyebrow">UNIVERSIDAD TECNOLÓGICA DE LEÓN</span>
        <h1>El conocimiento<br/><span>abre caminos.</span></h1>
        <p>Explora, aprende y descubre nuevas ideas en la Biblioteca UTL.</p>
        <Link to="/libros" className="btn btn-warning btn-lg fw-semibold px-4">Explorar catálogo <i className="bi bi-arrow-right ms-2"></i></Link>
      </div>
    </section>
    <section className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <span className="section-kicker">BIBLIOTECA UNIVERSITARIA</span>
          <h2 className="display-6 fw-bold mb-3">Un espacio para aprender y crecer</h2>
          <p className="text-secondary lh-lg">La Biblioteca UTL es un espacio de consulta, lectura e investigación que acompaña la formación académica de nuestra comunidad universitaria.</p>
          <Link to="/libros" className="btn btn-outline-primary mt-2">Conocer el catálogo</Link>
        </div>
        <div className="col-lg-6"><div className="row g-3">
          <div className="col-7"><img className="home-photo large" src="/images/utl-1.svg" alt="Biblioteca UTL"/></div>
          <div className="col-5 d-flex flex-column gap-3"><img className="home-photo" src="/images/utl-2.svg" alt="Sala de lectura"/><img className="home-photo" src="/images/utl-3.svg" alt="Área de cómputo"/></div>
        </div></div>
      </div>
    </section>
    <section className="feature-strip py-4"><div className="container row mx-auto text-center g-3">
      <div className="col-md-4"><i className="bi bi-book fs-2"></i><h5 className="mt-2">Consulta</h5><p className="mb-0">Encuentra materiales de interés.</p></div>
      <div className="col-md-4"><i className="bi bi-search fs-2"></i><h5 className="mt-2">Explora</h5><p className="mb-0">Descubre nuevos conocimientos.</p></div>
      <div className="col-md-4"><i className="bi bi-mortarboard fs-2"></i><h5 className="mt-2">Aprende</h5><p className="mb-0">Impulsa tu formación académica.</p></div>
    </div></section>
  </main>
}
