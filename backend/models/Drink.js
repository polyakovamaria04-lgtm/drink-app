import mongoose from "mongoose";

const drinkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    glass: { type: String, required: true },
    imgUrl: { type: String },
    type: {
      type: String,
      enum: ["Alcoholic", "Non_Alcoholic"],
      required: true,
    },
    ingredients: [
      {
        ingredientId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredient",
          required: true,
        },
        amount: { type: String, required: true },
        measure: { type: String, required: true },
      },
    ],
    recipe: { type: String },
    description: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Drink = mongoose.model("Drink", drinkSchema);
