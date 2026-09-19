import { useEffect, useState } from 'react'
import CategoryCard from '../components/CategoryCard'
import { obtenerCategorias } from '../services/categoriaService'

function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerCategorias()
      .then((respuesta) => {
        setCategorias(respuesta.data)
      })
      .catch((error) => {
        console.error('Error al obtener categorías:', error)
      })
      .finally(() => {
        setCargando(false)
      })
  }, [])

  const estilosCategorias = {
    Cuadernos: {
      color: '#B8A4D9',
      icono: '📓'
    },

    Escritura: {
      color: '#E8A6A6',
      icono: '✏️'
    },

    Arte: {
      color: '#A8B8A0',
      icono: '🎨'
    },

    Oficina: {
      color: '#F2D58A',
      icono: '📁'
    },

    Accesorios: {
      color: '#C9B5D9',
      icono: '🎀'
    }
  }

  return (
    <main className="page">
      <h1>Categorías</h1>

      <p>Todo lo que necesitas, en un solo lugar ♡</p>

      {cargando ? (
        <p>Cargando categorías...</p>
      ) : (
        <section className="categories">
          {categorias
            .filter((categoria) => categoria.estado)
            .map((categoria) => {
              const estilo = estilosCategorias[categoria.nombre] || {
                color: '#B8A4D9',
                icono: '📦'
              }

              return (
                <CategoryCard
                  key={categoria.id}
                  nombre={categoria.nombre}
                  color={estilo.color}
                  icono={estilo.icono}
                />
              )
            })}
        </section>
      )}
    </main>
  )
}

export default Categorias