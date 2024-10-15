import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';  // Import Link
import { login } from '../services/api';  // Assuming this is your login function

import axios from 'axios';

const Login = ({ setIsAuthenticated, setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    
      try {
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });

      console.log('API Response:', response);  // Log the response for debugging

         // Ensure the response contains the user object
      if (!response.data || !response.data.token) {
        throw new Error('No token received from the server');
      }

      // Decode the token and log the result for debugging
      const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
      console.log('Decoded Token:', decodedToken);  // Log the decoded token
      const decodedUsername = decodedToken.user?.username;

            // Ensure the user object and username exist in the decoded token
      if (!decodedToken.user || !decodedUsername) {
        throw new Error('Username is missing in the token');
      }

      // Save token to localStorage/ username
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', decodedUsername); // Save username

      // Update state in the parent component to trigger header re-render
      setIsAuthenticated(true);  // Ensure this triggers the UI to update immediately
      setLoggedInUser(decodedUsername);


      // Redirect based on user type
      JSON.parse(atob(response.data.token.split('.')[1]));
      if (decodedToken.user.userType === 'student') {
        history.push('/student-dashboard');
      } else {
        history.push('/admin-dashboard');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || 'Login failed, please try again.');
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <button type="submit">Login</button>
      </form>

      {/* Add link to register page here */}
    
    </div>
  );
};

export default Login;
