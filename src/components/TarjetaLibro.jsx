export default function TarjetaLibro({ libro, acciones }) {
  return <div className="card book-card h-100 border-0 shadow-sm">
    <div className="book-image-wrap"><img src={libro.imagen} alt={libro.titulo}
      onError={e => { e.currentTarget.src = 'https://placehold.co/400x550?text=Biblioteca+UTL' }} /></div>
    <div className="card-body d-flex flex-column">
      <span className="badge text-bg-light align-self-start mb-2">{libro.categoria}</span>
      <h5 className="fw-bold">{libro.titulo}</h5>
      <p className="text-secondary small flex-grow-1">{libro.descripcion}</p>
      <div className="d-flex justify-content-between align-items-center">
        <strong className="text-primary">${libro.precio.toFixed(2)}</strong>
        {acciones}
      </div>
    </div>
  </div>
}
