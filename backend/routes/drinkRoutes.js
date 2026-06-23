import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { Drink } from "../models/Drink.js";
import { getPopularDrinks } from "../controllers/recipes.js";

import { Ingredient } from "../models/Ingredient.js";
import {
  addDrink,
  getOwnDrinks,
  deleteOwnDrink,
} from "../controllers/adddrink.js";

import {
  getFavoriteDrinks,
  addToFavorites,
  removeFromFavorites,
} from "../controllers/favorites.js";

const router = express.Router();

router.post("/own", authMiddleware, addDrink);

router.get("/popular", getPopularDrinks);
router.get("/own", authMiddleware, getOwnDrinks);
router.delete("/own/:id", authMiddleware, deleteOwnDrink);

router.get("/ingredients-list", async (req, res) => {
  try {
    const ingredients = await Ingredient.find().sort({ title: 1 });
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/category-list", async (req, res) => {
  try {
    const categories = await Drink.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(200)
      .json([
        "Ordinary Drink",
        "Cocktail",
        "Shake",
        "Other/Unknown",
        "Cocoa",
        "Shot",
      ]);
  }
});

router.get("/glass-list", async (req, res) => {
  try {
    const dbGlasses = await Drink.distinct("glass");

    const staticGlasses = [
      "Highball glass",
      "Cocktail glass",
      "Old-fashioned glass",
      "Whiskey Glass",
      "Collins glass",
      "Pousse cafe glass",
      "Champagne flute",
      "Whiskey sour glass",
      "Cordial glass",
      "Brandy snifter",
      "White wine glass",
    ];

    const allGlasses = [...new Set([...staticGlasses, ...dbGlasses])];

    res.status(200).json(allGlasses);
  } catch (error) {
    res
      .status(200)
      .json([
        "Highball glass",
        "Cocktail glass",
        "Old-fashioned glass",
        "Shot glass",
      ]);
  }
});

router.get("/favorite", authMiddleware, getFavoriteDrinks);
router.patch("/favorite/add/:id", authMiddleware, addToFavorites);
router.delete("/favorite/remove/:id", authMiddleware, removeFromFavorites);

router.post("/favorites", authMiddleware, (req, res) => {});

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const queryLimit = parseInt(req.query.limit, 10);
    const limit = isNaN(queryLimit) ? 9 : queryLimit;

    const search = req.query.search || "";
    const category = req.query.category || "";
    const ingredientId = req.query.ingredientId || "";

    const query = {};

    if (search.trim() !== "") {
      query.name = { $regex: search, $options: "i" };
    }

    if (category && category !== "All categories") {
      query.category = category;
    }

    if (ingredientId) {
      query["ingredients.ingredientId"] = ingredientId;
    }

    const totalDrinks = await Drink.countDocuments(query);
    const skipIndex = (page - 1) * limit;
    const drinks = await Drink.find(query).skip(skipIndex).limit(limit);

    res.status(200).json({
      drinks,
      totalPages: Math.ceil(totalDrinks / limit),
      currentPage: page,
      totalDrinks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const drink = await Drink.findById(id).populate("ingredients.ingredientId");

    if (!drink) {
      return res.status(404).json({ message: "Cocktail not found" });
    }

    res.status(200).json(drink);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
