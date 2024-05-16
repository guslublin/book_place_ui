import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Collapse } from 'react-bootstrap';

import './menu_styles.css'; 

const Menu = () => {

  const [open, setOpen] = useState(false);

  function handleLogout() {
    // Borrar el id_usuario del localStorage
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('id_rol');
    // Redirigir al usuario al login
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
            </ul>
            <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </Collapse>
      </div>
    </nav>




  );
};

export default Menu;
