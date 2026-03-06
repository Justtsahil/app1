import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DataAccess.css';

const DataAccess = () => {
  const navigate = useNavigate();
  const { user, getAnalytics } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (!user || user.role !== 'developer') {
      navigate('/login');
    } else {
      loadAnalytics();
    }
  }, [user, navigate]);

  const loadAnalytics = () => {
    setAnalytics(getAnalytics());
  };

  if (!user || user.role !== 'developer') {
    return null;
  }

  const categories = [
    { id: 'all', label: 'All Data', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'content', label: 'Content', icon: '📄' },
    { id: 'activities', label: 'Activities', icon: '⚡' },
    { id: 'system', label: 'System', icon: '⚙️' }
  ];

  return (
    <div className="panel-page data-access-page">
      <div className="panel-header data-access-header">
        <h1>Data Access</h1>
        <p>Full access to all system data and analytics</p>
      </div>

      <div className="panel-content data-access-content">
        <div className="welcome-section data-access-welcome">
          <h2>System Analytics & Data</h2>
          <p>Real-time insights into your application</p>
        </div>

        <div className="data-section">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          <div className="analytics-cards">
            <div className="card-group">
              <h3>User Statistics</h3>
              <div className="cards-row">
                <div className="stat-card stat-card-primary">
                  <div className="card-icon">👥</div>
                  <div className="card-content">
                    <div className="card-label">Total Users</div>
                    <div className="card-value">{analytics?.users || 0}</div>
                  </div>
                </div>
                <div className="stat-card stat-card-secondary">
                  <div className="card-icon">👤</div>
                  <div className="card-content">
                    <div className="card-label">Active Users</div>
                    <div className="card-value">{analytics?.activeUsers || 0}</div>
                  </div>
                </div>
                <div className="stat-card stat-card-tertiary">
                  <div className="card-icon">🆕</div>
                  <div className="card-content">
                    <div className="card-label">New This Month</div>
                    <div className="card-value">{analytics?.newUsersMonth || 0}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-group">
              <h3>Content Metrics</h3>
              <div className="cards-row">
                <div className="stat-card stat-card-info">
                  <div className="card-icon">📄</div>
                  <div className="card-content">
                    <div className="card-label">Total Entries</div>
                    <div className="card-value">{analytics?.totalEntries || 0}</div>
                  </div>
                </div>
                <div className="stat-card stat-card-success">
                  <div className="card-icon">✅</div>
                  <div className="card-content">
                    <div className="card-label">Approved</div>
                    <div className="card-value">{analytics?.approvedEntries || 0}</div>
                  </div>
                </div>
                <div className="stat-card stat-card-warning">
                  <div className="card-icon">⏳</div>
                  <div className="card-content">
                    <div className="card-label">Pending Review</div>
                    <div className="card-value">{analytics?.pendingEntries || 0}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-group">
              <h3>System Performance</h3>
              <div className="cards-row">
                <div className="stat-card stat-card-performance">
                  <div className="card-icon">⚡</div>
                  <div className="card-content">
                    <div className="card-label">Response Time</div>
                    <div className="card-value">{analytics?.responseTime || '0'}ms</div>
                  </div>
                </div>
                <div className="stat-card stat-card-uptime">
                  <div className="card-icon">🟢</div>
                  <div className="card-content">
                    <div className="card-label">Uptime</div>
                    <div className="card-value">{analytics?.uptime || '100'}%</div>
                  </div>
                </div>
                <div className="stat-card stat-card-requests">
                  <div className="card-icon">📡</div>
                  <div className="card-content">
                    <div className="card-label">Requests/Hour</div>
                    <div className="card-value">{analytics?.requestsPerHour || 0}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-group">
              <h3>Activity Summary</h3>
              <div className="summary-table">
                <table>
                  <thead>
                    <tr>
                      <th>Activity Type</th>
                      <th>Count</th>
                      <th>Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>User Logins</td>
                      <td className="value-cell">{analytics?.userLogins || 0}</td>
                      <td>{new Date().toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td>Content Created</td>
                      <td className="value-cell">{analytics?.contentCreated || 0}</td>
                      <td>{new Date().toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td>Content Updated</td>
                      <td className="value-cell">{analytics?.contentUpdated || 0}</td>
                      <td>{new Date().toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td>Data Exports</td>
                      <td className="value-cell">{analytics?.dataExports || 0}</td>
                      <td>{new Date().toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td>System Errors</td>
                      <td className="value-cell error">{analytics?.systemErrors || 0}</td>
                      <td>{new Date().toLocaleDateString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="data-info-box">
            <h3>📊 Data Information</h3>
            <p>This dashboard provides real-time access to system analytics and data. Metrics are updated automatically and reflect the current state of your application. Use this information to monitor system health, track user engagement, and identify trends.</p>
            <div className="info-features">
              <div className="feature">
                <span className="feature-icon">🔄</span>
                <span>Real-time Updates</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔒</span>
                <span>Secure Access</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📈</span>
                <span>Trend Analysis</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⚙️</span>
                <span>System Health</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAccess;
