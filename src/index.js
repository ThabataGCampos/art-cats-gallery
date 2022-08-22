import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Gallery from './components/Gallery/Gallery';
import Header from './components/Navbar/Header';
import Footer from './components/Navbar/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <Gallery/>
    <Footer/>
  </React.StrictMode>
);


