import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

// Components
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
          <Route exact path="/">
            {isAuthenticated ? (
              role === 'admin' ? <Redirect to="/admin-dashboard" /> : <Redirect to="/student-dashboard" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )}
          </Route>
          <Route path="/register">
            <RegisterPage onLogin={handleLogin} />
          </Route>
          <PrivateRoute path="/admin-dashboard" component={AdminDashboard} isAuthenticated={isAuthenticated} role={role} allowedRole="admin" />
          <PrivateRoute path="/student-dashboard" component={StudentDashboard} isAuthenticated={isAuthenticated} role={role} allowedRole="student" />
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
