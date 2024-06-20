import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import './menu_styles.css'; 

const Menu = () => {
  const [open, setOpen] = useState(false);
  const idRol = localStorage.getItem('id_rol');

  function handleLogout() {
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('id_rol');
    window.location.href = '/';
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light bg-body-tertiary">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
          aria-controls="navbarSupportedContent"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Collapse in={open}>
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Inicio
                </Link>
              </li>
              {idRol === '1' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/plan">
                      Planes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/rol">
                      Roles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/usuario">
                      Usuarios
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/libros">
                      Libros
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categorias">
                      Categorias
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/autores">
                      Autores
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/gestionar_suscripciones">
                      Suscripciones
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/gestionar_alquileres">
                      Alquileres
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/gestionar_movimientos">
                      Movimientos
                    </Link>
                  </li>
                  {/* Agregar otros elementos del menú para el rol 1 aquí */}
                </>
              )}
              {idRol === '2' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/suscripciones">
                      Suscripciones
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/alquileres">
                      Alquileres
                    </Link>
                  </li>
                  {/* Agregar otros elementos del menú para el rol 2 aquí */}
                </>
              )}
            </ul>
            <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </Collapse>
      </div>
    </nav>
  );
};

export default Menu;
