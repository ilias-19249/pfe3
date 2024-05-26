import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import './footer.css';

const Footer = () => {
  useEffect(() => {
    const contactSpans = document.querySelectorAll('.contact-info span');
    
    contactSpans.forEach(span => {
      span.addEventListener('mousedown', function() {
        this.style.color = '#00CC76';
      });

      span.addEventListener('mouseup', function() {
        this.style.color = '';
      });
    });

  
    return () => {
      contactSpans.forEach(span => {
        span.removeEventListener('mousedown', function() {
          this.style.color = '#00CC76';
        });

        span.removeEventListener('mouseup', function() {
          this.style.color = ''; 
        });
      });
    };
  }, []); 

  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">Home</a>
        <a href="#">Parcours Generale</a>
        <a href="">About Us</a>
        <a href="#">Services</a>
        <a href="#">Statistique</a>
        <a href="#">Contact</a>
        <a href="#">Faq</a>
        {/* <a href="#">Commander <FontAwesomeIcon icon={faShoppingCart} /></a> */}
      </div>
      <div className="social-icons">
        <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
      </div>
      <div className="contact-info">
        <div className="email-info">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>contact@agritrace.com</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faPhoneAlt} />
          <span>+1234567890</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
