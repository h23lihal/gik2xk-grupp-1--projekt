const router = require('express').Router(); // Skapar en ny Express-router
const cartServices = require('../services/cartServices'); // Importerar funktioner för hantering av varukorg
const db = require("../models"); // Importerar databasmodeller

// Route för att lägga till produkt i varukorgen
router.post('/addProduct', async (req, res) => {
    try {
        // Hämtar customerId, productId och amount från request body
        const { customerId, productId, amount } = req.body;
        
        // Om någon av dessa parametrar saknas, returneras ett felmeddelande
        if (!customerId || !productId || !amount) {
            return res.status(400).json({ message: "customerId, productId och amount är obligatoriska." });
        }

        // Anropar services för att lägga till produkten i varukorgen
        const cartRow = await cartServices.addProductToCart(customerId, productId, amount);

        // Returnerar ett framgångsmeddelande med den tillagda produktens information
        res.status(200).json({ message: 'Produkten lades till i varukorgen', cartRow });
    } catch (error) {
        console.error(error); // Loggar eventuella fel
        // Returnerar ett serverfel om något går fel vid hanteringen
        res.status(500).json({ message: "Fel vid hantering av varukorgen", error });
    }
});

// Route för att uppdatera mängden av en produkt i varukorgen
router.put('/updateProduct', async (req, res) => {
    try {
        // Hämtar customerId, productId och amount från request body
        const { customerId, productId, amount } = req.body;

        // Om någon av dessa parametrar saknas, returneras ett felmeddelande
        if (!customerId || !productId || amount === undefined) {
            return res.status(400).json({ message: "customerId, productId och amount är obligatoriska." });
        }

        // Anropar service för att uppdatera mängden på produkten i varukorgen
        const result = await cartServices.updateProductAmount(customerId, productId, amount);

        // Returnerar resultatet från service (status och data)
        res.status(result.status).json(result.data);
    } catch (error) {
        console.error(error); // Loggar eventuella fel
        // Returnerar ett serverfel om något går fel vid uppdateringen
        res.status(500).json({ message: "Fel vid uppdatering av varukorg", error });
    }
});

// Route för att ta bort produkt från varukorgen
router.delete('/removeProduct', async (req, res) => {
    try {
        // Hämtar customerId och productId från request body
        const { customerId, productId } = req.body;

        // Om någon av dessa parametrar saknas, returneras ett felmeddelande
        if (!customerId || !productId) {
            return res.status(400).json({ message: "customerId och productId är obligatoriska." });
        }

        // Anropar services för att ta bort produkten från varukorgen
        const result = await cartServices.removeProductFromCart(customerId, productId);

        // Returnerar resultatet från services (status och data)
        res.status(result.status).json(result.data);
    } catch (error) {
        console.error(error); // Loggar eventuella fel
        // Returnerar ett serverfel om något går fel vid borttagningen
        res.status(500).json({ message: "Fel vid borttagning av produkt", error });
    }
});

// Route för att rensa hela varukorgen
router.delete("/clearCart", async (req, res) => {
    try {
      // Hämtar kundens ID från request body
      const { customerId } = req.body;
  
      // Om customerId saknas, returneras ett felmeddelande
      if (!customerId) {
        return res.status(400).json({ message: "Kund-ID saknas" });
      }
  
      // Hämtar kundens varukorg från databasen
      const cart = await db.carts.findOne({
        where: { customer_id: customerId }
      });
  
      // Om varukorgen inte finns, returneras ett felmeddelande
      if (!cart) {
        return res.status(404).json({ message: "Ingen varukorg hittades" });
      }
  
      // Tar bort alla varukorgsrader från den specifika varukorgen
      await db.cartRows.destroy({
        where: { cart_id: cart.id }
      });
  
      // Returnerar ett framgångsmeddelande när varukorgen rensas
      res.json({ message: "Varukorgen har rensats" });
    } catch (error) {
      console.error("Fel vid rensning av varukorgen:", error); // Loggar eventuella fel
      // Returnerar ett serverfel om något går fel vid rensningen
      res.status(500).json({ message: "Serverfel vid rensning av varukorgen" });
    }
  });

module.exports = router; 