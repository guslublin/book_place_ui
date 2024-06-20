import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/menu/menu.js'; // Asegúrate de importar el componente Menu desde su ubicación correcta

const Autores = () => {
  const [nombre, setNombre] = useState('');
  const [autores, setAutores] = useState([]);

  const obtenerAutores = async () => {
    try {
      const response = await axios.get('http://localhost:8000/autores/');
      setAutores(response.data.autores);
    } catch (error) {
      console.error('Error al obtener los autores:', error);
    }
  };

  const eliminarAutor = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/autores/eliminar_autor/${id}/`);
      console.log('Elemento eliminado correctamente');
      obtenerAutores();
    } catch (error) {
      console.error('Error al eliminar el autor:', error);
    }
  };

  useEffect(() => {
    obtenerAutores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = { nombre: nombre };

    try {
      const response = await axios.post('http://localhost:8000/autores/agregar/', datos, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      console.log('Autor agregado correctamente.');
      obtenerAutores();
    } catch (error) {
      console.error('Error al agregar el autor:', error);
    }
  };

  return (
    <>
      <div>
        <Menu /> {/* Aquí se coloca el componente Menu */}
      </div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Autores</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>

        <h1 className="mt-4">Listado de Autores</h1>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {autores.map((autor) => (
              <tr key={autor.id}>
                <td>{autor.id}</td>
                <td>{autor.nombre}</td>
                <td>
                  <button
                    onClick={() => eliminarAutor(autor.id)}
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

export default Autores;
