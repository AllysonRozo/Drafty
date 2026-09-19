import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import logo from '../assets/logo.png'

function Header() {

  const { cantidadProductos } = useCart()

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
      </nav>

      <div className="header-icons">

        <button type="button">⌕</button>

        <button type="button">♙</button>

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