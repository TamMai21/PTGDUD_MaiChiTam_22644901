import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Menu from '../pages/Menu';
import Home from '../pages/Home';
import Detail from '../pages/Detail';

function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/book" element={<Menu />} />
            <Route path="/book/:id" element={<Detail />} />
            {/* <Route path='*' element={<><h1>404</h1><br /><a href="/">GO TO HOME</a></>}/> */}
        </Routes>
    );
}

export default AppRoutes;