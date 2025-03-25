import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import ProductItemSmall from "./ProductItemSmall";
import { Grid } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getAllProducts()
      .then((data) => {
        console.log("Fetched products:", data); // 👈 Logga produkterna
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
      <Grid container spacing={2} justifyContent="center">
        {products.length === 0 ? (
          <p>Inga produkter hittades.</p>
        ) : (
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