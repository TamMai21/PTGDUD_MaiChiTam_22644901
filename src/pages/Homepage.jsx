import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import './Homepage.css'

const Homepage = () => {
    const [dataApi, setDataApi] = useState()

    const fetchApi = async () => {
        let response = await fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY');
        let responseJson = await response.json()
        if (responseJson) {
            setDataApi(responseJson)
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])
    return (
        <div className='homepage container row'>
            <div className="col-4">
                <Sidebar />
            </div>
            <div className="col-8">
                <Header />
                <div className="content">
                    {dataApi ?
                        <p className='api'>
                            {JSON.stringify(dataApi)}
                        </p>
                        :
                        <>
                            NO API
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Homepage
