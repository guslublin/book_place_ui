import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/menu/menu.js'; // Asegúrate de importar el componente Menu desde su ubicación correcta
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const GestionarMovimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [movimientoId, setMovimientoId] = useState(null);

  const handleCloseEliminarModal = () => setShowEliminarModal(false);
  const handleShowEliminarModal = (id) => {
    setMovimientoId(id);
    setShowEliminarModal(true);
  };

  const obtenerMovimientos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/movimientos/');
      const movimientosData = response.data.movimientos;
      console.log(movimientosData);
      setMovimientos(movimientosData);
    } catch (error) {
      console.error('Error al obtener los movimientos:', error);
    }
  };

  const eliminarMovimiento = async () => {
    try {
      await axios.delete(`http://localhost:8000/movimientos/eliminar/${movimientoId}/`);
      console.log('Movimiento eliminado correctamente');
      obtenerMovimientos();
      handleCloseEliminarModal(); // Cerrar el modal después de eliminar
    } catch (error) {
      console.error('Error al eliminar el movimiento:', error);
    }
  };

  useEffect(() => {
    obtenerMovimientos();
  }, []);

  return (
    <>
      <div>
        <Menu /> {/* Aquí se coloca el componente Menu */}
      </div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Gestionar Movimientos</h2>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Id Alquiler</th>
              <th>Id Suscripcion</th>
              <th>Fecha Movimiento</th>
              <th>Valor</th>
              <th>Id Usuario</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map(movimiento => (
              <tr key={movimiento.id}>
                <td>{movimiento.id}</td>
                <td>{movimiento.id_alquiler_id}</td>
                <td>{movimiento.id_suscripcion_id}</td>
                <td>{movimiento.fecha_movimiento}</td>
                <td>{movimiento.valor}</td>
                <td>{movimiento.id_usuario_id}</td>
                <td>{movimiento.descripcion}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleShowEliminarModal(movimiento.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showEliminarModal} onHide={handleCloseEliminarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de eliminar este movimiento?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEliminarModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={eliminarMovimiento}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GestionarMovimientos;
