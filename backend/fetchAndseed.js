import mongoose from "mongoose";
import axios from "axios";
import Drink from "./models/Drink.js";
import dotenv from "dotenv";

dotenv.config();

const fetchFromCocktailDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected for API integration...");

    const letters = ["b", "c", "d", "m", "s", "g"];
    let allFormattedDrinks = [];

    for (const letter of letters) {
      console.log(`📡 Fetching drinks for letter: ${letter}...`);

      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`,
      );

      const apiDrinks = response.data.drinks;

      if (!apiDrinks) {
        console.log(`No drinks found for letter ${letter}.`);
        continue;
      }

      const formattedDrinks = apiDrinks.map((drink) => {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
          const ingredientName = drink[`strIngredient${i}`];
          if (ingredientName) {
            ingredients.push({
              title: ingredientName,
              type:
                drink.strAlcoholic === "Alcoholic" ? "Alcohol" : "Ingredient",
            });
          }
        }

        let drinkType = "Alcoholic";
        if (
          drink.strAlcoholic === "Non alcoholic" ||
          drink.strAlcoholic === "Non Alcoholic"
        ) {
          drinkType = "Non_Alcoholic";
        }

        return {
          name: drink.strDrink,
          category: drink.strCategory || "Cocktail",
          type: drinkType,
          glass: drink.strGlass,
          description: `A wonderful classic elite drink known as ${drink.strDrink}. Perfect choice for any special event or a relaxing evening.`,
          recipe: drink.strInstructions,
          imgUrl: drink.strDrinkThumb,
          ingredients: ingredients,
        };
      });

      allFormattedDrinks = [...allFormattedDrinks, ...formattedDrinks];
    }

    if (allFormattedDrinks.length > 0) {
      await Drink.insertMany(allFormattedDrinks);
      console.log(
        `🚀 Successfully added ${allFormattedDrinks.length} NEW drinks from CocktailDB!`,
      );
    } else {
      console.log("No new drinks to add.");
    }

    await mongoose.disconnect();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error during API seeding:", error);
    process.exit(1);
  }
};

fetchFromCocktailDB();
