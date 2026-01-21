import React, { useState } from 'react';
import './Gallery.css';
import { useData } from '../context/DataContext';

const Gallery = () => {
  const { gallery } = useData();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <h1>Gallery</h1>
        <p>A glimpse into our facilities, team, and operations</p>
      </section>

      <section className="gallery-content">
        <div className="gallery-grid">
          {gallery.map(item => (
            <div 
              key={item.id} 
              className="gallery-item"
              onClick={() => setSelectedImage(item)}
              data-testid={`gallery-item-${item.id}`}
            >
              <img src={item.url} alt={item.caption} />
              <div className="gallery-overlay">
                <p>{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content gallery-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)} data-testid="close-gallery-modal">✕</button>
            <img src={selectedImage.url} alt={selectedImage.caption} />
            <p className="image-caption">{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
