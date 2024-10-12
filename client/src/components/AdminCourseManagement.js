import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [studentsInCourse, setStudentsInCourse] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    // Fetch all courses
    useEffect(() => {
        const fetchCourses = async() => {
            try {
                const { data } = await axios.get('/api/courses');
                setCourses(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCourses();
    }, []);

    // Fetch students in a selected course
    const handleViewStudents = async(courseId) => {
        try {
            const { data } = await axios.get(`/api/courses/${courseId}/students`);
            setStudentsInCourse(data.students);
            setSelectedCourseId(courseId);
        } catch (err) {
            console.error(err);
        }
    };

    return (
    <div>
      <h2>Admin Course Management</h2>

      <h3>All Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.courseCode} - {course.courseName} (Section: {course.section})
            <button onClick={() => handleViewStudents(course._id)}>View Students</button>
          </li>
        ))}
      </ul>

      {selectedCourseId && (
        <div>
          <h3>Students Enrolled in Course</h3>
          <ul>
            {studentsInCourse.map((student) => (
              <li key={student._id}>
                {student.firstName} {student.lastName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminCourseManagement;