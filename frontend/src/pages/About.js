import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const leadership = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      title: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      bio: 'With over 25 years of experience in pharmaceutical distribution, Dr. Kumar founded Microsap India with a vision to make quality healthcare accessible to all. His leadership has transformed the company into one of India\'s leading pharmaceutical distributors.',
      achievements: ['MBA in Healthcare Management', 'Former Director at Major Pharma Corp', 'Healthcare Innovation Award 2020']
    },
    {
      id: 2,
      name: 'Ms. Priya Sharma',
      title: 'Chief Operating Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: 'Ms. Sharma oversees all operations and ensures seamless distribution across our network. Her expertise in supply chain management has been instrumental in our growth.',
      achievements: ['Supply Chain Excellence Award', '15+ years in Operations', 'MBA in Operations Management']
    },
    {
      id: 3,
      name: 'Dr. Amit Verma',
      title: 'Head of Quality Assurance',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Dr. Verma ensures that all products meet the highest quality standards. His rigorous quality control processes guarantee safety and efficacy.',
      achievements: ['PhD in Pharmaceutical Sciences', 'ISO Quality Certification Expert', '20+ years in QA']
    },
    {
      id: 4,
      name: 'Mr. Suresh Patel',
      title: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      bio: 'Leading our marketing initiatives, Mr. Patel has expanded our reach to healthcare providers across India with innovative marketing strategies.',
      achievements: ['Marketing Excellence Award', 'Digital Marketing Pioneer', '18+ years in Pharma Marketing']
    }
  ];

  const timeline = [
    { year: '2010', event: 'Company Founded', desc: 'Microsap India established with a vision to revolutionize pharmaceutical distribution' },
    { year: '2013', event: 'Network Expansion', desc: 'Extended distribution network to 10 states across India' },
    { year: '2016', event: 'Quality Certification', desc: 'Achieved ISO certification for quality management' },
    { year: '2019', event: 'Franchise Launch', desc: 'Launched successful franchise partnership program' },
    { year: '2022', event: 'Digital Transformation', desc: 'Implemented advanced digital systems for inventory and distribution' },
    { year: '2025', event: 'Pan-India Presence', desc: 'Operating in all major states with 500+ franchise partners' }
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Microsap India</h1>
          <p>Excellence in Pharmaceutical Distribution & Marketing Since 2010</p>
        </div>
      </section>

      <section className="company-intro">
        <div className="intro-content">
          <h2>Who We Are</h2>
          <p>
            Microsap India is a leading pharmaceutical distribution and marketing company dedicated to 
            bringing quality healthcare solutions to every corner of India. We work with certified 
            third-party manufacturers to ensure the highest standards of quality and safety.
          </p>
          <p>
            Our role is to bridge the gap between pharmaceutical manufacturers and healthcare providers 
            through efficient distribution and strategic marketing. We do not manufacture medicines; 
            instead, we partner with established, certified manufacturers to distribute their products 
            under our trusted brand.
          </p>
        </div>
      </section>

      <section className="what-we-do">
        <h2>What We Do</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">📦</div>
            <h3>Distribution</h3>
            <p>Comprehensive distribution network ensuring timely delivery of medicines across India. Our state-of-the-art logistics ensure products reach healthcare providers efficiently.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">📢</div>
            <h3>Marketing</h3>
            <p>Strategic marketing initiatives to promote quality pharmaceutical products. We create awareness and build trust among healthcare professionals and patients.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🤝</div>
            <h3>Franchise Partnerships</h3>
            <p>Empowering entrepreneurs through our franchise model. We provide complete support, training, and marketing assistance to our franchise partners.</p>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <h2>Our Journey</h2>
        <div className="timeline">
          {timeline.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <h3>{item.event}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="vision-section">
        <div className="vision-content">
          <div className="vision-box">
            <h2>Our Vision</h2>
            <p>
              To become India's most trusted pharmaceutical distribution partner, ensuring quality 
              healthcare reaches every individual, regardless of their location.
            </p>
          </div>
          <div className="vision-box">
            <h2>Our Philosophy</h2>
            <p>
              Quality, Integrity, and Accessibility are at the core of everything we do. We believe 
              in transparent practices, ethical business conduct, and customer-first approach.
            </p>
          </div>
        </div>
      </section>

      <section className="leadership-section">
        <h2>Leadership Team</h2>
        <div className="leadership-grid">
          {leadership.map((person) => (
            <div key={person.id} className="leader-card" onClick={() => setSelectedPerson(person)}>
              <img src={person.image} alt={person.name} />
              <h3>{person.name}</h3>
              <p className="leader-title">{person.title}</p>
              <button className="view-profile-btn">View Profile</button>
            </div>
          ))}
        </div>
      </section>

      <section className="media-section">
        <h2>Our Team & Facilities</h2>
        <div className="media-grid">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600" alt="Team Meeting" />
          <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600" alt="Distribution Center" />
          <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600" alt="Office Space" />
          <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600" alt="Warehouse" />
        </div>
        <div className="video-placeholder">
          <div className="video-icon">▶</div>
          <p>Company Introduction Video</p>
          <small>(Coming Soon)</small>
        </div>
      </section>

      {selectedPerson && (
        <div className="modal-overlay" onClick={() => setSelectedPerson(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPerson(null)}>✕</button>
            <div className="modal-body">
              <img src={selectedPerson.image} alt={selectedPerson.name} />
              <h2>{selectedPerson.name}</h2>
              <p className="modal-title">{selectedPerson.title}</p>
              <p className="modal-bio">{selectedPerson.bio}</p>
              <div className="modal-achievements">
                <h4>Key Achievements</h4>
                <ul>
                  {selectedPerson.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
