import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    let errors = [];

    if (!username) errors.push('Username is required');
    if (!password) errors.push('Password is required');
    if (password.length < 8) errors.push('Password must have at least 8 characters');

    setErrors(errors);
    if (errors.length > 0) return;

    try {
      // Register user
      const response = await axios.post('http://localhost:9090/api/users/register', { username, password });

      if (response.status === 200) {
        const user = response.data;
        console.log("User Registered:", user);

        // Store user details in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        setUserData(user);
        // Fetch and display user details
        setUserData(user);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrors(['Failed to register user']);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Signup</h1>

      {/* Error Messages */}
      {errors.length > 0 && <div className="alert alert-danger">{errors.join('. ')}</div>}

      {/* Signup Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username-input" className="form-label">Username</label>
          <input
            type="text"
            id="username-input"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password-input" className="form-label">Password</label>
          <input
            type="password"
            id="password-input"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        {/* Buttons Row */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Signup</button>
    
        </div>
      </form>

      {/* Login Link */}
      <p className="mt-3">
        Already have an account? <a href="/login">Login</a>
      </p>

      {/* Show User Details after Signup */}
      {userData && (
        <div className="mt-4">
          <h3>Registered User Details</h3>
          <table className="table table-bordered">
            <tbody>
              <tr><td>ID</td><td>{userData.id}</td></tr>
              <tr><td>Username</td><td>{userData.username}</td></tr>
            </tbody>
          </table>
          <button
            className="btn btn-success mt-3"
            onClick={() => navigate("/create-account")}
          >
            Create an Account
          </button>
        </div>
      )}
    </div>
  );
};

export default Signup;
