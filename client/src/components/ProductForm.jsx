import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const ProductForm = ({ onSubmit, product }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        price: product.price || "",
        description: product.description || "",
        imageUrl: product.imageUrl || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{
        fontFamily: '"Delius Swash Caps", cursive',}} style={{ marginTop: '1rem' }} >
        {product ? "Redigera produkt" : "Lägg till produkt"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField label="Produktnamn" name="title" value={formData.title} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Beskrivning" name="description" value={formData.description} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Pris" name="price" type="number" value={formData.price} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Bild-URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} fullWidth margin="normal" />

        <Button type="submit" variant="contained" color="primary">
          {product ? "Spara ändringar" : "Lägg till produkt"}
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;