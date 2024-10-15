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


