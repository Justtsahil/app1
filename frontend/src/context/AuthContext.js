import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('microsap_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = [
      { email: 'dev@microsap.com', password: 'dev123', role: 'developer', name: 'Super Admin' },
      { email: 'admin@microsap.com', password: 'admin123', role: 'admin', name: 'Admin User' },
      { email: 'emp@microsap.com', password: 'emp123', role: 'employee', name: 'Employee User', id: 'emp001' }
    ];

    const foundUser = users.find(u => u.email === email && u.password === password);
    
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

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
