import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(formData.email, formData.password);
    
    if (result.success) {
      navigate(`/${result.role}`);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Login to access your panel</p>
        </div>

        {error && <div className="error-message" data-testid="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              data-testid="login-email-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              data-testid="login-password-input"
            />
          </div>

          <button type="submit" className="login-btn" data-testid="login-submit-btn">
            Login
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Developer: dev@microsap.com / dev123</p>
          <p>Admin: admin@microsap.com / admin123</p>
          <p>Employee: emp@microsap.com / emp123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
