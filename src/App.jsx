import React from 'react'
import Homepage from './page/Homepage';
import Collectionpage from './page/Collectionpage';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-(--c1)">
      <Nav />
      <div className="flex-1">
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/collection' element={<Collectionpage />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;