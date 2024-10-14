import React, { useState, useEffect } from 'react';
import { getStudents, getCourses, addStudent, addCourse, deleteStudent, deleteCourse } from '../services/api';
import api from '../services/api';

const AdminDashboard = () => {

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newStudent, setNewStudent] = useState({
    studentNumber: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    program: '',
  });
  const [newCourse, setNewCourse] = useState({
    courseCode: '',
    courseName: '',
    section: '',
    semester: '',
  });

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await addStudent(newStudent);
      alert('Student added successfully');
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await addCourse(newCourse);
      alert('Course added successfully');
      fetchCourses();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteStudent(studentId);
      alert('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId);
      alert('Course deleted successfully');
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>

      {/* Section to Add New Student */}
      <section style={styles.section}>
        <h2>Add New Student</h2>
        <form onSubmit={handleAddStudent} style={styles.form}>
          <input
            type="text"
            placeholder="Student Number"
            value={newStudent.studentNumber}
            onChange={(e) => setNewStudent({ ...newStudent, studentNumber: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={newStudent.password}
            onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="First Name"
            value={newStudent.firstName}
            onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newStudent.lastName}
            onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Program"
            value={newStudent.program}
            onChange={(e) => setNewStudent({ ...newStudent, program: e.target.value })}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Add Student</button>
        </form>
      </section>

      {/* Section to Add New Course */}
      <section style={styles.section}>
        <h2>Add New Course</h2>
        <form onSubmit={handleAddCourse} style={styles.form}>
          <input
            type="text"
            placeholder="Course Code"
            value={newCourse.courseCode}
            onChange={(e) => setNewCourse({ ...newCourse, courseCode: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse.courseName}
            onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Section"
            value={newCourse.section}
            onChange={(e) => setNewCourse({ ...newCourse, section: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Semester"
            value={newCourse.semester}
            onChange={(e) => setNewCourse({ ...newCourse, semester: e.target.value })}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Add Course</button>
        </form>
      </section>

      {/* Section to List and Delete Students */}
      <section style={styles.section}>
        <h2>All Students</h2>
        <ul>
          {students.map((student) => (
            <li key={student._id} style={styles.listItem}>
              {student.firstName} {student.lastName} - {student.program}
              <button onClick={() => handleDeleteStudent(student._id)} style={styles.deleteButton}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Section to List and Delete Courses */}
      <section style={styles.section}>
        <h2>All Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course._id} style={styles.listItem}>
              {course.courseName} - {course.courseCode} (Section: {course.section})
              <button onClick={() => handleDeleteCourse(course._id)} style={styles.deleteButton}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

// Basic styles for the dashboard and forms
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  section: {
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
  },
  input: {
    width: '100%',
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
  listItem: {
    marginBottom: '10px',
  },
  deleteButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
