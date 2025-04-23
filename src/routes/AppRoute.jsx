// routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Bai1 from '../component/Bai1';
import Bai2 from '../component/Bai2';
import Bai3 from '../component/Bai3';
import Homepage from '../component/Homepage';

const AppRoutes = () => {
  return (
    <Routes>
        <Route index element={<Homepage />} />

    </Routes>
  );
};

export default AppRoutes;
