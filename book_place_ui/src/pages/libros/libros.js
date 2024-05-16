
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/menu/menu.js'; // Asegúrate de importar el componente Menu desde su ubicación correcta

const FormularioLibro = () => {
  const [titulo, setTitulo] = useState('');
  const [editorial, setEditorial] = useState('');
  const [resumen, setResumen] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [disponible, setDisponible] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [autores, setAutores] = useState([]);
  const [usuarioAlta, setUsuarioAlta] = useState('');
  
  // Nuevas variables de estado
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [autorSeleccionado, setAutorSeleccionado] = useState('');

  const [libros, setLibros] = useState([]);

  // Función para obtener libros
  const obtenerLibros = async () => {
    try {
      const response = await axios.get('http://localhost:8000/libros/');
      console.log(response.data.libros);
      setLibros(response.data.libros);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };

  // Función para obtener categorías
  const obtenerCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8000/categorias/');
      setCategorias(response.data.categorias);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  // Función para obtener autores
  const obtenerAutores = async () => {
    try {
      const response = await axios.get('http://localhost:8000/autores/');
      setAutores(response.data.autores);
    } catch (error) {
      console.error('Error al obtener los autores:', error);
    }
  };

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

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

      // Obtener el id_usuario del localStorage
    const id_usuario = localStorage.getItem('id_usuario');

    const datos = {
      titulo: titulo,
      editorial: editorial,
      resumen: resumen,
      fecha_entrada: fechaEntrada,
      cantidad: cantidad,
      disponible: disponible,
      id_categoria: categoriaSeleccionada,
      id_autor: autorSeleccionado,
      id_usuario_alta: id_usuario,
    };

    try {
      console.log('datos', datos);
      const response = await axios.post('http://localhost:8000/libros/agregar/', datos, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(response.data);
      console.log('Libro agregado correctamente.');
      obtenerLibros(); // Llamamos a obtenerLibros después de agregar un nuevo libro
      // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página
    } catch (error) {
      console.error('Error al agregar el libro:', error);
      // Aquí podrías manejar el error de alguna manera (por ejemplo, mostrar un mensaje de error)
    }
  };

  useEffect(() => {
    obtenerLibros(); // Llamamos a obtenerLibros cuando se carga el componente
    obtenerCategorias();
    obtenerAutores();
  }, []);

  return (
    <>
      <div>
        <Menu /> {/* Aquí se coloca el componente Menu */}
      </div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Agregar Libro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editorial">Editorial:</label>
            <input
              type="text"
              className="form-control"
              id="editorial"
              value={editorial}
              onChange={(e) => setEditorial(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="resumen">Resumen:</label>
            <input
              type="text"
              className="form-control"
              id="resumen"
              value={resumen}
              onChange={(e) => setResumen(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaEntrada">Fecha de Entrada:</label>
            <input
              type="date"
              className="form-control"
              id="fechaEntrada"
              value={fechaEntrada}
              onChange={(e) => setFechaEntrada(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              className="form-control"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="disponible">Disponible:</label>
            <input
              type="checkbox"
              id="disponible"
              checked={disponible}
              onChange={(e) => setDisponible(e.target.checked)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoria">Categoría:</label>
            <select
              className="form-control"
              id="categoria"
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
              <option value="">Seleccionar Categoría</option>
              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="autor">Autor:</label>
            <select
              className="form-control"
              id="autor"
              value={autorSeleccionado}
              onChange={(e) => setAutorSeleccionado(e.target.value)}
            >
              <option value="">Seleccionar Autor</option>
              {autores.map(autor => (
                <option key={autor.id} value={autor.id}>{autor.nombre}</option>
              ))}
            </select>
          </div>
          {/* <div className="form-group">
            <label htmlFor="usuarioAlta">Usuario de Alta:</label>
            <input
              type="text"
              className="form-control"
              id="usuarioAlta"
              value={usuarioAlta}
              onChange={(e) => setUsuarioAlta(e.target.value)}
            />
          </div> */}
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>

        <h1>Listado de Libros</h1>
              <ul>
                  {libros.map(libro => (
                      <li key={libro.id}>
                          <strong>Id:</strong> {libro.id} | <strong>Título:</strong> {libro.titulo} | <strong>Resumen:</strong> {libro.resumen}
                          <button onClick={() => eliminarLibro(libro.id)}>Eliminar</button>
                      </li>
                  ))}
              </ul>
      </div>
    </>
  );
};

export default FormularioLibro;
