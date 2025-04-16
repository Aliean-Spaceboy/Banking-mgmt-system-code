import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAccount = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phNumber, setPhNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess("");
    setLoading(true);

    let errorList = [];

    if (!accountNumber) errorList.push("Account number is required");
    if (!balance || isNaN(balance)) errorList.push("Balance must be a valid number");
    if (!email) errorList.push("Email is required");
    if (!firstName) errorList.push("First name is required");
    if (!lastName) errorList.push("Last name is required");
    if (!phNumber || isNaN(phNumber)) errorList.push("Phone number must be a valid number");
    if (!userId || isNaN(userId)) errorList.push("User ID is required");
   
    if(errorList.length > 0)
    {
      setErrors(errorList);
      setLoading(false);
      return;
    }
   

   const newAccount = {
      accountNumber,
      balance: parseFloat(balance),
      email,
      firstName,
      lastName,
      phNumber: phNumber ? parseInt(phNumber, 10) : 0,
      user: { id: userId ? parseInt(userId, 10) : 0 },
    };
    const username = "user";
    const password = "userPassword";
    const authHeader = "Basic " + btoa(username + ":" + password);
    try {
      const response = await axios.post(
        "http://localhost:9090/api/accounts/create-account", newAccount, {
        headers: {
          "Authorization": authHeader,
            "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Account Created:", response.data);
      setSuccess("Account created successfully!");

      setAccountNumber("");
      setBalance("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhNumber("");
      setUserId("");
      setTimeout(() => {
        navigate("/enter-account-number");
      }, 2000);
    } catch (error) {
      console.error("Error creating account:", error.response ? error.response.data : error.message);
      setErrors(["Failed to create account. Please try again."]);
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <div className="container mt-5">
      <h1>Create Account</h1>
      {errors.length > 0 && <div className="alert alert-danger">{errors.join(". ")}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Account Number</label>
          <input type="text" className="form-control" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Enter Account Number" />
        </div>

        <div className="mb-3">
          <label className="form-label">Balance</label>
          <input type="number" className="form-control" value={balance} onChange={(e) => setBalance(e.target.value)} placeholder="Enter Balance Amount" />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
        </div>

        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input type="number" className="form-control" value={phNumber} onChange={(e) => setPhNumber(e.target.value)} placeholder="Enter Phone Number" />
        </div>

        <div className="mb-3">
          <label className="form-label">User ID</label>
          <input type="number" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter User ID" />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
     
    </div>
  );
};

export default CreateAccount;
