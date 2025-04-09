// Homepage.jsx
import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import './Homepage.css'
import squareFour from '../assest/img/Squares-four1.png'
import fileText from '../assest/img/File-text-1.png'
import cart from '../assest/img/Button-1509.png'
import upload from '../assest/img/Move-up.png'
import download from '../assest/img/Download.png'
import { Form, Button, Modal } from 'react-bootstrap';
import { EditOutlined } from '@ant-design/icons';
import { Context } from '../context/Context'

const Homepage = () => {
    const [show, setShow] = useState(false);
    const { data, setData, addToUser } = useContext(Context)

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        orderValue: '',
        orderDate: '',
        status: 'new',
        avatar: null
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch('http://localhost:3001/users');
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error('Fetch failed:', err);
        }
    };

    const handleSave = async () => {
        const payload = {
            ...formData,
            avatar: formData.avatar ? URL.createObjectURL(formData.avatar) : null
        };

        try {
            const res = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            const saved = await res.json();
            addToUser(saved); // vẫn dùng context
        } catch (err) {
            console.error('Save failed:', err);
        }

        setFormData({
            name: '',
            company: '',
            orderValue: '',
            orderDate: '',
            status: 'new',
            avatar: null
        });
        handleClose();
    };

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className='homepage container row'>
            <div className="col-4">
                <Sidebar />
            </div>
            <div className="col-8">
                <Header />
                <div className="content">
                    {/* ... (overview giữ nguyên như cũ) */}
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
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" disabled /></th>
                                        <th>CUSTOMER NAME</th>
                                        <th>COMPANY</th>
                                        <th>ORDER VALUE</th>
                                        <th>ORDER DATE</th>
                                        <th>ORDER STATUS</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.map((item, index) => (
                                        <tr key={index}>
                                            <td><input type="checkbox" /></td>
                                            <td className='d-flex align-items-center'>
                                                {item.avatar && (
                                                    <img src={item.avatar} alt="" style={{ width: 24, height: 24, marginRight: 8 }} />
                                                )}
                                                {item.name}
                                            </td>
                                            <td>{item.company}</td>
                                            <td>${item.orderValue}</td>
                                            <td>{item.orderDate}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <Button variant="primary">
                                                    <EditOutlined /> Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-5 footer">
                            <p className="h6">Mai Chi Tam - 22644901</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>ADD USER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Enter company"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Order Value</Form.Label>
                            <Form.Control
                                type="number"
                                name="orderValue"
                                value={formData.orderValue}
                                onChange={handleChange}
                                placeholder="Enter order value"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Order Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="orderDate"
                                value={formData.orderDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="new">New</option>
                                <option value="inprogress">In Progress</option>
                                <option value="completed">Completed</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control
                                type="file"
                                name="avatar"
                                onChange={handleChange}
                                accept="image/*"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        ADD
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Homepage
