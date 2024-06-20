import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';
import Menu from '../../components/menu/menu.js'; // Asegúrate de importar el componente Menu desde su ubicación correcta

const GestionarSuscripciones = () => {
  const [suscripciones, setSuscripciones] = useState([]);
  const [suscripcionSeleccionada, setSuscripcionSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [planes, setPlanes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  const obtenerSuscripciones = async () => {
    try {
      const response = await axios.get('http://localhost:8000/suscripciones/');
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

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/usuarios/');
      setUsuarios(response.data.usuarios);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const obtenerPlan = async (planId) => {
    try {
      const response = await axios.get(`http://localhost:8000/planes/${planId}/`);
      setPlanSeleccionado(response.data.plan);
    } catch (error) {
      console.error('Error al obtener el plan:', error);
    }
  };

  useEffect(() => {
    obtenerSuscripciones();
    obtenerPlanes();
    obtenerUsuarios();
  }, []);

  const handleAprobarSuscripcion = async () => {
    if (suscripcionSeleccionada) {
      try {
        await axios.put(`http://localhost:8000/suscripciones/aprobar_suscripcion/${suscripcionSeleccionada.id}/`, {
          estado: 'Activo',
          activo: true
        });
        
        // Crear el objeto de movimiento
        const movimiento = {
          id_suscripcion: suscripcionSeleccionada.id,
          fecha_movimiento: new Date().toISOString().split('T')[0], // Fecha actual
          valor: planSeleccionado ? planSeleccionado.valor : 0, // Valor del plan seleccionado
          id_usuario: localStorage.getItem('id_usuario'),
          descripcion: 'Contratacion de suscripcion'
        };

        // Realizar la solicitud para agregar el movimiento
        await axios.post('http://localhost:8000/movimientos/agregar/', movimiento);
        console.log('Movimiento agregado correctamente');

        obtenerSuscripciones();
        handleCloseModal();
      } catch (error) {
        console.error('Error al aprobar la suscripción:', error);
      }
    }
  };

  const handleShowModal = async (suscripcion) => {
    setSuscripcionSeleccionada({ ...suscripcion });
    setShowModal(true);
    if (suscripcion.id_plan_id) {
      await obtenerPlan(suscripcion.id_plan_id);
    }
  };

  const handleCloseModal = () => {
    setSuscripcionSeleccionada(null);
    setShowModal(false);
    setPlanSeleccionado(null);
  };

  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <><div>
          <Menu /> {/* Aquí se coloca el componente Menu */}
      </div><div className="container mt-5">
              <h2 className="text-center mb-4">Gestionar Suscripciones</h2>
              <Table striped bordered hover>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Fecha Contrato</th>
                          <th>Fecha Fin</th>
                          <th>Activo</th>
                          <th>Estado</th>
                          <th>Plan</th>
                          <th>Usuario</th>
                          <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                      {suscripciones.map(suscripcion => {
                          const plan = planes.find(plan => plan.id === suscripcion.id_plan_id);
                          const usuario = usuarios.find(usuario => usuario.id === suscripcion.id_usuario_id);
                          return (
                              <tr key={suscripcion.id}>
                                  <td>{suscripcion.id}</td>
                                  <td>{suscripcion.fecha_contrato}</td>
                                  <td>{suscripcion.fecha_fin}</td>
                                  <td>{suscripcion.activo ? 'Sí' : 'No'}</td>
                                  <td>{suscripcion.estado}</td>
                                  <td>{plan ? plan.nombre : 'No disponible'}</td>
                                  <td>{usuario ? `${usuario.nombre} ${usuario.apellido}` : 'No disponible'}</td>
                                  <td>
                                      <button className='btn btn-success'
                                          onClick={() => handleShowModal(suscripcion)}
                                          disabled={suscripcion.estado !== 'Pendiente'}
                                      >
                                          Aprobar
                                      </button>
                                  </td>
                              </tr>
                          );
                      })}
                  </tbody>
              </Table>

              <Modal show={showModal} onHide={handleCloseModal}>
                  <Modal.Header closeButton>
                      <Modal.Title>Confirmar Aprobación</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <p>¿Estás seguro de aprobar esta suscripción?</p>
                      {suscripcionSeleccionada && (
                          <div>
                              <p><strong>Nombre del Plan:</strong> {planSeleccionado ? planSeleccionado.nombre : 'No disponible'}</p>
                              <p><strong>Valor del Plan:</strong> {planSeleccionado ? formatCurrency(planSeleccionado.valor) : 'No disponible'}</p>
                              <p><strong>Días del Plan:</strong> {planSeleccionado ? planSeleccionado.dias : 'No disponible'}</p>
                              <p><strong>Fecha de Contrato:</strong> {suscripcionSeleccionada.fecha_contrato}</p>
                              <p><strong>Fecha de Fin:</strong> {suscripcionSeleccionada.fecha_fin}</p>
                          </div>
                      )}
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                          Cancelar
                      </Button>
                      <Button variant="primary" onClick={handleAprobarSuscripcion}>
                          Aprobar
                      </Button>
                  </Modal.Footer>
              </Modal>
          </div></>
  );
};

export default GestionarSuscripciones;
