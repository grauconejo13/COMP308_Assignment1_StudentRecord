import React, { useState, useEffect } from 'react';
import { getCourses, addCourseToStudent, updateStudentCourseSection, dropCourseForStudent } from '../services/api';

const StudentPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [newSection, setNewSection] = useState('');

  // Assuming the student's ID is retrieved from local storage or passed as a prop
  const studentId = localStorage.getItem('studentId'); // Placeholder; adjust based on your auth method

  useEffect(() => {
    fetchCourses();
    fetchEnrolledCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchEnrolledCourses = async () => {
    // Replace this with a function that fetches the student's enrolled courses
    // For simplicity, we're assuming enrolled courses come with a different API endpoint
    try {
      const res = await getEnrolledCourses(studentId); // Replace with actual function
      setEnrolledCourses(res.data);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  const handleEnrollCourse = async () => {
    try {
      await addCourseToStudent(studentId, selectedCourseId);
      alert('Enrolled in course successfully');
      fetchEnrolledCourses();
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const handleUpdateCourseSection = async (courseId) => {
    try {
      await updateStudentCourseSection(studentId, courseId, newSection);
      alert('Course section updated successfully');
      fetchEnrolledCourses();
    } catch (error) {
      console.error('Error updating course section:', error);
    }
  };

  const handleDropCourse = async (courseId) => {
    try {
      await dropCourseForStudent(studentId, courseId);
      alert('Dropped course successfully');
      fetchEnrolledCourses();
    } catch (error) {
      console.error('Error dropping course:', error);
    }
  };

  return (
    <div>
      <h1>Student Dashboard</h1>

      {/* Section to List Available Courses */}
      <section>
        <h2>Available Courses</h2>
        <select onChange={(e) => setSelectedCourseId(e.target.value)}>
          <option value="">Select a course to enroll</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseName} - {course.courseCode} ({course.section})
            </option>
          ))}
        </select>
        <button onClick={handleEnrollCourse} disabled={!selectedCourseId}>
          Enroll in
