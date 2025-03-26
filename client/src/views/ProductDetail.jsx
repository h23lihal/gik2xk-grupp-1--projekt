// Importerar React hooks samt komponenter som behövs för produktdetalj
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductItemLarge from "../components/ProductItemLarge"; // Komponent som visar produktens detaljer

// Services för att hantera betyg och produkter
import RatingService from "../services/RatingService";
import ProductService from "../services/ProductService";

// Material UI-komponenter
import {
  Button,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Box,
  Divider,
  LinearProgress
} from "@mui/material";
import Rating from "@mui/material/Rating";

// Funktionell komponent för att visa produktdetaljer
function ProductDetail() {
  const { id } = useParams(); // Hämtar produkt-ID från URL
  const navigate = useNavigate(); // För navigering mellan sidor
  const customerId = 1; 

  // State för att hantera produktdata, meddelanden, mängd och användarbetyg
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(""); 
  const [amount, setAmount] = useState(1);
  const [userRating, setUserRating] = useState(0); // För att hantera användarens betyg

  // Hämta produktinformation
  useEffect(() => {
    ProductService.getProductById(id) // Anropar API för att hämta produktdetaljer
      .then((data) => {
        console.log("Fetched product:", data);
        setProduct(data); // Uppdaterar state med produktdata
      })
      .catch((err) => console.error("Error fetching product:", err)); // Felhantering vid misslyckad fetch
  }, [id]);

  if (!product) return <p className="p-5">Laddar...</p>; // Returnera ett laddar-meddelande om produkten inte är hämtad än

  // Räkna total antal betyg och snittbetyg från produkten
  const totalRatings = product.ratings?.length || 0;
  const averageRating = totalRatings > 0
    ? product.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
    : 0;

  // Funktion för att räkna betygsfördelning (hur många som gav X antal stjärnor)
  const getDistribution = (ratings) => {
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    (ratings || []).forEach((r) => {
      const star = Math.round(r.rating); // Runda betyget till närmsta heltal (1-5)
      if (star >= 1 && star <= 5) {
        dist[star]++;
      }
    });
    return dist;
  };

  const distribution = getDistribution(product.ratings); // Använd för att visa fördelningen av betyg 1-5 stjärnor

  // Lägg till produkt i varukorgen
  const handleAddToCart = async () => {
    try {
      await ProductService.addToCart(customerId, product.id, amount); // Skickar produkt och mängd till API för att lägga till i varukorgen
      setMessage("Produkten har lagts till i varukorgen!"); // Sätter ett meddelande om lyckad åtgärd

      // Ta bort meddelandet efter 3 sekunder
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Misslyckades att lägga till i varukorgen:", error.response ? error.response.data : error.message);
      setMessage("Kunde inte lägga till i varukorgen."); // Felhantering om produkten inte kan läggas till

      // Ta bort felmeddelandet efter 3 sekunder
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  // Skicka användarens betyg
  const handleSubmitRating = async () => {
    try {
      await RatingService.addRating(product.id, userRating); // Anropar RatingService för att spara betyget

      // Uppdaterar produktdata efter att betyget har lagts till
      const updatedProduct = await ProductService.getProductById(id);
      setProduct(updatedProduct); // Uppdaterar produktens betyg

      // Nollställer användarens betyg
      setUserRating(0);
    } catch (error) {
      console.error("Kunde inte spara betyg:", error);
    }
  };

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {/*Produktinfo */}
      <Grid item xs={12} md={8}>
        <ProductItemLarge product={product} /> {/* Komponent som visar detaljerad produktinformation */}
        <Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
          <TextField
            label="Antal" // Inputfält för att välja antal
            type="number"
            value={amount} // Visar aktuell mängd
            onChange={(e) => setAmount(parseInt(e.target.value) || 1)} // Uppdaterar mängd
            inputProps={{ min: 1 }} // Sätter minimivärde på 1
            sx={{ width: "100px" }}
          />
          <Button variant="contained" onClick={handleAddToCart} sx={{ ml: 2, backgroundColor: '#003366', color: 'white', '&:hover': { backgroundColor: '#002244' } }} >
            Lägg till i varukorgen
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate(-1)} 
            sx={{ ml: 2, color: '#003366', borderColor: '#003366', '&:hover': { backgroundColor: '#003366', color: 'white' } }}
          >
            Tillbaka
          </Button>
        </Box>
        {message && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Grid>

      {/*Betyg */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title="Kundbetyg" />
          <CardContent>
            {/* Snittbetyg och betyg i stjärnor */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Rating
                name="average-rating"
                value={averageRating}
                precision={0.1}
                readOnly // Gör betygsraden "read-only"
              />
              <Typography variant="h6" sx={{ ml: 1 }}>
                {averageRating.toFixed(1)} / 5
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {totalRatings} kundbetyg totalt
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Användaren lägger till nytt betyg */}
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Sätt ditt betyg:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating
                name="user-rating"
                value={userRating}
                onChange={(event, newValue) => setUserRating(newValue)} // Uppdaterar användarens betyg
              />
              <Button 
                variant="contained"
                sx={{ ml: 2, backgroundColor: '#003366', color: 'white', '&:hover': { backgroundColor: '#002244' } }} 
                onClick={handleSubmitRating} // Skickar betyg
                disabled={userRating === 0} // Inaktiverar knappen om inget betyg är valt
              >
                Skicka
              </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Fördelning av betyg (hur många gav varje antal stjärnor) */}
            {[5, 4, 3, 2, 1].map((star) => {
              const count = distribution[star];
              const percent =
                totalRatings === 0 ? 0 : (count / totalRatings) * 100;
              return (
                <Box
                  key={star}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <Typography variant="body2" sx={{ width: 65 }}>
                    {star} stjärnor
                  </Typography>
                  <Box sx={{ flexGrow: 1, mx: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={percent} 
                      sx={{ 
                        backgroundColor: "#D3D3D3", 
                        "& .MuiLinearProgress-bar": { backgroundColor: "#003366" } 
                      }} 
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ width: 25, textAlign: "right" }}
                  >
                    {count}
                  </Typography>
                </Box>
              );
            })}
          </CardContent>
        </Card>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4
          }}
        >
          <Button sx={{ ml: 2, color: '#003366', borderColor: '#003366', '&:hover': { backgroundColor: '#003366', color: 'white' } }}
            variant="outlined"
            onClick={() => navigate(`/products/${id}/edit`)} // Navigera till produktredigeringssidan
          >
            Ändra produkt
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProductDetail;
