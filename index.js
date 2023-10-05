// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import './styles.css';  // Import the styles

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
