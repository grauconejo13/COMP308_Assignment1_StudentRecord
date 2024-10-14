import React, { useState } from 'react';
import { addCourse } from '../services/api';  // Assumed API service for adding a course

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    courseCode: '',
    courseName: '',
    section: '',
    semester: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCourse(courseData);
      alert('Course added successfully');
      setCourseData({ courseCode: '', courseName: '', section: '', semester: '' });  // Reset form
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="courseCode"
          value={courseData.courseCode}
          onChange={handleInputChange}
          placeholder="Course Code"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="courseName"
          value={courseData.courseName}
          onChange={handleInputChange}
          placeholder="Course Name"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="section"
          value={courseData.section}
          onChange={handleInputChange}
          placeholder="Section"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="semester"
          value={courseData.semester}
          onChange={handleInputChange}
          placeholder="Semester"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Course</button>
      </form>
    </div>
  );
};

// Styling for AddCourse component
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    width: '300px',
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AddCourse;
