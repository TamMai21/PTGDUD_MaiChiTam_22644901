import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import './Homepage.css'

const Homepage = () => {
    return (
        <div className='homepage container row'>
            <div className="col-4">
                <Sidebar />
            </div>
            <div className="col-8">
                <Header />
                <div className="content">

                </div>
            </div>
        </div>
    )
}

export default Homepage
