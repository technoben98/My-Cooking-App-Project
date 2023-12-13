import { Link, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import useAuth from "../Auth/useAuth";
import { AppContext } from "../App";

import Search from "./Search";
import { useContext } from "react";

const Nav = () => {
  const { user, userId } = useAuth();
  const navigate = useNavigate();
  const { setToken, updateUser } = useContext(AppContext);
  const isLogined = () => {
    console.log(user);
    console.log(userId);
    if (user) {
      return (
        <Stack direction={"row"} alignItems={"center"}>
          <Button
            component={Link}
            to="/create"
            sx={{
              margin: "5px",
              whiteSpace: "nowrap",
              color: "white",
              fontSize: "1.1em",
            }}
          >
            Create Recipe
          </Button>
          <Button
            sx={{
              margin: "5px",
              whiteSpace: "nowrap",
              color: "white",
              fontSize: "1.1em",
            }}
            component={Link}
            to="/myBooks"
          >
            My Book
          </Button>
          <div
            style={{
              margin: "5px",
              whiteSpace: "nowrap",
              color: "white",
              fontSize: "1.1em",
            }}
          >
            Welcome, {user}!
          </div>
          <Button
            onClick={logout}
            sx={{
              margin: "5px",
              whiteSpace: "nowrap",
              color: "white",
              fontSize: "1.1em",
            }}
          >
            Logout
          </Button>
        </Stack>
      );
    } else {
      return (
        <Stack direction={"row"}>
          <Button
            component={Link}
            to="/login"
            sx={{ color: "white", fontSize: "1.1em" }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            sx={{ color: "white", fontSize: "1.1em" }}
          >
            Register
          </Button>
        </Stack>
      );
    }
  };
  const logout = () => {
    setToken("");
    updateUser("", "");
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "#1C3829",
        height: "50px",
        boxShadow: "0px 2px 20px #487b5f",
        position: "relative",
        zIndex: 1,
        color: "white",
      }}
    >
      <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"}>
          <Button
            component={Link}
            to="/"
            exact
            sx={{ color: "white", fontSize: "1.1em" }}
          >
            Home
          </Button>
          <Search />
        </Stack>

        {isLogined()}
      </Stack>
    </div>
  );
};

export default Nav;
