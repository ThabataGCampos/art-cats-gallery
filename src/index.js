import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Gallery from './Gallery';
import Header from './components/Navbar/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <Gallery/>
  </React.StrictMode>
);


