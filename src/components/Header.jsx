import React, { useEffect, useState } from 'react'
import './Header.css'
import { BellOutlined, QuestionOutlined, SearchOutlined } from '@ant-design/icons'
import { Input } from "antd";
import avt from '../assest/img/Avatar.png'

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
                <p className="h4 text-pink">Dashboard</p>
            </div>
            <div className="col-8">
                <div className="w-100 d-flex flex-end">
                    <Input
                        placeholder="Search..."
                        prefix={<SearchOutlined style={{ color: "#999" }} />}
                        style={{
                            backgroundColor: "#f5f6f8",
                            border: "none",
                            borderRadius: "10px",
                            padding: "8px 12px",
                            color: "#333",
                        }}
                        allowClear
                    />
                    <BellOutlined style={{ fontSize: "1.5rem", color: "#000000" }} />
                    <QuestionOutlined style={{ fontSize: "1.5rem", color: "#000000" }} />
                    <img src={avt} className='rounded-img' alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header
