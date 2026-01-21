import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const initialProducts = [
  {
    id: 'prod001',
    name: 'Azithromycin 500mg',
    category: 'Antibiotic',
    composition: 'Azithromycin 500mg',
    dosage: '1 tablet once daily',
    packaging: '10 tablets per strip',
    shelfLife: '24 months',
    storage: 'Store at room temperature',
    manufacturer: 'Certified Third-Party Manufacturer',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'
  },
  {
    id: 'prod002',
    name: 'Paracetamol 650mg',
    category: 'Analgesic',
    composition: 'Paracetamol 650mg',
    dosage: '1-2 tablets every 6 hours',
    packaging: '15 tablets per strip',
    shelfLife: '36 months',
    storage: 'Store in cool, dry place',
    manufacturer: 'Certified Third-Party Manufacturer',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400'
  },
  {
    id: 'prod003',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotic',
    composition: 'Amoxicillin Trihydrate 250mg',
    dosage: '1 capsule 3 times daily',
    packaging: '10 capsules per strip',
    shelfLife: '24 months',
    storage: 'Store below 25°C',
    manufacturer: 'Certified Third-Party Manufacturer',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400'
  },
  {
    id: 'prod004',
    name: 'Omeprazole 20mg',
    category: 'Antacid',
    composition: 'Omeprazole 20mg',
    dosage: '1 capsule before breakfast',
    packaging: '10 capsules per strip',
    shelfLife: '24 months',
    storage: 'Store in cool, dry place',
    manufacturer: 'Certified Third-Party Manufacturer',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400'
  },
  {
    id: 'prod005',
    name: 'Metformin 500mg',
    category: 'Antidiabetic',
    composition: 'Metformin Hydrochloride 500mg',
    dosage: '1 tablet twice daily with meals',
    packaging: '15 tablets per strip',
    shelfLife: '36 months',
    storage: 'Store at room temperature',
    manufacturer: 'Certified Third-Party Manufacturer',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400'
  },
  {
    id: 'prod006',
    name: 'Cetirizine 10mg',
    category: 'Antihistamine',
    composition: 'Cetirizine Dihydrochloride 10mg',
    dosage: '1 tablet once daily',
    packaging: '10 tablets per strip',
    shelfLife: '24 months',
    storage: 'Store below 30°C',
    manufacturer: 'Certified Third-Party Manufacturer',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'
  },
  {
    id: 'prod007',
    name: 'Ibuprofen 400mg',
    category: 'Anti-inflammatory',
    composition: 'Ibuprofen 400mg',
    dosage: '1 tablet 2-3 times daily',
    packaging: '10 tablets per strip',
    shelfLife: '36 months',
    storage: 'Store in cool, dry place',
    manufacturer: 'Certified Third-Party Manufacturer',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400'
  },
  {
    id: 'prod008',
    name: 'Atorvastatin 10mg',
    category: 'Lipid Lowering',
    composition: 'Atorvastatin Calcium 10mg',
    dosage: '1 tablet once daily at bedtime',
    packaging: '10 tablets per strip',
    shelfLife: '24 months',
    storage: 'Store below 25°C',
    manufacturer: 'Certified Third-Party Manufacturer',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400'
  }
];

const initialGallery = [
  { id: 'gal001', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600', caption: 'Our Distribution Center' },
  { id: 'gal002', url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600', caption: 'Quality Control Lab' },
  { id: 'gal003', url: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600', caption: 'Team Meeting' },
  { id: 'gal004', url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600', caption: 'Product Range' },
  { id: 'gal005', url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600', caption: 'Packaging Unit' },
  { id: 'gal006', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600', caption: 'Storage Facility' }
];

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [entries, setEntries] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('microsap_products');
    const storedGallery = localStorage.getItem('microsap_gallery');
    const storedEmployees = localStorage.getItem('microsap_employees');
    const storedEntries = localStorage.getItem('microsap_entries');
    const storedMessages = localStorage.getItem('microsap_messages');

    setProducts(storedProducts ? JSON.parse(storedProducts) : initialProducts);
    setGallery(storedGallery ? JSON.parse(storedGallery) : initialGallery);
    setEmployees(storedEmployees ? JSON.parse(storedEmployees) : []);
    setEntries(storedEntries ? JSON.parse(storedEntries) : []);
    setMessages(storedMessages ? JSON.parse(storedMessages) : []);
  }, []);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('microsap_products', JSON.stringify(newProducts));
  };

  const saveGallery = (newGallery) => {
    setGallery(newGallery);
    localStorage.setItem('microsap_gallery', JSON.stringify(newGallery));
  };

  const saveEmployees = (newEmployees) => {
    setEmployees(newEmployees);
    localStorage.setItem('microsap_employees', JSON.stringify(newEmployees));
  };

  const saveEntries = (newEntries) => {
    setEntries(newEntries);
    localStorage.setItem('microsap_entries', JSON.stringify(newEntries));
  };

  const saveMessages = (newMessages) => {
    setMessages(newMessages);
    localStorage.setItem('microsap_messages', JSON.stringify(newMessages));
  };

  const addEntry = (entry) => {
    const newEntries = [...entries, { ...entry, id: Date.now().toString() }];
    saveEntries(newEntries);
  };

  const updateEntry = (id, updates) => {
    const newEntries = entries.map(e => e.id === id ? { ...e, ...updates } : e);
    saveEntries(newEntries);
  };

  const addMessage = (message) => {
    const newMessages = [...messages, { ...message, id: Date.now().toString(), date: new Date().toISOString() }];
    saveMessages(newMessages);
  };

  return (
    <DataContext.Provider value={{
      products,
      gallery,
      employees,
      entries,
      messages,
      saveProducts,
      saveGallery,
      saveEmployees,
      addEntry,
      updateEntry,
      addMessage
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
