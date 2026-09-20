import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerUsuarios } from '../services/usuarioService'

function Login() {
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const manejarLogin = async (e) => {
    e.preventDefault()

    setError('')
    setCargando(true)

    try {
      const respuesta = await obtenerUsuarios()

      const usuarioEncontrado = respuesta.data.find(
        (usuario) =>
          usuario.nombre === nombre &&
          usuario.clave === clave &&
          usuario.estado === true
      )

      if (!usuarioEncontrado) {
        setError('Nombre o contraseña incorrectos.')
        return
      }

      localStorage.setItem(
        'usuario',
        JSON.stringify(usuarioEncontrado)
      )

      alert(`¡Bienvenido/a, ${usuarioEncontrado.nombre}!`)

      navigate('/')
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      setError('No se pudo conectar con el servidor.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="page login-page">
      <h1>Iniciar sesión</h1>

      <p>Ingresa a tu cuenta de Drafty ♡</p>

      <form onSubmit={manejarLogin} className="login-form">
        <label htmlFor="nombre">
          Usuario
        </label>

        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingresa tu usuario"
          required
        />

        <label htmlFor="clave">
          Contraseña
        </label>

        <input
          id="clave"
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          placeholder="Ingresa tu contraseña"
          required
        />

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="add-cart-button"
          disabled={cargando}
        >
          {cargando ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
    </main>
  )
}

export default Login