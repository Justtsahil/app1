import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PageManagement.css';

const PageManagement = () => {
  const navigate = useNavigate();
  const { user, getPages, updatePage } = useAuth();
  const [pages, setPages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'developer') {
      navigate('/login');
    } else {
      loadPages();
    }
  }, [user, navigate]);

  const loadPages = () => {
    setPages(getPages());
  };

  const handleTogglePage = (pageId) => {
    const page = pages.find(p => p.id === pageId);
    if (page) {
      updatePage(pageId, { visible: !page.visible });
      loadPages();
      setSuccessMessage(`Page "${page.name}" ${!page.visible ? 'enabled' : 'disabled'} successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleTogglePublic = (pageId) => {
    const page = pages.find(p => p.id === pageId);
    if (page) {
      updatePage(pageId, { public: !page.public });
      loadPages();
      setSuccessMessage(`Page "${page.name}" access updated!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  if (!user || user.role !== 'developer') {
    return null;
  }

  const enabledCount = pages.filter(p => p.visible).length;
  const publicCount = pages.filter(p => p.public).length;

  return (
    <div className="panel-page page-management-page">
      <div className="panel-header page-mgmt-header">
        <h1>Page Management</h1>
        <p>Enable/disable pages and control visibility</p>
      </div>

      <div className="panel-content page-mgmt-content">
        <div className="welcome-section page-mgmt-welcome">
          <div className="welcome-content">
            <h2>Manage Site Pages</h2>
            <p>Total Pages: <span className="page-count">{pages.length}</span></p>
          </div>
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-number">{enabledCount}</div>
              <div className="stat-label">Enabled</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{publicCount}</div>
              <div className="stat-label">Public</div>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="success-message">
            ✓ {successMessage}
          </div>
        )}

        <div className="management-section">
          <div className="pages-container">
            {pages.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📄</div>
                <p>No pages available.</p>
              </div>
            ) : (
              <div className="pages-table-wrapper">
                <table className="pages-table">
                  <thead>
                    <tr>
                      <th>Page Name</th>
                      <th>Route</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Access</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map(page => (
                      <tr key={page.id} className={`page-row ${!page.visible ? 'disabled' : ''}`}>
                        <td className="page-name">
                          <span className="page-icon">{page.icon}</span>
                          {page.name}
                        </td>
                        <td className="page-route">{page.route}</td>
                        <td className="page-description">{page.description}</td>
                        <td className="page-status">
                          <span className={`status-indicator ${page.visible ? 'active' : 'inactive'}`}>
                            {page.visible ? '● Active' : '● Inactive'}
                          </span>
                        </td>
                        <td className="page-access">
                          <span className={`access-badge ${page.public ? 'public' : 'private'}`}>
                            {page.public ? '🌍 Public' : '🔒 Private'}
                          </span>
                        </td>
                        <td className="page-actions">
                          <button
                            className={`btn btn-toggle ${page.visible ? 'btn-disable' : 'btn-enable'}`}
                            onClick={() => handleTogglePage(page.id)}
                            title={page.visible ? 'Disable Page' : 'Enable Page'}
                          >
                            {page.visible ? '✓ Enabled' : '✗ Disabled'}
                          </button>
                          <button
                            className={`btn btn-access ${page.public ? 'btn-make-private' : 'btn-make-public'}`}
                            onClick={() => handleTogglePublic(page.id)}
                            title={page.public ? 'Make Private' : 'Make Public'}
                          >
                            {page.public ? 'Private' : 'Public'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <h3>About Page Management</h3>
          <div className="info-cards">
            <div className="info-card">
              <h4>🔍 Visibility Control</h4>
              <p>Enable or disable pages to control whether they appear in navigation and are accessible to users.</p>
            </div>
            <div className="info-card">
              <h4>🔐 Access Control</h4>
              <p>Set pages as public for all users or private for restricted access only.</p>
            </div>
            <div className="info-card">
              <h4>📊 Page Status</h4>
              <p>See at a glance which pages are active, inactive, public, or private.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageManagement;
