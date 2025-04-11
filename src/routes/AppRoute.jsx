import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'

const AppRoute = () => {
    return (
        <Routes>
            <Route index element={<Homepage />} />
        </Routes>
    )
}

export default AppRoute
