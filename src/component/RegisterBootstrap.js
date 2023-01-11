import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../firebase/firebase.init';

const auth = getAuth(app)

const RegisterBootstrap = () => {
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
            <form className='w-50 mx-auto' onSubmit={handleSignUp}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" onBlur={handleInput} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" onBlur={handleInput} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
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

export default RegisterBootstrap;