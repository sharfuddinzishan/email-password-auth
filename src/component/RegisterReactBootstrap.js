import { React, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/firebase.init';
import { Button, Form } from 'react-bootstrap';

const auth = getAuth(app)

const RegisterReactBootstrap = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [user, setUser] = useState({})
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    let handleInput = (e) => {
        let event = e.target
        event.name === 'email' && setEmail(event.value)
        event.name === 'password' && setPassword(event.value)
    }

    let handleSignUp = (e) => {
        e.preventDefault()
        setSuccess(false)
        setError(false)
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user)
                setSuccess(true)
            })
            .catch(e => {
                setError(true)
            })
            .finally(() => setLoading(false))
    }
    return (
        <>
            <Form className='w-50 mx-auto' onSubmit={handleSignUp}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onBlur={handleInput} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onBlur={handleInput} required />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading ? true : false}>
                    Submit
                </Button>
            </Form>
            {
                loading && <div className='text-center'>
                    <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            {
                success && <p className='text-center fs-2 text-success'>User <span className='text-info fw-bold'>{user?.email}</span> Created Successfully</p>
            }
            {
                error && <p className='text-center fs-2 fw-bold text-warning'>User Not Created !</p>
            }
        </>
    );
};

export default RegisterReactBootstrap;