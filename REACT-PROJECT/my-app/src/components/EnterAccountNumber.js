import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnterAccountNumber = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Updated account state:', account);
  }, [account]);

  const fetchAccountDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAccount(null);

    const username = 'user';
    const password = 'userPassword';
    const authHeader = 'Basic ' + btoa(username + ':' + password);

    try {
      const response = await axios.get(
        `http://localhost:9090/api/accounts/${accountNumber}`,
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Response:', JSON.stringify(response.data, null, 2));

      if (Array.isArray(response.data) && response.data.length > 0) {
        setAccount(response.data); // Store as an array if response is an array
      } else if (response.data) {
        setAccount([response.data]); // Wrap single object in an array
      } else {
        setError('No account details found.');
      }
    } catch (err) {
      console.error(
        'Error fetching account:',
        err.response ? err.response.data : err.message
      );
      setError('Account not found or unauthorized');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Enter Your Account Number</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={fetchAccountDetails}>
        <div className="mb-3">
          <label className="form-label">Account Number</label>
          <input
            type="text"
            className="form-control"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter Account Number"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Fetching...' : 'Submit'}
        </button>
      </form>

      {/* Show Account Details if Account Exists */}
      {account && account.length > 0 && (
        <div className="mt-4">
          <h3>Account Details</h3>
          {account.map((acc) => (
            <div key={acc.id} className="border p-2 mb-2">
              <p>
                <strong>ID:</strong> {acc.id}
              </p>
              <p>
                <strong>First Name:</strong> {acc.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {acc.lastName}
              </p>
              <p>
                <strong>Balance:</strong> {acc.balance}
              </p>
              <p>
                <strong>Phone:</strong> {acc.phNumber}
              </p>
              <p>
                <strong>Email:</strong> {acc.email}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnterAccountNumber;
