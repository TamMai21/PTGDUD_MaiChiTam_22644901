import React, { useEffect, useState } from 'react'
import './Sidebar.css'

const Sidebar = () => {

    const [dataApi, setDataApi] = useState()

    const fetchApi = async () => {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
        let responseJson = await response.json()
        if (responseJson) {
            setDataApi(responseJson)
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <div className='sidebar'>
            {dataApi ?
                <p className='api'>{JSON.stringify(dataApi)}</p>
                :
                <>NO API</>
            }
        </div>
    )
}

export default Sidebar
