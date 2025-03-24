// src/App.jsx
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import CartModal from './components/CartModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerId, setUserId] = useState(1); // Sätt här användarens ID (här är ett exempel med 1)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'gold' }}>
          <Toolbar>
            {/* Hem-länk */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Hem</Link>
            </Typography>

            {/* Lägg till produkt-knapp */}
            <Button color="inherit">
              <Link to="/products/new" style={{ textDecoration: 'none', color: 'black' }}>
                Lägg till produkt
              </Link>
            </Button>

            {/* Varukorg-knapp */}
            <Button color="inherit" onClick={openModal}>
              Varukorg
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Innehåll som kommer att bytas ut beroende på route */}
      <Outlet />

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: '100%',
          bgcolor: 'gold',
          color: 'black',
          textAlign: 'center',
          py: 2,
          mt: 4,
        }}
      >
        <Typography variant="body2">
          © 2024 Webbshoppen. Alla rättigheter reserverade.
        </Typography>
      </Box>

      {/* Varukorg-modal */}
      <CartModal cusomerId={customerId} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default App;