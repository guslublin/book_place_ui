import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/menu/menu.js'; // Asegúrate de importar el componente Menu desde su ubicación correcta

const Alquileres = () => {
  const [idSuscripcion, setIdSuscripcion] = useState('');
  const [idLibro, setIdLibro] = useState('');
  const [suscripciones, setSuscripciones] = useState([]); // Estado para almacenar las suscripciones
  const [libros, setLibros] = useState([]); // Estado para almacenar los libros
  const [alquileres, setAlquileres] = useState([]);

  // Recupera id_usuario desde el localStorage
  const idUsuario = localStorage.getItem('id_usuario');

  const obtenerAlquileresPorUsuario = async () => {
    const idUsuario = localStorage.getItem('id_usuario');
    try {
      const response = await axios.get(`http://localhost:8000/alquileres/obtener_por_usuario/${idUsuario}`);
      // console.log('Alquileres del usuario:', response.data.alquileres);
      // setAlquileres(response.data.alquileres);
      const alquileresData = response.data.alquileres;

      // Obtener detalles de libro para cada alquiler
      const alquileresConLibros = await Promise.all(alquileresData.map(async (alquiler) => {
        try {
          const libroResponse = await axios.get(`http://localhost:8000/libros/${alquiler.id_libro_id}/`);
          const libro = libroResponse.data.libro;
          return { ...alquiler, libro };
        } catch (error) {
          console.error('Error al obtener detalles del libro:', error);
          return { ...alquiler, libro: { titulo: 'No disponible' } }; // Proporciona un objeto de libro predeterminado si hay un error
        }
      }));

      setAlquileres(alquileresConLibros);
    } catch (error) {
      console.error('Error al obtener los alquileres del usuario:', error);
    
    }





  };

  const obtenerAlquileres = async () => {
    try {
      const response = await axios.get('http://localhost:8000/obtener_alquileres/');
      console.log('response.data.alquileres', response.data.alquileres);
      setAlquileres(response.data.alquileres);
    } catch (error) {
      console.error('Error al obtener los alquileres:', error);
    }
  };

  const obtenerSuscripciones = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/suscripciones/obtener_suscripcion/${idUsuario}`);
      console.log('response.data.suscripciones', response.data.suscripciones);
      setSuscripciones(response.data.suscripciones);
    } catch (error) {
      console.error('Error al obtener las suscripciones:', error);
    }
  };

  const obtenerLibros = async () => {
    try {
      const response = await axios.get('http://localhost:8000/libros/');
      setLibros(response.data.libros);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };

  const eliminarAlquiler = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/alquileres/eliminar_alquiler/${id}/`);
      console.log('Alquiler eliminado correctamente');
      obtenerAlquileresPorUsuario();
    } catch (error) {
      console.error('Error al eliminar el alquiler:', error);
    }
  };

  useEffect(() => {
    // obtenerAlquileres();
    obtenerAlquileresPorUsuario();
    obtenerSuscripciones();
    obtenerLibros();
  }, []);

  const calcularFechaFin = (idPlan) => {
    const fechaInicio = new Date();
    let diasExtra = 0;

    switch (idPlan) {
      case 1:
        diasExtra = 7;
        break;
      case 2:
        diasExtra = 15;
        break;
      case 3:
        diasExtra = 30;
        break;
      case 4:
        diasExtra = 90;
        break;
      default:
        break;
    }

    const fechaFin = new Date(fechaInicio);
    fechaFin.setDate(fechaFin.getDate() + diasExtra);
    return fechaFin.toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const suscripcionSeleccionada = suscripciones.find(suscripcion => suscripcion.id === parseInt(idSuscripcion));
    const fechaHoy = new Date().toISOString().split('T')[0];
    const fechaFin = calcularFechaFin(suscripcionSeleccionada?.id_plan_id);
  
    const idUsuario = localStorage.getItem('id_usuario'); // Obtener id_usuario del localStorage
  
    const datos = {
      fecha_inicio: fechaHoy,
      fecha_fin: fechaFin,
      fecha_devolucion: null,
      estado: 'Pendiente',
      id_suscripcion: idSuscripcion,
      id_libro: idLibro,
      id_usuario: idUsuario // Incluir id_usuario en los datos del alquiler
    };

    console.log('datos', datos);
  
    try {
      const response = await axios.post('http://localhost:8000/alquileres/agregar/', datos, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      console.log('Alquiler solicitado correctamente.');
      obtenerAlquileresPorUsuario();
    } catch (error) {
      console.error('Error al solicitar el alquiler:', error);
    }
  };
  

  const getLibroNombre = (id) => {
    console.log('id', id);
    const libro = libros.find(libro => libro.id === id);
    return libro ? libro.titulo : 'Desconocido';
  };

  return (
    <>
      <div>
        <Menu /> {/* Aquí se coloca el componente Menu */}
      </div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Solicitar Alquiler</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="idSuscripcion">Suscripción:</label>
            <select
              className="form-control"
              id="idSuscripcion"
              value={idSuscripcion}
              onChange={(e) => setIdSuscripcion(e.target.value)}
            >
              <option value="">Seleccionar Suscripción</option>
              {suscripciones.map(suscripcion => (
                <option
                  key={suscripcion.id}
                  value={suscripcion.id}
                  disabled={suscripcion.estado === 'Pendiente' || suscripcion.estado === 'Vencido'}
                >
                  {suscripcion.id} - {suscripcion.estado}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="idLibro">Libro:</label>
            <select
              className="form-control"
              id="idLibro"
              value={idLibro}
              onChange={(e) => setIdLibro(e.target.value)}
            >
              <option value="">Seleccionar Libro</option>
              {libros.map(libro => (
                <option key={libro.id} value={libro.id} disabled={libro.cantidad === 0}>
                  {libro.titulo} {libro.cantidad === 0 ? '(No disponible)' : ''}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={!idSuscripcion || !idLibro}>Solicitar</button>
        </form>

        <h1>Listado de Alquileres</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Fecha Devolución</th>
              <th>Estado</th>
              <th>Libro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alquileres.map(alquiler => (
              <tr key={alquiler.id}>
                <td>{alquiler.id}</td>
                <td>{alquiler.fecha_inicio}</td>
                <td>{alquiler.fecha_fin}</td>
                <td>{alquiler.fecha_devolucion || 'Pendiente'}</td>
                <td>{alquiler.estado}</td>
                <td>{alquiler.libro.titulo}</td>
                <td>
                  <button onClick={() => eliminarAlquiler(alquiler.id)} className="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Alquileres;
