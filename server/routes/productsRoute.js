const router = require('express').Router(); // Skapar en ny Express-router
const db = require('../models'); // Importerar modeller för att interagera med databasen
const validate = require("validate.js"); // Importerar validate.js för att validera indata
const productServices = require('../services/productServices'); // Importerar services för produktrelaterade operationer

// GET request för att hämta alla produkter
router.get('/', (req, res) => {
    productServices.getAll().then((result) => { // Hämtar alla produkter via produktservice
        res.status(result.status).json(result.data); // Returnerar resultatet som JSON
    });
});

// GET request för att hämta en specifik produkt baserat på produkt-ID
router.get('/:id/', (req, res) => {
    const id = req.params.id; // Hämtar produktens ID från URL-parametern
    productServices.getById(id).then((result) =>  { // Hämtar produkt baserat på ID
        res.status(result.status).json(result.data); // Returnerar resultatet som JSON
    });
});

// POST request för att skapa en ny produkt
router.post('/', (req, res) => {
    const products = req.body;  // Hämtar body-data från requesten

    productServices.create(products)  // Anropar create-funktionen från productServices
        .then((result) => {
            res.status(result.status).json(result.data); // Returnerar skapad produkt som JSON
        })
        .catch((error) => {
            console.error("Fel vid skapande av produkt:", error);
            res.status(500).json({ message: "Serverfel vid skapande av produkt", error }); // Hanterar fel vid skapande
        });
});

// POST request för att lägga till betyg på en produkt
router.post("/:id/addRating", async (req, res) => {
    const { rating } = req.body; // Hämtar betyg från request
    const productId = req.params.id; // Hämtar produktens ID från URL-parametern

    if (!rating || rating < 1 || rating > 5) { // Validering av betyget (måste vara mellan 1 och 5)
        return res.status(400).json({ message: "Betyg måste vara mellan 1 och 5" });
    }

    try {
        const result = await productServices.addRating(productId, rating); // Lägg till betyg via produktservice
        res.status(result.status).json(result.data); // Returnera resultatet
    } catch (error) {
        console.error("Fel vid tillägg av betyg:", error);
        res.status(500).json({ message: "Serverfel vid tillägg av betyg" }); // Hantera serverfel
    }
});

// PUT request för att uppdatera en produkt
router.put('/:id', (req, res) => {
    const id = req.params.id; // Hämtar produktens ID från URL-parametern
    const productData = req.body; // Hämtar produktens uppdaterade data från body

    productServices.update(productData, id) // Uppdaterar produkt via produktservice
        .then((result) => {
            res.status(result.status).json(result.data); // Returnera uppdaterad produkt
        }).catch(error => {
            console.error("Fel vid uppdatering av produkt:", error);
            res.status(500).json({ message: "Serverfel vid uppdatering av produkt", error }); // Hantera serverfel
        });
});

// DELETE request för att ta bort en produkt
router.delete('/:id', (req, res) => {
    const id = req.params.id; // Hämtar produktens ID från URL-parametern

    db.products.destroy({ where: { id } }) // Raderar produkt från databasen baserat på ID
        .then((result) => {
            if (result === 0) { // Om ingen produkt raderas, returnera ett 404
                return res.status(404).json({ message: "Produkten hittades inte" });
            }
            res.json({ message: "Produkten har raderats" }); // Bekräftar att produkten har raderats
        }).catch(error => {
            console.error("Fel vid borttagning av produkt:", error);
            res.status(500).json({ message: "Serverfel vid borttagning av produkt", error }); // Hantera serverfel
        });
});

module.exports = router;


