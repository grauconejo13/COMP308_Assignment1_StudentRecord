import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: Global styles
import App from './App';  // Import the main App component

// Render the App component into the root element in the HTML
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // This 'root' corresponds to the div in public/index.html
);
