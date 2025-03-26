import { useState } from "react";
import RatingService from "../services/RatingService";
import { Rating, Button } from "@mui/material/";

function RatingForm({ productId }) {
  const [value, setValue] = useState(null); //Håller betygets värde

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value) {
        console.error("Inget betyg valt!"); // Säkerställer att ett betyg har valts
        return;
    }

    if (!productId) {
        console.error("productId saknas!"); //Säkerställer att productId finns
        return;
    }

    try {
        await RatingService.addRating(productId, value); //Skickar betyget till servern
        console.log("Betyg skickat!");
    } catch (error) {
        console.error("Kunde inte skicka betyg:", error); //Hanterar eventuella fel
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Rating
        name="hover-feedback"
        value={value}
        onChange={(event, newValue) => setValue(newValue)} //Uppdaterar state vid val
      />
      <Button type="submit">Skicka betyg</Button> {/* Skickar betyget */}
    </form>
  );
}

export default RatingForm;
