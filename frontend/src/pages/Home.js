import React, { useState, useEffect } from 'react';
import './Home.css';
import { useData } from '../context/DataContext';

const Home = () => {
  const { products } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(products.length, 5));
    }, 4000);
    return () => clearInterval(timer);
  }, [products.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.min(products.length, 5));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.min(products.length, 5)) % Math.min(products.length, 5));
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Excellence in Pharmaceutical Distribution</h1>
          <p className="hero-subtitle">Trusted partner for healthcare solutions across India</p>
          <p className="hero-description">
            Leading distributor and marketing company bringing quality medicines from certified manufacturers to healthcare providers nationwide.
          </p>
          <div className="hero-buttons">
            <a href="/products" className="btn-primary">Explore Products</a>
            <a href="/contact" className="btn-secondary">Partner With Us</a>
          </div>
        </div>
      </section>

      <section className="slideshow-section">
        <h2 className="section-title">Our Product Range</h2>
        <div className="slideshow-container">
          <button className="slide-btn prev" onClick={prevSlide}>❮</button>
          
          <div className="slide-content">
            {products.slice(0, 5).map((product, index) => (
              <div
                key={product.id}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
                style={{ display: index === currentSlide ? 'flex' : 'none' }}
              >
                <div className="slide-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="slide-info">
                  <h3>{product.name}</h3>
                  <p className="slide-category">{product.category}</p>
                  <p className="slide-composition">{product.composition}</p>
                  <p className="slide-manufacturer">Manufactured by: {product.manufacturer}</p>
                  <p className="slide-marketed">Marketed & Distributed by: Microsap India</p>
                  <a href="/products" className="slide-link">View All Products</a>
                </div>
              </div>
            ))}
          </div>
          
          <button className="slide-btn next" onClick={nextSlide}>❯</button>
        </div>
        
        <div className="slide-indicators">
          {products.slice(0, 5).map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="about-snippet">
        <div className="about-content">
          <h2>Who We Are</h2>
          <p>
            Microsap India is a premier pharmaceutical distribution and marketing company committed to 
            delivering quality healthcare solutions. We partner with certified third-party manufacturers 
            to bring a comprehensive range of medicines to healthcare providers across India.
          </p>
          <p>
            Our extensive distribution network and strong marketing capabilities ensure that quality 
            medicines reach every corner of the country, making healthcare accessible to all.
          </p>
          <a href="/about" className="learn-more-btn">Learn More About Us</a>
        </div>
      </section>

      <section className="franchise-section">
        <div className="franchise-content">
          <h2>Franchise Partnership Opportunities</h2>
          <div className="franchise-grid">
            <div className="franchise-card">
              <div className="franchise-icon">🎯</div>
              <h3>Exclusive Territory</h3>
              <p>Get exclusive rights to distribute our products in your region</p>
            </div>
            <div className="franchise-card">
              <div className="franchise-icon">📈</div>
              <h3>Marketing Support</h3>
              <p>Comprehensive marketing and promotional support from our team</p>
            </div>
            <div className="franchise-card">
              <div className="franchise-icon">💼</div>
              <h3>Business Training</h3>
              <p>Complete training and ongoing support for your success</p>
            </div>
            <div className="franchise-card">
              <div className="franchise-icon">🤝</div>
              <h3>Trusted Partnership</h3>
              <p>Join a network of successful franchise partners across India</p>
            </div>
          </div>
          <div className="franchise-cta">
            <h3>Interested in becoming a franchise partner?</h3>
            <p>Contact us today to explore partnership opportunities</p>
            <a href="/contact" className="btn-primary">Get in Touch</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
