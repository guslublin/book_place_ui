import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioLibro = () => {
  const [nombre, setNombre] = useState('');
  const [autor, setAutor] = useState('');

  const [libros, setLibros] = useState([]);

  // const url = `http://localhost:8000/libros/${libro.id}/`;

  const obtenerLibros = async () => {
    try {
      const response = await axios.get('http://localhost:8000/libros/');
      setLibros(response.data.libros);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };


// Función para eliminar un libro
const eliminarLibro = async (id) => {
  try {
      
    axios.delete(`http://localhost:8000/libros/eliminar_libro/${id}/`)
    .then(response => {
      console.log('Elemento eliminado correctamente:', response.data);
      obtenerLibros();
      // Realizar alguna acción adicional si es necesario, como actualizar el estado para reflejar el cambio
    })
    .catch(error => {
      console.error('Error al eliminar el elemento:', error);
    });
      console.log('Libro eliminado correctamente');
      // Actualizar la lista de libros u otra lógica aquí
  } catch (error) {
      console.error('Error al eliminar el libro:', error);
  }
};

  useEffect(() => {
    obtenerLibros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      nombre: nombre,
      autor: autor
    };

    try {
      const response = await axios.post('http://localhost:8000/libros/agregar/', datos, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      console.log('Libro agregado correctamente.');
      obtenerLibros();
      // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página
    } catch (error) {
      console.error('Error al agregar el libro:', error);
      // Aquí podrías manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
    }
  };


  // Función para obtener el valor del token CSRF desde las cookies
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <div className="container">
      <h1>Formulario de Libro</h1>
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
        <div className="form-group">
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            className="form-control"
            id="autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
      
      <br></br>
      
      <h1>Listado de Libros</h1>
      <ul>
        {libros.map(libro => (
          <li key={libro.id}>
          <strong>Id:</strong> {libro.id} | <strong>Nombre:</strong> {libro.nombre} | <strong>Autor:</strong> {libro.autor}
          <button onClick={() => eliminarLibro(libro.id)}>Eliminar</button>
        </li>
        ))}
      </ul>
    </div>
    
  );
};

export default FormularioLibro;
