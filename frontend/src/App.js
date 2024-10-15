import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

// Import Header/Footer component
import Header from './components/Header';
import Footer from './components/Footer';

// pages
import HomePage from './pages/HomePage';  // Import HomePage
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';

// Utils
import auth from './utils/auth';  // Correct path
import { setAuthToken, getUserRole } from './utils/auth';

// Main App Component
function App() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
     const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setLoggedInUser(storedUsername);
    }

    // Check if there's a token saved in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      setRole(getUserRole());
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    setIsAuthenticated(true);
     setLoggedInUser('');
    setRole(getUserRole());
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAuthToken(null);
    setIsAuthenticated(false);
    setLoggedInUser('');
    setRole(null);
  };

  return (
    <Router>
      <div className="App"> {/* Header will show at the top of all pages */}
      <Header username={loggedInUser} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Switch>
         <Route exact path="/">
            <HomePage isAuthenticated={isAuthenticated} role={role} />
          </Route>
          <Route path="/login">
            <LoginPage setIsAuthenticated={setIsAuthenticated} setLoggedInUser={setLoggedInUser} />
          </Route>
        <Route path="/register" component={RegisterPage} />  {/* Register page route */}
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/student-dashboard" component={StudentDashboard} />
        
        </Switch>
        <Footer />  {/* Footer will show at the bottom of all pages */}
      </div>
    </Router>
  );
}

// Protected Route Component
const PrivateRoute = ({ component: Component, isAuthenticated, role, allowedRole, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && role === allowedRole ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default App;
