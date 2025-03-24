import React, { useState, useEffect } from "react";
import {
  Dialog,
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
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const CartModal = ({ customerId, isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!customerId) {
      console.error("Ingen giltig customerId skickad till CartModal!");
      return;
    }

    if (isOpen) {
      fetchCart();
    }
  }, [isOpen, customerId]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/customers/${customerId}/getCart`
      );
      setCartItems(response.data.cartItems || []);
      setTotalPrice(response.data.totalCartPrice || 0);
    } catch (error) {
      console.error("Det gick inte att hämta varukorgen", error);
    }
  };

  // 🗑 Ta bort produkt från varukorgen
  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/cart/removeProduct`, {
        data: { customerId, productId },
      });
      fetchCart(); // Uppdatera varukorgen efter borttagning
    } catch (error) {
      console.error("Fel vid borttagning av produkt:", error);
    }
  };

  // ✏ Uppdatera antal produkter
  const handleUpdateAmount = async (productId, newAmount) => {
    if (newAmount < 1) {
      handleRemoveItem(productId);
      return;
    }

    try {
      await axios.put(`http://localhost:5001/cart/updateProduct`, {
        customerId,
        productId,
        amount: newAmount,
      });
      fetchCart();
    } catch (error) {
      console.error("Fel vid uppdatering av antal:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.delete("http://localhost:5001/cart/clearCart", {
        data: { customerId }, // Skicka rätt kund-ID
      });
  
      setCartItems([]); // Rensa frontendens state
      setTotalPrice(0);
      alert("Köpet genomfört! Varukorgen är nu tom.");
    } catch (error) {
      console.error("Fel vid köp:", error.response?.data || error.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Din Varukorg</DialogTitle>
      <DialogContent>
        {cartItems.length === 0 ? (
          <Typography>Din varukorg är tom</Typography>
        ) : (
          <List>
            {cartItems.map((item) => (
              <ListItem
                key={item.productId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  borderBottom: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  width="80"
                  height="80"
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    display: item.imageUrl ? "block" : "none",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />

                <ListItemText
                  primary={item.title}
                  secondary={`Pris: ${item.price} SEK`}
                />

                <TextField
                  type="number"
                  value={item.amount}
                  onChange={(e) =>
                    handleUpdateAmount(item.productId, parseInt(e.target.value))
                  }
                  inputProps={{ min: 1 }}
                  sx={{ width: "60px" }}
                />

                <IconButton onClick={() => handleRemoveItem(item.productId)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
        <Typography variant="h6" sx={{ marginTop: "0.3remx", fontWeight: "bold" }}>
          Totalt: {totalPrice.toFixed(2)} SEK
        </Typography>
      </DialogContent>
      <DialogActions>
      <Button 
      onClick={handleCheckout} 
      color="success" 
      variant="contained" 
      sx={{ marginRight: "27rem" }}
      >
      Köp
      </Button>
        <Button onClick={onClose} color="primary">
          Stäng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartModal;