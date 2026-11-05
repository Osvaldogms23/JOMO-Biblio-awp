const URL_LIBROS = 'https://gutendex.com/books/'
const URL_CRUD = 'https://dummyjson.com/products'

// CONSULTAR LIBROS
export async function obtenerLibros() {
  const respuesta = await fetch(`${URL_LIBROS}?page_size=30`)

  if (!respuesta.ok) {
    throw new Error('No fue posible cargar los libros')
  }

  const datos = await respuesta.json()

  return datos.results.map((libro) => ({
    id: libro.id,
    titulo: libro.title,
    descripcion: libro.authors?.length
      ? `Autor: ${libro.authors.map(a => a.name).join(', ')}`
      : 'Autor no disponible',
    precio: 0,
    imagen: libro.formats?.['image/jpeg'] ||
      'https://placehold.co/400x550?text=Libro',
    categoria: libro.subjects?.[0] || 'Literatura'
  }))
}

// AGREGAR LIBRO
export async function agregarLibro(libro) {
  const respuesta = await fetch(`${URL_CRUD}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: libro.titulo,
      description: libro.descripcion,
      price: libro.precio,
      category: 'books',
      thumbnail: libro.imagen ||
        'https://placehold.co/400x550?text=Libro'
    })
  })

  if (!respuesta.ok) {
    throw new Error('No se pudo registrar el libro')
  }

  const datos = await respuesta.json()

  return {
    id: datos.id,
    titulo: libro.titulo,
    descripcion: libro.descripcion,
    precio: libro.precio,
    imagen: libro.imagen ||
      'https://placehold.co/400x550?text=Libro',
    categoria: 'Literatura'
  }
}

// ACTUALIZAR LIBRO
export async function actualizarLibro(id, libro) {
  const respuesta = await fetch(`${URL_CRUD}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: libro.titulo,
      description: libro.descripcion,
      price: libro.precio,
      thumbnail: libro.imagen
    })
  })

  if (!respuesta.ok) {
    throw new Error('No se pudo actualizar el libro')
  }

  return {
    id,
    titulo: libro.titulo,
    descripcion: libro.descripcion,
    precio: libro.precio,
    imagen: libro.imagen ||
      'https://placehold.co/400x550?text=Libro',
    categoria: 'Literatura'
  }
}

// ELIMINAR LIBRO
export async function eliminarLibro(id) {
  const respuesta = await fetch(`${URL_CRUD}/${id}`, {
    method: 'DELETE'
  })

  if (!respuesta.ok) {
    throw new Error('No se pudo eliminar el libro')
  }

  return respuesta.json()
}