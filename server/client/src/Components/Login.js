import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, TextField, Button, Stack } from "@mui/material";

import { AppContext } from "../App";

const LoginRegister = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { setToken, updateUser } = useContext(AppContext);
  const navigate = useNavigate();

  const loginRegister = async () => {
    if (props.title === "Register") {
      try {
        const response = await axios.post(`/users/register`, {
          username,
          password,
        });
        if (response.status === 200) {
          setMsg("");
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
        setMsg(err.response.data.msg);
      }
    } else {
      try {
        const response = await axios.post(`/users/login`, {
          username,
          password,
        });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.user);
          localStorage.setItem("userId", response.data.userId);
          setToken(response.data.token);
          updateUser(response.data.user, response.data.userId);
          setMsg("");
          navigate("/");
          console.log("token=>", response.data.token);
          console.log("username=>", response.data.user);
          console.log("userId=>", response.data.userId);
        }
      } catch (err) {
        console.log(err);
        setMsg(err.response.data.msg);
      }
    }
  };

  return (
    <div
      style={{
        width: "50vw",
        margin: "auto",
        backgroundImage:
          "url(https://e0.pxfuel.com/wallpapers/227/1008/desktop-wallpaper-food-background-herbs-and-spices-food-background-food-background-food-graphy-background-fancy-food.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        minHeight: "93vh",
        backgroundClip: "inherit",
        boxShadow: "0px 0px 20px 13px #487b5f",
        display: "flex",
      }}
    >
      <Stack
        sx={{
          backgroundColor: "rgba(255,255,255,0.75)",
          padding: "50px",
          width: "25vw",
          margin: "auto",
          border: "1px solid black",
          alignItems: "center",
        }}
      >
        <h2>{props.title}</h2>
        <Box
          component={"form"}
          sx={{ m: 1, display: "flex", flexDirection: "column" }}
          noValidate
          autoComplete="off"
        >
          <TextField
            sx={{ m: 1, width: "25vw", margin: "10px auto" }}
            id="username"
            type="username"
            label="Enter username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            sx={{ m: 1, width: "25vw", margin: "10px auto" }}
            id="password"
            type="password"
            label="Enter password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button
          variant="contained"
          onClick={loginRegister}
          sx={{
            m: 1,
            width: "25vw",
            margin: "10px auto",
            backgroundColor: "#1C3829",
          }}
        >
          {props.title}
        </Button>
        <div>{msg}</div>
      </Stack>
    </div>
  );
};

export default LoginRegister;
