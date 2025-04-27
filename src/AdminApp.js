import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './assets/styles';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Withdrawals from './pages/admin/Withdrawals';
import Settings from './pages/admin/Settings';
import Content from './pages/admin/Content';
import Analytics from './pages/admin/Analytics';

const AdminApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [admin, setAdmin] = useState(null);
  
  // Check for token on load
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      
      // Get admin data from localStorage
      const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
      setAdmin(adminData);
    }
  }, []);
  
  const handleLogin = (loginData) => {
    setToken(loginData.token);
    setAdmin(loginData.admin);
    setIsAuthenticated(true);
    
    // Store in localStorage
    localStorage.setItem('adminToken', loginData.token);
    localStorage.setItem('adminData', JSON.stringify(loginData.admin));
  };
  
  const handleLogout = () => {
    setToken('');
    setAdmin(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  };
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route 
            path="/admin/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/admin/dashboard" /> : 
                <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              isAuthenticated ? 
                <Dashboard admin={admin} token={token} onLogout={handleLogout} /> : 
                <Navigate to="/admin/login" />
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              isAuthenticated ? 
                <Users admin={admin} token={token} onLogout={handleLogout} /> : 
                <Navigate to="/admin/login" />
            } 
          />
          <Route 
            path="/admin/withdrawals" 
            element={
              isAuthenticated ? 
                <Withdrawals admin={admin} token={token} onLogout={handleLogout} /> : 
                <Navigate to="/admin/login" />
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              isAuthenticated ? 
                <Settings admin={admin} token={token} onLogout={handleLogout} /> : 
                <Navigate to="/admin/login" />
            } 
          />
          <Route 
            path="/admin/content" 
            element={
              isAuthenticated ? 
                <Content admin={admin} token={token} onLogout={handleLogout} /> : 
                <Navigate to="/admin/login" />
            } 
          />
          <Route 
            path="/admin/analytics" 
            element={
              isAuthenticated ? 
                <Analytics admin={admin} token={token} onLogout={handleLogout} /> : 
                <Navigate to="/admin/login" />
            } 
          />
          <Route path="/admin" element={<Navigate to="/admin/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default AdminApp;
