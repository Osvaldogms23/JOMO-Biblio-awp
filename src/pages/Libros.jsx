import { useEffect, useMemo, useReducer, useState } from 'react'
import { obtenerLibros } from '../api/librosApi'
import { estadoInicial, librosReducer } from '../reducers/librosReducer'
import TarjetaLibro from '../components/TarjetaLibro'

export default function Libros() {
  const [state, dispatch] = useReducer(librosReducer, estadoInicial)
  const [busqueda, setBusqueda] = useState('')
  useEffect(() => {
    obtenerLibros().then(datos => dispatch({ type: 'CARGAR', payload: datos }))
      .catch(error => dispatch({ type: 'ERROR', payload: error.message }))
  }, [])
  const filtrados = useMemo(() => state.libros.filter(l =>
    l.titulo.toLowerCase().includes(busqueda.toLowerCase())), [state.libros, busqueda])

  return <section className="container py-5 min-page">
    <div className="d-md-flex justify-content-between align-items-end mb-4">
      <div><span className="section-kicker">BIBLIOTECA UTL</span><h1 className="fw-bold mb-1">Catálogo de libros</h1><p className="text-secondary mb-0">Consulta los títulos disponibles.</p></div>
      <div className="input-group search-box mt-3 mt-md-0"><span className="input-group-text bg-white"><i className="bi bi-search"></i></span><input className="form-control" placeholder="Buscar por título..." value={busqueda} onChange={e => setBusqueda(e.target.value)}/></div>
    </div>
    {state.cargando ? <div className="text-center py-5"><div className="spinner-border text-primary"/><p className="mt-3 text-secondary">Cargando catálogo...</p></div> :
      state.error ? <div className="alert alert-danger">{state.error}</div> :
      <><p className="text-secondary small">{filtrados.length} resultados</p><div className="row g-4">
        {filtrados.map(libro => <div className="col-sm-6 col-lg-4 col-xl-3" key={libro.id}><TarjetaLibro libro={libro}/></div>)}
      </div>{filtrados.length === 0 && <p className="text-center py-5">No se encontraron libros.</p>}</>}
  </section>
}
