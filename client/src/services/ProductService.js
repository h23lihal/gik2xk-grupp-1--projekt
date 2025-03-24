const API_BASE = "http://localhost:5001"; // Uppdatera vid behov

const ProductService = {
  getAllProducts: async () => {
    const response = await fetch(`${API_BASE}/products`);
    return response.json();
  },

  getProductById: async (id) => {
    const response = await fetch(`${API_BASE}/products/${id}`);
    return response.json();
  },

addToCart: async (customerId, productId, amount = 1) => {
  const response = await fetch(`${API_BASE}/cart/addProduct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId, productId, amount }),
  });

  return response.json();
},

getCart: async (Id) => {
  const response = await fetch(`${API_BASE}/${Id}/getCart`);
  return response.json();
},
};

export default ProductService;
    