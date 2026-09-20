import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Tienda from './pages/Tienda'
import Categorias from './pages/Categorias'
import Contacto from './pages/Contacto'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Historial from './pages/Historial'

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/tienda" element={<Tienda />} />

          <Route path="/categorias" element={<Categorias />} />

          <Route path="/contacto" element={<Contacto />} />

          <Route path="/carrito" element={<Carrito />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <h1>Ruta protegida</h1>
              </ProtectedRoute>
            }
          />

          <Route
            path="/historial"
            element={
              <ProtectedRoute>
                <Historial />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App