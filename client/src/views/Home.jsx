import ProductList from "../components/ProductList";
import { Typography } from '@mui/material';

export default function Home() {
  return (
    <Typography
      className="p-5"
      sx={{
        fontFamily: '"Delius Swash Caps", cursive', 
      }}
    >
      <h1
        className="text-3xl font-bold mb-4"
        style={{ fontFamily: '"Delius Swash Caps", cursive' }} 
      >
        Välkommen till TeaTime!
      </h1>
      <ProductList />
    </Typography>
  );
}