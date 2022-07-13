import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recipeService from "./recipeService";

const initialState = {
  recipes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//creates a new recipe
export const createRecipe = createAsyncThunk(
  "recipes/create",
  async (recipeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recipeService.createRecipe(recipeData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get all recipes
export const getRecipes = createAsyncThunk(
  "recipes/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recipeService.getRecipes(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get only one recipe
export const getOneRecipe = createAsyncThunk(
  "recipes/getOne",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recipeService.getOneRecipe(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//deletes a recipe
export const deleteRecipe = createAsyncThunk(
  "recipes/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recipeService.deleteRecipe(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRecipe.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipes.push(payload);
      })
      .addCase(createRecipe.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(getRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecipes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipes = payload;
      })
      .addCase(getRecipes.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRecipe.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipes = state.recipes.filter(
          (recipe) => recipe._id !== payload.id
        );
      })
      .addCase(deleteRecipe.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(getOneRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneRecipe.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipes = payload;
      })
      .addCase(getOneRecipe.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export const { reset } = recipeSlice.actions;
export default recipeSlice.reducer;
