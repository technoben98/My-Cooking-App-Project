import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipeByFilter,
  deleteRecipe,
  getRecipeByAuthor,
  editRecipe,
} from "../models/recipesModel.js";

// Get All Recipes
export const _getAllRecipes = async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.json({ recipes });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "something went wrong" });
  }
};

// Get by Id
export const _getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipes = await getRecipeById(id);
    res.json({ recipes });
    console.log("controller=>", recipes);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "something went wrong" });
  }
};

// Get by Author

export const _getRecipeByAuthor = async (req, res) => {
  try {
    const { author } = req.params;
    const recipes = await getRecipeByAuthor(author);
    res.json({ recipes });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "something went wrong" });
  }
};
// Create
export const _createRecipe = async (req, res) => {
  try {
    const recipeFromRequest = req.body;
    // const img = "";
    const recipe = await createRecipe(recipeFromRequest);
    res.json({ recipe });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "something went wrong" });
  }
};

// Edit

export const _editRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = req.body;
    const recipe = await editRecipe(id, updatedRecipe);
    res.json({ msg: "Updated" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "something went wrong" });
  }
};

// Get by Filter
export const _getRecipeByFilter = async (req, res) => {
  const { filter } = req.params;
  console.log(filter);
  try {
    const data = await getRecipeByFilter(filter);
    console.log(data);
    console.log(data.length);
    if (data.length === 0)
      return res.status(404).json({ msg: "No Recipe Found" });
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "No Recipe Found" });
  }
};
// Delete
export const _deleteRecipe = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const data = await deleteRecipe(id);
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "No Recipe Found" });
  }
};
