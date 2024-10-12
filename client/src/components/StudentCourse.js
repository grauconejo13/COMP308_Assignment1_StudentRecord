import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentCourse = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ courseCode: '', section: '' });
  const [error, setError] = useState('');

  // Fetch student courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('/api/courses'); // Fetch courses taken by student
        setCourses(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  // Add a new course
  const handleAddCourse = async () => {
    try {
      await axios.post('/api/courses/enroll', newCourse); // Enroll in new course
      setCourses([...courses, newCourse]); // Update course list
      setNewCourse({ courseCode: '', section: '' });
    } catch (err) {
      setError('Failed to add course.');
      console.error(err);
    }
  };

  // Drop a course
  const handleDropCourse = async (courseId) => {
    try {
      await axios.delete(`/api/courses/${courseId}`); // Drop the course
      setCourses(courses.filter(course => course._id !== courseId)); // Remove course from list
    } catch (err) {
      setError('Failed to drop course.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>My Courses</h2>
      {error && <p>{error}</p>}
      
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            {course.courseCode} - {course.courseName} (Section: {course.section})
            <button onClick={() => handleDropCourse(course._id)}>Drop</button>
          </li>
        ))}
      </ul>
      
      <h3>Add a new course</h3>
      <input
        type="text"
        value={newCourse.courseCode}
        onChange={(e) => setNewCourse({ ...newCourse, courseCode: e.target.value })}
        placeholder="Course Code"
      />
      <input
        type="text"
        value={newCourse.section}
        onChange={(e) => setNewCourse({ ...newCourse, section: e.target.value })}
        placeholder="Section"
      />
      <button onClick={handleAddCourse}>Add Course</button>
    </div>
  );
};

export default StudentCourse;
