export const estadoInicial = { libros: [], cargando: true, error: '' }

export function librosReducer(state, action) {
  switch (action.type) {
    case 'CARGAR':
      return { ...state, libros: action.payload, cargando: false, error: '' }
    case 'AGREGAR':
      return { ...state, libros: [action.payload, ...state.libros] }
    case 'ACTUALIZAR':
      return { ...state, libros: state.libros.map(libro =>
        libro.id === action.payload.id ? action.payload : libro) }
    case 'ELIMINAR':
      return { ...state, libros: state.libros.filter(libro => libro.id !== action.payload) }
    case 'ERROR':
      return { ...state, cargando: false, error: action.payload }
    case 'CARGANDO':
      return { ...state, cargando: true, error: '' }
    default:
      return state
  }
}
