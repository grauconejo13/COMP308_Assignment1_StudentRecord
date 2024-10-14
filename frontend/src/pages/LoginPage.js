import React from 'react';
import Login from './Login';  // Using the smaller Login component
import './LoginPage.css';  // Assuming custom styles for the login page

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1>Welcome to Our App</h1>
      <p>Please log in to continue</p>
      <Login />  {/* Reusing the Login component */}
    </div>
  );
};

export default LoginPage;
