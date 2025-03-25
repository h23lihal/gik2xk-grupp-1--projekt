import { useState } from "react";
import RatingService from "../services/RatingService";
import {Rating, Button} from "@mui/material/";

function RatingForm({ productId }) {
  const [value, setValue] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value) {
        console.error("Inget betyg valt!");
        return;
    }

    if (!productId) {
        console.error("productId saknas!");
        return;
    }

    console.log("Skickar betyg:", { productId, rating: value });

    try {
        await RatingService.addRating(productId, value);
        console.log("Betyg skickat!");
    } catch (error) {
        console.error("Kunde inte skicka betyg:", error);
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => setValue(newValue)}
      />
      <Button type="submit">Skicka betyg</Button>
    </form>
  );
}

export default RatingForm;
