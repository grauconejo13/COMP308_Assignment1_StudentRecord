import axios from 'axios';

/*const API = axios.create({ baseURL: '/api' });

export const getCourses = () => API.get('/courses');
export const addCourseToStudent = (studentId, courseId) => API.put(`/students/${studentId}/courses/${courseId}`);
export const updateStudentCourseSection = (studentId, courseId, newSection) =>
  API.put(`/students/${studentId}/courses/${courseId}/section`, { section: newSection });
export const dropCourseForStudent = (studentId, courseId) => API.delete(`/students/${studentId}/courses/${courseId}`);

export const login = (credentials) => API.post('/auth/login', credentials);*/


//-----------------------------------------------------------------

import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const getStudents = () => API.get('/students');
export const getCourses = () => API.get('/courses');
export const addStudent = (studentData) => API.post('/students', studentData);
export const addCourse = (courseData) => API.post('/courses', courseData);
export const deleteStudent = (studentId) => API.delete(`/students/${studentId}`);
export const deleteCourse = (courseId) => API.delete(`/courses/${courseId}`);

//----------------------------------------------------------------------------