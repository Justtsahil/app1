import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DeveloperPanel.css';

const DeveloperPanel = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'developer') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'developer') {
    return null;
  }

  return (
    <div className="panel-page developer-panel">
      <div className="panel-header">
        <h1>Developer Panel</h1>
        <p>Super Admin - Full System Control</p>
      </div>

      <div className="panel-content">
        <div className="welcome-section">
          <h2>Welcome, {user.name}!</h2>
          <p>You have full access to all system features and configurations.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Admin Management</h3>
            <p>Create, modify, and delete admin accounts</p>
            <button className="feature-btn" data-testid="manage-admins-btn">Manage Admins</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Permissions Control</h3>
            <p>Configure access levels and permissions for all users</p>
            <button className="feature-btn" data-testid="manage-permissions-btn">Manage Permissions</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Page Management</h3>
            <p>Enable/disable pages and control visibility</p>
            <button className="feature-btn" data-testid="manage-pages-btn">Manage Pages</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Layout Control</h3>
            <p>Customize site layout and appearance settings</p>
            <button className="feature-btn" data-testid="layout-control-btn">Layout Settings</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Data Access</h3>
            <p>Full access to all system data and analytics</p>
            <button className="feature-btn" data-testid="data-access-btn">View Data</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📤</div>
            <h3>Export System</h3>
            <p>Export comprehensive system reports and data</p>
            <button className="feature-btn" data-testid="export-system-btn">Export Data</button>
          </div>
        </div>

        <div className="system-info">
          <h3>System Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>System Version:</strong> 1.0.0
            </div>
            <div className="info-item">
              <strong>Last Updated:</strong> 2025-01-15
            </div>
            <div className="info-item">
              <strong>Active Users:</strong> 3
            </div>
            <div className="info-item">
              <strong>Status:</strong> <span className="status-active">Active</span>
            </div>
          </div>
        </div>

        <button onClick={logout} className="logout-btn" data-testid="dev-logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default DeveloperPanel;
