import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Admin_management.css';

const AdminManagement = () => {
  const navigate = useNavigate();
  const { user, getAdmins, createAdmin, updateAdmin, deleteAdmin } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'developer') {
      navigate('/login');
    } else {
      loadAdmins();
    }
  }, [user, navigate]);

  const loadAdmins = () => {
    setAdmins(getAdmins());
  };

  const handleShowForm = (admin = null) => {
    if (admin) {
      setEditingId(admin.id);
      setFormData({
        name: admin.name,
        email: admin.email,
        password: '',
        confirmPassword: '',
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
    setShowForm(true);
    setErrorMessage('');
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrorMessage('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Admin name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }

    // Check if email already exists (excluding current admin if editing)
    const emailExists = admins.some(
      admin => admin.email === formData.email && admin.id !== editingId
    );
    if (emailExists) {
      setErrorMessage('This email is already in use');
      return false;
    }

    if (!editingId) {
      if (!formData.password) {
        setErrorMessage('Password is required');
        return false;
      }
      if (formData.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters');
        return false;
      }
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (editingId) {
        const updateData = {
          name: formData.name,
          email: formData.email,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        updateAdmin(editingId, updateData);
        setSuccessMessage('Admin updated successfully!');
      } else {
        createAdmin({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        setSuccessMessage('Admin created successfully!');
      }

      loadAdmins();
      handleCloseForm();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleDelete = (adminId, adminName) => {
    if (window.confirm(`Are you sure you want to delete admin "${adminName}"? This action cannot be undone.`)) {
      try {
        deleteAdmin(adminId);
        loadAdmins();
        setSuccessMessage(`Admin "${adminName}" deleted successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrorMessage('Failed to delete admin. Please try again.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch =
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || admin.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (!user || user.role !== 'developer') {
    return null;
  }

  return (
    <div className="panel-page admin-management-page">
      <div className="panel-header admin-mgmt-header">
        <h1>Admin Management</h1>
        <p>Create, modify, and manage admin accounts</p>
      </div>

      <div className="panel-content admin-mgmt-content">
        <div className="welcome-section admin-mgmt-welcome">
          <h2>Manage Administrators</h2>
          <p>Total Admins: <span className="admin-count">{admins.length}</span></p>
        </div>

        {successMessage && (
          <div className="success-message">
            ✓ {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="error-message">
            ✗ {errorMessage}
          </div>
        )}

        <div className="management-section">
          <div className="management-header">
            <button 
              className="btn btn-primary create-admin-btn"
              onClick={() => handleShowForm()}
              data-testid="create-admin-btn"
            >
              + Create New Admin
            </button>
          </div>

          <div className="filters-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="status-filter">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="admins-container">
            {filteredAdmins.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👤</div>
                <p>{searchTerm || filterStatus !== 'all' ? 'No admins match your filters.' : 'No admins created yet.'}</p>
                {!searchTerm && filterStatus === 'all' && (
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleShowForm()}
                  >
                    Create First Admin
                  </button>
                )}
              </div>
            ) : (
              <div className="admins-grid">
                {filteredAdmins.map(admin => (
                  <div key={admin.id} className="admin-card">
                    <div className="admin-card-header">
                      <div className="admin-info">
                        <h3 className="admin-name">{admin.name}</h3>
                        <p className="admin-email">{admin.email}</p>
                      </div>
                      <span className={`status-badge status-${admin.status}`}>
                        {admin.status}
                      </span>
                    </div>

                    <div className="admin-card-body">
                      <div className="info-row">
                        <span className="label">Email:</span>
                        <span className="value">{admin.email}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Created:</span>
                        <span className="value">{new Date(admin.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Admin ID:</span>
                        <span className="value admin-id">{admin.id}</span>
                      </div>
                    </div>

                    <div className="admin-card-footer">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleShowForm(admin)}
                        data-testid={`edit-admin-btn-${admin.id}`}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(admin.id, admin.name)}
                        data-testid={`delete-admin-btn-${admin.id}`}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Admin' : 'Create New Admin'}</h2>
              <button className="close-btn" onClick={handleCloseForm}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="name">Admin Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter admin name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password {editingId ? '(Leave blank to keep current)' : '*'}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  className="form-input"
                  required={!editingId}
                />
              </div>

              {formData.password && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    className="form-input"
                  />
                </div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-testid="submit-admin-form-btn"
                >
                  {editingId ? 'Update Admin' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
