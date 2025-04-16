import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9090/api/users/login', { username, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        console.error("Login successful but no token received.");
      }
       // Ensure only the token is stored// Store user data
      navigate('/enter-account-number'); // Redirect to the next page
    } catch (err) {
      setError('Invalid Username or Password');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin }>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="test"
            id="username-input"
            className="form-control"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="mb-3">
          <label  className="form-label">Password</label>
          <input
            type="password"
            id="password-input"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p>New here? <a href="/signup">Signup</a></p>
    </div>
  );
};

export default Login;
