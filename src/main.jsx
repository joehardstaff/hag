import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Tickets from './pages/tickets/tickets';
import ResetPassword from './pages/resetPassword/Reset';
import Hotel from './pages/hotel/hotel';
import Education from './pages/education/education';
import Home from './pages/home/home';
import Membership from './pages/membership/membership';
import Account from './pages/account/account';

// Add future files here that need a directory in order to link pages together
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/account" element={<Account />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/education" element={<Education />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes> 
    </Router>
  </React.StrictMode>
);