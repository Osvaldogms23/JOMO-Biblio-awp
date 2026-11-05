import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { usuario, logout } = useAuth()
  const navegar = useNavigate()
  function salir() { logout(); navegar('/') }

  return <nav className="navbar navbar-expand-lg navbar-dark navbar-utl sticky-top">
    <div className="container">
      <Link className="navbar-brand fw-bold" to="/"><i className="bi bi-book-half me-2"></i>Biblioteca UTL</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="menu">
        <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
          <NavLink className="nav-link" to="/">Inicio</NavLink>
          <NavLink className="nav-link" to="/libros">Catálogo</NavLink>
          {usuario ? <>
            <NavLink className="nav-link" to="/admin">Administración</NavLink>
            <span className="navbar-text text-white small mx-lg-2">Hola, {usuario.nombre}</span>
            <button className="btn btn-outline-light btn-sm" onClick={salir}>Cerrar sesión</button>
          </> : <Link className="btn btn-light btn-sm px-3 ms-lg-2" to="/login">Iniciar sesión</Link>}
        </div>
      </div>
    </div>
  </nav>
}
