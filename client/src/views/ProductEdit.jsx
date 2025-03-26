import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import { Button } from '@mui/material';

const ProductEdit = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("ID från useParams():", id); 
    if (id && id !== "undefined") {
      axios.get(`http://localhost:5001/products/${id}`)
        .then((response) => {
          if (!response.data) {
            throw new Error("Produkten hittades inte");
          }
          console.log("Produktdata hämtad:", response.data);
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Fel vid hämtning av produkt:", error);
          alert("Produkten hittades inte!");
          navigate("/");
        });
    }
  }, [id, navigate]);

  const handleFormSubmit = async (updatedProduct) => {
    try {
      console.log("Skickar produktdata:", updatedProduct);
      if (!id || id === "undefined") {
        console.log("Skapar ny produkt...");
        await axios.post("http://localhost:5001/products", updatedProduct);
      } else {
        console.log(`Uppdaterar produkt med ID: ${id}...`);
        await axios.put(`http://localhost:5001/products/${id}`, updatedProduct);
      }
      navigate("/"); 
    } catch (error) {
      console.error("Fel vid sparande av produkt:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Är du säker på att du vill ta bort denna produkt?")) {
      try {
        if (id && id !== "undefined") {
          console.log(`Tar bort produkt med ID: ${id}...`);
          await axios.delete(`http://localhost:5001/products/${id}`);
          alert("Produkten har raderats!");
          navigate("/");
        } else {
          alert("⚠ Fel: Kunde inte hitta produktens ID.");
        }
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