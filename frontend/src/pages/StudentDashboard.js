import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Using axios for API requests

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);  // Initializing courses as an empty array

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        console.log(response); // Log to inspect the response structure

        // Make sure to access the courses array properly based on API response structure
        if (response.data && Array.isArray(response.data)) {
          setCourses(response.data);  // Assuming response.data is an array
        } else if (response.data && response.data.courses) {
          setCourses(response.data.courses);  // If courses are inside a 'courses' object
        } else {
          console.error("Unexpected response structure");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);  // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <h1>Student Dashboard</h1>
      <ul>
        {/* Check if courses is an array before using map */}
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <li key={course._id}>{course.courseName}</li>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </ul>
    </div>
  );
};

export default StudentDashboard;
