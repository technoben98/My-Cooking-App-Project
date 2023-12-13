import {
  addToFavorites,
  getFavorites,
  login,
  register,
} from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const _login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const row = await login(username.toLowerCase());

    if (row.length === 0)
      return res.status(404).json({ msg: "username not exist" });

    const match = bcrypt.compareSync(password + "", row[0].password);
    if (!match) return res.status(404).json({ msg: "wrong password" });

    const userid = row[0].id;
    const returnedUsername = row[0].username;

    const secret = process.env.ACCESS_TOKEN_SECRET;

    const accesstoken = jwt.sign({ userid, returnedUsername }, secret, {
      expiresIn: "1d",
    });

    res.cookie("token", accesstoken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ token: accesstoken, user: username });
  } catch (e) {
    console.log("_login=>", e);
    res.status(404).json({ msg: "something went wrong" });
  }
};

export const _register = async (req, res) => {
  const { username, password } = req.body;
  const lowerUsername = username.toLowerCase();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password + "", salt);
  try {
    const row = await register(lowerUsername, hash);
    res.json(row);
  } catch (e) {
    console.log("_register=>", e);
    res.status(404).json({ msg: "username allready exist" });
  }
};

export const _addToFavorites = async (req, res) => {
  const userId = req.params.userId;
  const recipeId = req.body.recipeId;

  try {
    const favoriteRecipes = await addToFavorites(userId, recipeId);
    res.status(200).json({ favoriteRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const _getFavorites = async (req, res) => {
  const userId = req.params.userId;

  try {
    const favoriteRecipes = await getFavorites(userId);
    res.status(200).json({ favoriteRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
