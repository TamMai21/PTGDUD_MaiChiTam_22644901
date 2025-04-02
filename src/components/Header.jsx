import React, { useEffect, useState } from 'react'
import './Header.css'

const Header = () => {
    const [dataApi, setDataApi] = useState()

    const fetchApi = async () => {
        let response = await fetch('https://67d6a512286fdac89bc28e08.mockapi.io/food');
        let responseJson = await response.json()
        if (responseJson) {
            setDataApi(responseJson)
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <div className='row header'>
            <div className="col-4">
                <p className="h6 text-dark">Dashboard</p>
            </div>
            <div className="col-7">
                {dataApi ?
                    <p className='api'>{JSON.stringify(dataApi)}</p>
                    :
                    <>NO API</>
                }
            </div>
        </div>
    )
}

export default Header
