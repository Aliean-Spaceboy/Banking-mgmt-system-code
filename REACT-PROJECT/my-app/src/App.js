import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import EnterUserId from "./components/EnterUserId";
import CreateAccount from './components/CreateAccount';
import ListUserComponent from './components/ListUserComponent';
import EnterAccountNumber from './components/EnterAccountNumber';
import Header from './components/Header'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header /> {/* Header will be available on all pages */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<ListUserComponent />} />
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/enter-account-number" element={<EnterAccountNumber />} />
          <Route path="/delete-user" element={<EnterUserId />} />
          <Route path="/delete-user/:id" element={<EnterUserId />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
