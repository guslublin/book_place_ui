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
      console.error('Error al obtener las autores:', error);
    }
  };


// Función para eliminar un autor
const eliminarAutor = async (id) => {
  try {
      
    axios.delete(`http://localhost:8000/autores/eliminar_autor/${id}/`)
    .then(response => {
      console.log('Elemento eliminado correctamente:', response.data);
      obtenerAutores();
      // Realizar alguna acción adicional si es necesario, como actualizar el estado para reflejar el cambio
    })
    .catch(error => {
      console.error('Error al eliminar el elemento:', error);
    });
      console.log('Autor eliminado correctamente');
      // Actualizar la lista de autores u otra lógica aquí
  } catch (error) {
      console.error('Error al eliminar el autor:', error);
  }
};

  useEffect(() => {
    obtenerAutores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      nombre: nombre,
    };

    try {
      const response = await axios.post('http://localhost:8000/autores/agregar/', datos, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      console.log('Autor agregado correctamente.');
      obtenerAutores();
      // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página
    } catch (error) {
      console.error('Error al agregar el autor:', error);
      // Aquí podrías manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
    }
  };


  return (
    <><div>
          <Menu /> {/* Aquí se coloca el componente Menu */}
      </div><div className="container mt-5">
            <h2 className="text-center mb-4">Autores</h2>

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


              <h1>Listado de Autores</h1>
              <ul>
                  {autores.map(autor => (
                      <li key={autor.id}>
                          <strong>Id:</strong> {autor.id} | <strong>Nombre:</strong> {autor.nombre}
                          <button onClick={() => eliminarAutor(autor.id)}>Eliminar</button>
                      </li>
                  ))}
              </ul>
          </div></>
    
  );
};

export default Autores;
