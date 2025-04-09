import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import './Homepage.css'
import squareFour from '../assest/img/Squares-four1.png'
import fileText from '../assest/img/File-text-1.png'
import cart from '../assest/img/Button-1509.png'
import upload from '../assest/img/Move-up.png'
import download from '../assest/img/Download.png'
import { Card, Button } from 'react-bootstrap'

const About = () => {
    const [dataApi, setDataApi] = useState(null)

    const fetchApi = async () => {
        try {
            let response = await fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY');
            let responseJson = await response.json()
            if (responseJson) {
                setDataApi(responseJson)
            }
        } catch (error) {
            console.error("Fetch error:", error)
        }
    }

    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <div className='homepage container row'>
            <div className="col-4">
                <Sidebar about={true} />
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
                            {[1, 2, 3].map((_, idx) => (
                                <div className="col-4 overview-item" key={idx}>
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
                                                    <img src={cart} style={{ fontSize: "1.2rem" }} alt="" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="detailed">
                        <div className="d-flex px-3 justify-content-between">
                            <div className="d-flex">
                                <img src={fileText} className='img-content' alt="" />
                                <p className="h5 text-bold">Detail report</p>
                            </div>
                            <div>
                                <button className="btn"><img src={upload} alt="" /> Import</button>
                                <button className="btn"><img src={download} alt="" /> Export</button>
                            </div>
                        </div>

                        {/* Card Placeholder */}
                        <div className="p-3">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>ABOUT ME</Card.Title>
                                    <Card.Text>
                                        MAI CHI TAM - 22644901
                                    </Card.Text>

                                </Card.Body>
                            </Card>
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

export default About
