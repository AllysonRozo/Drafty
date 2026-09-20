import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { obtenerProductos, actualizarProducto, eliminarProducto } from '../services/productoService'
import { useCart } from '../context/CartContext'

import cuadernoAesthetic from '../img/cuaderno-aesthetic.jpg'
import cuadernoPastel from '../img/cuaderno-pastel.jpg'
import marcadores from '../img/marcadores.jpg'
import lapicerosPastel from '../img/lapiceros-pastel.jpg'
import organizador from '../img/organizador.jpg'

import agendaFloral from '../img/agenda-floral.jpg'
import acuarelas from '../img/acuarelas.jpg'
import pinceles from '../img/pinceles.jpg'
import stickersAesthetic from '../img/stickers-aesthetic.jpg'
import washiTape from '../img/washi-tape.jpg'
import sellos from '../img/sellos.jpg'
import kitPapeleria from '../img/kit-papeleria.jpg'

function Tienda() {
  const { agregarAlCarrito } = useCart()

  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [actualizando, setActualizando] = useState(null)
  const [searchParams] = useSearchParams()

  const categoria = searchParams.get('categoria')

  const imagenes = {
    'cuaderno-aesthetic.jpg': cuadernoAesthetic,
    'cuaderno-pastel.jpg': cuadernoPastel,
    'marcadores.jpg': marcadores,
    'lapiceros-pastel.jpg': lapicerosPastel,
    'organizador.jpg': organizador,

    'agenda-floral.jpg': agendaFloral,
    'acuarelas.jpg': acuarelas,
    'pinceles.jpg': pinceles,
    'stickers-aesthetic.jpg': stickersAesthetic,
    'washi-tape.jpg': washiTape,
    'sellos.jpg': sellos,
    'kit-papeleria.jpg': kitPapeleria
  }

  useEffect(() => {
    obtenerProductos()
      .then((respuesta) => {
        setProductos(respuesta.data)
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error)
      })
      .finally(() => {
        setCargando(false)
      })
  }, [])

  const actualizarStock = (producto) => {
  const nuevoStock = prompt(
    `Nuevo stock para ${producto.nombre}:`,
    producto.stock
  )

  if (nuevoStock === null) return

  if (nuevoStock === '' || Number(nuevoStock) < 0) {
    alert('Ingresa un stock válido.')
    return
  }

  setActualizando(producto.id)

  actualizarProducto(producto.id, {
    ...producto,
    stock: Number(nuevoStock)
  })
    .then((respuesta) => {
      setProductos((productosActuales) =>
        productosActuales.map((item) =>
          item.id === producto.id ? respuesta.data : item
        )
      )

      alert('Stock actualizado correctamente.')
    })
    .catch((error) => {
      console.error('Error al actualizar el stock:', error)
      alert('No se pudo actualizar el stock.')
    })
    .finally(() => {
      setActualizando(null)
    })
}

  const productosFiltrados = productos.filter((producto) => {
    if (!categoria) {
      return true
    }

    return producto.categoria === categoria
  })

  return (
    <main className="page">

      <h1>
        {categoria ? categoria : 'Nuestra tienda'}
      </h1>

      <p>
        {categoria
          ? `Productos de ${categoria.toLowerCase()} ♡`
          : 'Encuentra todo lo que necesitas para crear ♡'}
      </p>

      {cargando ? (
        <p>Cargando productos...</p>
      ) : (
        <section className="products">

          {productosFiltrados.map((producto) => (

            <article className="product-card" key={producto.id}>

              <img
                src={imagenes[producto.imagen]}
                alt={producto.nombre}
              />

              <h2>{producto.nombre}</h2>

              <p>{producto.descripcion}</p>

              <strong>
                ${producto.precio.toLocaleString('es-CO')}
              </strong>

              <span>
                Stock: {producto.stock}
              </span>


            <button
             className="update-stock-button"
            onClick={() => actualizarStock(producto)}
            disabled={actualizando === producto.id}
            >
            {actualizando === producto.id
               ? 'Actualizando...'
               : 'Actualizar stock'}
              </button>

              <button
                className="add-cart-button"
                onClick={() => agregarAlCarrito(producto)}
              >
                Agregar al carrito 🛒
              </button>

            </article>

          ))}

        </section>
      )}

    </main>
  )
}

export default Tienda