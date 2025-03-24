import axios from "axios";

const API_BASE = "http://localhost:5001";

const ProductService = {
  // Hämta alla produkter
  getAllProducts: async () => {
    const response = await axios.get(`${API_BASE}/products`);
    return response.data;
  },

  // Hämta en produkt baserat på ID
  getProductById: async (id) => {
    const response = await axios.get(`${API_BASE}/products/${id}`);
    return response.data;
  },

  // Skapa en ny produkt
  createProduct: async (product) => {
    const response = await axios.post(`${API_BASE}/products`, product);
    return response.data;
  },

  // Uppdatera en produkt
  updateProduct: async (product) => {
    if (!product.id) throw new Error("Produkt-ID saknas vid uppdatering");
    const response = await axios.put(`${API_BASE}/products/${product.id}`, product);
    return response.data;
  },

  // Ta bort en produkt
  deleteProduct: async (id) => {
    if (!id) throw new Error("Produkt-ID saknas vid borttagning");
    const response = await axios.delete(`${API_BASE}/products/${id}`);
    return response.data;
  },

  // ✅ Lägg tillbaka funktionen för att lägga till i varukorgen
  addToCart: async (customerId, productId, amount = 1) => {
    const response = await axios.post(`${API_BASE}/cart/addProduct`, {
      customerId,
      productId,
      amount,
    });

    return response.data;
  },

  // ✅ Lägg tillbaka funktionen för att hämta varukorgen
  getCart: async (customerId) => {
    const response = await axios.get(`${API_BASE}/customers/${customerId}/getCart`);
    return response.data;
  },
};

export default ProductService;
    