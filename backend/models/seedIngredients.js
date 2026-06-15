import axios from "axios";
import Ingredient from "../models/Ingredient.js";

export const fetchAndSaveIngredients = async () => {
  const response = await axios.get(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list",
  );
  const ingredients = response.data.drinks;

  for (const item of ingredients) {
    await Ingredient.findOneAndUpdate(
      { title: item.strIngredient1 },
      {
        title: item.strIngredient1,
        thumbUrl: `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png`,
      },
      { upsert: true },
    );
  }
};
