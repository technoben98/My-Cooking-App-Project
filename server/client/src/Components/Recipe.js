import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../Auth/useAuth";
import "../App.css";
import { red } from "@mui/material/colors";

const Recipe = (props) => {
  const { id } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [transformedIngredients, setTransformedIngredients] = useState({});
  const [value, setValue] = useState(1);
  const [instructionsSteps, setInstructionsSteps] = useState([]);
  const [instructions, setInstructions] = useState("");
  const { userId } = useAuth();
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    getRecipeById();
    setInstructionsSteps(getInstructions(instructions));
    checkIfInFavorites();
  }, [userId]);

  const getRecipeById = async () => {
    try {
      const responce = await axios.get(`/recipes/${id}`);
      const data = responce.data.recipes[0];
      setCurrentRecipe(data);
      setTransformedIngredients(data.ingredient);
      getIngredients(data.ingredient);
      getInstructions(data.instuctions);
    } catch (e) {
      console.log(e);
    }
  };

  const getIngredients = (ingredients) => {
    for (const key in ingredients) {
      if (ingredients.hasOwnProperty(key)) {
        const value = ingredients[key].split(" ");

        if (!isNaN(value[0])) {
          transformedIngredients[key] = [parseInt(value[0], 10), value[1]];
        } else {
          transformedIngredients[key] = [value[0], value[1]];
        }
      }
    }
    setTransformedIngredients(transformedIngredients);
  };

  const getInstructions = (instructions) => {
    const instruction = instructions.split("Step");
    instruction.shift();
    setInstructionsSteps(instruction);
  };

  const add = () => {
    setValue(value + 1);
  };

  const minus = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const checkIfInFavorites = async () => {
    try {
      if (!userId) {
        console.log("User is not authenticated");
        return;
      }

      const response = await axios.get(`/users/${userId}/favorites`);
      const favorites = response.data.favoriteRecipes;
      console.log(favorites);
      const isFavorite = favorites.includes(id);
      console.log(isFavorite);
      setFavorite(isFavorite);
      console.log(favorite);
    } catch (error) {
      console.error(error);
    }
  };

  const addToFavorites = async () => {
    try {
      await axios.post(`/users/${userId}/favorites`, { recipeId: id });
      setIsInFavorites(true);
      console.log("aded to fav");
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      await axios.delete(`/users/${userId}/favorites/${id}`);
      setIsInFavorites(false);
      console.log("Removed from favorites");
    } catch (error) {
      console.log(error);
    }
  };

  const renderFavoriteButton = () => {
    if (!userId) {
      return null;
    }

    if (isInFavorites) {
      return (
        <button
          style={{
            color: "red",
            height: "50px",
            backgroundColor: "#ffffff00",
            fontSize: "2em",
            border: "none",
            cursor: "pointer",
          }}
          onClick={removeFromFavorites}
        >
          Remove from Favorites
        </button>
      );
    } else {
      return (
        <button
          style={{
            color: "#159d15",
            height: "50px",
            backgroundColor: "#ffffff00",
            fontSize: "2em",
            border: "none",
            cursor: "pointer",
          }}
          onClick={addToFavorites}
        >
          Add to Favorites
        </button>
      );
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://e0.pxfuel.com/wallpapers/846/49/desktop-wallpaper-food-foods-fancy-food.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        marginTop: "-20px",
        minHeight: "96vh",
        fontSize: "1.2em",
        fontWeight: "bolder",
      }}
    >
      <div
        style={{
          paddingTop: "30px",
          backgroundColor: "rgba(255,255,255,0.75)",
          margin: "auto",
          border: "1px solid black",
          width: "60%",
        }}
      >
        <h2 style={{ marginTop: "20px" }}>{currentRecipe.title}</h2>
        {renderFavoriteButton()}
        <div
          className="recipePage"
          style={{ margin: "auto", justifyContent: "center" }}
        >
          <div
            className="ingredients"
            style={{
              width: "30vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Ingredients</h3>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={add}
                style={{
                  fontSize: "3em",
                  border: "none",
                  backgroundColor: "#ffffff00",
                  color: "#159d15",
                  cursor: "pointer",
                }}
              >
                +
              </button>
              <h4>Quantity for: {value}</h4>
              <button
                onClick={minus}
                style={{
                  fontSize: "3em",
                  border: "none",
                  backgroundColor: "#ffffff00",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                -
              </button>
            </div>
            {transformedIngredients &&
            typeof transformedIngredients === "object" ? (
              Object.entries(transformedIngredients).map(
                ([key, valueOfIngredient]) => (
                  <p key={key + valueOfIngredient}>
                    {key}: {valueOfIngredient[0] * value} {valueOfIngredient[1]}
                  </p>
                )
              )
            ) : (
              <p>No ingredients available</p>
            )}
          </div>
          <div
            className={`flippable-image ${flipped ? "flipped" : ""}`}
            style={{
              minHeight: 600,
              width: 600,
              display: "flex",
              justifyContent: "space-evenly",
              cursor: "pointer",
            }}
          >
            {flipped ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
                onClick={handleClick}
              >
                {instructionsSteps &&
                  instructionsSteps.map((item, index) => {
                    return <p key={"instructions" + index}>Step {item}</p>;
                  })}
              </div>
            ) : (
              <div style={{ height: 600, width: 600, display: "flex" }}>
                <img
                  src={
                    currentRecipe.img ||
                    "https://e0.pxfuel.com/wallpapers/794/280/desktop-wallpaper-different-veggies-seamless-vector-pattern-of-hand-drawn-fresh-tasty-vegetarian-raw-food-repeat-with-cooking-fresh-tasty-organic-vegetables-for-cooking-book-menu-or-textile-fabric-print-stock-vector.jpg"
                  }
                  alt="dish"
                  style={{ width: 600 }}
                  className={flipped ? "flipped" : ""}
                  onClick={handleClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
