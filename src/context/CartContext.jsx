import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id
      )

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [
        ...carritoActual,
        {
          ...producto,
          cantidad: 1
        }
      ]
    })
  }

 const aumentarCantidad = (id) => {
  setCarrito((carritoActual) =>
    carritoActual.map((item) => {
      if (item.id !== id) {
        return item
      }

      if (item.cantidad >= item.stock) {
        return {
          ...item,
          errorStock: `No hay stock suficiente. Solo quedan ${item.stock} unidades.`
        }
      }

      return {
        ...item,
        cantidad: item.cantidad + 1,
        errorStock: ''
      }
    })
  )
}

  const disminuirCantidad = (id) => {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  const eliminarDelCarrito = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    )
  }

  const cantidadProductos = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  )

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        aumentarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        cantidadProductos
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}