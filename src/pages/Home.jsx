import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'

function Home() {
  return (
    <main>
      <section className="home">
        <h1>Todo lo que necesitas para crear ✨</h1>

        <p>
          Descubre nuestra papelería y encuentra tus productos favoritos.
        </p>

        <Link to="/tienda" className="shop-button">
       Ver tienda
        </Link>
      </section>

      <section className="categories-section">
        <h2>Categorías</h2>

        <p>Todo lo que necesitas, en un solo lugar ♡</p>

        <div className="categories">
          <CategoryCard
            nombre="Cuadernos"
            color="#B8A4D9"
            icono="📓"
          />

          <CategoryCard
            nombre="Escritura"
            color="#E8A6A6"
            icono="✏️"
          />

          <CategoryCard
            nombre="Arte"
            color="#A8B8A0"
            icono="🎨"
          />

          <CategoryCard
            nombre="Oficina"
            color="#F2D58A"
            icono="📁"
          />

          <CategoryCard
            nombre="Accesorios"
            color="#C9B5D9"
            icono="🎀"
          />
        </div>
      </section>
    </main>
  )
}

export default Home