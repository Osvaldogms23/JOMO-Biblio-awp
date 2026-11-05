import { useEffect, useState } from 'react'

const inicial = { titulo: '', descripcion: '', precio: '', imagen: '' }

export default function FormularioLibro({ libroEditar, onGuardar, onCancelar }) {
  const [form, setForm] = useState(inicial)
  const [errores, setErrores] = useState({})

  useEffect(() => {
    setForm(libroEditar ? {
      titulo: libroEditar.titulo, descripcion: libroEditar.descripcion,
      precio: String(libroEditar.precio), imagen: libroEditar.imagen
    } : inicial)
    setErrores({})
  }, [libroEditar])

  function cambiar(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  function enviar(e) {
    e.preventDefault()
    const nuevos = {}
    if (form.titulo.trim().length < 2) nuevos.titulo = 'Escribe un título válido.'
    if (form.descripcion.trim().length < 5) nuevos.descripcion = 'Agrega una descripción.'
    if (form.precio === '' || Number(form.precio) < 0) nuevos.precio = 'Ingresa un precio válido.'
    if (form.imagen && !/^https?:\/\//i.test(form.imagen)) nuevos.imagen = 'La imagen debe comenzar con http:// o https://.'
    setErrores(nuevos)
    if (Object.keys(nuevos).length === 0) {
      onGuardar({ ...form, titulo: form.titulo.trim(), precio: Number(form.precio) })
      setForm(inicial)
    }
  }

  return <form onSubmit={enviar} className="row g-3">
    <div className="col-12"><label className="form-label">Título del libro</label>
      <input className={`form-control ${errores.titulo ? 'is-invalid' : ''}`} name="titulo" value={form.titulo} onChange={cambiar} />
      <div className="invalid-feedback">{errores.titulo}</div></div>
    <div className="col-12"><label className="form-label">Descripción</label>
      <textarea className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`} rows="3" name="descripcion" value={form.descripcion} onChange={cambiar}/>
      <div className="invalid-feedback">{errores.descripcion}</div></div>
    <div className="col-md-6"><label className="form-label">Precio de referencia</label>
      <input type="number" min="0" step="0.01" className={`form-control ${errores.precio ? 'is-invalid' : ''}`} name="precio" value={form.precio} onChange={cambiar}/>
      <div className="invalid-feedback">{errores.precio}</div></div>
    <div className="col-md-6"><label className="form-label">URL de imagen (opcional)</label>
      <input className={`form-control ${errores.imagen ? 'is-invalid' : ''}`} name="imagen" value={form.imagen} onChange={cambiar}/>
      <div className="invalid-feedback">{errores.imagen}</div></div>
    <div className="col-12 d-flex gap-2">
      <button className="btn btn-primary" type="submit"><i className="bi bi-check-lg me-1"></i>{libroEditar ? 'Guardar cambios' : 'Registrar libro'}</button>
      {libroEditar && <button className="btn btn-outline-secondary" type="button" onClick={onCancelar}>Cancelar</button>}
    </div>
  </form>
}
