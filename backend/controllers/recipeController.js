const asyncHandler = require("express-async-handler");
const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");

//@desc Get recipes
//@route GET /api/recipes
//@access Private
const getRecipe = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ user: req.user.id });
  res.status(200).json(recipes);
});

//@desc Post a recipe
//@route POST /api/recipes/create
//@access Private
const postRecipe = asyncHandler(async (req, res) => {
  const { title, ingredients, method, cookingTime } = req.body;
  if (!title || !ingredients || !method || !cookingTime) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //create recipe
  const recipe = await Recipe.create({
    title,
    ingredients,
    method,
    cookingTime,
    user: req.user.id,
  });
  res.status(200).json(recipe);
});

//@desc Get only one recipe
//@route GET /api/recipes/:id
//@access Private
const getOneRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.status(200).json(recipe);
});

//@desc Updates a recipe
//@route UPDATE /api/recipes/:id
// @access Private
const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(400);
    throw new Error("Cannot find recipe");
  }

  //check for user
  if (recipe.user.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedRecipe);
});

//@desc Delete recipe
//@route DELETE /api/recipe/:id
// @access Private
const deleteRecipe = asyncHandler(async (req, res) => {
  const deletedRecipe = await Recipe.findById(req.params.id);

  if (!deletedRecipe) {
    res.status(400);
    throw new Error("Cannot find recipe");
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure logged in User matches
  if (deletedRecipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await deletedRecipe.remove();
  res.status(200).json({ deleted_id: req.params.id });
});

module.exports = {
  getRecipe,
  postRecipe,
  deleteRecipe,
  updateRecipe,
  getOneRecipe,
};
