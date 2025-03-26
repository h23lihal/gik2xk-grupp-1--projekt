import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge
} from "@mui/material";
// Importerar ikoner som används i AppBar
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
// Importera CartModal för varukorgens modal
import CartModal from "./components/CartModal";

// Importera CartService för att hämta varukorgsdata
import CartService from "./services/CartService";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Håller koll på om modalen är öppen
  const [customerId] = useState(1); 
  const [ setCartCount] = useState(0); // Håller koll på antalet varor i varukorgen

  const openModal = () => setIsModalOpen(true); // Öppna modal
  const closeModal = () => setIsModalOpen(false); // Stäng modal

  // Hämta varukorgsantalet vid första renderingen
  useEffect(() => {
    updateCartCount(); // Hämta varukorgens produkter och uppdatera antal
  }, []);

  // Callback-funktion: Hämtar varukorgens antal från servern och uppdaterar cartCount
  const updateCartCount = async () => {
    try {
      // Hämta alla varukorgens produkter för kunden
      const cartItems = await CartService.getCartItems(customerId);
      // Summera alla produkter för att få totalt antal
      const total = cartItems.reduce((sum, item) => sum + item.amount, 0);
      setCartCount(total); // Uppdatera antalet produkter i varukorgen
    } catch (error) {
      console.error("Kunde inte hämta varukorgsantal:", error);
    }
  };

  return (
    <>
      {/* AppBar-komponent för att skapa en toppnavigering */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "gold" }}>
          <Toolbar>
            {/* Hem-länk som leder till startsidan */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#003366", // Textfärg för länken
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem", // Mellanrum mellan text och ikon
                }}
              >
                {/* HomeIcon som visas bredvid texten "Hem" */}
                <HomeIcon sx={{ color: "#003366" }} />
                Hem
              </Link>
            </Typography>

            {/* Lägg till produkt-knapp som leder till en ny produktform */}
            <Button color="inherit">
              <Link
                to="/products/new"
                style={{ textDecoration: "none", color: "#003366" }}
              >
                Lägg till produkt
              </Link>
            </Button>

            {/* Varukorg-knapp med Badge som visar antalet produkter i varukorgen */}
            <Button
              color="inherit"
              onClick={openModal} // Öppnar varukorgens modal när den klickas på
              sx={{ color: "#003366" }}
            >
                {/* ShoppingCartIcon som visar varukorgsikonen */}
                <ShoppingCartIcon sx={{ color: "#003366" }} />
                Varukorg
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Använd Outlet för att visa undersidor */}
      <Outlet context={{ updateCartCount, customerId }} />

      {/* Footer-sektion med länkar och copyright-text */}
      <Box
        component="footer"
        sx={{
          width: "100%",
          bgcolor: "gold",
          color: "#003366",
          textAlign: "center",
          py: 4,
          mt: 4,
        }}
      >
        <Typography variant="body2" sx={{ mb: 2 }}>
          &copy; {new Date().getFullYear()} TeaTime AB. Alla rättigheter reserverade.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 2 }}>
          {/* Länkar till policy-sidor */}
          <Link to="/privacy-policy" style={{ textDecoration: "none", color: "#003366" }}>
            Sekretesspolicy
          </Link>
          <Link to="/terms" style={{ textDecoration: "none", color: "#003366" }}>
            Användarvillkor
          </Link>
          <Link to="/contact" style={{ textDecoration: "none", color: "#003366" }}>
            Kontakt
          </Link>
        </Box>
      </Box>

      {/* Modal-komponent för att visa varukorgen */}
      <CartModal customerId={customerId} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default App;