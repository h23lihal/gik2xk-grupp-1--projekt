import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import CartModal from './components/CartModal';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerId] = useState(1); // Sätt här användarens ID (här är ett exempel med 1)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'gold' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: '#003366',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <HomeIcon sx={{ color: '#003366' }} />
                Hem
              </Link>
            </Typography>

            {/* Lägg till produkt-knapp */}
            <Button color="inherit">
              <Link to="/products/new" style={{ textDecoration: 'none', color: '#003366' }}>
                Lägg till produkt
              </Link>
            </Button>

            <Button
              color="inherit"
              onClick={openModal}
              startIcon={<ShoppingCartIcon sx={{ color: '#003366' }} />}
              sx={{ color: '#003366' }}
            >
              varukorg
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: '100%',
          bgcolor: 'gold',
          color: '#003366',
          textAlign: 'center',
          py: 4,
          mt: 4,
        }}
      >
        {/* Copyright och info */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          &copy; {new Date().getFullYear()} TeaTime AB. Alla rättigheter reserverade.
        </Typography>

        {/* Navigationslänkar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
          <Link to="/privacy-policy" style={{ textDecoration: 'none', color: '#003366' }}>
            Sekretesspolicy
          </Link>
          <Link to="/terms" style={{ textDecoration: 'none', color: '#003366' }}>
            Användarvillkor
          </Link>
          <Link to="/contact" style={{ textDecoration: 'none', color: '#003366' }}>
            Kontakt
          </Link>
        </Box>

        {/* Sociala medier ikoner */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Link to="#" style={{ textDecoration: 'none', color: 'black' }}>
            <i className="fab fa-facebook" style={{ fontSize: '24px' }}></i> {/* Facebook-ikon */}
          </Link>
          <Link to="#" style={{ textDecoration: 'none', color: 'black' }}>
            <i className="fab fa-twitter" style={{ fontSize: '24px' }}></i> {/* Twitter-ikon */}
          </Link>
          <Link to="#" style={{ textDecoration: 'none', color: 'black' }}>
            <i className="fab fa-instagram" style={{ fontSize: '24px' }}></i> {/* Instagram-ikon */}
          </Link>
        </Box>
      </Box>

      <CartModal customerId={customerId} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default App;