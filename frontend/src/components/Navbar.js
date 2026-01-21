import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">MICROSAP INDIA</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          {user ? (
            <>
              <Link to={`/${user.role}`} className="nav-link nav-link-special">
                {user.role === 'developer' ? 'Developer Panel' : 
                 user.role === 'admin' ? 'Admin Panel' : 'My Panel'}
              </Link>
              <button onClick={logout} className="nav-link nav-btn">Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-link nav-link-login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
