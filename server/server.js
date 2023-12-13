import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import recipesRouter from "./routes/recipesRouter.js";
import userRouter from "./routes/usersRouter.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// dotenv config
dotenv.config();
const PORT = process.env.PORT;

const app = express();

// Default settings
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Server routes
// Recipes

app.use("/recipes", recipesRouter);
// Users
app.use("/users", userRouter);

// Server listen
app.listen(PORT, () => {
  console.log("Server start on PORT:" + PORT);
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
