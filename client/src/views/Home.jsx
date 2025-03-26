// Importerar komponenten ProductList och Typography från Material UI
import ProductList from "../components/ProductList";
import { Typography, Box } from '@mui/material';

// Funktionell komponent som representerar hemsidan
export default function Home() {
  return (
    // Box används för att skapa en container runt innehållet och tillämpa padding
    <Box sx={{ padding: 5 }}>
      {/* Typography används här för att ge stil åt rubriken */}
      <Typography
        variant="h3" // Använder Material UI:s inbyggda variant för en stor rubrik
        align="center" // Centrerar texten
        fontFamily='"Delius Swash Caps", cursive'
        fontWeight="bold" // Sätter texten till fetstil
        marginBottom={4} // Sätter marginal mellan rubrik och innehåll
      >
        Välkommen till TeaTime!
      </Typography>

      {/* Komponent som visar produktlistan */}
      <ProductList />
    </Box>
  );
}