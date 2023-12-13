import express from "express";
import { _login, _register } from "../controllers/usersController.js";
import { verifytoken } from "../middlewares/verifyToken.js";

const userRouter = express.Router();

userRouter.post("/register", _register);

userRouter.post("/login", _login);

userRouter.get("/verify", verifytoken, (req, res) => {
  res.status(201).json({ msg: "logined" });
});

export default userRouter;
