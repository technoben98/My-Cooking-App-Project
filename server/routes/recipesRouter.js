import express from "express";
import {
  _createRecipe,
  _deleteRecipe,
  _editRecipe,
  _getAllRecipes,
  _getRecipeByAuthor,
  _getRecipeByFilter,
  _getRecipeById,
} from "../controllers/recipesController.js";

const recipesRouter = express.Router();
// Get all
recipesRouter.get("/all", _getAllRecipes);
// Get by ID
recipesRouter.get("/:id", _getRecipeById);
// Get by Name NOT NEED
// recipesRouter.get("/name/:id", _getRecipeById);
// Get by Author
recipesRouter.get("/author/:author", _getRecipeByAuthor);
// Get by filter
recipesRouter.get("/filtered/:filter", _getRecipeByFilter); //Сделать через боди весь реквест
// Edit Recipe
recipesRouter.put("/:id", _editRecipe);
// Create
recipesRouter.post("/new", _createRecipe);
// Delete
recipesRouter.delete("/:id", _deleteRecipe);

export default recipesRouter;
