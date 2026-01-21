import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Microsap India</h3>
          <p>Leading pharmaceutical distributor and marketing company providing quality healthcare solutions across India.</p>
          <p className="footer-note">Medicines manufactured by certified third-party manufacturers.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: info@microsapindia.com</p>
          <p>Phone: +91 1234567890</p>
          <p>Hours: Mon-Sat, 9 AM - 6 PM</p>
        </div>
        
        <div className="footer-section">
          <h4>Location</h4>
          <p>Microsap India Pvt. Ltd.</p>
          <p>Industrial Area, Phase 2</p>
          <p>New Delhi, India - 110020</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Microsap India. All rights reserved. | Marketed & Distributed by Microsap India</p>
      </div>
    </footer>
  );
};

export default Footer;
