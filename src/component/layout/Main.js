import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand>Authentication</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link className='pe-2 text-decoration-none text-muted' to='/register-html'>HTML</Link>
                        <Link className='pe-2 text-decoration-none text-muted' to='/register-bootstrap'>BS</Link>
                        <Link className='pe-2 text-decoration-none text-muted' to='/register'>Register</Link>
                        <Link className='pe-2 text-decoration-none text-muted' to='/login'>Login</Link>
                    </Nav>
                </Container>
            </Navbar>
            {/* <nav>
                <Link to='/register-html'>HTML Signup</Link>
                <Link to='/register-bootstrap'>BS Signup</Link>
                <Link to='/register'>Sign Up</Link>
                <Link to='/login'>Login</Link>
            </nav>
           */}
            <Outlet></Outlet>
        </div>
    );
};

export default Main;