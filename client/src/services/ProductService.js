import axios from "axios";

const API_BASE = "http://localhost:5001"; // Uppdatera vid behov

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
    const response = await axios.put(`${API_BASE}/products/${product.id}`, product);
    return response.data;
  },

  // Ta bort en produkt
  deleteProduct: async (id) => {
    const response = await axios.delete(`${API_BASE}/products/${id}`);
    return response.data;
  }
};

export default ProductService;
    