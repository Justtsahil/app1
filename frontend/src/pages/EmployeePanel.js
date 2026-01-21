import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import './EmployeePanel.css';

const EmployeePanel = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { entries, addEntry } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    attendance: 'Present',
    doctorsMet: '',
    productsDiscussed: '',
    sales: '',
    payments: '',
    remarks: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'employee') {
      navigate('/login');
    }
  }, [user, navigate]);

  const myEntries = entries.filter(e => e.employeeId === user?.id);
  const todayEntry = myEntries.find(e => 
    new Date(e.date).toDateString() === new Date().toDateString()
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEntry({
      ...formData,
      employeeId: user.id,
      employeeName: user.name,
      date: new Date().toISOString(),
      status: 'pending'
    });
    setFormData({
      attendance: 'Present',
      doctorsMet: '',
      productsDiscussed: '',
      sales: '',
      payments: '',
      remarks: ''
    });
    setShowForm(false);
  };

  const approvedEntries = myEntries.filter(e => e.status === 'approved');
  const thisMonth = new Date().getMonth();
  const thisMonthEntries = approvedEntries.filter(e => 
    new Date(e.date).getMonth() === thisMonth
  );

  const monthlyStats = {
    totalDoctors: thisMonthEntries.reduce((sum, e) => sum + parseInt(e.doctorsMet || 0), 0),
    totalSales: thisMonthEntries.reduce((sum, e) => sum + parseFloat(e.sales || 0), 0),
    totalPayments: thisMonthEntries.reduce((sum, e) => sum + parseFloat(e.payments || 0), 0),
    daysWorked: thisMonthEntries.filter(e => e.attendance === 'Present').length
  };

  if (!user || user.role !== 'employee') {
    return null;
  }

  return (
    <div className="panel-page employee-panel">
      <div className="panel-header employee-header">
        <h1>Employee Panel</h1>
        <p>Daily Entry & Performance Tracking</p>
      </div>

      <div className="panel-content">
        <div className="welcome-section employee-welcome">
          <h2>Welcome, {user.name}!</h2>
          <p>Track your daily activities and monitor your performance.</p>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <p className="stat-label">Today's Status</p>
              <p className="stat-value">{todayEntry ? 'Submitted' : 'Pending'}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-info">
              <p className="stat-label">Doctors This Month</p>
              <p className="stat-value">{monthlyStats.totalDoctors}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <p className="stat-label">Sales This Month</p>
              <p className="stat-value">₹{monthlyStats.totalSales.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <p className="stat-label">Days Worked</p>
              <p className="stat-value">{monthlyStats.daysWorked}</p>
            </div>
          </div>
        </div>

        <div className="entry-section">
          <div className="section-header">
            <h3>Daily Entry</h3>
            {!todayEntry && !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="add-entry-btn"
                data-testid="add-entry-btn"
              >
                Add Today's Entry
              </button>
            )}
          </div>

          {todayEntry && (
            <div className="today-entry-card">
              <p><strong>Today's entry has been submitted!</strong></p>
              <p>Status: <span className={`status-badge status-${todayEntry.status}`}>{todayEntry.status}</span></p>
              <p>Awaiting admin approval.</p>
            </div>
          )}

          {showForm && (
            <form onSubmit={handleSubmit} className="entry-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="attendance">Attendance *</label>
                  <select
                    id="attendance"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    data-testid="attendance-select"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="doctorsMet">Doctors Met Today *</label>
                  <input
                    type="number"
                    id="doctorsMet"
                    name="doctorsMet"
                    value={formData.doctorsMet}
                    onChange={handleChange}
                    required
                    min="0"
                    data-testid="doctors-met-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productsDiscussed">Products Discussed *</label>
                <input
                  type="text"
                  id="productsDiscussed"
                  name="productsDiscussed"
                  value={formData.productsDiscussed}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Azithromycin, Paracetamol"
                  data-testid="products-discussed-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="sales">Sales Done Today (₹) *</label>
                  <input
                    type="number"
                    id="sales"
                    name="sales"
                    value={formData.sales}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    data-testid="sales-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="payments">Payments Received (₹) *</label>
                  <input
                    type="number"
                    id="payments"
                    name="payments"
                    value={formData.payments}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    data-testid="payments-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="remarks">Remarks</label>
                <textarea
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Any additional notes..."
                  data-testid="remarks-input"
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn" data-testid="submit-entry-btn">
                  Submit Entry
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="cancel-btn"
                  data-testid="cancel-entry-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="history-section">
          <h3>My Entry History</h3>
          {myEntries.length === 0 ? (
            <div className="empty-state">
              <p>No entries yet. Add your first daily entry!</p>
            </div>
          ) : (
            <div className="history-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Attendance</th>
                    <th>Doctors</th>
                    <th>Sales</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myEntries.sort((a, b) => new Date(b.date) - new Date(a.date)).map(entry => (
                    <tr key={entry.id}>
                      <td>{new Date(entry.date).toLocaleDateString()}</td>
                      <td>{entry.attendance}</td>
                      <td>{entry.doctorsMet}</td>
                      <td>₹{entry.sales}</td>
                      <td>
                        <span className={`status-badge status-${entry.status}`}>
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="targets-section">
          <h3>Monthly Targets</h3>
          <div className="target-info">
            <p>Targets are set by Admin</p>
            <div className="target-card">
              <p><strong>Doctor Visits Target:</strong> 100 (Current: {monthlyStats.totalDoctors})</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${Math.min((monthlyStats.totalDoctors / 100) * 100, 100)}%` }}></div>
              </div>
            </div>
            <div className="target-card">
              <p><strong>Sales Target:</strong> ₹50,000 (Current: ₹{monthlyStats.totalSales.toLocaleString()})</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${Math.min((monthlyStats.totalSales / 50000) * 100, 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="incentive-section">
          <h3>Incentive Notes (Optional)</h3>
          <div className="incentive-info">
            <p>Incentive details and calculations are managed by Admin</p>
            <input
              type="text"
              placeholder="Incentive notes (if any)"
              className="incentive-input"
              readOnly
              data-testid="incentive-notes-input"
            />
          </div>
        </div>

        <button onClick={logout} className="logout-btn" data-testid="employee-logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default EmployeePanel;
