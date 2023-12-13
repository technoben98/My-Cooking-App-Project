import { db } from "../config/db.js";

export const register = (username, password) => {
  return db("users").insert({ username, password }, [
    "id",
    "username",
    "password",
  ]);
};

export const login = (username) => {
  return db("users").select("id", "username", "password").where({ username });
};

export const addToFavorites = async (userId, recipeId) => {
  try {
    const user = await db("users").where({ id: userId }).first();
    if (!user) {
      throw new Error("User not found");
    }

    const favoriteRecipes = user.favorite_recipes || [];

    if (!favoriteRecipes.includes(recipeId)) {
      favoriteRecipes.push(recipeId);

      await db("users")
        .where({ id: userId })
        .update({ favorite_recipes: favoriteRecipes });
    }

    return favoriteRecipes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFavorites = async (userId) => {
  try {
    const user = await db("users").where({ id: userId }).first();
    if (!user) {
      throw new Error("User not found");
    }

    const favoriteRecipes = user.favorite_recipes || [];

    return favoriteRecipes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
