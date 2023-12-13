import { Routes, Route, Router } from "react-router-dom";
import Nav from "./Components/Nav";
import { createContext, useState, useEffect } from "react";
import Main from "./Components/Main";
import CreateRecipe from "./Components/CreateRecipe";
import Recipes from "./Components/Recipes";
import LoginRegister from "./Components/Login";
import "./App.css";
import Recipe from "./Components/Recipe";
import Auth from "./Auth/Auth";
import SearchResults from "./Components/SearchResult";
import MyRecipes from "./Components/MyRecipes";
import FilteredRecipes from "./Components/FilteredRecipes";
import AllRecipes from "./Components/AllRecipes";

export const AppContext = createContext();

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      setToken(storedToken);
      updateUser(storedUsername);
    }
  }, [setToken, updateUser]);

  return (
    <AppContext.Provider value={{ token, setToken, user, updateUser }}>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/search/:searchValue" element={<SearchResults />} />
          <Route path="/recipes/:filter" element={<FilteredRecipes />} />
          <Route
            path="/create"
            element={
              <Auth>
                <CreateRecipe />
              </Auth>
            }
          />
          <Route path="/login" element={<LoginRegister title="Login" />} />
          <Route
            path="/register"
            element={<LoginRegister title="Register" />}
          />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/filter/:filter" element={<FilteredRecipes />} />
          <Route path="/all" element={<AllRecipes />} />
          <Route path="/myResipes" element={<MyRecipes />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
