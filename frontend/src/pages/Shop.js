import React from 'react';
import './Shop.css';

const Shop = () => {
  return (
    <div className="shop-page">
      <div className="shop-content">
        <div className="construction-icon">🚧</div>
        <h1>Under Maintenance</h1>
        <p>Our online shop is currently being upgraded to serve you better.</p>
        <p className="coming-soon">Coming Soon!</p>
        <div className="contact-alternative">
          <p>For immediate product orders, please contact us:</p>
          <a href="/contact" className="contact-btn" data-testid="shop-contact-btn">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default Shop;
