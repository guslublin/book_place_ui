import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/menu/menu.js'; // Asegúrate de importar el componente Menu desde su ubicación correcta

const FormularioPlan = () => {
  const [nombre, setNombre] = useState('');
  const [valor, setValor] = useState('');
  const [dias, setDias] = useState('');
  const [planes, setPlanes] = useState([]);

  const obtenerPlanes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/planes/');
      setPlanes(response.data.planes);
    } catch (error) {
      console.error('Error al obtener los planes:', error);
    }
  };

  useEffect(() => {
    obtenerPlanes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      nombre: nombre,
      valor: valor,
      dias: dias
    };

    try {
      const response = await axios.post('http://localhost:8000/planes/agregar/', datos, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      console.log('Plan agregado correctamente.');
      obtenerPlanes();
      setNombre('');
      setValor('');
      setDias('');
    } catch (error) {
      console.error('Error al agregar el plan:', error);
    }
  };

  const eliminarPlan = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/planes/eliminar_plan/${id}/`);
      console.log('Plan eliminado correctamente');
      obtenerPlanes();
    } catch (error) {
      console.error('Error al eliminar el plan:', error);
    }
  };

  return (
    <>
      <div>
        <Menu /> {/* Aquí se coloca el componente Menu */}
      </div>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Planes</h2>

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
            <label htmlFor="valor">Valor:</label>
            <input
              type="number"
              className="form-control"
              id="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dias">Días:</label>
            <input
              type="number"
              className="form-control"
              id="dias"
              value={dias}
              onChange={(e) => setDias(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>

        <br />

        <h1 className="mt-4">Listado de Planes</h1>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Valor</th>
              <th>Días</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {planes.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.id}</td>
                <td>{plan.nombre}</td>
                <td>{plan.valor}</td>
                <td>{plan.dias}</td>
                <td>
                  <button
                    onClick={() => eliminarPlan(plan.id)}
                    className="btn btn-danger"
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

export default FormularioPlan;
