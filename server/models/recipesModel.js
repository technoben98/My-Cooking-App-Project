import { db } from "../config/db.js";

// Get All
export const getAllRecipes = () => {
  return db("recipes").select("*").orderBy("recipe_id", "desc");
};
// Get by ID
export const getRecipeById = (id) => {
  return db("recipes").select("*").where("recipe_id", id);
};

// Get by Author

export const getRecipeByAuthor = (author) => {
  return db("recipes")
    .select("*")
    .where({ author })
    .orderBy("recipe_id", "desc");
};

// Create
export const createRecipe = (recipe) => {
  return db("recipes").insert(recipe).returning("*");
};

// Edit
export const editRecipe = (id, recipe) => {
  return db("recipes").where("recipe_id", id).update(recipe).returning("*");
};

// Get by Filter
export const getRecipeByFilter = (filter) => {
  return db("recipes")
    .select("*")
    .from(function () {
      this.select("*", db.raw("jsonb_object_keys(ingredient) as key"))
        .from("recipes")
        .as("keys");
    })
    .whereIn("recipe_id", function () {
      this.select("recipe_id").from("recipes");
    })
    .whereRaw("LOWER(keys.key) ILIKE ?", [`%${filter.toLowerCase()}%`]);
};

// export const getRecipeByName = (title) => {
//   return db("recipe").select("*").where({ title });
// };

// Delete
export const deleteRecipe = (id) => {
  id = Number(id);
  return db("recipes").where("recipe_id", id).del().returning("*");
};
