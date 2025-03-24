const router = require('express').Router();
const cartServices = require('../services/cartServices');

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

module.exports = router;