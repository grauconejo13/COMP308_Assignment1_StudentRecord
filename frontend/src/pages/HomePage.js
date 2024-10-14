import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Student & Course Management System</h1>

      <p>This system allows students to manage their course enrollments and view details about their academic progress. Admins can manage student records and course information.</p>

      <div style={styles.linksContainer}>
        <Link to="/login" style={styles.link}>
          <button style={styles.button}>Login</button>
        </Link>

        <Link to="/student-dashboard" style={styles.link}>
          <button style={styles.button}>Student Dashboard</button>
        </Link>

        <Link to="/admin-dashboard" style={styles.link}>
          <button style={styles.button}>Admin Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

// Styling for the HomePage component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  linksContainer: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-around',
    width: '50%',
  },
  link: {
    textDecoration: 'none',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
  },
};

export default HomePage;
