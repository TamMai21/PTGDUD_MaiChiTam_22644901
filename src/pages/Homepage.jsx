import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import './Homepage.css'
import squareFour from '../assest/img/Squares-four1.png'
import fileText from '../assest/img/File-text-1.png'
import cart from '../assest/img/Button-1509.png'
import upload from '../assest/img/Move-up.png'
import download from '../assest/img/Download.png'
import { Form, Button } from 'react-bootstrap';
import { EditOutlined } from '@ant-design/icons'; // Import biểu tượng EditOutlined từ Ant Design Icons


const Homepage = () => {
    const [dataApi, setDataApi] = useState()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }));
    };


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

    useEffect(() => {
        console.log('data context', data);

    }, [data])
    return (
        <div className='homepage container row'>
            <div className="col-4">
                <Sidebar />
            </div>
            <div className="col-8">
                <Header />
                <div className="content">
                    <div className="overview">
                        <div className="overview1">
                            <div className="d-flex px-3">
                                <img src={squareFour} className='img-content' alt="" />
                                <p className="h5 text-bold">Overview</p>
                            </div>
                        </div>
                        <div className="overview2 w-100 d-flex justify-content-between">
                            <div className="col-4 overview-item">
                                <div className="p-3 rounded-3" style={{ backgroundColor: "#ffeaf0" }}>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <small className="fw-bold text-muted">Turnover</small>
                                            <h4 className="fw-bold mt-1 mb-2">$92,405</h4>
                                            <div className="text-success fw-semibold" style={{ fontSize: "0.9rem" }}>
                                                ▲ 5.39% <span className="text-muted fw-normal">period of change</span>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-light"
                                                style={{ backgroundColor: "#ffeaf0", border: "none" }}
                                            >
                                                <img src={cart} style={{ color: "#cc3366", fontSize: "1.2rem" }} alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 overview-item">
                                <div className="p-3 rounded-3" style={{ backgroundColor: "#ffeaf0" }}>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <small className="fw-bold text-muted">Turnover</small>
                                            <h4 className="fw-bold mt-1 mb-2">$92,405</h4>
                                            <div className="text-success fw-semibold" style={{ fontSize: "0.9rem" }}>
                                                ▲ 5.39% <span className="text-muted fw-normal">period of change</span>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-light"
                                                style={{ backgroundColor: "#ffeaf0", border: "none" }}
                                            >
                                                <img src={cart} style={{ color: "#cc3366", fontSize: "1.2rem" }} alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 overview-item">
                                <div className="p-3 rounded-3" style={{ backgroundColor: "#ffeaf0" }}>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <small className="fw-bold text-muted">Turnover</small>
                                            <h4 className="fw-bold mt-1 mb-2">$92,405</h4>
                                            <div className="text-success fw-semibold" style={{ fontSize: "0.9rem" }}>
                                                ▲ 5.39% <span className="text-muted fw-normal">period of change</span>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className="btn btn-light"
                                                style={{ backgroundColor: "#ffeaf0", border: "none" }}
                                            >
                                                <img src={cart} style={{ color: "#cc3366", fontSize: "1.2rem" }} alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detailed">
                        <div className="d-flex px-3 justify-content-between">
                            <div className="d-flex">
                                <img src={fileText} className='img-content' alt="" />
                                <p className="h5 text-bold">Detail report</p>
                            </div>
                            <div className="flex-end">
                                <button className="btn" onClick={handleShow}><img src={upload} alt="" /> Import</button>
                                <button className="btn"><img src={download} alt="" /> Export</button>
                            </div>
                        </div>
                        <div className="table">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col"><input type="checkbox" name="" disabled id="" /></th>
                                        <th scope="col">CUSTOMER NAME</th>
                                        <th scope="col">COMPANY</th>
                                        <th scope="col">ORDER VALUE</th>
                                        <th scope="col">ORDER DATE</th>
                                        <th scope="col">ORDER STATUS</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <th scope="row">
                                            <input type="checkbox" name="" id="" />
                                        </th>
                                        <td className='d-flex'>
                                            <img alt="" style={{ width: "24px", height: "24px" }} />
                                            <p>ITEM 1</p>
                                        </td>
                                        <td>COMPANY 1</td>
                                        <td>$12345</td>
                                        <td>2025-07-05</td>
                                        <td>NEW</td>
                                        <td>
                                            <Button variant="primary">
                                                <EditOutlined /> Edit
                                            </Button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className="px-5">
                            <p className="h6">Mai Chi Tam - 22644901</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Homepage
