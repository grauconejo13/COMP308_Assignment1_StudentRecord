import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminCourseManagement from './components/AdminCourseManagement';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the landing page as the default route ("/") */}
        <Route path="/" element={<LandingPage />} />

        {/* Define the route for admin course management */}
        <Route path="/admin-courses" element={<AdminCourseManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
