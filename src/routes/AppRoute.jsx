import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import About from '../pages/About'

const AppRoute = () => {
    return (
        <Routes>
            <Route index element={<Homepage />} />
            <Route path="/about" element={<About />} />
        </Routes>
    )
}

export default AppRoute
