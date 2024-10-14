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

  const handleRegister = async(e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    // Handle registration logic here
    try {
      // Send registration data to backend
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
        userType: 'student',  // or 'admin', depending on your setup
      });

      // Save the JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Decode the token to check the userType (optional)
      const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));

      // Redirect based on userType (student or admin)
      if (decodedToken.user.userType === 'student') {
        history.push('/student-dashboard');  // Redirect to student dashboard
      } else if (decodedToken.user.userType === 'admin') {
        history.push('/admin-dashboard');  // Redirect to admin dashboard
      }

    } catch (error) {
      setErrorMessage('Registration failed, please try again.');
    }
  };

  return (
    <div className="page-container">
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

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
