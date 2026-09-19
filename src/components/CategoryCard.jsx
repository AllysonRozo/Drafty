import { Link } from 'react-router-dom'

function CategoryCard({ nombre, color, icono }) {
  return (
    <Link
      to={`/tienda?categoria=${nombre}`}
      className="category-card"
      style={{ backgroundColor: color }}
    >
      <div className="category-icon">{icono}</div>

      <h3>{nombre}</h3>

      <span>Ver productos →</span>
    </Link>
  )
}

export default CategoryCard