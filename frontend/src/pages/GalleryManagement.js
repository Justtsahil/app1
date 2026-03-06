import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './GalleryManagement.css';

const GalleryManagement = () => {
  const navigate = useNavigate();
  const { user, getGalleries, createGallery, updateGallery, deleteGallery } = useAuth();
  const [galleries, setGalleries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    tags: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    } else {
      loadGalleries();
    }
  }, [user, navigate]);

  const loadGalleries = () => {
    setGalleries(getGalleries());
  };

  const handleShowForm = (gallery = null) => {
    if (gallery) {
      setEditingId(gallery.id);
      setFormData({
        title: gallery.title,
        description: gallery.description,
        category: gallery.category,
        image: gallery.image,
        tags: gallery.tags.join(', ')
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        image: '',
        tags: ''
      });
    }
    setShowForm(true);
    setErrorMessage('');
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      title: '',
      description: '',
      category: '',
      image: '',
      tags: ''
    });
    setErrorMessage('');
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setErrorMessage('Title is required');
      return false;
    }
    if (!formData.category) {
      setErrorMessage('Category is required');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const data = { ...formData, tags };
      
      if (editingId) {
        updateGallery(editingId, data);
        setSuccessMessage('Gallery item updated!');
      } else {
        createGallery(data);
        setSuccessMessage('Gallery item created!');
      }
      loadGalleries();
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

  const handleDelete = (galleryId, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      try {
        deleteGallery(galleryId);
        loadGalleries();
        setSuccessMessage('Gallery item deleted!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrorMessage('Failed to delete.');
      }
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="panel-page gallery-management-page">
      <div className="panel-header gallery-header">
        <h1>Gallery Management</h1>
        <p>Manage your gallery images and media</p>
      </div>

      <div className="panel-content gallery-content">
        <div className="welcome-section gallery-welcome">
          <h2>Gallery Images</h2>
          <p>Total Items: <span className="gallery-count">{galleries.length}</span></p>
        </div>

        {successMessage && <div className="success-message">✓ {successMessage}</div>}
        {errorMessage && <div className="error-message">✗ {errorMessage}</div>}

        <div className="management-section">
          <div className="management-header">
            <button className="btn btn-primary" onClick={() => handleShowForm()} data-testid="create-gallery-btn">
              + Add Image
            </button>
          </div>

          <div className="galleries-container">
            {galleries.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🖼️</div>
                <p>No gallery items yet.</p>
              </div>
            ) : (
              <div className="galleries-grid">
                {galleries.map(gallery => (
                  <div key={gallery.id} className="gallery-card">
                    <div className="gallery-image">
                      <div className="image-placeholder">{gallery.image || '🖼️'}</div>
                    </div>
                    <div className="gallery-info">
                      <h3>{gallery.title}</h3>
                      <p className="description">{gallery.description}</p>
                      <span className="category-tag">{gallery.category}</span>
                      {gallery.tags && gallery.tags.length > 0 && (
                        <div className="tags">
                          {gallery.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="gallery-actions">
                        <button className="btn btn-edit" onClick={() => handleShowForm(gallery)}>✏️ Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(gallery.id, gallery.title)}>🗑️ Delete</button>
                      </div>
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
              <h2>{editingId ? 'Edit Gallery Item' : 'Add Gallery Item'}</h2>
              <button className="close-btn" onClick={handleCloseForm}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="gallery-form">
              <div className="form-group">
                <label>Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Image title" className="form-input" required />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Image description" className="form-textarea" rows="3" />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="form-select" required>
                  <option value="">Select category</option>
                  <option value="landscape">Landscape</option>
                  <option value="portrait">Portrait</option>
                  <option value="abstract">Abstract</option>
                  <option value="people">People</option>
                  <option value="nature">Nature</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Image (emoji)</label>
                <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="e.g., 🌄, 🌅, etc." className="form-input" />
              </div>

              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="tag1, tag2, tag3" className="form-input" />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update' : 'Add Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
