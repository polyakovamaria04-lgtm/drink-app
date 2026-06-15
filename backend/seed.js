import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import { Drink } from "./models/Drink.js";
import { Ingredient } from "./models/Ingredient.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const myOwnDrinks = require("../backend/src/data/cocktails.json");

dotenv.config();

const letters = ["a", "b", "c", "d", "m", "s", "g"];

const parseMeasure = (rawMeasure) => {
  if (!rawMeasure) return { amount: "1", measure: "cl" };
  const trimmed = rawMeasure.trim();
  const match = trimmed.match(/^([0-9\s\/\.]+)?\s*(.*)$/);
  return {
    amount: match && match[1] ? match[1].trim() : "1",
    measure: match && match[2] ? match[2].trim() : "cl",
  };
};

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected successfully.");

    console.log("Fetching ingredients from CocktailDB...");
    const ingResponse = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list",
    );
    const apiIngredients = ingResponse.data.drinks || [];

    for (const item of apiIngredients) {
      await Ingredient.updateOne(
        { title: item.strIngredient1 },
        { $setOnInsert: { title: item.strIngredient1, type: "Non Alcoholic" } },
        { upsert: true },
      );
    }
    console.log("Ingredients collection synced.");

    const dbIngredients = await Ingredient.find({});
    const ingredientMap = new Map(
      dbIngredients.map((i) => [i.title.toLowerCase(), i._id]),
    );

    let allFetchedDrinks = [];
    console.log("Start fetching cocktails from API...");
    for (const letter of letters) {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`,
      );
      if (response.data?.drinks) {
        allFetchedDrinks = [...allFetchedDrinks, ...response.data.drinks];
      }
    }

    const formattedApiDrinks = [];
    for (const drink of allFetchedDrinks) {
      const parsedIngredients = [];
      for (let i = 1; i <= 15; i++) {
        const name = drink[`strIngredient${i}`];
        if (name) {
          const { amount, measure } = parseMeasure(drink[`strMeasure${i}`]);
          let ingredientId = ingredientMap.get(name.toLowerCase());
          parsedIngredients.push({ ingredientId, amount, measure });
        }
      }
      formattedApiDrinks.push({
        name: drink.strDrink,
        category: drink.strCategory || "Cocktail",
        type: drink.strAlcoholic?.toLowerCase().includes("non")
          ? "Non_Alcoholic"
          : "Alcoholic",
        imgUrl: drink.strDrinkThumb,
        glass: drink.strGlass,
        recipe: drink.strInstructions,
        description: `A wonderful classic elite drink.`,
        ingredients: parsedIngredients,
      });
    }

    const formattedMyOwnDrinks = [];
    for (const drink of myOwnDrinks) {
      const parsedIngredients =
        drink.ingredients?.map((ing) => ({
          ingredientId: ingredientMap.get(ing.title?.toLowerCase()),
          amount: ing.amount || "1",
          measure: ing.measure || "cl",
        })) || [];

      formattedMyOwnDrinks.push({ ...drink, ingredients: parsedIngredients });
    }

    console.log("Saving all drinks to database...");
    await Drink.deleteMany({});
    await Drink.insertMany([...formattedApiDrinks, ...formattedMyOwnDrinks]);

    console.log("Successfully seeded database!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedDatabase();
