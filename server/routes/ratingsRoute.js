const router = require('express').Router();
const db = require('../models');

// GET request för att hämta produkter
router.get('/', (req, res) => {
    db.ratings.findAll().then((result) => {
        res.send(result);
    });
});

// POST request för att skapa en ny produkt (eller ta emot data)
router.post('/', (req, res) => {
db.ratings.create(req.body).then(result => {
    res.send(result);
});
});


module.exports = router;

