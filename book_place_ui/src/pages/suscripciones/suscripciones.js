import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/menu/menu.js'; // Asegúrate de importar el componente Menu desde su ubicación correcta

const Suscripciones = () => {
  const [idPlan, setIdPlan] = useState('');
  const [idUsuario, setIdUsuario] = useState(''); // Estado para almacenar el id_usuario
  const [planes, setPlanes] = useState([]); // Estado para almacenar los planes
  const [suscripciones, setSuscripciones] = useState([]);

  useEffect(() => {
    // Obtener el id_usuario desde localStorage cuando el componente se monta
    const storedIdUsuario = localStorage.getItem('id_usuario');
    if (storedIdUsuario) {
      setIdUsuario(storedIdUsuario);
      obtenerSuscripciones(storedIdUsuario);
    }

    obtenerPlanes();
  }, []);

  const obtenerSuscripciones = async (usuarioId) => {
    try {
      const response = await axios.get(`http://localhost:8000/suscripciones/usuario/${usuarioId}/`);
      console.log('response.data.suscripciones', response.data.suscripciones);
      setSuscripciones(response.data.suscripciones);
    } catch (error) {
      console.error('Error al obtener las suscripciones:', error);
    }
  };

  const obtenerPlanes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/planes/');
      setPlanes(response.data.planes);
    } catch (error) {
      console.error('Error al obtener los planes:', error);
    }
  };

  const eliminarSuscripcion = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/suscripciones/eliminar_suscripcion/${id}/`);
      console.log('Elemento eliminado correctamente');
      obtenerSuscripciones(idUsuario);
    } catch (error) {
      console.error('Error al eliminar la suscripción:', error);
    }
  };

  const calcularFechaFin = (plan) => {
    const fechaInicio = new Date();
    let fechaFin = new Date(fechaInicio);

    switch (plan) {
      case 'Básico':
        fechaFin.setDate(fechaInicio.getDate() + 7);
        break;
      case 'Premium':
        fechaFin.setDate(fechaInicio.getDate() + 15);
        break;
      case 'Star':
        fechaFin.setMonth(fechaInicio.getMonth() + 1);
        break;
      case 'Ultra':
        fechaFin.setMonth(fechaInicio.getMonth() + 3);
        break;
      default:
        break;
    }

    return fechaFin.toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaHoy = new Date().toISOString().split('T')[0];
    const planSeleccionado = planes.find(plan => plan.id === parseInt(idPlan));
    const fechaFin = calcularFechaFin(planSeleccionado?.nombre);

    const datos = {
      fecha_contrato: fechaHoy,
      fecha_fin: fechaFin,
      activo: false, // Asignar activo como false por defecto
      estado: 'Pendiente', // Asignar estado 'Pendiente' por defecto
      id_plan_id: idPlan,
      id_usuario: idUsuario // Usar el id_usuario del estado
    };

    console.log('datos', datos);
    try {
      const response = await axios.post('http://localhost:8000/suscripciones/agregar/', datos, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      console.log('Suscripción solicitada correctamente.');
      obtenerSuscripciones(idUsuario);
    } catch (error) {
      console.error('Error al solicitar la suscripción:', error);
    }
  };

  return (
    <>
      <div>
        <Menu /> {/* Aquí se coloca el componente Menu */}
      </div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Solicitar Suscripción</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="idPlan">Plan:</label>
            <select
              className="form-control"
              id="idPlan"
              value={idPlan}
              onChange={(e) => setIdPlan(e.target.value)}
            >
              <option value="">Seleccionar Plan</option>
              {planes.map(plan => (
                <option key={plan.id} value={plan.id}>{plan.nombre}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Solicitar</button>
        </form>

        <h2 className="text-center my-4">Listado de Suscripciones</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Fecha Contrato</th>
              <th>Fecha Fin</th>
              <th>Activo</th>
              <th>Estado</th>
              <th>ID Plan</th>
              <th>ID Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {suscripciones.map(suscripcion => (
              <tr key={suscripcion.id}>
                <td>{suscripcion.id}</td>
                <td>{suscripcion.fecha_contrato}</td>
                <td>{suscripcion.fecha_fin}</td>
                <td>{suscripcion.activo ? 'Sí' : 'No'}</td>
                <td>{suscripcion.estado}</td>
                <td>{suscripcion.id_plan_id}</td>
                <td>{suscripcion.id_usuario_id}</td>
                <td>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => eliminarSuscripcion(suscripcion.id)}
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

export default Suscripciones;
