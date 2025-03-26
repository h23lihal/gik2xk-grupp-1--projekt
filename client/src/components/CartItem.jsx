import { Button, Typography, Grid} from "@mui/material"; // Importera Material UI-komponenter för styling
import { Link } from "react-router-dom"; // Importera Link-komponent från react-router för navigering

function CartItem({ id, product }) {
    return (
        <Grid>
            {/* Skapar en länk som leder till kundens sida baserat på deras id */}
            <Link to={`/customers/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
                {/* Visa produktens pris */}
                <Typography variant="h6">Pris: {product.price} kr</Typography>
            </Link>
        </Grid>
    );
}

export default CartItem; 