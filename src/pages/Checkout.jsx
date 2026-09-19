import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { crearCliente } from '../services/clienteService'
import { crearOrder } from '../services/orderService'

function Checkout() {
  const { carrito } = useCart()
  const navigate = useNavigate()

  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    metodo_pago: ''
  })

  const [enviando, setEnviando] = useState(false)

  const total = carrito.reduce(
    (suma, producto) =>
      suma + producto.precio * producto.cantidad,
    0
  )

  const manejarCambio = (e) => {
    const { name, value } = e.target

    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()

    if (carrito.length === 0) {
      alert('Tu carrito está vacío 🛒')
      return
    }

    setEnviando(true)

    try {
      // 1. Crear cliente
      const respuestaCliente = await crearCliente({
        nombre: formulario.nombre,
        apellido: formulario.apellido,
        correo: formulario.correo,
        telefono: formulario.telefono,
        direccion: formulario.direccion,
        estado: true
      })

      // 2. Crear detalle del pedido
      const detalle = carrito.map((producto) => ({
        producto: producto.nombre,
        cantidad: producto.cantidad,
        precio: producto.precio,
        subtotal: producto.precio * producto.cantidad
      }))

      // 3. Crear pedido
      await crearOrder({
        cliente: respuestaCliente.data.id,
        fecha: new Date().toISOString(),
        metodo_pago: formulario.metodo_pago,
        total: total,
        descuento: 0,
        detalle: JSON.stringify(detalle),
        estado_orden: '1'
      })

      alert('¡Pedido realizado correctamente! 🛍️')

      navigate('/')
    } catch (error) {
      console.error('Error al realizar el pedido:', error)

      alert(
        'No se pudo realizar el pedido. Intenta nuevamente.'
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="page checkout-page">
      <h1>Finalizar compra ♡</h1>

      <p>
        Completa tus datos para realizar tu pedido.
      </p>

      <div className="checkout">

        <form
          className="checkout-form"
          onSubmit={manejarEnvio}
        >
          <h2>Datos del cliente</h2>

          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
          />

          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={formulario.apellido}
            onChange={manejarCambio}
            required
          />

          <label>Correo</label>
          <input
            type="email"
            name="correo"
            value={formulario.correo}
            onChange={manejarCambio}
            required
          />

          <label>Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formulario.telefono}
            onChange={manejarCambio}
            required
          />

          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formulario.direccion}
            onChange={manejarCambio}
            required
          />

          <label>Método de pago</label>

          <select
            name="metodo_pago"
            value={formulario.metodo_pago}
            onChange={manejarCambio}
            required
          >
            <option value="">
              Selecciona un método
            </option>

            <option value="Tarjeta">
              Tarjeta
            </option>

            <option value="Transferencia">
              Transferencia
            </option>

            <option value="Efectivo">
              Efectivo
            </option>
          </select>

          <button
            type="submit"
            className="checkout-button"
            disabled={enviando}
          >
            {enviando
              ? 'Procesando...'
              : 'Confirmar pedido 🛍️'}
          </button>
        </form>

        <aside className="order-summary">
          <h2>Resumen del pedido</h2>

          {carrito.map((producto) => (
            <div
              className="summary-item"
              key={producto.id}
            >
              <span>
                {producto.nombre} × {producto.cantidad}
              </span>

              <strong>
                ${producto.precio * producto.cantidad}
              </strong>
            </div>
          ))}

          <div className="summary-total">
            <strong>Total</strong>
            <strong>${total}</strong>
          </div>
        </aside>

      </div>
    </main>
  )
}

export default Checkout