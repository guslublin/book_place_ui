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
      console.error('Error al obtener las categorias:', error);
    }
  };


// Función para eliminar una categoria
const eliminarCategoria = async (id) => {
  try {
      
    axios.delete(`http://localhost:8000/categorias/eliminar_categoria/${id}/`)
    .then(response => {
      console.log('Elemento eliminado correctamente:', response.data);
      obtenerCategorias();
      // Realizar alguna acción adicional si es necesario, como actualizar el estado para reflejar el cambio
    })
    .catch(error => {
      console.error('Error al eliminar el elemento:', error);
    });
      console.log('Categoría eliminada correctamente');
      // Actualizar la lista de categorias u otra lógica aquí
  } catch (error) {
      console.error('Error al eliminar la categoría:', error);
  }
};

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      nombre: nombre,
    };

    try {
      const response = await axios.post('http://localhost:8000/categorias/agregar/', datos, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      console.log('Categoría agregada correctamente.');
      obtenerCategorias();
      // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página
    } catch (error) {
      console.error('Error al agregar la categoría:', error);
      // Aquí podrías manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
    }
  };


  return (
    <><div>
          <Menu /> {/* Aquí se coloca el componente Menu */}
      </div><div className="container mt-5">
            <h2 className="text-center mb-4">Categorías</h2>

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


              <h1>Listado de Categorías</h1>
              <ul>
                  {categorias.map(categoria => (
                      <li key={categoria.id}>
                          <strong>Id:</strong> {categoria.id} | <strong>Nombre:</strong> {categoria.nombre}
                          <button onClick={() => eliminarCategoria(categoria.id)}>Eliminar</button>
                      </li>
                  ))}
              </ul>
          </div></>
    
  );
};

export default Categorias;
