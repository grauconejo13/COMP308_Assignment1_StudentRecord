import React from 'react';
import Login from './Login';  // Using the smaller Login component
import './LoginPage.css';  // Assuming custom styles for the login page
import { Link } from 'react-router-dom';  // Import Link


const LoginPage = ({ setIsAuthenticated, setLoggedInUser }) => {
  return (
    <div className="login-page" className="page-container">
    <div className="form-container">
      <h1>Welcome to Student Management System</h1>
      <p>Please log in to continue</p>
      <Login setIsAuthenticated={setIsAuthenticated} setLoggedInUser={setLoggedInUser}/>  {/* Reusing the Login component */}
      <p>Don't have an account? <Link to="/register">Register here</Link></p>{/* Add a link to the login page */}
      </div>
      </div>
  );
};

export default LoginPage;
