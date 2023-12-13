import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, TextField, Button } from "@mui/material";

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
    <div>
      <h2>{props.title}</h2>
      <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete="off">
        <TextField
          sx={{ m: 1 }}
          id="username"
          type="username"
          label="Enter username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          sx={{ m: 1 }}
          id="password"
          type="password"
          label="Enter password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={loginRegister}>
        {props.title}
      </Button>
      <div>{msg}</div>
    </div>
  );
};

export default LoginRegister;
