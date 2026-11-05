import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('usuarioBiblioteca')
    return guardado ? JSON.parse(guardado) : null
  })

  function login(datos) {
    const sesion = {
      id: datos.id, nombre: `${datos.firstName} ${datos.lastName}`,
      username: datos.username, token: datos.accessToken
    }
    setUsuario(sesion)
    localStorage.setItem('usuarioBiblioteca', JSON.stringify(sesion))
  }

  function logout() {
    setUsuario(null)
    localStorage.removeItem('usuarioBiblioteca')
  }

  return <AuthContext.Provider value={{ usuario, login, logout }}>
    {children}
  </AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
