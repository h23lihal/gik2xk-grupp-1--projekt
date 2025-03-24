import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import { Box, Typography } from "@mui/material";
import CartService from "../services/CartService"; // Hämta varukorgens data

function Cart({ cartId }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Hämta varukorgens produkter från backend
    CartService.getCartItems(cartId)
      .then((data) => {
        setCartItems(data);
        // Beräkna totalsumma
        const totalSum = data.reduce((acc, item) => acc + item.productPrice * item.amount, 0);
        setTotal(totalSum);
      })
      .catch((error) => console.error("Fel vid hämtning av varukorg:", error));
  }, [cartId]);

  return (
    <Box sx={{ padding: "2rem", maxHeight: "80vh", overflowY: "auto" }}>
      <Typography variant="h4" gutterBottom>Din Varukorg</Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6">Din varukorg är tom.</Typography>
      ) : (
        cartItems.map((item) => <CartItem key={item.id} item={item} />)
      )}

      <CartTotal total={total} />
    </Box>
  );
}

export default Cart;