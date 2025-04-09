import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import logo from '../assest/img/logo.png'
import squareFour from '../assest/img/Squares-four1.png'
import folder from '../assest/img/Folder.png'
import group from '../assest/img/Groups.png'
import pieChart from '../assest/img/Pie-chart.png'
import chat from '../assest/img/Chat.png'
import code from '../assest/img/Code.png'
import version from '../assest/img/Group.png'
import { useNavigate } from 'react-router-dom'

const Sidebar = (props) => {

    const [dataApi, setDataApi] = useState()

    const fetchApi = async () => {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
        let responseJson = await response.json()
        if (responseJson) {
            setDataApi(responseJson)
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        fetchApi()
    }, [])

    return (
        <div className='sidebar'>
            <div className="logo">
                <img src={logo} alt="" className='img-logo' />
            </div>
            <div className="nav">
                <div className="item" style={{ backgroundColor: props.dashboard ? "pink" : "none" }} onClick={() => navigate("/")}>
                    <img src={squareFour} alt="" />
                    <p>Dashboards</p>
                </div>
                <div className="item" style={{ backgroundColor: props.about ? "pink" : "none" }} onClick={() => navigate("/about")}>
                    <img src={folder} alt="" />
                    <p>About me</p>
                </div>
                <div className="item">
                    <img src={group} alt="" />
                    <p>Teams</p>
                </div>
                <div className="item">
                    <img src={pieChart} alt="" />
                    <p>Analystics</p>
                </div>
                <div className="item">
                    <img src={chat} alt="" />
                    <p>Messages</p>
                </div>
                <div className="item">
                    <img src={code} alt="" />
                    <p>Intergrations</p>
                </div>
                <div className="ver">
                    <img src={version} alt="" />
                    <div className="gr">
                        <p className="h6 text-dark">V2.0 is available</p>
                        <button className="btn btn-light">Try now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
