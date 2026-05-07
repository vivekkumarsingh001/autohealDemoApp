// src/components/TextboxDemo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './TextboxDemo.css';

const TextboxDemo = () => {
  return (
    <div className="textbox-demo-container">
      <div className="textbox-demo-wrapper">
        <div className="textbox-sidebar">
          <div className="sidebar-section">
            <h3>CATEGORIES</h3>
            <ul className="sidebar-list">
              <li><Link to="/category/books">Books</Link></li>
              <li><Link to="/category/computers">Computers</Link></li>
              <li><Link to="/category/electronics">Electronics</Link></li>
              <li><Link to="/category/apparel">Apparel & Shoes</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="textbox-form-container">
          <h2 className="textbox-title">Textbox Demo</h2>
          <p className="textbox-description">This page is under construction. Coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default TextboxDemo;