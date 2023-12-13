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
