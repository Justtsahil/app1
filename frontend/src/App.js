import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import DeveloperPanel from "./pages/DeveloperPanel";
import AdminPanel from "./pages/AdminPanel";
import EmployeePanel from "./pages/EmployeePanel";
import AdminManagement from "./pages/Admin_management";
import PermissionControl from "./pages/PermissionControl";
import PageManagement from "./pages/PageManagement";
import DataAccess from "./pages/DataAccess";
import ExportSystem from "./pages/ExportSystem";
import ProductManagement from "./pages/ProductManagement";
import GalleryManagement from "./pages/GalleryManagement";
import EmployeeManagement from "./pages/EmployeeManagement";
import SettingsManagement from "./pages/SettingsManagement";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/login" element={<Login />} />
              <Route path="/developer" element={<DeveloperPanel />} />
              <Route path="/admin-management" element={<AdminManagement />} />
              <Route path="/permission-control" element={<PermissionControl />} />
              <Route path="/page-management" element={<PageManagement />} />
              <Route path="/data-access" element={<DataAccess />} />
              <Route path="/export-system" element={<ExportSystem />} />
              <Route path="/product-management" element={<ProductManagement />} />
              <Route path="/gallery-management" element={<GalleryManagement />} />
              <Route path="/employee-management" element={<EmployeeManagement />} />
              <Route path="/settings-management" element={<SettingsManagement />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/employee" element={<EmployeePanel />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
