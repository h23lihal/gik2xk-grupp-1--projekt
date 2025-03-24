import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function CartItem({ id, product }) {
    return (
        <div>
            <Link to={`/customers/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img width="200" src={product.imageUrl} alt={product.title} />
                <Typography variant="h6">Pris: {product.price} kr</Typography>
                </Link>
            
        </div>
    );
}

export default CartItem;