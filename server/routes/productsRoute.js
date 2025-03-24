const router = require('express').Router();
const db = require('../models');
const validate = require("validate.js");
const productServices = require('../services/productServices');


// GET request för att hämta produkter
router.get('/', (req, res) => {
    productServices.getAll().then((result) => {
        res.status(result.status).json(result.data);
    });
});


router.get('/:id/', (req, res) => {
    const id = req.params.id;
    productServices.getById(id).then((result) =>  {
        res.status(result.status).json(result.data);
    });
});


// POST request för att skapa en ny produkt (eller ta emot data)
router.post('/', (req, res) => {
    const products = req.body;  // Hämta body-data från requesten

    productServices.create(products)  // Skicka products till create-funktionen
        .then((result) => {
            res.status(result.status).json(result.data);
        })
        .catch((error) => {
            console.error("Fel vid skapande av produkt:", error);
            res.status(500).json({ message: "Serverfel vid skapande av produkt", error });
        });
});


router.post("/:id/addRating", async (req, res) => {
  const { rating } = req.body; // Hämta betyg från request
  const productId = req.params.id; // Hämta produktens ID

  if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Betyg måste vara mellan 1 och 5" });
  }

  try {
      const result = await productServices.addRating(productId, rating);
      res.status(result.status).json(result.data);
  } catch (error) {
      console.error("Fel vid tillägg av betyg:", error);
      res.status(500).json({ message: "Serverfel vid tillägg av betyg" });
  }
});
  



router.put('/:id', (req, res) => {
    const id = req.params.id;
    const productData = req.body;
  
    productServices.update(productData, id).then((result) => {
      res.status(result.status).json(result.data);
    }).catch(error => {
      console.error("Fel vid uppdatering av produkt:", error);
      res.status(500).json({ message: "Serverfel vid uppdatering av produkt", error });
    });
});



router.delete('/:id', (req, res) => {
    const id = req.params.id;
  
    db.products.destroy({ where: { id } }).then((result) => {
        if (result === 0) {
            return res.status(404).json({ message: "Produkten hittades inte" });
        }
        res.json({ message: "Produkten har raderats" });
    }).catch(error => {
        console.error("Fel vid borttagning av produkt:", error);
        res.status(500).json({ message: "Serverfel vid borttagning av produkt", error });
    });
});




module.exports = router;


