import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p>&copy; {new Date().getFullYear()} Student Management System. All rights reserved.</p>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <a href="/about" style={styles.navLink}>About Us</a>
            </li>
            <li style={styles.navItem}>
              <a href="/contact" style={styles.navLink}>Contact Us</a>
            </li>
            <li style={styles.navItem}>
              <a href="/privacy" style={styles.navLink}>Privacy Policy</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

// Styling for the Footer component
const styles = {
  footer: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    padding: 0,
    margin: '10px 0 0 0',
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default Footer;
