import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ExportSystem.css';

const ExportSystem = () => {
  const navigate = useNavigate();
  const { user, getExports } = useAuth();
  const [exports, setExports] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState(['csv']);
  const [successMessage, setSuccessMessage] = useState('');
  const [exportData, setExportData] = useState(null);

  const exportOptions = [
    { id: 'users', label: 'User Data', icon: '👥', description: 'Export all user information and profiles' },
    { id: 'content', label: 'Content Data', icon: '📄', description: 'Export all entries and content' },
    { id: 'analytics', label: 'Analytics', icon: '📊', description: 'Export system analytics and reports' },
    { id: 'permissions', label: 'Permissions', icon: '🔐', description: 'Export permission configurations' },
    { id: 'audit', label: 'Audit Logs', icon: '📋', description: 'Export system audit trail' },
    { id: 'system', label: 'System Config', icon: '⚙️', description: 'Export system configuration' }
  ];

  const fileFormats = [
    { id: 'csv', label: 'CSV (.csv)', icon: '📄' },
    { id: 'json', label: 'JSON (.json)', icon: '{}' },
    { id: 'excel', label: 'Excel (.xlsx)', icon: '📊' },
    { id: 'pdf', label: 'PDF (.pdf)', icon: '📃' }
  ];

  useEffect(() => {
    if (!user || user.role !== 'developer') {
      navigate('/login');
    } else {
      loadExports();
    }
  }, [user, navigate]);

  const loadExports = () => {
    setExports(getExports());
  };

  const handleFormatToggle = (format) => {
    setSelectedFormats(prev =>
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const handleExport = (exportType) => {
    if (selectedFormats.length === 0) {
      alert('Please select at least one file format');
      return;
    }

    // Simulate export
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${exportType}_export_${timestamp}`;

    selectedFormats.forEach(format => {
      console.log(`Exporting ${exportType} as ${format}: ${filename}.${format}`);
    });

    setExportData(exportType);
    setSuccessMessage(`Successfully exported ${exportType} in ${selectedFormats.join(', ')} format(s)!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (!user || user.role !== 'developer') {
    return null;
  }

  return (
    <div className="panel-page export-system-page">
      <div className="panel-header export-header">
        <h1>Export System</h1>
        <p>Export comprehensive system reports and data</p>
      </div>

      <div className="panel-content export-content">
        <div className="welcome-section export-welcome">
          <h2>Data Export Center</h2>
          <p>Generate and download system reports in your preferred format</p>
        </div>

        {successMessage && (
          <div className="success-message">
            ✓ {successMessage}
          </div>
        )}

        <div className="export-section">
          <div className="format-selector">
            <h3>Select Export Format</h3>
            <div className="format-options">
              {fileFormats.map(format => (
                <label key={format.id} className="format-label">
                  <input
                    type="checkbox"
                    checked={selectedFormats.includes(format.id)}
                    onChange={() => handleFormatToggle(format.id)}
                  />
                  <span className="format-icon">{format.icon}</span>
                  <span className="format-name">{format.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="export-grid">
            {exportOptions.map(option => (
              <div key={option.id} className="export-card">
                <div className="export-card-header">
                  <span className="export-icon">{option.icon}</span>
                  <h3 className="export-title">{option.label}</h3>
                </div>
                <p className="export-description">{option.description}</p>
                <button
                  className="btn btn-export"
                  onClick={() => handleExport(option.id)}
                >
                  <span className="btn-icon">📥</span>
                  Export Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="export-history">
          <h3>Recent Exports</h3>
          {exports.length === 0 ? (
            <div className="empty-history">
              <p>No exports yet. Start by selecting a data type above.</p>
            </div>
          ) : (
            <div className="history-table">
              <table>
                <thead>
                  <tr>
                    <th>Export Type</th>
                    <th>Format</th>
                    <th>Size</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exports.map((exp, idx) => (
                    <tr key={idx}>
                      <td className="export-type">{exp.type}</td>
                      <td className="export-format">{exp.format.toUpperCase()}</td>
                      <td className="export-size">{exp.size}</td>
                      <td className="export-date">{exp.date}</td>
                      <td className="export-status">
                        <span className={`status-badge status-${exp.status}`}>
                          {exp.status}
                        </span>
                      </td>
                      <td className="export-actions">
                        <button className="btn btn-small btn-download">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="export-info">
          <h3>Export Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">🔒</span>
              <h4>Secure Export</h4>
              <p>All exported data is encrypted and secure. Download links expire after 24 hours.</p>
            </div>
            <div className="info-item">
              <span className="info-icon">📦</span>
              <h4>Multiple Formats</h4>
              <p>Choose from CSV, JSON, Excel, or PDF formats. Download multiple formats at once.</p>
            </div>
            <div className="info-item">
              <span className="info-icon">📋</span>
              <h4>Complete Data</h4>
              <p>Exports include all relevant data including metadata, timestamps, and audit trails.</p>
            </div>
            <div className="info-item">
              <span className="info-icon">⚡</span>
              <h4>Fast Processing</h4>
              <p>Large exports are processed quickly. You'll receive a download link via email.</p>
            </div>
          </div>
        </div>

        <div className="export-guidelines">
          <h3>Export Guidelines</h3>
          <ul>
            <li>Exports include data from the last 12 months by default</li>
            <li>All timestamps are in UTC timezone</li>
            <li>Sensitive information is redacted based on your privacy settings</li>
            <li>Downloaded files should be stored securely</li>
            <li>For large exports, processing may take a few minutes</li>
            <li>You can schedule recurring exports for regular reporting</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExportSystem;
