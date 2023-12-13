import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../Auth/useAuth";
import "../App.css";

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
        <button onClick={removeFromFavorites}>Remove from Favorites</button>
      );
    } else {
      return <button onClick={addToFavorites}>Add to Favorites</button>;
    }
  };

  return (
    <div>
      <h2>{currentRecipe.title}</h2>
      {renderFavoriteButton()}
      <div className="recipePage">
        <div className="ingredients">
          <h3>Ingredients</h3>
          <div style={{ display: "flex" }}>
            <button onClick={add}>Add</button>
            <h4>Quantity for: {value}</h4>
            <button onClick={minus}>Minus</button>
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
          style={{ minHeight: 400 }}
        >
          {flipped ? (
            <div onClick={handleClick}>
              {instructionsSteps &&
                instructionsSteps.map((item, index) => {
                  return <p key={"instructions" + index}>Step {item}</p>;
                })}
            </div>
          ) : (
            <div>
              <img
                src="https://topfood.club/en/uploads/2021-09-13-a7yuvc-proseivat-muku.jpg"
                alt="dish"
                className={flipped ? "flipped" : ""}
                onClick={handleClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
