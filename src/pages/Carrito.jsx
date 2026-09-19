import { useCart } from '../context/CartContext'

import cuadernoAesthetic from '../img/cuaderno-aesthetic.jpg'
import cuadernoPastel from '../img/cuaderno-pastel.jpg'
import marcadores from '../img/marcadores.jpg'
import lapicerosPastel from '../img/lapiceros-pastel.jpg'
import organizador from '../img/organizador.jpg'
import { Link } from 'react-router-dom'

function Carrito() {
  const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito
  } = useCart()

  const imagenes = {
    'cuaderno-aesthetic.jpg': cuadernoAesthetic,
    'cuaderno-pastel.jpg': cuadernoPastel,
    'marcadores.jpg': marcadores,
    'lapiceros-pastel.jpg': lapicerosPastel,
    'organizador.jpg': organizador
  }

  const total = carrito.reduce(
    (suma, producto) =>
      suma + producto.precio * producto.cantidad,
    0
  )

  return (
    <main className="page">
      <h1>Mi carrito 🛒</h1>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío ♡</p>
      ) : (
        <section className="cart">

          <div className="cart-products">

            {carrito.map((producto) => (
              <article className="cart-item" key={producto.id}>

                <img
                  className="cart-item-image"
                  src={imagenes[producto.imagen]}
                  alt={producto.nombre}
                />

                <div className="cart-item-info">

                  <h2>{producto.nombre}</h2>

                  <p>
                    Precio: ${producto.precio}
                  </p>

                  <div className="quantity">

                    <button
                      onClick={() =>
                        disminuirCantidad(producto.id)
                      }
                    >
                      −
                    </button>

                    <span>{producto.cantidad}</span>

                    <button
                      onClick={() =>
                        aumentarCantidad(producto.id)
                      }
                    >
                      +
                    </button>
                    {producto.errorStock && (
                    <p className="stock-error">
                     ⚠️ {producto.errorStock}
                    </p>
                    )}
                  </div>

                  <strong>
                    Subtotal: $
                    {producto.precio * producto.cantidad}
                  </strong>

                </div>

                <button
                  className="delete-button"
                  onClick={() =>
                    eliminarDelCarrito(producto.id)
                  }
                >
                  🗑️
                </button>

              </article>
            ))}

          </div>

          <div className="cart-total">
            <h2>Total: ${total}</h2>

           <Link
             to="/checkout"
            className="checkout-button"
            >
             Finalizar compra
            </Link>
          </div>

        </section>
      )}
    </main>
  )
}

export default Carrito