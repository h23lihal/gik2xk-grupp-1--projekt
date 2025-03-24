import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import ProductForm from '../components/ProductForm';
import { Button } from '@mui/material';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      ProductService.getProductById(id)
        .then((data) => setProduct(data))
        .catch((error) => {
          console.error("Fel vid hämtning av produkt:", error);
          alert("Produkten hittades inte!");
          navigate("/"); // Skicka tillbaka till startsidan
        });
    }
  }, [id, navigate]);

  const handleFormSubmit = async (updatedProduct) => {
    try {
      if (id) {
        await ProductService.updateProduct(updatedProduct);
      } else {
        await ProductService.createProduct(updatedProduct);
      }
      navigate("/"); // Skicka tillbaka till startsidan efter sparande
    } catch (error) {
      console.error("Fel vid sparande av produkt:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Är du säker på att du vill ta bort denna produkt?")) {
      try {
        await ProductService.deleteProduct(id);
        alert("Produkten har raderats!");
        navigate("/"); // Tillbaka till startsidan
      } catch (error) {
        console.error("Fel vid borttagning av produkt:", error);
      }
    }
  };

  return (
    <div>
      <ProductForm onSubmit={handleFormSubmit} product={product} />
      {id && product && (
        <Button onClick={handleDelete} variant="contained" color="error" style={{ marginTop: "20px" }}>
          Ta bort produkt
        </Button>
      )}
    </div>
  );
};

export default ProductEdit;