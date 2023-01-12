import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [user, setUser] = useState({})
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resetSuccess, setResetSuccess] = useState(false)
    const [resetError, setResetError] = useState(false)

    let handleInput = (e) => {
        let event = e.target
        event.name === 'email' && setEmail(event.value)
        event.name === 'password' && setPassword(event.value)
    }

    let handleSignUp = (e) => {
        e.preventDefault()
        setResetError(false)
        setResetSuccess(false)
        setSuccess(false)
        setError(false)
        setLoading(true)
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError('Provide Valid Email Please')
            setLoading(false)
            return
        }
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user)
                setSuccess(true)
            })
            .catch(e => {
                setError(e.message)
                setUser({})
            })
            .finally(() => setLoading(false))
    }

    let handleSignOut = () => {
        setResetError(false)
        setResetSuccess(false)
        setSuccess(false)
        setError(false)
        setLoading(true)

        signOut(auth)
            .then(() => {
                setUser({})
            })
            .catch(e => {
                setError(e.message)
            })
            .finally(() => setLoading(false))
    }

    let handleReset = (e) => {
        setError(false)
        setResetError(false)
        setResetSuccess(false)
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setResetError(true)
            setLoading(false)
            return
        }
        else {
            setLoading(true)
        }
        sendPasswordResetEmail(auth, email)
            .then(() => setResetSuccess(true))
            .catch((e) => setResetError(true))
            .finally(() => setLoading(false))

    }

    return (
        <div>
            <h1 className='text-center'>Login Panel</h1>
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
                !user.uid &&
                <Form className='mx-auto w-50' onSubmit={handleSignUp}>
                    {
                        success && <p className='text-center text-sm text-success'>User {user.displayName || user.email} Logged Successfully.</p>
                    }
                    {
                        resetSuccess && <p className='text-center text-sm text-success'>Password Reste Link Send To <span className='text-sm fw-bold'>{email}</span></p>
                    }
                    {
                        error && <p className='text-center text-sm fw-bold text-danger'>{error}</p>
                    }
                    {
                        resetError && <p className='text-center text-sm fw-bold text-danger'>Provide Valid Email Please</p>
                    }
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" id="email" type="email" placeholder="Enter email" onBlur={handleInput} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" id="password" type="password" placeholder="Password" onBlur={handleInput} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <p onClick={handleReset} className='btn btn-primary mt-3 ms-3'>Reset Password</p>
                    <Link className='d-block text-decoration-none' to='/register'>Want To Create New Account?</Link>
                </Form>
            }
            {
                user.uid &&
                <button onClick={handleSignOut} className='mx-auto d-block btn btn-primary rounded-pill'>Log Out</button>
            }

        </div>
    );
};

export default Login;