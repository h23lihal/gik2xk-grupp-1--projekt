import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const CartModal = ({ Id, isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Hämtar varukorg när modalen öppnas
  useEffect(() => {
    if (isOpen && Id) {
      const fetchCart = async () => {
        try {
          // Hämta varukorgen från API
          const response = await axios.get(`http://localhost:5001/customers/${Id}/getCart`);
          const cart = response.data;

          // Sätt varukorgens produkter
          setCartItems(cart.cartItems || []);

          // Sätt totalpris
          setTotalPrice(cart.totalCartPrice || 0);

          console.log("API-respons för varukorgen:", cart);
        } catch (error) {
          console.error("Det gick inte att hämta varukorgen", error);
        }
      };

      fetchCart();
    }
  }, [isOpen, Id]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Din Varukorg</DialogTitle>
      <DialogContent>
        {cartItems.length === 0 ? (
          <Typography>Din varukorg är tom</Typography>
        ) : (
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.productId}>
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
        <Button onClick={onClose} color="primary">
          Stäng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartModal;