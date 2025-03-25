import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductItemLarge from "../components/ProductItemLarge";
import ProductService from "../services/ProductService";
import { Button, Typography, TextField, Grid, Card, CardContent, CardHeader, Box } from "@mui/material";
import RatingForm from "../components/RatingForm";
import Rating from "../components/Rating";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(1); // För att välja mängd
  const navigate = useNavigate();
  const customerId = 1; // Byt till det faktiska customerId för den inloggade användaren

  useEffect(() => {
    ProductService.getProductById(id)
      .then((data) => {
        console.log("Fetched product:", data);
        setProduct(data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <p className="p-5">Laddar...</p>;

  //Säkert sätt att beräkna snittbetyg
  const averageRating =
    product.ratings && product.ratings.length > 0
      ? product.ratings.reduce((sum, r) => sum + r.score, 0) / product.ratings.length
      : null;

  // Lägg till i varukorgen
  const handleAddToCart = async () => {
    try {
      const payload = {
        customerId: customerId, // Skickar rätt fält
        productId: product.id,  // Skickar produkt-ID
        amount: amount,          // Skickar mängd
      };
      console.log("Skickar till backend:", payload); // Logga begäran för att se vad vi skickar
      await ProductService.addToCart(customerId, product.id, amount); 
      setMessage("Produkten har lagts till i varukorgen!");
    } catch (error) {
      console.error("Misslyckades att lägga till i varukorgen:", error.response ? error.response.data : error.message);
      setMessage("Kunde inte lägga till i varukorgen.");
    }
  };

  return (
    <Grid container spacing={3} style={{ marginTop: '1rem' }}>
      {/* Vänster kolumn för produktinformation */}
      <Grid item xs={12} md={8}>
        <ProductItemLarge product={product} />

        {/* Lägg till i varukorgen-knapp och mängd-input */}
        <div style={{ marginTop: '2rem' }}>
          <TextField
            label="Antal"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 1)} // Uppdatera mängd
            InputProps={{ inputProps: { min: 1 } }} // Förhindra negativa tal eller noll
          />
          <Button onClick={handleAddToCart} style={{ marginLeft: '10px' }}>
            Lägg till i varukorgen
          </Button>
          <Button style={{marginRight: "10rem"}}onClick={() => navigate(-1)}>Tillbaka</Button>

        </div>
      </Grid>

      {/* Höger kolumn för betygsinformation */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title="Kundbetyg:" />
          <CardContent>
            <RatingForm productId={product.id} />
          </CardContent>
          <CardContent>
            {product.ratings && product.ratings.length > 0 ? (
              <ul>
                {product.ratings.map((r) => (
                  <li key={r.id}>
                    <strong>{r.rating}</strong>
                    {r.comment && <p>"{r.comment}"</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Inga betyg ännu.</p>
            )}

            {/* Snittbetyg visas endast om det finns betyg */}
            {averageRating !== null && (
              <Typography variant="h6">Snittbetyg: {product.averageRating} / 5</Typography>
            )}
          </CardContent>
        </Card>

        {/* Placera knappen nere till höger */}
        <Box 
          sx={{
            display: "flex", 
            justifyContent: "flex-end", 
            marginTop: "9rem",
            position: "relative", // Kan användas om du vill använda absolute positionering i framtiden
          }}
        >
          <Button onClick={() => navigate(`/products/${id}/edit`)}>Ändra produkt</Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProductDetail;