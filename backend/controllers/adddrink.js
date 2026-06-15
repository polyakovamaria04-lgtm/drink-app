import mongoose from "mongoose";
import { Drink } from "../models/Drink.js";
import { Ingredient } from "../models/Ingredient.js";

export const addDrink = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      glass,
      type,
      ingredients,
      recipe,
      imgUrl,
    } = req.body;

    if (!name || !category || !glass || !recipe) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const processedIngredients = [];

    if (ingredients && Array.isArray(ingredients)) {
      for (const item of ingredients) {
        if (!item.title) continue;

        const isObjectId = mongoose.Types.ObjectId.isValid(item.title);
        let ingredientId = isObjectId ? item.title : null;

        if (!isObjectId) {
          let existingIng = await Ingredient.findOne({
            title: { $regex: new RegExp(`^${item.title.trim()}$`, "i") },
          });

          if (!existingIng) {
            existingIng = await Ingredient.create({
              title: item.title.trim(),
              type: "Non Alcoholic",
              thumbUrl: "/images/placeholder.png",
              source: "custom",
            });
          }
          ingredientId = existingIng._id;
        }

        processedIngredients.push({
          ingredientId: ingredientId,
          amount: item.amount || "1",
          measure: item.measure || "cl",
        });
      }
    }

    const newDrink = await Drink.create({
      name,
      description,
      category,
      glass,
      type,
      recipe,
      imgUrl,
      ingredients: processedIngredients,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "The cocktail has been successfully created and saved!",
      drink: newDrink,
    });
  } catch (error) {
    console.error("Create drink error:", error);
    res.status(500).json({
      message: "Server error while creating drink",
      error: error.message,
    });
  }
};

export const deleteOwnDrink = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  try {
    const drink = await Drink.findOneAndDelete({ _id: id, owner: userId });
    if (!drink) {
      return res.status(404).json({ message: "Drink not found" });
    }
    res.status(200).json({ message: "Drink deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getOwnDrinks = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const drinks = await Drink.find({ owner: userId }).populate(
      "ingredients.ingredientId",
    );
    res.status(200).json(drinks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
