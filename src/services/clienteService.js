import axios from 'axios'

const API_URL = 'https://6aa6bcf8d7765db9850792ec.mockapi.io/cliente'

export const crearCliente = (cliente) => {
  return axios.post(API_URL, cliente)
}