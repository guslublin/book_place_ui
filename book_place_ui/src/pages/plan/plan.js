import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    } catch (error) {
      console.error('Error al agregar el plan:', error);
    }
  };

  const eliminarPlan = async (id) => {
    try {
      axios.delete(`http://localhost:8000/planes/eliminar_plan/${id}/`)
      .then(response => {
        console.log('Plan eliminado correctamente:', response.data);
        obtenerPlanes();
      })
      .catch(error => {
        console.error('Error al eliminar el plan:', error);
      });
    } catch (error) {
        console.error('Error al eliminar el plan:', error);
    }
  };

  return (
    <div className="container">
      <h1>Formulario de Plan</h1>
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
            type="date"
            className="form-control"
            id="dias"
            value={dias}
            onChange={(e) => setDias(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>

      <br/>

      <h1>Listado de Planes</h1>
      <ul>
        {planes.map(plan => (
          <li key={plan.id}>
            <strong>ID:</strong> {plan.id} | <strong>Nombre:</strong> {plan.nombre} | <strong>Valor:</strong> {plan.valor} | <strong>Días:</strong> {plan.dias}
            <button onClick={() => eliminarPlan(plan.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormularioPlan;
