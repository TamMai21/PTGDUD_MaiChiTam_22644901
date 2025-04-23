// routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../component/Homepage';
import ProductList from '../component/ProductList';

const AppRoutes = () => {
  return (
    <Routes>
        <Route index element={<ProductList />} />

    </Routes>
  );
};

export default AppRoutes;
