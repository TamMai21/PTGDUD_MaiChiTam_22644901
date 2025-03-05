import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './BaiTap.css'

const BaiTap = (props) => {

    const [dataMock, setDataMock] = useState([])

    useEffect(() => {
        fetchData()
    })

    const fetchData = async () => {
        let data = await axios.get('https://67c8459c0acf98d07085bfdf.mockapi.io/api/v0503/products')
        console.log('data mock: ', data);
        setDataMock(data.data)
    }

    return (
        <div className='row'>
            {dataMock && dataMock.length !== 0 &&
                dataMock.map((item, index) => {
                    return (
                        <div id={`id${index}`} className="card col-3">
                            <img src={item.avatar} />
                            <p>{item.name}</p>
                            <button onClick={() => alert(id)}>Click me</button>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default BaiTap;