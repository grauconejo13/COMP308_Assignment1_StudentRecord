import React, { useState, useEffect } from 'react';
import { getStudents, getCourses, addStudent, getStudentsByCourse } from '../services/api';

const AdminPage = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newStudent, setNewStudent] = useState({
    studentNumber: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: '',
    program: '',
    favoriteTopic: '',
    strongestSkill: '',
  });
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseStudents, setCourseStudents] = useState([]);

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
      fetchStudents();
      alert('Student added successfully!');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleSelectCourse = async (courseId) => {
    setSelectedCourse(courseId);
    try {
      const res = await getStudentsByCourse(courseId);
      setCourseStudents(res.data);
    } catch (error) {
      console.error('Error fetching students for course:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Section to List All Students */}
      <section>
        <h2>All Students</h2>
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.firstName} {student.lastName} - {student.program}
            </li>
          ))}
        </ul>
      </section>

      {/* Section to List All Courses */}
      <section>
        <h2>All Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              {course.courseName} - {course.courseCode}
              <button onClick={() => handleSelectCourse(course._id)}>
                View Students
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Section to Add a New Student */}
      <section>
        <h2>Add New Student</h2>
        <form onSubmit={handleAddStudent}>
          <input
            type="text"
            placeholder="Student Number"
            value={newStudent.studentNumber}
            onChange={(e) => setNewStudent({ ...newStudent, studentNumber: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newStudent.password}
            onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="First Name"
            value={newStudent.firstName}
            onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newStudent.lastName}
            onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={newStudent.address}
            onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={newStudent.city}
            onChange={(e) => setNewStudent({ ...newStudent, city: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={newStudent.phoneNumber}
            onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Program"
            value={newStudent.program}
            onChange={(e) => setNewStudent({ ...newStudent, program: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Favorite Topic"
            value={newStudent.favoriteTopic}
            onChange={(e) => setNewStudent({ ...newStudent, favoriteTopic: e.target.value })}
          />
          <input
            type="text"
            placeholder="Strongest Skill"
            value={newStudent.strongestSkill}
            onChange={(e) => setNewStudent({ ...newStudent, strongestSkill: e.target.value })}
          />
          <button type="submit">Add Student</button>
        </form>
      </section>

      {/* Section to List Students Enrolled in a Selected Course */}
      {selectedCourse && (
        <section>
          <h2>Students in Selected Course</h2>
          <ul>
            {courseStudents.map((student) => (
              <li key={student._id}>
                {student.firstName} {student.lastName} - {student.program}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default AdminPage;
