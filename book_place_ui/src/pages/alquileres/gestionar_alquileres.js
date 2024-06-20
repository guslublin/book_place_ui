import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/menu/menu.js'; // Asegúrate de importar el componente Menu desde su ubicación correcta
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const GestionarAlquileres = () => {
  const [alquileres, setAlquileres] = useState([]);
  const [showAprobarModal, setShowAprobarModal] = useState(false);
  const [showDevolverModal, setShowDevolverModal] = useState(false);
  const [alquilerId, setAlquilerId] = useState(null);

  const handleCloseAprobarModal = () => setShowAprobarModal(false);
  const handleShowAprobarModal = (id) => {
    setAlquilerId(id);
    setShowAprobarModal(true);
  };

  const handleCloseDevolverModal = () => setShowDevolverModal(false);
  const handleShowDevolverModal = (id) => {
    setAlquilerId(id);
    setShowDevolverModal(true);
  };

  const obtenerAlquileres = async () => {
    try {
      const response = await axios.get('http://localhost:8000/alquileres/');
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
      console.error('Error al obtener los alquileres:', error);
    }
  };

  const aprobarAlquiler = async () => {
    try {
      await axios.put(`http://localhost:8000/alquileres/aprobar/${alquilerId}/`);
      console.log('Alquiler aprobado correctamente');

      // Crear el objeto de movimiento
      const movimiento = {
        id_alquiler: alquilerId, // ID del alquiler aprobado
        fecha_movimiento: new Date().toISOString().split('T')[0], // Fecha actual
        valor: 0, // Valor del movimiento para alquiler aprobado
        id_usuario: localStorage.getItem('id_usuario'),
        descripcion: 'Aprobación de alquiler'
      };

      // Realizar la solicitud para agregar el movimiento
      await axios.post('http://localhost:8000/movimientos/agregar/', movimiento);
      console.log('Movimiento agregado correctamente');

      obtenerAlquileres();
      handleCloseAprobarModal(); // Cerrar el modal después de aprobar
    } catch (error) {
      console.error('Error al aprobar el alquiler:', error);
    }
  };

  const devolverAlquiler = async () => {
    try {
      const fechaDevolucion = new Date();
      const fechaDevolucionLocal = new Date(fechaDevolucion.getTime() - (fechaDevolucion.getTimezoneOffset() * 60000)).toISOString().split('T')[0]; // Ajustar la fecha a la zona horaria local
      await axios.put(`http://localhost:8000/alquileres/devolver/${alquilerId}/`, {
        fecha_devolucion: fechaDevolucionLocal,
        estado: 'Devuelto'
      });
      console.log('Alquiler devuelto correctamente');
      obtenerAlquileres();
      handleCloseDevolverModal(); // Cerrar el modal después de devolver
    } catch (error) {
      console.error('Error al devolver el alquiler:', error);
    }
  };

  useEffect(() => {
    obtenerAlquileres();
  }, []);

  return (
    <>
      <div>
        <Menu /> {/* Aquí se coloca el componente Menu */}
      </div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Gestionar Alquileres</h2>

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
                  {alquiler.estado === 'Pendiente' && (
                    <button className="btn btn-success" onClick={() => handleShowAprobarModal(alquiler.id)}>Aprobar</button>
                  )}
                  {alquiler.estado === 'Aprobado' && (
                    <button className="btn btn-primary" onClick={() => handleShowDevolverModal(alquiler.id)}>Devolver</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showAprobarModal} onHide={handleCloseAprobarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Aprobación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de aprobar este alquiler?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAprobarModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={aprobarAlquiler}>
            Aprobar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDevolverModal} onHide={handleCloseDevolverModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Devolución</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de devolver este alquiler?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDevolverModal}>
            Volver
          </Button>
          <Button variant="primary" onClick={devolverAlquiler}>
            Devolver
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GestionarAlquileres;
