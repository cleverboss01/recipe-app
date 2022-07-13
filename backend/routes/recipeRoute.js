const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

const {
  getRecipe,
  postRecipe,
  deleteRecipe,
  updateRecipe,
  getOneRecipe,
} = require("../controllers/recipeController");

router.get("/", protect, getRecipe);
router.post("/create", protect, postRecipe);
router
  .route("/:id")
  .get(protect, getOneRecipe)
  .put(protect, updateRecipe)
  .delete(protect, deleteRecipe);

module.exports = router;
