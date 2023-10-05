// LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('dummy.dummy@dummy.com');
  const [password, setPassword] = useState('12345678');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://afc7a104784594208b12c3474fa3c924-1060237241.us-east-2.elb.amazonaws.com:9002/login',
        { email, password }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button className="login-button" onClick={handleLogin}>Login</button>
        {error && <div className="error-message">{error}</div>}
        <br />
        <Link to="/dashboard">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default LoginPage;
