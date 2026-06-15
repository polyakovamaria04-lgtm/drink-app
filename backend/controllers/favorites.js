import { Drink } from "../models/Drink.js";
import User from "../models/User.js";

export const getFavoriteDrinks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const favoriteDrinks = await Drink.find({ _id: { $in: user.favorites } });
    res.status(200).json(favoriteDrinks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addToFavorites = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, { $addToSet: { favorites: id } });

    res.status(200).json({ message: "Added to favorites" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, { $pull: { favorites: id } });

    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
