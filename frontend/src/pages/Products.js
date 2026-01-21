import React, { useState } from 'react';
import './Products.css';
import { useData } from '../context/DataContext';

const Products = () => {
  const { products } = useData();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.composition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">
      <section className="products-hero">
        <h1>Our Product Range</h1>
        <p>Quality medicines from certified manufacturers, marketed & distributed by Microsap India</p>
      </section>

      <section className="products-content">
        <div className="search-filter-section">
          <input
            type="text"
            placeholder="Search by name, category, or composition..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="product-search-input"
          />
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${categoryFilter === category ? 'active' : ''}`}
                onClick={() => setCategoryFilter(category)}
                data-testid={`category-filter-${category.toLowerCase()}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => setSelectedProduct(product)}
              data-testid={`product-card-${product.id}`}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-composition">{product.composition}</p>
                <button className="view-details-btn" data-testid={`view-details-${product.id}`}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found matching your search criteria.</p>
          </div>
        )}

        <div className="enquiry-section">
          <h2>Product Enquiry</h2>
          <p>For bulk orders or specific product information, please contact us:</p>
          <div className="enquiry-info">
            <p><strong>Email:</strong> products@microsapindia.com</p>
            <p><strong>Phone:</strong> +91 1234567890</p>
          </div>
          <a href="/contact" className="enquiry-btn" data-testid="enquiry-form-btn">Send Enquiry</a>
        </div>
      </section>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)} data-testid="close-modal-btn">✕</button>
            <div className="modal-body">
              <div className="modal-product-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-product-details">
                <h2>{selectedProduct.name}</h2>
                <p className="modal-category">{selectedProduct.category}</p>
                
                <div className="detail-row">
                  <strong>Composition:</strong>
                  <span>{selectedProduct.composition}</span>
                </div>
                
                <div className="detail-row">
                  <strong>Dosage:</strong>
                  <span>{selectedProduct.dosage}</span>
                </div>
                
                <div className="detail-row">
                  <strong>Packaging:</strong>
                  <span>{selectedProduct.packaging}</span>
                </div>
                
                <div className="detail-row">
                  <strong>Shelf Life:</strong>
                  <span>{selectedProduct.shelfLife}</span>
                </div>
                
                <div className="detail-row">
                  <strong>Storage:</strong>
                  <span>{selectedProduct.storage}</span>
                </div>
                
                <div className="manufacturer-info">
                  <p><strong>Manufactured by:</strong> {selectedProduct.manufacturer}</p>
                  <p className="marketed-by"><strong>Marketed & Distributed by:</strong> Microsap India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
