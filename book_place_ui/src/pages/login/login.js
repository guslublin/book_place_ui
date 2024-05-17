import React, { useState } from 'react';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleRegister() {
    // Borrar el id_usuario del localStorage
    // Redirigir al usuario al login
    window.location.href = '/registro';
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/usuarios/login/',
        { username, password }
      );

      // Aquí puedes manejar la respuesta de la API según tus necesidades
      // console.log('Respuesta del servidor:', response.data.success);
      if(response.data.success){
      // Redirigir a /home
        localStorage.setItem('id_usuario', response.data.id_usuario);
        localStorage.setItem('id_rol', response.data.id_rol);
        window.location.href = '/home';

      }
    } catch (error) {
      // Si hay un error, puedes manejarlo aquí
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <Container className="mt-5 text-center"> {/* Agregamos la clase text-center para centrar horizontalmente */}
      <div className="form-container mx-auto"> {/* Agregamos la clase mx-auto para centrar horizontalmente */}
        <div className="formulario">
          <h2 className="text-center mb-4">Book Place</h2>
          <br></br>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br></br>
            {error && <p className="text-danger">{error}</p>}
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Iniciar sesión
              </Button>
            </div>
            <br></br>
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={handleRegister}>Regístrate</button>
              {/* <Button variant="success" type="submit">
                
              </Button> */}
            </div>
            <br></br>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default LoginForm;
