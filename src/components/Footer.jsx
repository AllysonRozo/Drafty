import { useEffect, useState } from 'react'
import { obtenerInformacion } from '../services/informacionService'

function Footer() {
  const [informacion, setInformacion] = useState(null)

  useEffect(() => {
    const cargarInformacion = async () => {
      try {
        const respuesta = await obtenerInformacion()

        if (respuesta.length > 0) {
          setInformacion(respuesta[0])
        }
      } catch (error) {
        console.error('Error al cargar información:', error)
      }
    }

    cargarInformacion()
  }, [])

  if (!informacion) {
    return null
  }

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Información de Drafty */}
        <div className="footer-section footer-brand">
          <h2>{informacion.nombre}</h2>
          <p>
            Un espacio para despertar tu creatividad y encontrar
            todo lo que necesitas para tus proyectos.
          </p>
        </div>

        {/* Nosotros */}
        <div className="footer-section">
          <h3>Nosotros</h3>
          <p>
            En Drafty creemos que cada idea puede convertirse
            en algo especial.
          </p>
          <p>
            Explora nuestra tienda y dale color a tus proyectos.
          </p>
        </div>

        {/* Contacto */}
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>📞 {informacion.telefono}</p>
          <p>📍 {informacion.direccion}</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 {informacion.nombre} · Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer