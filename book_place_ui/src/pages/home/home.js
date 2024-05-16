import React from 'react';
import Menu from '../../components/menu/menu.js'; // Asegúrate de importar el componente Menu desde su ubicación correcta

const Home = () => {
  return (
    <div>
      <Menu /> {/* Aquí se coloca el componente Menu */}
      <div className="container">
        <h1 className='text-center mb-4'>
          <br></br>
          <br></br>
          Bienvenido al sistema Book Place
        </h1>
      </div>
    </div>
  );
};

export default Home;
