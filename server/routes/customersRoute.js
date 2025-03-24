const router = require('express').Router();
const db = require('../models'); // Importera hela models-objektet
const validate = require('validate.js');
const cartServices = require('../services/cartServices');




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

router.get("/:id/getCart", async (req, res) => {
     try { 
        const customerId = req.params.id;
        const result = await cartServices.getUserCart(customerId);
        res.status(result.status).json(result.data);
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ message: "Serverfel", error }); 
    } 
});

// CRUD för testdata
router.get('/', async (req, res) => {
    try {
        const customers = await db.customers.findAll();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: "Serverfel", error });
    }
});

router.post('/', async (req, res) => {
    const customer = req.body;
    const invalidData = validate(customer, constraints);

    if (invalidData) {
        return res.status(400).json(invalidData);
    }

    try {
        const newCustomer = await db.customers.create(customer);
        res.json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: "Kunde inte skapa kund", error });
    }
});

router.put('/', async (req, res) => {
    const customer = req.body;
    const id = customer.id;
    const invalidData = validate(customer, constraints);

    if (!id || invalidData) {
        return res.status(400).json(invalidData || { message: "Id är obligatoriskt." });
    }

    try {
        await db.customers.update(customer, { where: { id } });
        res.json({ message: "Kunden uppdaterades." });
    } catch (error) {
        res.status(500).json({ message: "Kunde inte uppdatera kunden", error });
    }
});

router.delete('/', async (req, res) => {
    const { id } = req.body;

    try {
        const result = await db.customers.destroy({ where: { id } });
        res.json({ message: `Kunden raderades: ${result}` });
    } catch (error) {
        res.status(500).json({ message: "Kunde inte radera kunden", error });
    }
});

module.exports = router;