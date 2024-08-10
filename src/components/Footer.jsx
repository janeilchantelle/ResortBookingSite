import React from 'react';
import '../styles/Footer.css'; // Make sure to create a corresponding CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <p>33 Coal Reef Drive</p>
          <p>Malé, Maldives</p>
          <p>info@islandserenity.com</p>
          <p>1-800-333-1111</p>
        </div>
        
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/facebook-icon.png" alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/twitter-icon.png" alt="Twitter" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/instagram-icon.png" alt="Instagram" />
            </a>
          </div>
        </div>
        
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Island Serenity Resort. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
