const router = require('express').Router(); // Skapar en ny Express-router
const db = require('../models'); // Importerar modeller för att interagera med databasen
const validate = require('validate.js'); // Importerar validate.js för validering av indata
const cartServices = require('../services/cartServices'); // Importerar services för hantering av varukorg

// Valideringsrestriktioner för e-post
const constraints = {
    email: {
        length: {
            minimum: 4,
            maximum: 200,
            tooShort: '^E-postadressen måste vara minst %{count} tecken lång.',
            tooLong: '^E-postadressen får inte vara längre än %{count} tecken lång.'
        },
        email: { message: "^E-postadressen är i fel format." }
    }
};

// Hämtar varukorg för en specifik kund baserat på kund-ID
router.get("/:id/getCart", async (req, res) => {
    try { 
        const customerId = req.params.id; // Hämtar kund-ID från URL-parametern
        const result = await cartServices.getUserCart(customerId); // Hämtar kundens varukorg
        res.status(result.status).json(result.data); // Returnerar resultatet
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ message: "Serverfel", error }); // Hanterar eventuella serverfel
    } 
});

// CRUD-operations för kunddata

// Hämtar alla kunder från databasen
router.get('/', async (req, res) => {
    try {
        const customers = await db.customers.findAll(); // Hämtar alla kunder
        res.json(customers); // Returnerar kunder som JSON
    } catch (error) {
        res.status(500).json({ message: "Serverfel", error }); // Hanterar eventuella serverfel
    }
});

// Skapar en ny kund
router.post('/', async (req, res) => {
    const customer = req.body; // Hämtar kunddata från request body
    const invalidData = validate(customer, constraints); // Validerar kunddata

    if (invalidData) {
        return res.status(400).json(invalidData); // Returnerar fel om valideringen misslyckas
    }

    try {
        const newCustomer = await db.customers.create(customer); // Skapar en ny kund i databasen
        res.json(newCustomer); // Returnerar den skapade kunden
    } catch (error) {
        res.status(500).json({ message: "Kunde inte skapa kund", error }); // Hanterar serverfel
    }
});

// Uppdaterar en kund
router.put('/', async (req, res) => {
    const customer = req.body; // Hämtar kunddata från request body
    const id = customer.id; // Hämtar kundens ID från data
    const invalidData = validate(customer, constraints); // Validerar kunddata

    if (!id || invalidData) {
        return res.status(400).json(invalidData || { message: "Id är obligatoriskt." }); // Felhantering om ID saknas eller valideringen misslyckas
    }

    try {
        await db.customers.update(customer, { where: { id } }); // Uppdaterar kunddata i databasen
        res.json({ message: "Kunden uppdaterades." }); // Returnerar ett framgångsmeddelande
    } catch (error) {
        res.status(500).json({ message: "Kunde inte uppdatera kunden", error }); // Hanterar serverfel
    }
});

// Raderar en kund
router.delete('/', async (req, res) => {
    const { id } = req.body; // Hämtar kundens ID från request body

    try {
        const result = await db.customers.destroy({ where: { id } }); // Raderar kunden från databasen
        res.json({ message: `Kunden raderades: ${result}` }); // Returnerar resultatet av borttagningen
    } catch (error) {
        res.status(500).json({ message: "Kunde inte radera kunden", error }); // Hanterar serverfel
    }
});

module.exports = router;