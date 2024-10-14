import React, { useState, useEffect } from 'react';
import { getStudents } from '../services/api';  // Assumed API service to fetch students

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Student List</h2>
      <ul style={styles.list}>
        {students.map(student => (
          <li key={student._id} style={styles.listItem}>
            <h3>{student.firstName} {student.lastName}</h3>
            <p>Student Number: {student.studentNumber}</p>
            <p>Email: {student.email}</p>
            <p>Program: {student.program}</p>
            <button style={styles.button}>View Details</button>
            {/* Optionally, add buttons for admin to manage students */}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styling for the StudentList component
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

export default StudentList;

