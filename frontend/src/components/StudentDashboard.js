import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/api';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then(res => setCourses(res.data));
  }, []);

  return (
    <div>
     <h1>Student Dashboard</h1>
      <p>Welcome, Student!</p>
      <h2>My Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>{course.courseName}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
