import axios from 'axios';

const API_BASE = "http://localhost:5001"; // Bas-URL för API-anrop

const CartService = {
  // Funktion för att hämta varukorgen för en specifik kund
  getCartItems: async (customerId) => {
    if (!customerId) {
      console.error("Inget kund-ID angivet vid hämtning av varukorg!");
      return { cartItems: [], totalCartPrice: 0 }; // Returnerar en tom varukorg om kund-ID saknas
    }

    try {
      console.log(`Hämtar varukorg för customerId: ${customerId}`);
      const response = await axios.get(`${API_BASE}/customers/${customerId}/getCart`);
      console.log("Hämtad varukorg:", response.data);
      return response.data; // Returnerar data från servern 
    } catch (error) {
      console.error("Fel vid hämtning av varukorg:", error.response?.data || error.message);
      return { cartItems: [], totalCartPrice: 0 }; // Returnerar en tom varukorg vid fel
    }
  }
};

export default CartService;