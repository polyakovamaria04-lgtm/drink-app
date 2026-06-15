import { Drink } from "../models/Drink.js";
export const getPopularDrinks = async (req, res, next) => {
  try {
    const drinksFromDb = await Drink.find().limit(4).lean();

    const popularDrinks = drinksFromDb.map((drink) => {
      if (!drink.description && drink.recipe) {
        drink.description =
          drink.recipe.length > 70
            ? `${drink.recipe.substring(0, 70)}...`
            : drink.recipe;
      } else if (!drink.description) {
        drink.description = "A wonderful refreshing cocktail for your evening.";
      }
      return drink;
    });

    res.status(200).json(popularDrinks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
