import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const LoginForm = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Book Place</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu usuario" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Iniciar sesión
              </Button>
            </div>

            <div className="text-center mt-3">
              <p>¿No tienes una cuenta? <a href="#">Regístrate</a></p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
