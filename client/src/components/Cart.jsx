import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartService from "../services/CartService";

const Cart = () => {
  const { userId } = useParams(); // Hämta userId från URL:en
  const [cartRows, setCartRows] = useState([]);

  useEffect(() => {
    if (!userId) return; // Om userId saknas, gör inget anrop

    CartService.getCartItems(userId)
      .then((data) => {
        console.log("Fetched cart items:", data);
        setCartRows(data);
      })
      .catch((err) => console.error("Error fetching cart items:", err));
  }, [userId]);

  return (
    <div>
      {cartRows.length === 0 ? (
        <p>Varukorgen är tom.</p>
      ) : (
        <ul>
          {cartRows.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;