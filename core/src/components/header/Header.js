import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.scss'
import { useSelector } from 'react-redux';

const Header = (props) => {

    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary bg-light">
                <Container>
                    <Navbar.Brand><NavLink to="/" className='nav-link' style={{ color: 'rgba(0, 0, 0, 0.9)' }}>Homepage</NavLink></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className='nav-link '>Home</NavLink>
                            <NavLink to="/user" className='nav-link '>Users</NavLink>
                            <NavLink to="/admin" className='nav-link '>Admin</NavLink>
                        </Nav>
                        <Nav>
                            {!isAuthenticated ?
                                <>
                                    <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                                    <button className='btn-signup' onClick={() => { navigate('/register') }}>Sign up</button>
                                </>
                                :
                                <><NavDropdown title={<span style={{ color: '#000' }}>Settings</span>} className='' id="basic-nav-dropdown">
                                    <NavDropdown.Item >Action</NavDropdown.Item>
                                    <NavDropdown.Item >
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item >Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item >
                                        Log out
                                    </NavDropdown.Item>
                                </NavDropdown></>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;