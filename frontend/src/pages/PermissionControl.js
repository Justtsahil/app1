import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PermissionControl.css';

const PermissionControl = () => {
  const navigate = useNavigate();
  const { user, getPermissions, createPermission, updatePermission, deletePermission } = useAuth();
  const [permissions, setPermissions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    resource: '',
    actions: [],
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const availableResources = ['users', 'content', 'analytics', 'settings', 'admins', 'reports'];
  const availableActions = ['create', 'read', 'update', 'delete', 'export', 'import'];

  useEffect(() => {
    if (!user || user.role !== 'developer') {
      navigate('/login');
    } else {
      loadPermissions();
    }
  }, [user, navigate]);

  const loadPermissions = () => {
    setPermissions(getPermissions());
  };

  const handleShowForm = (permission = null) => {
    if (permission) {
      setEditingId(permission.id);
      setFormData({
        name: permission.name,
        description: permission.description,
        resource: permission.resource,
        actions: permission.actions,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        resource: '',
        actions: [],
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
      description: '',
      resource: '',
      actions: [],
    });
    setErrorMessage('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Permission name is required');
      return false;
    }
    if (!formData.resource) {
      setErrorMessage('Resource is required');
      return false;
    }
    if (formData.actions.length === 0) {
      setErrorMessage('At least one action must be selected');
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
        updatePermission(editingId, formData);
        setSuccessMessage('Permission updated successfully!');
      } else {
        createPermission(formData);
        setSuccessMessage('Permission created successfully!');
      }

      loadPermissions();
      handleCloseForm();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleActionToggle = (action) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.includes(action)
        ? prev.actions.filter(a => a !== action)
        : [...prev.actions, action]
    }));
  };

  const handleDelete = (permissionId, permissionName) => {
    if (window.confirm(`Are you sure you want to delete permission "${permissionName}"?`)) {
      try {
        deletePermission(permissionId);
        loadPermissions();
        setSuccessMessage(`Permission "${permissionName}" deleted successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrorMessage('Failed to delete permission. Please try again.');
      }
    }
  };

  if (!user || user.role !== 'developer') {
    return null;
  }

  return (
    <div className="panel-page permission-control-page">
      <div className="panel-header permission-header">
        <h1>Permission Control</h1>
        <p>Configure access levels and permissions for all users</p>
      </div>

      <div className="panel-content permission-content">
        <div className="welcome-section permission-welcome">
          <h2>Manage System Permissions</h2>
          <p>Total Permissions: <span className="permission-count">{permissions.length}</span></p>
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
              className="btn btn-primary create-permission-btn"
              onClick={() => handleShowForm()}
              data-testid="create-permission-btn"
            >
              + Add Permission
            </button>
          </div>

          <div className="permissions-container">
            {permissions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔐</div>
                <p>No permissions configured yet.</p>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleShowForm()}
                >
                  Create First Permission
                </button>
              </div>
            ) : (
              <div className="permissions-grid">
                {permissions.map(permission => (
                  <div key={permission.id} className="permission-card">
                    <div className="permission-card-header">
                      <h3 className="permission-name">{permission.name}</h3>
                      <span className="resource-badge">{permission.resource}</span>
                    </div>

                    <div className="permission-card-body">
                      {permission.description && (
                        <p className="permission-description">{permission.description}</p>
                      )}
                      <div className="actions-section">
                        <span className="actions-label">Actions:</span>
                        <div className="actions-list">
                          {permission.actions.map(action => (
                            <span key={action} className="action-tag">{action}</span>
                          ))}
                        </div>
                      </div>
                      <div className="info-row">
                        <span className="label">ID:</span>
                        <span className="value permission-id">{permission.id}</span>
                      </div>
                    </div>

                    <div className="permission-card-footer">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleShowForm(permission)}
                        data-testid={`edit-permission-btn-${permission.id}`}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(permission.id, permission.name)}
                        data-testid={`delete-permission-btn-${permission.id}`}
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
              <h2>{editingId ? 'Edit Permission' : 'Add New Permission'}</h2>
              <button className="close-btn" onClick={handleCloseForm}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="permission-form">
              <div className="form-group">
                <label htmlFor="name">Permission Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Edit Content"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe this permission..."
                  className="form-textarea"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="resource">Resource *</label>
                <select
                  id="resource"
                  name="resource"
                  value={formData.resource}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a resource</option>
                  {availableResources.map(resource => (
                    <option key={resource} value={resource}>
                      {resource.charAt(0).toUpperCase() + resource.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Actions *</label>
                <div className="actions-checkbox-group">
                  {availableActions.map(action => (
                    <label key={action} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.actions.includes(action)}
                        onChange={() => handleActionToggle(action)}
                      />
                      <span>{action.charAt(0).toUpperCase() + action.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>

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
                  data-testid="submit-permission-form-btn"
                >
                  {editingId ? 'Update Permission' : 'Create Permission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionControl;
