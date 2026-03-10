import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import LanguageSelectionPage from './components/LanguageSelectionPage';
import LanguageSelector from './components/LanguageSelector';
import Login from './components/Login';
import Register from './components/Register';
import { AppBar, Toolbar, Typography, Button, ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import './App.css';

// Create custom theme with vibrant green colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#2ecc71',
      light: '#74c69d',
      dark: '#1b4332',
    },
    secondary: {
      main: '#40916c',
      light: '#b7e4c7',
      dark: '#1b4332',
    },
    background: {
      default: 'linear-gradient(135deg, #1e5631 0%, #2d6a4f 50%, #40916c 100%)',
      paper: '#ffffff',
    },
    success: {
      main: '#2ecc71',
    },
    error: {
      main: '#e74c3c',
    },
    warning: {
      main: '#f39c12',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Noto Sans Tamil", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h6: {
      fontWeight: 700,
      letterSpacing: '1px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
          '&:hover': {
            background: 'linear-gradient(135deg, #27ae60, #1e8449)',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(46, 204, 113, 0.4)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)',
        },
      },
    },
  },
});

const ProtectedRoute = ({ children, redirectTo }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to={redirectTo} />;
};

function AppContent() {
  const location = useLocation();
  const showAppBar = location.pathname !== '/';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e5631 0%, #2d6a4f 50%, #40916c 100%)',
      }}
    >
      {showAppBar && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
              🌾 HarvestLink
            </Typography>
            <LanguageSelector />
            {localStorage.getItem('token') && (
              <Button color="inherit" onClick={() => { localStorage.removeItem('token'); window.location.reload(); }} sx={{ ml: 2 }}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      )}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', padding: showAppBar ? 2 : 0 }}>
        <Routes>
          <Route path="/" element={<LanguageSelectionPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/farmer"
            element={
              <ProtectedRoute redirectTo="/login">
                <Box sx={{ textAlign: 'center', color: '#fff' }}>
                  <Typography variant="h4">🌾 Farmer Dashboard (Coming Soon)</Typography>
                </Box>
              </ProtectedRoute>
            }
          />
          <Route
            path="/middleman"
            element={
              <ProtectedRoute redirectTo="/login">
                <Box sx={{ textAlign: 'center', color: '#fff' }}>
                  <Typography variant="h4">🚚 Middleman Dashboard (Coming Soon)</Typography>
                </Box>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <I18nextProvider i18n={i18n}>
        <Router>
          <AppContent />
        </Router>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;