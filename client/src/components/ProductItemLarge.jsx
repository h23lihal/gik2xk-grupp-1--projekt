import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ProductItemLarge({ product }) {
    return (
        <div>
            <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <h3>{product.title}</h3>
                <img width="200" src={product.imageUrl} alt={product.title} />
                <Typography variant="body2">Beskrivning: {product.description}</Typography>
                <Typography variant="h6">Pris: {product.price} kr</Typography>
                </Link>
            
        </div>
    );
}

export default ProductItemLarge;