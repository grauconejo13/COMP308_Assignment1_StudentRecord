import React, { useState } from 'react';
import { addStudent } from '../services/api';  // Assumed API service for adding a student

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    studentNumber: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    program: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(studentData);
      alert('Student added successfully');
      setStudentData({ studentNumber: '', password: '', firstName: '', lastName: '', email: '', program: '' });  // Reset form
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="studentNumber"
          value={studentData.studentNumber}
          onChange={handleInputChange}
          placeholder="Student Number"
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          value={studentData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="firstName"
          value={studentData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="lastName"
          value={studentData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          value={studentData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="program"
          value={studentData.program}
          onChange={handleInputChange}
          placeholder="Program"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Student</button>
      </form>
    </div>
  );
};

// Styling for AddStudent component
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

export default AddStudent;
