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
          // Här anropar vi API:t med rätt endpoint
          const response = await axios.get(`http://localhost:5001/cart/${Id}/getCart`);
          const cart = response.data;

          // Sätt varukorgens produkter
          setCartItems(cart.cartItems || []);

          // Beräkna totalpriset
          const total = (cart.cartItems || []).reduce((acc, item) => {
            return acc + item.price * item.amount;
          }, 0);

          setTotalPrice(total);
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
        <Typography variant="h6">Totalt: {totalPrice} SEK</Typography>
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