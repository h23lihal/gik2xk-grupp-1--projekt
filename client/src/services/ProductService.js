import axios from "axios";

const API_BASE = "http://localhost:5001"; // Bas-URL för API-anrop

const ProductService = {
  // Hämta alla produkter från servern
  getAllProducts: async () => {
    const response = await axios.get(`${API_BASE}/products`);
    return response.data;
  },

  // Hämta en specifik produkt baserat på dess ID
  getProductById: async (id) => {
    const response = await axios.get(`${API_BASE}/products/${id}`);
    return response.data;
  },

  // Skapa en ny produkt genom att skicka ett POST-anrop till API:et
  createProduct: async (product) => {
    const response = await axios.post(`${API_BASE}/products`, product);
    return response.data;
  },

  // Uppdatera en befintlig produkt, kräver att produkten har ett ID
  updateProduct: async (product) => {
    if (!product.id) throw new Error("Produkt-ID saknas vid uppdatering");
    const response = await axios.put(`${API_BASE}/products/${product.id}`, product);
    return response.data;
  },

  // Ta bort en produkt genom att ange dess ID
  deleteProduct: async (id) => {
    if (!id) throw new Error("Produkt-ID saknas vid borttagning");
    const response = await axios.delete(`${API_BASE}/products/${id}`);
    return response.data;
  },

  // Lägg till en produkt i varukorgen för en specifik kund
  addToCart: async (customerId, productId, amount = 1) => {
    const response = await axios.post(`${API_BASE}/cart/addProduct`, {
      customerId,
      productId,
      amount,
    });

    return response.data;
  },

  // Hämta en kunds varukorg baserat på kund-ID
  getCart: async (customerId) => {
    const response = await axios.get(`${API_BASE}/customers/${customerId}/getCart`);
    return response.data;
  },
};

export default ProductService;
    
    