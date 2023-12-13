import { Link, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import useAuth from "../Auth/useAuth";
import { AppContext } from "../App";

import Search from "./Search";
import { useContext } from "react";

const Nav = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setToken, updateUser } = useContext(AppContext);
  const isLogined = () => {
    console.log(user);
    if (user) {
      return (
        <Stack direction={"row"} alignItems={"center"}>
          <Button
            component={Link}
            to="/create"
            sx={{ margin: "5px", whiteSpace: "nowrap" }}
          >
            Create Recipe
          </Button>
          <Button
            sx={{ margin: "5px", whiteSpace: "nowrap" }}
            component={Link}
            to="/myResipes"
          >
            My Recipes
          </Button>
          <div style={{ margin: "5px", whiteSpace: "nowrap", color: "white" }}>
            Welcome, {user}!
          </div>
          <Button onClick={logout} sx={{ margin: "5px", whiteSpace: "nowrap" }}>
            Logout
          </Button>
        </Stack>
      );
    } else {
      return (
        <Stack direction={"row"}>
          <Button component={Link} to="/login">
            Login
          </Button>
          <Button component={Link} to="/register">
            Register
          </Button>
        </Stack>
      );
    }
  };
  const logout = () => {
    setToken("");
    updateUser("");
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
      }}
    >
      <Stack spacing={2} direction={"row"} justifyContent={"space-evenly"}>
        <Stack direction={"row"}>
          <Button component={Link} to="/" exact>
            Home
          </Button>
          <Button component={Link} to="/recipes">
            Recipes
          </Button>
        </Stack>

        <Search />
        {isLogined()}
      </Stack>
    </div>
  );
};

export default Nav;
