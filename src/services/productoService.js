import axios from 'axios'

const API_URL = 'https://6aa6bcf8d7765db9850792ec.mockapi.io/producto'

export const obtenerProductos = () => {
  return axios.get(API_URL)
}

// Actualizar producto
export const actualizarProducto = (id, producto) => {
  return axios.put(`${API_URL}/${id}`, producto)
}

// Eliminar producto
export const eliminarProducto = (id) => {
  return axios.delete(`${API_URL}/${id}`)
}