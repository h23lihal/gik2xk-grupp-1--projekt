// Hantera betyg för produkter
const RatingService = {
    // Funktion för att lägga till ett betyg för en produkt
    async addRating(productId, rating) {
        // Gör ett POST-anrop till servern för att skicka betyget
        return fetch(`http://localhost:5001/products/${productId}/addRating`, {
            method: "POST", // HTTP-metoden som används för att skicka data
            headers: { "Content-Type": "application/json" }, // Sätter headern för att indikera att vi skickar JSON-data
            body: JSON.stringify({ rating }), // Omvandlar betyget till en JSON-sträng och skickar det som body
        });
    }
};

export default RatingService;