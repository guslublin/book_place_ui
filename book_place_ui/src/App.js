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
        <Route exact path="/categorias" element={<Categorias />} /> {/* Ruta de otra página */}
        <Route exact path="/autores" element={<Autores />} /> {/* Ruta de otra página */}
        <Route exact path="/registro" element={<RegistroForm />} /> {/* Ruta de otra página */}
      </Routes>
    </Router>
  );
}

export default App;
