import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductItemLarge from "../components/ProductItemLarge";

// Tänk på att importera både RatingService och ProductService
import RatingService from "../services/RatingService";
import ProductService from "../services/ProductService";

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

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customerId = 1; // Byt till det faktiska customerId för inloggad användare

  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(1);

  // State för att lämna nytt betyg (utan kommentar)
  const [userRating, setUserRating] = useState(0);

  // Hämta produkt vid mount
  useEffect(() => {
    ProductService.getProductById(id)
      .then((data) => {
        console.log("Fetched product:", data);
        setProduct(data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <p className="p-5">Laddar...</p>;

  // Antal betyg totalt
  const totalRatings = product.ratings?.length || 0;

  // Snittbetyg
  const averageRating =
    totalRatings > 0
      ? product.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
      : 0;

  // Funktion för att räkna hur många som gett X stjärnor
  const getDistribution = (ratings) => {
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    (ratings || []).forEach((r) => {
      // Om dina betyg är heltal (1-5):
      const star = Math.round(r.rating);
      if (star >= 1 && star <= 5) {
        dist[star]++;
      }
    });
    return dist;
  };

  // Fördelning 5→1 stjärna
  const distribution = getDistribution(product.ratings);

  const handleAddToCart = async () => {
    try {
      await ProductService.addToCart(customerId, product.id, amount);
      setMessage("Produkten har lagts till i varukorgen!");
  
      // Sätt en timer för att ta bort meddelandet efter 3 sekunder
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(
        "Misslyckades att lägga till i varukorgen:",
        error.response ? error.response.data : error.message
      );
      setMessage("Kunde inte lägga till i varukorgen.");
  
      // Sätt en timer även för felmeddelandet
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };


  // Skicka in nytt betyg (utan kommentar)
  const handleSubmitRating = async () => {
    try {
      // Anropa din RatingService för att spara betyget
      await RatingService.addRating(product.id, userRating);

      // Hämta produkten igen för att uppdatera rating-listan och fördelning
      const updatedProduct = await ProductService.getProductById(id);
      setProduct(updatedProduct);

      // Nollställ
      setUserRating(0);
    } catch (error) {
      console.error("Kunde inte spara betyg:", error);
    }
  };

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {/* Vänster kolumn – Produktinfo */}
      <Grid item xs={12} md={8}>
        <ProductItemLarge product={product} />
        <Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
          <TextField
            label="Antal"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
            inputProps={{ min: 1 }}
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

      {/* Höger kolumn – Betyg (Amazon-liknande) */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title="Kundbetyg" />
          <CardContent>
            {/* Snittbetyg i stjärnor + text */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Rating
                name="average-rating"
                value={averageRating}
                precision={0.1}
                readOnly
              />
              <Typography variant="h6" sx={{ ml: 1 }}>
                {averageRating.toFixed(1)} / 5
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {totalRatings} kundbetyg totalt
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Användaren lägger till nytt betyg (utan kommentar) */}
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Sätt ditt betyg:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating
                name="user-rating"
                value={userRating}
                onChange={(event, newValue) => setUserRating(newValue)}
              />
         <Button 
         variant="contained"
          sx={{ ml: 2, backgroundColor: '#003366', color: 'white', '&:hover': { backgroundColor: '#002244' } }} 
          onClick={handleSubmitRating}
          disabled={userRating === 0}
        >
        Skicka
        </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Fördelning av betyg: 5 stjärnor -> 1 stjärna */}
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
            onClick={() => navigate(`/products/${id}/edit`)}
          >
            Ändra produkt
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProductDetail;
