import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Home from './pages/home/home'; // Asumiendo que ya tienes una página de inicio
import Plan from './pages/plan/plan'; 
import Rol from './pages/rol/rol';
import Usuario from './pages/usuario/usuario';
import Libros from './pages/libros/libros';
import Categorias from './pages/categorias/categorias';
import Autores from './pages/autores/autores';
import RegistroForm from './pages/registro/registro';
import Suscripciones from './pages/suscripciones/suscripciones';
import GestionarSuscripciones from './pages/suscripciones/gestionar_suscripciones';
import Alquileres from './pages/alquileres/alquileres';
import GestionarAlquileres from './pages/alquileres/gestionar_alquileres';
import EditarLibro from './pages/libros/editar_libro';
import GestionarMovimientos from './pages/movimientos/gestionar_movimientos';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} /> {/* Ruta de la página de login */}
        <Route exact path="/home" element={<Home />} /> {/* Ruta de otra página */}
        <Route exact path="/plan" element={<Plan />} /> {/* Ruta de otra página */}
        <Route exact path="/rol" element={<Rol />} /> {/* Ruta de otra página */}
        <Route exact path="/usuario" element={<Usuario />} /> {/* Ruta de otra página */}
        <Route exact path="/libros" element={<Libros />} /> {/* Ruta de otra página */}
        <Route exact path="/editar_libro/:id" element={<EditarLibro />} />
        <Route exact path="/categorias" element={<Categorias />} /> {/* Ruta de otra página */}
        <Route exact path="/autores" element={<Autores />} /> {/* Ruta de otra página */}
        <Route exact path="/registro" element={<RegistroForm />} /> {/* Ruta de otra página */}
        <Route exact path="/suscripciones" element={<Suscripciones />} /> {/* Ruta de otra página */}
        <Route exact path="/gestionar_suscripciones" element={<GestionarSuscripciones />} /> {/* Ruta de otra página */}
        <Route exact path="/alquileres" element={<Alquileres />} /> {/* Ruta de otra página */}
        <Route exact path="/gestionar_alquileres" element={<GestionarAlquileres />} /> {/* Ruta de otra página */}
        <Route exact path="/gestionar_movimientos" element={<GestionarMovimientos />} /> {/* Ruta de otra página */}
      </Routes>
    </Router>
  );
}

export default App;
