import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProductManagement.css';

const ProductManagement = () => {
  const navigate = useNavigate();
  const { user, getProducts, createProduct, updateProduct, deleteProduct } = useAuth();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
    status: 'active'
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const categories = ['Electronics', 'Clothing', 'Food', 'Home', 'Sports', 'Books'];

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    } else {
      loadProducts();
    }
  }, [user, navigate]);

  const loadProducts = () => {
    setProducts(getProducts());
  };

  const handleShowForm = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        image: product.image,
        status: product.status
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: '',
        status: 'active'
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
      price: '',
      category: '',
      stock: '',
      image: '',
      status: 'active'
    });
    setErrorMessage('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Product name is required');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setErrorMessage('Valid price is required');
      return false;
    }
    if (!formData.category) {
      setErrorMessage('Category is required');
      return false;
    }
    if (formData.stock === '' || parseInt(formData.stock) < 0) {
      setErrorMessage('Stock quantity must be 0 or greater');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingId) {
        updateProduct(editingId, formData);
        setSuccessMessage('Product updated successfully!');
      } else {
        createProduct(formData);
        setSuccessMessage('Product created successfully!');
      }
      loadProducts();
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

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Delete product "${productName}"?`)) {
      try {
        deleteProduct(productId);
        loadProducts();
        setSuccessMessage(`Product deleted successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrorMessage('Failed to delete product.');
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="panel-page product-management-page">
      <div className="panel-header product-header">
        <h1>Product Management</h1>
        <p>Manage your product inventory and catalog</p>
      </div>

      <div className="panel-content product-content">
        <div className="welcome-section product-welcome">
          <h2>Products</h2>
          <p>Total Products: <span className="product-count">{products.length}</span></p>
        </div>

        {successMessage && <div className="success-message">✓ {successMessage}</div>}
        {errorMessage && <div className="error-message">✗ {errorMessage}</div>}

        <div className="management-section">
          <div className="management-header">
            <button className="btn btn-primary" onClick={() => handleShowForm()} data-testid="create-product-btn">
              + Add Product
            </button>
          </div>

          <div className="filters-section">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
              <option value="all">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="products-container">
            {filteredProducts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>No products found.</p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <div className="image-placeholder">{product.image || '📦'}</div>
                      <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                        Stock: {product.stock}
                      </span>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="description">{product.description.substring(0, 60)}...</p>
                      <div className="product-meta">
                        <span className="category">{product.category}</span>
                        <span className="price">${parseFloat(product.price).toFixed(2)}</span>
                      </div>
                      <div className="product-actions">
                        <button className="btn btn-edit" onClick={() => handleShowForm(product)}>✏️ Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(product.id, product.name)}>🗑️ Delete</button>
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
              <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="close-btn" onClick={handleCloseForm}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label>Product Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter product name" className="form-input" required />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter product description" className="form-textarea" rows="3" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="0.00" step="0.01" min="0" className="form-input" required />
                </div>
                <div className="form-group">
                  <label>Stock *</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} placeholder="0" min="0" className="form-input" required />
                </div>
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="form-select" required>
                  <option value="">Select category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
