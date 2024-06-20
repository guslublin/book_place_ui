import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/menu/menu.js'; // Asegúrate de importar el componente Menu desde su ubicación correcta

const FormularioRol = () => {
  const [nombre, setNombre] = useState('');
  const [roles, setRoles] = useState([]);

  const obtenerRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/roles/');
      setRoles(response.data.roles);
    } catch (error) {
      console.error('Error al obtener los roles:', error);
    }
  };

  useEffect(() => {
    obtenerRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      nombre: nombre
    };

    try {
      const response = await axios.post('http://localhost:8000/roles/agregar/', datos, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      console.log('Rol agregado correctamente.');
      obtenerRoles();
      setNombre(''); // Limpiar el campo de nombre después de agregar el rol
    } catch (error) {
      console.error('Error al agregar el rol:', error);
    }
  };

  const eliminarRol = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/roles/eliminar_rol/${id}/`);
      console.log('Rol eliminado correctamente');
      obtenerRoles();
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
    }
  };

  return (
    <>
      <div>
        <Menu /> {/* Aquí se coloca el componente Menu */}
      </div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Roles</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>

        <br />

        <h1 className="mt-4">Listado de Roles</h1>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((rol) => (
              <tr key={rol.id}>
                <td>{rol.nombre}</td>
                <td>
                  <button
                    onClick={() => eliminarRol(rol.id)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FormularioRol;
