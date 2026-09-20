import { useEffect, useState } from 'react'
import { obtenerOrders } from '../services/orderService'

function Historial() {
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem('usuario'))

        if (!usuario) {
          return
        }

        const respuesta = await obtenerOrders()

        const pedidosUsuario = respuesta.filter(
          (pedido) => String(pedido.usuario) === String(usuario.id)
        )

        setPedidos(pedidosUsuario)
      } catch (error) {
        console.error('Error al cargar pedidos:', error)
      } finally {
        setCargando(false)
      }
    }

    cargarPedidos()
  }, [])

  if (cargando) {
    return (
      <main className="page">
        <h1>Cargando pedidos...</h1>
      </main>
    )
  }

  return (
    <main className="page historial-page">
      <h1>Mis pedidos ♡</h1>

      {pedidos.length === 0 ? (
        <p>Aún no tienes pedidos realizados.</p>
      ) : (
        <div className="historial-list">
          {pedidos.map((pedido) => (
            <div className="pedido-card" key={pedido.id}>
              <h2>Pedido #{pedido.id}</h2>

              <p>
                <strong>Fecha:</strong>{' '}
                {new Date(pedido.fecha).toLocaleDateString()}
              </p>

              <p>
                <strong>Estado:</strong> {pedido.estado_orden}
              </p>

              <p>
                <strong>Método de pago:</strong>{' '}
                {pedido.metodo_pago}
              </p>

              <p>
                <strong>Total:</strong> ${pedido.total}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default Historial