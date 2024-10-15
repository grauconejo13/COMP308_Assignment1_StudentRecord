import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Correct: Named import


// Set the authorization token in the Axios headers
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Function to decode JWT and return user details
export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.user;  // Assuming the token has user details
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
  return null;
};

// Get the user role from the JWT token
export const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.role;  // The function returns here if token exists, so no further code is needed.
  }

  // If no token, return null
  return null;
};


