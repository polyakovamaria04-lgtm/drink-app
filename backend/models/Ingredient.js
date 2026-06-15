import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    thumbUrl: {
      type: String,
      default: "/images/placeholder.png",
    },

    source: {
      type: String,
      enum: ["api", "custom"],
      default: "custom",
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    flavour: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Ingredient = mongoose.model("Ingredient", ingredientSchema);
