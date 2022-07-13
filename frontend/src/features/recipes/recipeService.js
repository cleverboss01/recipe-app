import axios from "axios";

const API_URL = "/api/recipes/";

//create new recipe
const createRecipe = async (recipeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "create", recipeData, config);

  return response.data;
};

//get all recipes
const getRecipes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

//search a recipe
const searchRecipe = async (recipeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + recipeId, config);

  return response.data;
};

//get a recipe
const getOneRecipe = async (recipeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + recipeId, config);

  return response.data;
};

//delete a recipe
const deleteRecipe = async (recipeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + recipeId, config);

  return response.data;
};

const recipeService = {
  createRecipe,
  getRecipes,
  deleteRecipe,
  getOneRecipe,
  searchRecipe,
};

export default recipeService;
