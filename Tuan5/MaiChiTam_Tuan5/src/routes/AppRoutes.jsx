import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import BaiUINhaHang from '../component/BaiUINhaHang';

function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/nhahang" element={<BaiUINhaHang />} />
            {/* <Route path="/congtrunhanchua" element={<StepThree />} /> */}
        </Routes>
    );
}

export default AppRoutes;