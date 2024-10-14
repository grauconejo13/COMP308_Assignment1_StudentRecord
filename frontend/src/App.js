import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

// pages
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Utils
import auth from './utils/auth';  // Correct path
import { setAuthToken, getUserRole } from './utils/auth';

// Main App Component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
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
    setRole(getUserRole());
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
         <Route path="/login" component={LoginPage} />        {/* Login page route */}
        <Route path="/register" component={RegisterPage} />  {/* Register page route */}
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/student-dashboard" component={StudentDashboard} />
        <Route path="/" component={LoginPage} />  {/* Default to login */}
        </Switch>
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
