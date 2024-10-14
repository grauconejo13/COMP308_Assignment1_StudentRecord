import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const login = (credentials) => {
  return API.post('/auth/login', credentials);  // Replace '/auth/login' with your actual login endpoint
};

// Get all students with error handling
export const getStudents = async () => {
  try {
    const response = await API.get('/students');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};

// Get all courses with error handling
export const getCourses = async () => {
  try {
    const response = await API.get('/courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};

// Add a new student with error handling
export const addStudent = async (studentData) => {
  try {
    const response = await API.post('/students', studentData);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
  }
};

// Add a new course with error handling
export const addCourse = async (courseData) => {
  try {
    const response = await API.post('/courses', courseData);
    return response.data;
  } catch (error) {
    console.error('Error adding course:', error);
  }
};

// Delete a student by ID with error handling
export const deleteStudent = async (studentId) => {
  try {
    const response = await API.delete(`/students/${studentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting student with ID ${studentId}:`, error);
  }
};

// Delete a course by ID with error handling
export const deleteCourse = async (courseId) => {
  try {
    const response = await API.delete(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting course with ID ${courseId}:`, error);
  }
};


