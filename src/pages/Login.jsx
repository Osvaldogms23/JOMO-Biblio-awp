import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { iniciarSesion } from '../api/authApi'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const { login } = useAuth()
  const navegar = useNavigate()
  const location = useLocation()

  async function enviar(e) {
    e.preventDefault()
    setError('')
    if (!username.trim() || !password.trim()) { setError('Completa usuario y contraseña.'); return }
    try {
      setCargando(true)
      const datos = await iniciarSesion(username, password)
      login(datos)
      navegar(location.state?.from || '/admin', { replace: true })
    } catch (err) { setError(err.message) }
    finally { setCargando(false) }
  }

  return <section className="login-page">
    <div className="container py-5"><div className="login-panel mx-auto row g-0">
      <div className="col-lg-5 login-aside"><i className="bi bi-book-half display-3"></i><h2 className="fw-bold mt-4">Biblioteca UTL</h2><p>Accede al espacio de administración de la biblioteca.</p></div>
      <div className="col-lg-7 p-4 p-md-5"><span className="section-kicker">ACCESO</span><h1 className="h2 fw-bold mb-2">Iniciar sesión</h1><p className="text-secondary mb-4">Ingresa tus datos para continuar.</p>
        <form onSubmit={enviar}>
          <label className="form-label">Usuario</label><div className="input-group mb-3"><span className="input-group-text"><i className="bi bi-person"></i></span><input className="form-control" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" /></div>
          <label className="form-label">Contraseña</label><div className="input-group mb-3"><span className="input-group-text"><i className="bi bi-lock"></i></span><input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password"/></div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <button className="btn btn-primary w-100 py-2" disabled={cargando}>{cargando ? 'Validando...' : 'Entrar'}</button>
        </form>
        <Link to="/libros" className="d-inline-block mt-3 small text-decoration-none">Volver al catálogo</Link>
      </div>
    </div></div>
  </section>
}
