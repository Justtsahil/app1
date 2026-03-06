import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SettingsManagement.css';

const SettingsManagement = () => {
  const navigate = useNavigate();
  const { user, getSettings, updateSettings } = useAuth();
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    siteName: '',
    siteEmail: '',
    sitePhone: '',
    address: '',
    country: '',
    timezone: '',
    currency: '',
    language: '',
    maintenanceMode: false,
    emailNotifications: true,
    twoFactorAuth: false
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    } else {
      loadSettings();
    }
  }, [user, navigate]);

  const loadSettings = () => {
    const settingsData = getSettings();
    setSettings(settingsData);
    setFormData(settingsData);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateSettings(formData);
      setSuccessMessage('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="panel-page settings-management-page">
      <div className="panel-header settings-header">
        <h1>Settings</h1>
        <p>Configure site settings and preferences</p>
      </div>

      <div className="panel-content settings-content">
        <div className="welcome-section settings-welcome">
          <h2>Site Configuration</h2>
          <p>Manage your application settings</p>
        </div>

        {successMessage && <div className="success-message">✓ {successMessage}</div>}

        <div className="settings-container">
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="settings-section">
              <h3>General Settings</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Site Name</label>
                  <input type="text" name="siteName" value={formData.siteName} onChange={handleInputChange} placeholder="Your site name" className="form-input" />
                </div>
                <div className="form-group">
                  <label>Site Email</label>
                  <input type="email" name="siteEmail" value={formData.siteEmail} onChange={handleInputChange} placeholder="info@company.com" className="form-input" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="sitePhone" value={formData.sitePhone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" className="form-input" />
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>Location & Language</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street address" className="form-input" />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <select name="country" value={formData.country} onChange={handleInputChange} className="form-select">
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Language</label>
                  <select name="language" value={formData.language} onChange={handleInputChange} className="form-select">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>Regional Settings</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Timezone</label>
                  <select name="timezone" value={formData.timezone} onChange={handleInputChange} className="form-select">
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="CST">Central Time (CST)</option>
                    <option value="MST">Mountain Time (MST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                    <option value="GMT">GMT</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Currency</label>
                  <select name="currency" value={formData.currency} onChange={handleInputChange} className="form-select">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="AUD">AUD (A$)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>System Features</h3>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="maintenanceMode" checked={formData.maintenanceMode} onChange={handleInputChange} />
                  <span>Maintenance Mode</span>
                  <span className="checkbox-info">Restrict access to the site</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="emailNotifications" checked={formData.emailNotifications} onChange={handleInputChange} />
                  <span>Email Notifications</span>
                  <span className="checkbox-info">Send email alerts to administrators</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="twoFactorAuth" checked={formData.twoFactorAuth} onChange={handleInputChange} />
                  <span>Two-Factor Authentication</span>
                  <span className="checkbox-info">Require 2FA for admin login</span>
                </label>
              </div>
            </div>

            <div className="settings-section settings-status">
              <div className="status-card">
                <div className="status-item">
                  <span className="status-label">Last Updated:</span>
                  <span className="status-value">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Site Status:</span>
                  <span className={`status-value ${formData.maintenanceMode ? 'maintenance' : 'active'}`}>
                    {formData.maintenanceMode ? 'Maintenance Mode' : 'Active'}
                  </span>
                </div>
              </div>
            </div>

            <div className="form-actions settings-actions">
              <button type="submit" className="btn btn-primary btn-large">
                💾 Save Settings
              </button>
              <button type="button" className="btn btn-secondary btn-large" onClick={() => loadSettings()}>
                ↻ Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;
