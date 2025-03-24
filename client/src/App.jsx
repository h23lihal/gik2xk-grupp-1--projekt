// src/App.jsx
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import CartModal from './components/CartModal';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
          <Link to="/" style={{textDecoration: "none",color: "black",  display: "flex", alignItems: "center", gap: "5px" }}>
         <HomeIcon sx={{ color: "black" }} />
         Hem
        </Link>
        </Typography>

            {/* Lägg till produkt-knapp */}
            <Button color="inherit">
              <Link to="/products/new" style={{ textDecoration: 'none', color: 'black' }}>
                Lägg till produkt
              </Link>
            </Button>
        
            <Button color="inherit" onClick={openModal} startIcon={<ShoppingCartIcon sx={{ color: "black"}}/>} 
            sx={{ color: 'black' }}>
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
          color: 'black',
          textAlign: 'center',
          py: 2,
          mt: 4,
        }}
      >
        <Typography variant="body2">
        </Typography>
      </Box>

      <CartModal customerId={customerId} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default App;