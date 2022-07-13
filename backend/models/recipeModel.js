const mongoose = require("mongoose");
const recipeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    ingredients: {
      type: [String],
      required: [true, "Please include ingredients"],
    },
    method: {
      type: String,
      required: [true, "Method is required"],
    },
    cookingTime: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
