import axios from 'axios';

const CartService = {
  // Hämta alla produkter i den senaste varukorgen för användaren
  getCartItems: (Id) => {
    return axios
      .get(`http://localhost:5001/cart/${Id}/getCart`)
      .then(response => response.data) // Vi returnerar data från API:et
      .catch(error => {
        console.error('Fel vid hämtning av varukorgens produkter:', error);
        throw error;
      });
  }
};

export default CartService;