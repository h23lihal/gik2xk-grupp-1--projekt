const db = require('../models');
const { createResponsError, createResponsSuccess } = require('../helpers/responsHelper');


async function addProductToCart(customerId, productId, amount) {
    // Hämta eller skapa en varukorg
    const [cart] = await db.carts.findOrCreate({
        where: { customerId, payed: false },
        defaults: { customerId, payed: false }
    });

    // Hämta befintlig produkt i varukorgen
    let cartRows = await db.cartRows.findOne({
        where: { cartId: cart.id, productId }
    });

    if (cartRows) {
        // Uppdatera mängden om produkten redan finns
        cartRows.amount += amount;
        await cartRows.save();
    } else {
        // Lägg till produkten om den inte finns
        cartRows = await db.cartRows.create({
            cartId: cart.id,
            productId,
            amount
        });
    }

    return cartRows;
}

async function getUserCart(customerId) {
    try {
        console.log("Hämtar varukorg för customerId:", customerId); // 🔹 Logga för felsökning

        const [latestCart, created] = await db.carts.findOrCreate({
            where: { customerId, payed: false },
            defaults: { customerId, payed: false },
            order: [['createdAt', 'DESC']],
            include: [{
                model: db.cartRows,
                include: [db.products]
            }]
        });

        console.log("Varukorg hittad:", latestCart.id, "Ny skapad:", created);

        // Om den är ny, returnera en tom varukorg
        if (created) {
            return createResponsSuccess({ cartItems: [], totalCartPrice: 0 });
        }

        // Formatera produktdatan
        const cartItems = latestCart.cartRows.map(row => ({
            productId: row.product.id,
            title: row.product.title,
            price: row.product.price,
            amount: row.amount,
            totalPrice: row.amount * row.product.price
        }));

        // Beräkna totalpris för hela varukorgen
        const totalCartPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

        return createResponsSuccess({ cartItems, totalCartPrice });
    } catch (error) {
        console.error("Fel vid hämtning av varukorg:", error);
        return createResponsError(500, error.message || "Serverfel vid hämtning av varukorg");
    }
}

async function updateProductAmount(customerId, productId, amount) {
    try {
        const cart = await db.carts.findOne({
            where: { customerId, payed: false },
        });

        if (!cart) {
            return createResponsError(404, "Ingen öppen varukorg hittades");
        }

        const cartRow = await db.cartRows.findOne({
            where: { cartId: cart.id, productId },
        });

        if (!cartRow) {
            return createResponsError(404, "Produkten finns inte i varukorgen");
        }

        if (amount > 0) {
            cartRow.amount = amount;
            await cartRow.save();
            return createResponsSuccess({ message: "Antal uppdaterat", cartRow });
        } else {
            await cartRow.destroy();
            return createResponsSuccess({ message: "Produkten togs bort från varukorgen" });
        }
    } catch (error) {
        console.error("Fel vid uppdatering av varukorg:", error);
        return createResponsError(500, "Serverfel vid uppdatering av varukorg");
    }
}

async function removeProductFromCart(customerId, productId) {
    try {
        const cart = await db.carts.findOne({
            where: { customerId, payed: false },
        });

        if (!cart) {
            return createResponsError(404, "Ingen öppen varukorg hittades");
        }

        const cartRow = await db.cartRows.findOne({
            where: { cartId: cart.id, productId },
        });

        if (!cartRow) {
            return createResponsError(404, "Produkten finns inte i varukorgen");
        }

        await cartRow.destroy();
        return createResponsSuccess({ message: "Produkten togs bort från varukorgen" });
    } catch (error) {
        console.error("Fel vid borttagning av produkt:", error);
        return createResponsError(500, "Serverfel vid borttagning av produkt");
    }
}


module.exports = { addProductToCart, getUserCart, updateProductAmount, removeProductFromCart };