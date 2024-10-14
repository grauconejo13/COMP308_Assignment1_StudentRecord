import axios from 'axios';
import jwt_decode from 'jwt-decode';

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
    const decoded = jwt_decode(token);
    return decoded.role;  // Return the role from the token payload
  }
  return null;
};
