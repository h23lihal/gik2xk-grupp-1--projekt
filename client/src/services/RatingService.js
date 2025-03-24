const RatingService = {
    async addRating(productId, rating) {
        return fetch(`http://localhost:5001/products/${productId}/addRating`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rating }),
        });
    }
};

export default RatingService;