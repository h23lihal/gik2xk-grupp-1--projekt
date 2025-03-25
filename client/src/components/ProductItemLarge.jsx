import React from "react";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const ProductItemLarge = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <Card
        sx={{
          width: "80%", 
          borderRadius: 3,
          boxShadow: 3,
          transition: "0.3s",
          "&:hover": { boxShadow: 6 },
          display: "flex",
          flexDirection: "column",
          height: "80%", 
        }}
      >
        <CardMedia
          component="img"
          image={product.imageUrl}
          alt={product.title}
          sx={{
            width: "100%",    
            height: 200,      
            objectFit: "contain", 
            backgroundColor: "#f8f8f8"
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}> 
          <Typography variant="h6" fontWeight="bold">
            {product.title}
          </Typography>
            <Typography variant="h6" color="black" mt={1}>
                {product.description}
            </Typography>
          <Typography variant="h6" color="#003366" mt={1}>
            {product.price} SEK
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductItemLarge;