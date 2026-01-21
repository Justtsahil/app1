import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import * as XLSX from 'xlsx';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { entries, messages, updateEntry } = useData();
  const [activeTab, setActiveTab] = useState('entries');
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleApprove = (entryId) => {
    updateEntry(entryId, { status: 'approved' });
    setSelectedEntry(null);
  };

  const handleReject = (entryId) => {
    updateEntry(entryId, { status: 'rejected' });
    setSelectedEntry(null);
  };

  const exportToExcel = () => {
    const approvedEntries = entries.filter(e => e.status === 'approved');
    const worksheet = XLSX.utils.json_to_sheet(approvedEntries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employee Data');
    XLSX.writeFile(workbook, `microsap_report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="panel-page admin-panel">
      <div className="panel-header admin-header">
        <h1>Admin Panel</h1>
        <p>Content Management & Oversight</p>
      </div>

      <div className="panel-content">
        <div className="welcome-section admin-welcome">
          <h2>Welcome, {user.name}!</h2>
          <p>Manage content, approve employee entries, and oversee operations.</p>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'entries' ? 'active' : ''}`}
              onClick={() => setActiveTab('entries')}
              data-testid="entries-tab"
            >
              Employee Entries ({entries.filter(e => e.status === 'pending').length} Pending)
            </button>
            <button
              className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
              data-testid="messages-tab"
            >
              Messages ({messages.length})
            </button>
            <button
              className={`tab ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
              data-testid="content-tab"
            >
              Content Management
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'entries' && (
              <div className="entries-section">
                <div className="section-header">
                  <h3>Employee Daily Entries</h3>
                  <button onClick={exportToExcel} className="export-btn" data-testid="export-excel-btn">
                    Export to Excel
                  </button>
                </div>

                {entries.length === 0 ? (
                  <div className="empty-state">
                    <p>No employee entries yet.</p>
                  </div>
                ) : (
                  <div className="entries-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Employee</th>
                          <th>Attendance</th>
                          <th>Doctors Met</th>
                          <th>Sales</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.map(entry => (
                          <tr key={entry.id}>
                            <td>{new Date(entry.date).toLocaleDateString()}</td>
                            <td>{entry.employeeName}</td>
                            <td>{entry.attendance}</td>
                            <td>{entry.doctorsMet}</td>
                            <td>₹{entry.sales}</td>
                            <td>
                              <span className={`status-badge status-${entry.status}`}>
                                {entry.status}
                              </span>
                            </td>
                            <td>
                              <button
                                onClick={() => setSelectedEntry(entry)}
                                className="action-btn view-btn"
                                data-testid={`view-entry-${entry.id}`}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="messages-section">
                <h3>Contact Messages</h3>
                {messages.length === 0 ? (
                  <div className="empty-state">
                    <p>No messages yet.</p>
                  </div>
                ) : (
                  <div className="messages-list">
                    {messages.map(msg => (
                      <div key={msg.id} className="message-card" data-testid={`message-${msg.id}`}>
                        <div className="message-header">
                          <strong>{msg.name}</strong>
                          <span className="message-date">{new Date(msg.date).toLocaleDateString()}</span>
                        </div>
                        <div className="message-meta">
                          <p>Email: {msg.email}</p>
                          {msg.phone && <p>Phone: {msg.phone}</p>}
                          <p><strong>Subject:</strong> {msg.subject}</p>
                        </div>
                        <div className="message-body">
                          <p>{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'content' && (
              <div className="content-section">
                <h3>Content Management</h3>
                <div className="content-options">
                  <div className="content-card">
                    <h4>Products</h4>
                    <p>Manage product listings and information</p>
                    <button className="content-btn" data-testid="manage-products-btn">Manage Products</button>
                  </div>
                  <div className="content-card">
                    <h4>Gallery</h4>
                    <p>Update gallery images and captions</p>
                    <button className="content-btn" data-testid="manage-gallery-btn">Manage Gallery</button>
                  </div>
                  <div className="content-card">
                    <h4>Employees</h4>
                    <p>Manage employee accounts and targets</p>
                    <button className="content-btn" data-testid="manage-employees-btn">Manage Employees</button>
                  </div>
                  <div className="content-card">
                    <h4>Settings</h4>
                    <p>Configure site settings and preferences</p>
                    <button className="content-btn" data-testid="site-settings-btn">Site Settings</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button onClick={logout} className="logout-btn" data-testid="admin-logout-btn">Logout</button>
      </div>

      {selectedEntry && (
        <div className="modal-overlay" onClick={() => setSelectedEntry(null)}>
          <div className="modal-content entry-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedEntry(null)}>✕</button>
            <div className="modal-body">
              <h2>Entry Details</h2>
              <div className="entry-details">
                <div className="detail-row">
                  <strong>Date:</strong>
                  <span>{new Date(selectedEntry.date).toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <strong>Employee:</strong>
                  <span>{selectedEntry.employeeName}</span>
                </div>
                <div className="detail-row">
                  <strong>Attendance:</strong>
                  <span>{selectedEntry.attendance}</span>
                </div>
                <div className="detail-row">
                  <strong>Doctors Met:</strong>
                  <span>{selectedEntry.doctorsMet}</span>
                </div>
                <div className="detail-row">
                  <strong>Products Discussed:</strong>
                  <span>{selectedEntry.productsDiscussed}</span>
                </div>
                <div className="detail-row">
                  <strong>Sales:</strong>
                  <span>₹{selectedEntry.sales}</span>
                </div>
                <div className="detail-row">
                  <strong>Payments Received:</strong>
                  <span>₹{selectedEntry.payments}</span>
                </div>
                <div className="detail-row">
                  <strong>Remarks:</strong>
                  <span>{selectedEntry.remarks || 'None'}</span>
                </div>
                <div className="detail-row">
                  <strong>Status:</strong>
                  <span className={`status-badge status-${selectedEntry.status}`}>
                    {selectedEntry.status}
                  </span>
                </div>
              </div>
              
              {selectedEntry.status === 'pending' && (
                <div className="entry-actions">
                  <button
                    onClick={() => handleApprove(selectedEntry.id)}
                    className="approve-btn"
                    data-testid="approve-entry-btn"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedEntry.id)}
                    className="reject-btn"
                    data-testid="reject-entry-btn"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
