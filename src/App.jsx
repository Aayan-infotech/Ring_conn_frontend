import React from 'react';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AppRoutes from './Routes/AppRoutes';

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
