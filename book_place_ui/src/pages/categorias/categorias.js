import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/menu/menu.js'; // Asegúrate de importar el componente Menu desde su ubicación correcta

const Categorias = () => {
  const [nombre, setNombre] = useState('');
  const [categorias, setCategorias] = useState([]);

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8000/categorias/');
      setCategorias(response.data.categorias);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/categorias/eliminar_categoria/${id}/`);
      console.log('Elemento eliminado correctamente');
      obtenerCategorias();
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = { nombre: nombre };

    try {
      const response = await axios.post('http://localhost:8000/categorias/agregar/', datos, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      console.log('Categoría agregada correctamente.');
      obtenerCategorias();
    } catch (error) {
      console.error('Error al agregar la categoría:', error);
    }
  };

  return (
    <>
      <div>
        <Menu /> {/* Aquí se coloca el componente Menu */}
      </div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Categorías</h2>

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

        <h1 className="mt-4">Listado de Categorías</h1>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>
                  <button
                    onClick={() => eliminarCategoria(categoria.id)}
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

export default Categorias;
