import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const ProductForm = ({ onSubmit, product }) => {
  // State för att hantera formulärets fält
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  // Om en befintlig produkt finns, fylls formuläret med dess data
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

  // Uppdaterar state när användaren skriver i formuläret
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Lämnar in formuläret med den nya datan
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box>
      {/* Titel som ändras beroende på om en produkt redigeras eller skapas */}
      <Typography variant="h4" gutterBottom sx={{ fontFamily: '"Delius Swash Caps", cursive' }} style={{ marginTop: '1rem' }}>
        {product ? "Redigera produkt" : "Lägg till produkt"}
      </Typography>

      {/* Formulär för att fylla i produktinformation */}
      <form onSubmit={handleSubmit}>
        <TextField label="Produktnamn" name="title" value={formData.title} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Beskrivning" name="description" value={formData.description} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Pris" name="price" type="number" value={formData.price} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Bild-URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} fullWidth margin="normal" />

        {/* Knapp som ändrar text beroende på om man skapar eller redigerar en produkt */}
        <Button sx={{ color: "white", backgroundColor: "#003366", padding: "10px 20px"}} type="submit" variant="contained">
          {product ? "Spara ändringar" : "Lägg till produkt"}
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;