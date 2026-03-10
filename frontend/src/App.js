import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import LanguageSelector from './components/LanguageSelector';
import Login from './components/Login';
import Register from './components/Register';
// Import dashboards later: import FarmerDashboard from './components/FarmerDashboard';
// import MiddlemanDashboard from './components/MiddlemanDashboard';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import './App.css';

const ProtectedRoute = ({ children, redirectTo }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to={redirectTo} />;
};

function App() {
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1]))?.role || 'Farmer' : null; // Decode JWT for role (simple; use lib in prod)

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              HarvestLink
            </Typography>
            <LanguageSelector />
            {token && (
              <Button color="inherit" onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Stub protected routes; replace with actual dashboards */}
            <Route
              path="/farmer"
              element={
                <ProtectedRoute redirectTo="/">
                  {/* <FarmerDashboard /> */}
                  <Typography variant="h4">Farmer Dashboard (Coming Soon)</Typography>
                </ProtectedRoute>
              }
            />
            <Route
              path="/middleman"
              element={
                <ProtectedRoute redirectTo="/">
                  {/* <MiddlemanDashboard /> */}
                  <Typography variant="h4">Middleman Dashboard (Coming Soon)</Typography>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </Router>
    </I18nextProvider>
  );
}

export default App;