import React, { useState } from 'react';
import './Contact.css';
import { useData } from '../context/DataContext';

const Contact = () => {
  const { addMessage } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage(formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Get in touch with us for any queries or partnership opportunities</p>
      </section>

      <section className="contact-content">
        <div className="contact-grid">
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            {submitted && (
              <div className="success-message" data-testid="success-message">
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-testid="contact-name-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-testid="contact-email-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  data-testid="contact-phone-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  data-testid="contact-subject-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  data-testid="contact-message-input"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" data-testid="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>

          <div className="contact-info-section">
            <h2>Get in Touch</h2>
            
            <div className="info-box">
              <div className="info-icon">📧</div>
              <div className="info-details">
                <h3>Email</h3>
                <p>info@microsapindia.com</p>
                <p>support@microsapindia.com</p>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon">📞</div>
              <div className="info-details">
                <h3>Phone</h3>
                <p>+91 1234567890</p>
                <p>+91 0987654321</p>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon">🕒</div>
              <div className="info-details">
                <h3>Office Hours</h3>
                <p>Monday - Saturday</p>
                <p>9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon">📍</div>
              <div className="info-details">
                <h3>Location</h3>
                <p>Microsap India Pvt. Ltd.</p>
                <p>Industrial Area, Phase 2</p>
                <p>New Delhi, India - 110020</p>
              </div>
            </div>
          </div>
        </div>

        <div className="map-section">
          <h2>Find Us</h2>
          <div className="map-container">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0292396434747!2d77.20910431508037!3d28.627981082421644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd371d1c1a6f%3A0x3d64f2e8d6b6c6b6!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1622000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '10px' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
