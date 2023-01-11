import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <h1>Login Panel</h1>
            <Link to='/register'>Want To Create New Account?</Link>
        </div>
    );
};

export default Login;