import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    birthdate: {
      type: Date,
      required: [true, "Birthdate is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    avatarURL: {
      type: String,
      default: "",
    },
    favorites: {
      type: [String],
      default: [],
    },
    myDrinks: {
      type: [String],
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const User = mongoose.model("user", userSchema);

export default User;
