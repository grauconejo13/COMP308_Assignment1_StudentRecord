import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/api';  // Assumed API service to fetch courses

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Course List</h2>
      <ul style={styles.list}>
        {courses.map(course => (
          <li key={course._id} style={styles.listItem}>
            <h3>{course.courseName} ({course.courseCode})</h3>
            <p>Section: {course.section}</p>
            <p>Semester: {course.semester}</p>
            <button style={styles.button}>View Details</button>
            {/* Optionally, add buttons for admin to manage courses */}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styling for the CourseList component
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    width: '80%',
    margin: 'auto',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CourseList;
