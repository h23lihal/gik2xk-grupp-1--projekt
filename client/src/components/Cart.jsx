import { useParams } from "react-router-dom"; // Hämtar customerId från URL
import { useEffect, useState } from "react"; // För state och effekt-hantering
import CartItem from "./CartItem"; // Komponent för att visa en produkt i varukorgen
import CartService from "../services/CartService"; // Service för att hämta varukorgens produkter
import CartModal from "./CartModal"; // Modal-komponent för att visa varukorgen

const Cart = () => {
  const { customerId } = useParams(); // Hämta customerId från URL
  const [cartRows, setCartRows] = useState([]); // State för varukorgens produkter
  const [isModalOpen, setIsModalOpen] = useState(false); // State för om modal är öppen eller stängd

  useEffect(() => {
    if (!customerId) return; // Om customerId saknas, gör inget

    // Hämta varukorgens produkter och uppdatera state
    CartService.getCartItems(customerId).then((data) => {
      setCartRows(data.cartItems || []);
    });
  }, [customerId]); // Kör när customerId ändras

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Öppna varukorg</button>

      {/* Visa meddelande om varukorgen är tom, annars lista produkterna */}
      {cartRows.length === 0 ? (
        <p>Varukorgen är tom.</p>
      ) : (
        <ul>
          {cartRows.map((product) => (
            <CartItem key={product.productId} product={product} />
          ))}
        </ul>
      )}

      {/* Skicka customerId till CartModal */}
      <CartModal Id={customerId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Cart;