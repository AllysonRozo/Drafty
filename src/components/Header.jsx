import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import logo from '../assets/logo.png'

function Header() {
  const { cantidadProductos } = useCart()
  const navigate = useNavigate()

  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario')
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null
  })

  const cerrarSesion = () => {
    localStorage.removeItem('usuario')
    setUsuario(null)
    alert('Sesión cerrada correctamente.')
    navigate('/')
  }

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="Drafty" />
      </Link>

      <nav className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/tienda">Tienda</Link>
        <Link to="/categorias">Categorías</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/historial">Mis pedidos</Link>
      </nav>

      <div className="header-icons">

        <button type="button">⌕</button>

        {usuario ? (
          <div className="user-area">
            <span className="user-name">
              Hola, {usuario.nombre}
            </span>

            <button
              type="button"
              className="logout-button"
              onClick={cerrarSesion}
            >
              Salir
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-button">
            ♙
          </Link>
        )}

        <Link to="/carrito" className="cart-button">
          🛒

          {cantidadProductos > 0 && (
            <span className="cart-count">
              {cantidadProductos}
            </span>
          )}
        </Link>

      </div>
    </header>
  )
}

export default Header