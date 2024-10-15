import React, { useState, useEffect } from 'react';  // Correct Import
import { Link, useHistory } from 'react-router-dom';
import { getUserFromToken } from '../utils/auth';  // Utility function to decode token
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const [username, setUsername] = useState('');
  const history = useHistory();

  useEffect(() => {
      const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

   const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    localStorage.removeItem('username'); // Remove the username
    setUsername('');                   // Reset username
    history.push('/login');            // Redirect to login page
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>Student Management System</h1>
      <nav>
        <ul style={styles.navList}>

          {username ? (  // Conditionally render the username and logout button
            <>
              <li style={styles.navItem}>
              <Link to="/" style={styles.navLink}>Home</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/student-dashboard" style={styles.navLink}>Dashboard</Link>
              </li>
              <li style={styles.navItem}>
                <span>Welcome, {username}</span>  {/* Display the username */}
              </li>
              <li style={styles.navItem}>
                <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>  {/* Logout button */}
              </li>
            </>
          ) : (
            <>
           <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>Home</Link>
            </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

// Styles for the Header component
const styles = {
  header: {
    backgroundColor: '#007bff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    margin: 0,
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: '20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
  }
};

export default Header;
