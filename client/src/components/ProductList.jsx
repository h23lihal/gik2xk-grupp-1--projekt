import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import ProductItemLarge from "./ProductItemLarge";

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
    <div>
      {products.length === 0 ? (
        <p>Inga produkter hittades.</p> // 👈 Visar om listan är tom
      ) : (
        <ul>
          {products.map((product) => (
            <ProductItemLarge key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;