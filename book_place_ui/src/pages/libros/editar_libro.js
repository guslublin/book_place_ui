import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from '../../components/menu/menu.js';

const EditarLibro = () => {
  const { id } = useParams();
  
  const [titulo, setTitulo] = useState('');
  const [editorial, setEditorial] = useState('');
  const [resumen, setResumen] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [disponible, setDisponible] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [autorSeleccionado, setAutorSeleccionado] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    const obtenerLibro = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/libros/${id}`);
        const libro = response.data.libro;

        setTitulo(libro.titulo);
        setEditorial(libro.editorial);
        setResumen(libro.resumen);
        setFechaEntrada(libro.fecha_entrada);
        setCantidad(libro.cantidad);
        setDisponible(libro.disponible);
        setCategoriaSeleccionada(libro.id_categoria);
        setAutorSeleccionado(libro.id_autor);
      } catch (error) {
        console.error('Error al obtener el libro:', error);
      }
    };

    const obtenerCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categorias/');
        setCategorias(response.data.categorias);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    const obtenerAutores = async () => {
      try {
        const response = await axios.get('http://localhost:8000/autores/');
        setAutores(response.data.autores);
      } catch (error) {
        console.error('Error al obtener los autores:', error);
      }
    };

    obtenerCategorias();
    obtenerAutores();
    obtenerLibro();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      titulo: titulo,
      editorial: editorial,
      resumen: resumen,
      fecha_entrada: fechaEntrada,
      cantidad: cantidad,
      disponible: disponible,
      id_categoria: categoriaSeleccionada,
      id_autor: autorSeleccionado,
    };

    try {
      await axios.put(`http://localhost:8000/libros/editar/${id}/`, datos, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log('Libro editado correctamente.');
      window.location = `/libros`;
    } catch (error) {
      console.error('Error al editar el libro:', error);
    }
  };

  return (
    <>
      <div>
        <Menu /> {/* Aquí se coloca el componente Menu */}
      </div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Editar Libro</h2>
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
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </div>
    </>
  );
};

export default EditarLibro;
