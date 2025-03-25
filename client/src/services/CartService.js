import axios from 'axios';

const API_BASE = "http://localhost:5001"; 

const CartService = {
  getCartItems: async (customerId) => {
    if (!customerId) {
      console.error("Inget kund-ID angivet vid hämtning av varukorg!");
      return { cartItems: [], totalCartPrice: 0 }; 
    }

    try {
      console.log(`Hämtar varukorg för customerId: ${customerId}`);
      const response = await axios.get(`${API_BASE}/customers/${customerId}/getCart`);
      console.log("Hämtad varukorg:", response.data);
      return response.data;
    } catch (error) {
      console.error("Fel vid hämtning av varukorg:", error.response?.data || error.message);
      return { cartItems: [], totalCartPrice: 0 }; 
    }
  }
};

export default CartService;