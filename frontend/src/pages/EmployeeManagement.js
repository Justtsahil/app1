import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const { user, getEmployees, createEmployee, updateEmployee, deleteEmployee } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    status: 'active'
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const departments = ['Sales', 'Marketing', 'Engineering', 'HR', 'Finance', 'Operations'];
  const positions = ['Manager', 'Senior', 'Junior', 'Intern', 'Lead', 'Specialist'];

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    } else {
      loadEmployees();
    }
  }, [user, navigate]);

  const loadEmployees = () => {
    setEmployees(getEmployees());
  };

  const handleShowForm = (employee = null) => {
    if (employee) {
      setEditingId(employee.id);
      setFormData({
        name: employee.name,
        email: employee.email,
        position: employee.position,
        department: employee.department,
        phone: employee.phone,
        status: employee.status
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        email: '',
        position: '',
        department: '',
        phone: '',
        status: 'active'
      });
    }
    setShowForm(true);
    setErrorMessage('');
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      name: '',
      email: '',
      position: '',
      department: '',
      phone: '',
      status: 'active'
    });
    setErrorMessage('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Employee name is required');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage('Valid email is required');
      return false;
    }
    if (!formData.position) {
      setErrorMessage('Position is required');
      return false;
    }
    if (!formData.department) {
      setErrorMessage('Department is required');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingId) {
        updateEmployee(editingId, formData);
        setSuccessMessage('Employee updated!');
      } else {
        createEmployee(formData);
        setSuccessMessage('Employee created!');
      }
      loadEmployees();
      handleCloseForm();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('An error occurred.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = (employeeId, name) => {
    if (window.confirm(`Remove employee "${name}"?`)) {
      try {
        deleteEmployee(employeeId);
        loadEmployees();
        setSuccessMessage('Employee removed!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrorMessage('Failed to delete.');
      }
    }
  };

  const filteredEmployees = employees.filter(emp =>
    filterStatus === 'all' || emp.status === filterStatus
  );

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="panel-page employee-management-page">
      <div className="panel-header employee-header">
        <h1>Employee Management</h1>
        <p>Manage your employee database and information</p>
      </div>

      <div className="panel-content employee-content">
        <div className="welcome-section employee-welcome">
          <h2>Employees</h2>
          <p>Total Employees: <span className="employee-count">{employees.length}</span></p>
        </div>

        {successMessage && <div className="success-message">✓ {successMessage}</div>}
        {errorMessage && <div className="error-message">✗ {errorMessage}</div>}

        <div className="management-section">
          <div className="management-header">
            <button className="btn btn-primary" onClick={() => handleShowForm()}>
              + Add Employee
            </button>
          </div>

          <div className="status-filter">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on-leave">On Leave</option>
            </select>
          </div>

          <div className="employees-container">
            {filteredEmployees.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <p>No employees found.</p>
              </div>
            ) : (
              <div className="employees-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Position</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map(emp => (
                      <tr key={emp.id}>
                        <td><strong>{emp.name}</strong></td>
                        <td>{emp.email}</td>
                        <td>{emp.position}</td>
                        <td>{emp.department}</td>
                        <td>
                          <span className={`status-badge status-${emp.status}`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="action-buttons">
                          <button className="btn btn-small btn-edit" onClick={() => handleShowForm(emp)}>✏️</button>
                          <button className="btn btn-small btn-danger" onClick={() => handleDelete(emp.id, emp.name)}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Employee' : 'Add New Employee'}</h2>
              <button className="close-btn" onClick={handleCloseForm}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="employee-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Employee name" className="form-input" required />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="employee@company.com" className="form-input" required />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" className="form-input" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Position *</label>
                  <select name="position" value={formData.position} onChange={handleInputChange} className="form-select" required>
                    <option value="">Select position</option>
                    {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Department *</label>
                  <select name="department" value={formData.department} onChange={handleInputChange} className="form-select" required>
                    <option value="">Select department</option>
                    {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="form-select">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Employee' : 'Add Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
