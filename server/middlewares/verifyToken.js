import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifytoken = (req, res, next) => {
  const accesstoken = req.cookies.token || req.headers.x_access_token;
  console.log(accesstoken);
  if (!accesstoken) return res.status(401).json({ msg: "unauthorized" });

  jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) res.status(403).json({ msg: err.message });
    console.log(decoded);

    next();
  });
};
