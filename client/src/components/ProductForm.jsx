import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

const ProductForm = ({ onSubmit, product }) => {
  const [title, setTitle] = useState(product ? product.title : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [description, setDescription] = useState(product ? product.description : "");
  const [image, setImage] = useState(product ? product.image : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { title, price, description, image };

    if (product) {
      // Update product logic
      await axios.put(`/products/${product.id}`, newProduct);
    } else {
      // Add new product logic
      await axios.post("/products", newProduct);
    }

    // Call the onSubmit function to notify the parent component (e.g., ProductEdit)
    onSubmit();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {product ? "Redigera produkt" : "Lägg till ny produkt"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Produktnamn"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Beskrivning"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Pris"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
       
        <TextField
          label="Bild-URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary">
          {product ? "Spara ändringar" : "Lägg till produkt"}
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;