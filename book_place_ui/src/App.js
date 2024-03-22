import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Home from './pages/home/home'; // Asumiendo que ya tienes una página de inicio

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} /> {/* Ruta de la página de login */}
        <Route exact path="/home" element={<Home />} /> {/* Ruta de otra página */}
      </Routes>
    </Router>
  );
}

export default App;
