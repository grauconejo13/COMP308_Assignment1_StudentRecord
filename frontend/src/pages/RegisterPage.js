import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link
import './RegisterPage.css';  

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

       // Clear all cookies before making the request
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie.replace(/^ +/, "")
                           .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Create FormData instance
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('userType', 'student');  // Assuming default userType is student

    try {
      // Axios request to register the user
      const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Important for multipart requests
        },
         withCredentials: false,  // Disable cookies to avoid oversized headers
      });

      const token = response.data.token;
      if (!token) {
        throw new Error('No token received from the server.');
      }

      localStorage.setItem('token', token);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));

      if (decodedToken.user.userType === 'student') {
        history.push('/student-dashboard');
      } else if (decodedToken.user.userType === 'admin') {
        history.push('/admin-dashboard');
      }

    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage('Registration failed, please try again.');
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit">Register</button>
        </form>
         {/* Add a link to the login page */}
      <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
