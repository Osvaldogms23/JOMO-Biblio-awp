import { Link } from 'react-router-dom'
export default function NotFound() {
  return <section className="notfound min-page"><div><div className="display-1 fw-bold text-primary">404</div><h1 className="fw-bold">Página no encontrada</h1><p className="text-secondary">La dirección que buscas no está disponible.</p><Link to="/" className="btn btn-primary">Volver al inicio</Link></div></section>
}
