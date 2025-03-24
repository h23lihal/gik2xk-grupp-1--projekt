import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartService from "../services/CartService";
import CartModal from "./CartModal";

const Cart = () => {
  const { customerId } = useParams(); // Hämta customerId från URL:en
  const [cartRows, setCartRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("🔍 Hittat customerId från useParams():", customerId);

    if (!customerId) return;

    CartService.getCartItems(customerId).then((data) => {
      console.log("🛒 Data i varukorgen:", data);
      setCartRows(data.cartItems || []);
    });
  }, [customerId]);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Öppna varukorg</button>

      {cartRows.length === 0 ? (
        <p>Varukorgen är tom.</p>
      ) : (
        <ul>
          {cartRows.map((product) => (
            <CartItem key={product.productId} product={product} />
          ))}
        </ul>
      )}

      {/* ✅ Se till att customerId skickas till CartModal */}
      <CartModal Id={customerId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Cart;