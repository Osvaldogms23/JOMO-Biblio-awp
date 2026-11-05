import { useEffect, useReducer, useState } from 'react'
import { agregarLibro, actualizarLibro, eliminarLibro, obtenerLibros } from '../api/librosApi'
import { estadoInicial, librosReducer } from '../reducers/librosReducer'
import FormularioLibro from '../components/FormularioLibro'
import TarjetaLibro from '../components/TarjetaLibro'

export default function Admin() {
  const [state, dispatch] = useReducer(librosReducer, estadoInicial)
  const [editar, setEditar] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerLibros().then(datos => dispatch({ type: 'CARGAR', payload: datos }))
      .catch(err => dispatch({ type: 'ERROR', payload: err.message }))
  }, [])

  async function guardar(datos) {
    setError(''); setMensaje('')
    try {
      if (editar) {
        const actualizado = await actualizarLibro(editar.id, datos)
        dispatch({ type: 'ACTUALIZAR', payload: { ...actualizado, ...datos, id: editar.id } })
        setMensaje('Libro actualizado correctamente.')
        setEditar(null)
      } else {
        const nuevo = await agregarLibro(datos)
        dispatch({ type: 'AGREGAR', payload: { ...nuevo, ...datos } })
        setMensaje('Libro registrado correctamente.')
      }
    } catch (err) { setError(err.message) }
  }

  async function borrar(libro) {
    if (!window.confirm(`¿Deseas eliminar "${libro.titulo}"?`)) return
    try {
      await eliminarLibro(libro.id)
      dispatch({ type: 'ELIMINAR', payload: libro.id })
      setMensaje('Libro eliminado correctamente.')
    } catch (err) { setError(err.message) }
  }

  return <section className="container py-5 min-page">
    <span className="section-kicker">PANEL DE CONTROL</span><h1 className="fw-bold">Administración de libros</h1><p className="text-secondary">Gestiona el catálogo de la Biblioteca UTL.</p>
    {mensaje && <div className="alert alert-success alert-dismissible">{mensaje}<button className="btn-close" onClick={() => setMensaje('')}></button></div>}
    {error && <div className="alert alert-danger">{error}</div>}
    <div className="row g-4 align-items-start">
      <div className="col-lg-4"><div className="form-panel"><h4 className="fw-bold mb-3">{editar ? 'Editar libro' : 'Registrar libro'}</h4><FormularioLibro libroEditar={editar} onGuardar={guardar} onCancelar={() => setEditar(null)}/></div></div>
      <div className="col-lg-8"><div className="d-flex justify-content-between mb-3"><h4 className="fw-bold">Catálogo</h4><span className="badge text-bg-primary align-self-center">{state.libros.length} libros</span></div>
        {state.cargando ? <div className="text-center py-4"><div className="spinner-border text-primary"/></div> :
        <div className="row g-3">{state.libros.map(libro => <div className="col-md-6 col-xl-4" key={libro.id}><TarjetaLibro libro={libro} acciones={<div className="btn-group"><button className="btn btn-sm btn-outline-primary" title="Editar" onClick={() => { setEditar(libro); window.scrollTo({top:0,behavior:'smooth'}) }}><i className="bi bi-pencil"/></button><button className="btn btn-sm btn-outline-danger" title="Eliminar" onClick={() => borrar(libro)}><i className="bi bi-trash"/></button></div>}/></div>)}</div>}
      </div>
    </div>
  </section>
}
