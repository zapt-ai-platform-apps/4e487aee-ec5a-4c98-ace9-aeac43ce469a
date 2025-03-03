import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './modules/auth/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import ProtectedRoute from './modules/auth/ProtectedRoute';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="min-h-screen text-gray-900">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Made on ZAPT badge */}
      <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="badge">
        Made on ZAPT
      </a>
    </div>
  );
}