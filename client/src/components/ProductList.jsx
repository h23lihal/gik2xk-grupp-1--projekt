import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import ProductItemSmall from "./ProductItemSmall";
import { Grid } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]); // State för att lagra produkterna

  useEffect(() => {
    //Hämtar alla produkter från databasen
    ProductService.getAllProducts()
      .then((data) => {
        console.log("Fetched products:", data); //Loggar produkterna för felsökning
        setProducts(data); // Uppdaterar state med hämtade produkter
      })
      .catch((err) => console.error("Error fetching products:", err)); //Hanterar fel
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center"> 
      {products.length === 0 ? ( //Om inga produkter finns, visa meddelande
        <p>Inga produkter hittades.</p>
      ) : (
        //Loopar igenom produkterna och skapar en Grid-item för varje
        products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductItemSmall product={product} /> 
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ProductList;