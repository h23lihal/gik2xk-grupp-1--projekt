// Importerar nödvändiga bibliotek och komponenter
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // För att hämta URL-parametrar och navigera
import axios from 'axios'; // För att göra API-anrop
import ProductForm from '../components/ProductForm'; // Komponent för att visa och hantera produktformulär
import { Button, Grid} from '@mui/material'; // Material UI-knappkomponent

const ProductEdit = () => {
  const { id } = useParams(); // Hämtar produktens ID från URL-parametrarna
  const navigate = useNavigate(); // För att navigera mellan sidor
  const [product, setProduct] = useState(null); // State för att lagra produktinformation

  // useEffect körs vid komponentens första render och varje gång 'id' ändras
  useEffect(() => {
    console.log("ID från useParams():", id); // Skriver ut ID för debugging
    if (id && id !== "undefined") { // Kontrollera om ID finns och inte är undefined
      // Hämtar produktinformation från API:t
      axios.get(`http://localhost:5001/products/${id}`)
        .then((response) => {
          if (!response.data) {
            throw new Error("Produkten hittades inte");
          }
          console.log("Produktdata hämtad:", response.data); // Skriver ut hämtad produktdata
          setProduct(response.data); // Sätter produktinformationen i state
        })
        .catch((error) => {
          console.error("Fel vid hämtning av produkt:", error); // Hanterar eventuella fel vid hämtning
          alert("Produkten hittades inte!"); // Visar felmeddelande till användaren
          navigate("/"); // Navigera tillbaka till startsidan vid fel
        });
    }
  }, [id, navigate]); // Körs varje gång id eller navigate ändras

  // Hanterar formulärets inlämning, både för att skapa eller uppdatera en produkt
  const handleFormSubmit = async (updatedProduct) => {
    try {
      console.log("Skickar produktdata:", updatedProduct); // Skriver ut produktdata som skickas
      if (!id || id === "undefined") {
        console.log("Skapar ny produkt..."); // Om inget ID finns skapar vi en ny produkt
        await axios.post("http://localhost:5001/products", updatedProduct); // Skickar en POST-förfrågan för att skapa produkten
      } else {
        console.log(`Uppdaterar produkt med ID: ${id}...`); // Om ID finns uppdateras den existerande produkten
        await axios.put(`http://localhost:5001/products/${id}`, updatedProduct); // Skickar en PUT-förfrågan för att uppdatera produkten
      }
      navigate("/"); // Navigerar tillbaka till startsidan när processen är klar
    } catch (error) {
      console.error("Fel vid sparande av produkt:", error); // Hanterar eventuella fel vid sparande
    }
  };

  // Hanterar borttagning av produkten
  const handleDelete = async () => {
    if (window.confirm("Är du säker på att du vill ta bort denna produkt?")) { // Frågar användaren om de verkligen vill ta bort produkten
      try {
        if (id && id !== "undefined") { // Kontrollera om produktens ID är giltigt
          console.log(`Tar bort produkt med ID: ${id}...`); // Skriver ut meddelande om borttagning
          await axios.delete(`http://localhost:5001/products/${id}`); // Skickar en DELETE-förfrågan för att ta bort produkten
          alert("Produkten har raderats!"); // Visar meddelande om att produkten raderades
          navigate("/"); // Navigerar tillbaka till startsidan
        } else {
          alert("Fel: Kunde inte hitta produktens ID."); // Visar felmeddelande om inget ID hittades
        }
      } catch (error) {
        console.error("Fel vid borttagning av produkt:", error); // Hanterar eventuella fel vid borttagning
      }
    }
  };

  return (
    <Grid>
      {/* Renderar produktformuläret med produktdata om det finns */}
      <ProductForm onSubmit={handleFormSubmit} product={product} />
      
      {/* Visa borttagningsknappen om produkt-ID finns och produktdata är hämtad */}
      {id && product && (
        <Button sx={{ color: "white", backgroundColor: "red", padding: "10px 20px"}} onClick={handleDelete} variant="contained"  style={{ marginTop: "20px" }}>
          Ta bort produkt
        </Button>
      )}
    </Grid>
  );
};

export default ProductEdit;