import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './registro_styles.css'; 
import Menu from '../../components/menu/menu.js'; // Asegúrate de importar el componente Menu desde su ubicación correcta

const RegistroForm = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [roles, setRoles] = useState([]);
  const [idRol, setIdRol] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  function handleVolver() {
    // Redirigir al usuario al login
    window.location.href = '/';
  }

  useEffect(() => {
    obtenerRoles();
    obtenerUsuarios();
  }, []);


  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8000/usuarios/');
    //   console.log('response.data.usuarios', response.data.usuarios);
      setUsuarios(response.data.usuarios);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/usuarios/eliminar_usuario/${id}`);
      // Actualizar la lista de usuarios después de eliminar uno
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };


  const obtenerRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/roles/');
      setRoles(response.data.roles);
    } catch (error) {
      console.error('Error al obtener los roles:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contrasena !== confirmarContrasena) {
      console.error('Las contrasenas no coinciden');
      return;
    }

    const usuario = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      fecha_nacimiento: fechaNacimiento,
      telefono: telefono,
      contrasena: contrasena,
      id_rol: 2
    };

    try {
      const response = await axios.post('http://localhost:8000/usuarios/agregar/', usuario, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      console.log('Usuario agregado correctamente.');
        window.location.href = '/';

      // Aquí podrías redirigir a otra página o mostrar un mensaje de éxito
        // obtenerUsuarios();

    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  return (
    <><div>
      
    </div><div className="container-usuario mt-5">
        <div className='form-container'>
          <h2 className="text-center mb-4">Registro de Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)} />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)} />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
              <input
                type="date"
                className="form-control"
                id="fechaNacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)} />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)} />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="contrasena">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)} />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="confirmarContrasena">Confirmar Contrasena:</label>
              <input
                type="password"
                className="form-control"
                id="confirmarContrasena"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)} />
            </div>
            <br></br>
            <div className="button-container">
                <button type="submit" className="btn btn-primary">Guardar</button>
                <button className="btn btn-danger" onClick={handleVolver}>Volver</button>
            </div>
            
          </form>
          <br></br>
        </div>
      </div></>
  );
};

export default RegistroForm;
