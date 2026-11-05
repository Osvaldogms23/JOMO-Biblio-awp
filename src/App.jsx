import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import RutaProtegida from './components/RutaProtegida'
import Inicio from './pages/Inicio'
import Libros from './pages/Libros'
import Login from './pages/Login'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import './App.css'

function Contenido() {
  return <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/libros" element={<Libros />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<RutaProtegida><Admin /></RutaProtegida>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <footer className="footer-utl"><div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
      <span><i className="bi bi-book-half me-2"></i>Biblioteca Universidad Tecnológica de León</span>
      <span>JOMO-biblio-awp · Aplicación web progresiva</span>
    </div></footer>
  </>
}

export default function App() {
  return <AuthProvider><BrowserRouter><Contenido /></BrowserRouter></AuthProvider>
}
