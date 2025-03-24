import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const CartModal = ({ customerId, isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log("🚀 useEffect körs! isOpen:", isOpen, "customerId:", customerId); // 🛠 Felsökning
  
    if (!customerId) {
      console.error("❌ Ingen giltig customerId skickad till CartModal!");
      return; // Avbryt om ID saknas
    }
  
    if (isOpen) {
      const fetchCart = async () => {
        try {
          console.log("📢 Hämtar varukorg för customerId:", customerId);
          const response = await axios.get(`http://localhost:5001/customers/${customerId}/getCart`);
          console.log("✅ API-respons:", response.data);
  
          setCartItems(response.data.cartItems || []);
          setTotalPrice(response.data.totalCartPrice || 0);
        } catch (error) {
          console.error("❌ Det gick inte att hämta varukorgen", error);
        }
      };
      fetchCart();
    }
  }, [isOpen, customerId]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Din Varukorg</DialogTitle>
      <DialogContent>
        {cartItems.length === 0 ? (
          <Typography>Din varukorg är tom</Typography>
        ) : (
          <List>
            {cartItems.map((item) => (
               <ListItem key={item.productId} sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <img src={item.imageUrl} width="60" height="60" style={{ borderRadius: '8px' }} />
               <ListItemText
                 primary={item.title}
                 secondary={`Antal: ${item.amount} | Pris: ${item.price} SEK`}
               />
             </ListItem>
            ))}
          </List>
        )}
        <Typography variant="h6">Totalt: {totalPrice.toFixed(2)} SEK</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Stäng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartModal;