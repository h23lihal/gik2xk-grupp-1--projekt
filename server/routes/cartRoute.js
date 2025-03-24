const router = require('express').Router();
const cartServices = require('../services/cartServices');
const db = require("../models"); 

router.post('/addProduct', async (req, res) => {
    try {
        const { customerId, productId, amount } = req.body;
        if (!customerId || !productId || !amount) {
            return res.status(400).json({ message: "customerId, productId och amount är obligatoriska." });
        }

        const cartRow = await cartServices.addProductToCart(customerId, productId, amount);
        res.status(200).json({ message: 'Produkten lades till i varukorgen', cartRow });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Fel vid hantering av varukorgen", error });
    }
});

router.put('/updateProduct', async (req, res) => {
    try {
        const { customerId, productId, amount } = req.body;
        if (!customerId || !productId || amount === undefined) {
            return res.status(400).json({ message: "customerId, productId och amount är obligatoriska." });
        }

        const result = await cartServices.updateProductAmount(customerId, productId, amount);
        res.status(result.status).json(result.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Fel vid uppdatering av varukorg", error });
    }
});

router.delete('/removeProduct', async (req, res) => {
    try {
        const { customerId, productId } = req.body;
        if (!customerId || !productId) {
            return res.status(400).json({ message: "customerId och productId är obligatoriska." });
        }

        const result = await cartServices.removeProductFromCart(customerId, productId);
        res.status(result.status).json(result.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Fel vid borttagning av produkt", error });
    }
});

router.delete("/clearCart", async (req, res) => {
    try {
      const { customerId } = req.body; // Hämta kund-ID från request-body
  
      if (!customerId) {
        return res.status(400).json({ message: "Kund-ID saknas" });
      }
  
      // Hämta kundens varukorg
      const cart = await db.carts.findOne({
        where: { customer_id: customerId }
      });
  
      if (!cart) {
        return res.status(404).json({ message: "Ingen varukorg hittades" });
      }
  
      // Radera alla varor i varukorgen
      await db.cartRows.destroy({
        where: { cart_id: cart.id }
      });
  
      res.json({ message: "Varukorgen har rensats" });
    } catch (error) {
      console.error("❌ Fel vid rensning av varukorgen:", error);
      res.status(500).json({ message: "Serverfel vid rensning av varukorgen" });
    }
  });

module.exports = router;