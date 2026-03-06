import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([
    { id: 'admin_001', email: 'admin@microsap.com', password: 'admin123', name: 'Admin User', createdAt: '2025-01-15', status: 'active' }
  ]);
  const [permissions, setPermissions] = useState([
    { id: 'perm_001', name: 'View Content', description: 'Permission to view all content', resource: 'content', actions: ['read'] },
    { id: 'perm_002', name: 'Edit Content', description: 'Permission to edit content', resource: 'content', actions: ['read', 'update'] }
  ]);
  const [pages, setPages] = useState([
    { id: 'page_001', name: 'Home', route: '/', description: 'Landing page', icon: '🏠', visible: true, public: true },
    { id: 'page_002', name: 'About', route: '/about', description: 'About us page', icon: 'ℹ️', visible: true, public: true },
    { id: 'page_003', name: 'Products', route: '/products', description: 'Products showcase', icon: '📦', visible: true, public: true },
    { id: 'page_004', name: 'Gallery', route: '/gallery', description: 'Image gallery', icon: '🖼️', visible: true, public: true },
    { id: 'page_005', name: 'Contact', route: '/contact', description: 'Contact us form', icon: '📧', visible: true, public: true },
    { id: 'page_006', name: 'Shop', route: '/shop', description: 'Online store', icon: '🛍️', visible: true, public: true },
    { id: 'page_007', name: 'Admin Panel', route: '/admin', description: 'Admin management', icon: '👨‍💼', visible: true, public: false },
    { id: 'page_008', name: 'Employee Panel', route: '/employee', description: 'Employee dashboard', icon: '👨‍💼', visible: true, public: false }
  ]);
  const [exports, setExports] = useState([
    { type: 'users', format: 'csv', size: '2.4 MB', date: '2025-03-01', status: 'completed' },
    { type: 'analytics', format: 'json', size: '1.8 MB', date: '2025-02-28', status: 'completed' }
  ]);
  const [products, setProducts] = useState([
    { id: 'prod_001', name: 'Premium Package', description: 'Annual subscription', price: 299.99, category: 'subscription', stock: 100 },
    { id: 'prod_002', name: 'Enterprise Plan', description: 'For large organizations', price: 999.99, category: 'enterprise', stock: 50 }
  ]);
  const [galleries, setGalleries] = useState([
    { id: 'gal_001', title: 'Summer Collection', description: 'Beautiful summer photos', category: 'landscape', tags: ['summer', 'landscape', 'nature'], image: '🏞️' },
    { id: 'gal_002', title: 'Portrait Session', description: 'Professional portraits', category: 'portrait', tags: ['portrait', 'people', 'professional'], image: '👤' }
  ]);
  const [employees, setEmployees] = useState([
    { id: 'emp_001', name: 'John Smith', email: 'john@microsap.com', position: 'Manager', department: 'Sales', status: 'active' },
    { id: 'emp_002', name: 'Sarah Johnson', email: 'sarah@microsap.com', position: 'Senior', department: 'Engineering', status: 'active' }
  ]);
  const [settings, setSettings] = useState({
    siteName: 'MicroSAP',
    siteEmail: 'info@microsap.com',
    sitePhone: '+1 (555) 123-4567',
    address: '123 Business Ave, Tech City',
    country: 'United States',
    language: 'English',
    timezone: 'UTC-5',
    currency: 'USD',
    maintenanceMode: false,
    emailNotifications: true,
    twoFactorAuth: true
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('microsap_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedAdmins = localStorage.getItem('microsap_admins');
    if (storedAdmins) {
      setAdmins(JSON.parse(storedAdmins));
    }
    const storedPermissions = localStorage.getItem('microsap_permissions');
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    }
    const storedPages = localStorage.getItem('microsap_pages');
    if (storedPages) {
      setPages(JSON.parse(storedPages));
    }
    const storedProducts = localStorage.getItem('microsap_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
    const storedGalleries = localStorage.getItem('microsap_galleries');
    if (storedGalleries) {
      setGalleries(JSON.parse(storedGalleries));
    }
    const storedEmployees = localStorage.getItem('microsap_employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
    const storedSettings = localStorage.getItem('microsap_settings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const defaultUsers = [
      { email: 'dev@microsap.com', password: 'dev123', role: 'developer', name: 'Super Admin', id: 'dev_001' },
      { email: 'emp@microsap.com', password: 'emp123', role: 'employee', name: 'Employee User', id: 'emp001' }
    ];

    // Check admins list
    const foundAdmin = admins.find(a => a.email === email && a.password === password);
    if (foundAdmin) {
      const userData = { ...foundAdmin, role: 'admin' };
      delete userData.password;
      setUser(userData);
      localStorage.setItem('microsap_user', JSON.stringify(userData));
      return { success: true, role: 'admin' };
    }

    // Check default users
    const foundUser = defaultUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password;
      setUser(userData);
      localStorage.setItem('microsap_user', JSON.stringify(userData));
      return { success: true, role: foundUser.role };
    }
    
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('microsap_user');
  };

  const createAdmin = (adminData) => {
    const newAdmin = {
      id: `admin_${Date.now()}`,
      ...adminData,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    const updatedAdmins = [...admins, newAdmin];
    setAdmins(updatedAdmins);
    localStorage.setItem('microsap_admins', JSON.stringify(updatedAdmins));
    return newAdmin;
  };

  const updateAdmin = (adminId, adminData) => {
    const updatedAdmins = admins.map(admin =>
      admin.id === adminId ? { ...admin, ...adminData } : admin
    );
    setAdmins(updatedAdmins);
    localStorage.setItem('microsap_admins', JSON.stringify(updatedAdmins));
  };

  const deleteAdmin = (adminId) => {
    const updatedAdmins = admins.filter(admin => admin.id !== adminId);
    setAdmins(updatedAdmins);
    localStorage.setItem('microsap_admins', JSON.stringify(updatedAdmins));
  };

  const getAdmins = () => admins;

  const createPermission = (permissionData) => {
    const newPermission = {
      id: `perm_${Date.now()}`,
      ...permissionData
    };
    const updatedPermissions = [...permissions, newPermission];
    setPermissions(updatedPermissions);
    localStorage.setItem('microsap_permissions', JSON.stringify(updatedPermissions));
    return newPermission;
  };

  const updatePermission = (permissionId, permissionData) => {
    const updatedPermissions = permissions.map(permission =>
      permission.id === permissionId ? { ...permission, ...permissionData } : permission
    );
    setPermissions(updatedPermissions);
    localStorage.setItem('microsap_permissions', JSON.stringify(updatedPermissions));
  };

  const deletePermission = (permissionId) => {
    const updatedPermissions = permissions.filter(permission => permission.id !== permissionId);
    setPermissions(updatedPermissions);
    localStorage.setItem('microsap_permissions', JSON.stringify(updatedPermissions));
  };

  const getPermissions = () => permissions;

  const updatePage = (pageId, pageData) => {
    const updatedPages = pages.map(page =>
      page.id === pageId ? { ...page, ...pageData } : page
    );
    setPages(updatedPages);
    localStorage.setItem('microsap_pages', JSON.stringify(updatedPages));
  };

  const getPages = () => pages;

  const getAnalytics = () => ({
    users: 156,
    activeUsers: 89,
    newUsersMonth: 23,
    totalEntries: 342,
    approvedEntries: 298,
    pendingEntries: 44,
    responseTime: 245,
    uptime: 99.8,
    requestsPerHour: 2847,
    userLogins: 156,
    contentCreated: 23,
    contentUpdated: 47,
    dataExports: 12,
    systemErrors: 2
  });

  const getExports = () => exports;

  // Product Management
  const createProduct = (productData) => {
    const newProduct = {
      id: `prod_${Date.now()}`,
      ...productData
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('microsap_products', JSON.stringify(updatedProducts));
    return newProduct;
  };

  const updateProduct = (productId, productData) => {
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, ...productData } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('microsap_products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('microsap_products', JSON.stringify(updatedProducts));
  };

  const getProducts = () => products;

  // Gallery Management
  const createGallery = (galleryData) => {
    const newGallery = {
      id: `gal_${Date.now()}`,
      ...galleryData
    };
    const updatedGalleries = [...galleries, newGallery];
    setGalleries(updatedGalleries);
    localStorage.setItem('microsap_galleries', JSON.stringify(updatedGalleries));
    return newGallery;
  };

  const updateGallery = (galleryId, galleryData) => {
    const updatedGalleries = galleries.map(gallery =>
      gallery.id === galleryId ? { ...gallery, ...galleryData } : gallery
    );
    setGalleries(updatedGalleries);
    localStorage.setItem('microsap_galleries', JSON.stringify(updatedGalleries));
  };

  const deleteGallery = (galleryId) => {
    const updatedGalleries = galleries.filter(gallery => gallery.id !== galleryId);
    setGalleries(updatedGalleries);
    localStorage.setItem('microsap_galleries', JSON.stringify(updatedGalleries));
  };

  const getGalleries = () => galleries;

  // Employee Management
  const createEmployee = (employeeData) => {
    const newEmployee = {
      id: `emp_${Date.now()}`,
      ...employeeData
    };
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem('microsap_employees', JSON.stringify(updatedEmployees));
    return newEmployee;
  };

  const updateEmployee = (employeeId, employeeData) => {
    const updatedEmployees = employees.map(employee =>
      employee.id === employeeId ? { ...employee, ...employeeData } : employee
    );
    setEmployees(updatedEmployees);
    localStorage.setItem('microsap_employees', JSON.stringify(updatedEmployees));
  };

  const deleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
    setEmployees(updatedEmployees);
    localStorage.setItem('microsap_employees', JSON.stringify(updatedEmployees));
  };

  const getEmployees = () => employees;

  // Settings Management
  const updateSettings = (settingsData) => {
    const updatedSettings = { ...settings, ...settingsData };
    setSettings(updatedSettings);
    localStorage.setItem('microsap_settings', JSON.stringify(updatedSettings));
  };

  const getSettings = () => settings;

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      createAdmin, 
      updateAdmin, 
      deleteAdmin, 
      getAdmins,
      createPermission,
      updatePermission,
      deletePermission,
      getPermissions,
      updatePage,
      getPages,
      getAnalytics,
      getExports,
      createProduct,
      updateProduct,
      deleteProduct,
      getProducts,
      createGallery,
      updateGallery,
      deleteGallery,
      getGalleries,
      createEmployee,
      updateEmployee,
      deleteEmployee,
      getEmployees,
      updateSettings,
      getSettings
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
