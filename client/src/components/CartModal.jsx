import React, { useState, useEffect } from "react";
import {
  Dialog, // Importerar Material UI-komponenter för modalt fönster
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
} from "@mui/material";
import axios from "axios"; // För att hantera HTTP-förfrågningar
import DeleteIcon from "@mui/icons-material/Delete"; // Ikon för borttagning i varukorgen

const CartModal = ({ customerId, isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]); // State för att hålla varukorgens objekt
  const [totalPrice, setTotalPrice] = useState(0); // State för totalpriset i varukorgen

  // Hämtar varukorgsdata när customerId finns och modal är öppen
  useEffect(() => {
    if (!customerId) {
      console.error("Ingen giltig customerId skickad till CartModal!");
      return;
    }

    if (isOpen) {
      fetchCart(); // Anropar funktion för att hämta varukorgen
    }
  }, [isOpen, customerId]);

  // Funktion för att hämta varukorgen från servern
  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/customers/${customerId}/getCart`
      );
      setCartItems(response.data.cartItems || []); // Uppdaterar cartItems
      setTotalPrice(response.data.totalCartPrice || 0); // Uppdaterar totalpriset
    } catch (error) {
      console.error("Det gick inte att hämta varukorgen", error); // Felhantering
    }
  };

  // Funktion för att ta bort en produkt från varukorgen
  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/cart/removeProduct`, {
        data: { customerId, productId }, // Skickar produkt-ID och kund-ID för att ta bort produkten
      });
      fetchCart(); // Uppdaterar varukorgen efter borttagning
    } catch (error) {
      console.error("Fel vid borttagning av produkt:", error); // Felhantering
    }
  };

  // Funktion för att uppdatera antal produkter i varukorgen
  const handleUpdateAmount = async (productId, newAmount) => {
    if (newAmount < 1) {
      handleRemoveItem(productId);
      return;
    }

    try {
      await axios.put(`http://localhost:5001/cart/updateProduct`, {
        customerId,
        productId,
        amount: newAmount, // Skickar nytt antal för produkten
      });
      fetchCart(); // Uppdaterar varukorgen efter uppdateringen
    } catch (error) {
      console.error("Fel vid uppdatering av antal:", error); // Felhantering
    }
  };

  // Funktion för att slutföra köpet och rensa varukorgen
  const handleCheckout = async () => {
    try {
      await axios.delete("http://localhost:5001/cart/clearCart", {
        data: { customerId }, // Skickar kund-ID för att rensa varukorgen
      });
  
      setCartItems([]); // Rensar frontends varukorgsdata
      setTotalPrice(0); // Sätter totalpriset till 0
      alert("Köpet genomfört! Varukorgen är nu tom.");
    } catch (error) {
      console.error("Fel vid köp:", error.response?.data || error.message); // Felhantering
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth> {/* Modal-dialogen */}
      <DialogTitle>Din Varukorg</DialogTitle> {/* Titel på modal-fönstret */}
      <DialogContent>
        {cartItems.length === 0 ? (
          <Typography>Din varukorg är tom</Typography> // Meddelande om varukorgen är tom
        ) : (
          <List>
            {/* Loopar genom cartItems och visar varje produkt */}
            {cartItems.map((item) => (
              <ListItem key={item.productId} sx={{ display: "flex", alignItems: "center", gap: "1rem", borderBottom: ".2rem solid #ddd", padding: ".7rem" }}>
                <ListItemText
                  primary={item.title} // Produktens titel
                  secondary={`Pris: ${item.price} SEK`} // Produktens pris
                />
                <TextField 
                  type="number"
                  value={item.amount} // Visar mängden av produkten
                  onChange={(e) =>
                    handleUpdateAmount(item.productId, parseInt(e.target.value)) // Uppdaterar antal vid förändring
                  }
                  inputProps={{ min: 1 }} // Begränsar mängd till minst 1
                  sx={{ width: "4rem" }}
                />
                {/* Knapp för att ta bort produkt */}
                <IconButton onClick={() => handleRemoveItem(item.productId)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
        <Typography variant="h6" sx={{ marginTop: "0.3remx", fontWeight: "bold" }}>
          Totalt: {totalPrice.toFixed(2)} SEK {/* Visar totalpriset */}
        </Typography>
      </DialogContent>
      <DialogActions>
        {/* Knapp för att genomföra köp */}
    <Button 
      onClick={handleCheckout} 
      color="success" 
      variant="contained" 
      sx={{ marginRight: "27rem" }}
    >
    Köp
    </Button>

    {/* Knapp för att stänga modal */}
    <Button 
      onClick={onClose} 
      variant="contained" 
      sx={{
      backgroundColor: '#003366',
      color: '#ffffff', // För att göra texten vit, så att den syns bra på den blå bakgrunden
      '&:hover': {
      backgroundColor: '#002244', // Mörkare nyans vid hover
      }
    }}
  >
  Stäng
    </Button>
    </DialogActions>
    </Dialog>
  );
};

export default CartModal;