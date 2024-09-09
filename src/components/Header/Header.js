import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import './Header.css';

const Header = () => (
  <header className="header">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul>
        <li><Link to="/">Home</Link></li>
        {/* <li><Link to="/about">About</Link></li> */}
        <li><Link to="/passage-mcq">Multiple Choice</Link></li>
        <li><Link to="/passage-table">Table Completion</Link></li>
        <li><Link to="/passage-matching">Matching Headings</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
