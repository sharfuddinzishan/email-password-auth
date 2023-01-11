import React from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from "react";
import app from '../firebase/firebase.init';


const auth = getAuth(app);

const Register = () => {
  const [user, setUser] = useState({})
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  let handleInput = (e) => {
    let event = e.target
    event.name === 'email' && setEmail(event.value)
    event.name === 'password' && setPassword(event.value)
  }
  let handleCreateUser = (e) => {
    e.preventDefault()
    setSuccess(false)
    setError(false)
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        setUser(result.user)
        setSuccess(true)
        setError(false)
      })
      .catch(e => {
        setError(true)
      })
  }
  return (
    <div>
      <form action="">
        <input onBlur={handleInput} type="email" name="email" id="email" required placeholder="Your Email" />
        <input onBlur={handleInput} type="password" name="password" id="password" required placeholder="Your Password" />
        <button type="submit" onClick={handleCreateUser}>Sign Up</button>
      </form>
      {
        user.uid && success && <p>User Created Successfully</p>
      }
      {
        error && <p>User Not Created</p>
      }
    </div>
  );
};

export default Register;