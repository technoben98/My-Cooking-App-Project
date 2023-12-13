import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Recipe = (props) => {
  const { id } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [ingredients, setIngredients] = useState({});
  const [transformedIngredients, setTransformedIngredients] = useState({});
  const [value, setValue] = useState(1);
  const [instructionsSteps, setInstructionsSteps] = useState([]);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    getRecipeById();
    setInstructionsSteps(getInstructions(instructions));
  }, []);

  const getRecipeById = async () => {
    try {
      const responce = await axios.get(`/recipes/${id}`);
      const data = responce.data.recipes[0];
      setCurrentRecipe(data);
      setIngredients(data.ingredient);
      setTransformedIngredients(data.ingredient);
      console.log(data);
      console.log(currentRecipe);
      console.log(ingredients);
      getIngredients(data.ingredient);
      getInstructions(data.instuctions);
      // setInstructions(data.instuctions);
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
    console.log(transformedIngredients);
    setTransformedIngredients(transformedIngredients);
  };

  const getInstructions = (instructions) => {
    const instruction = instructions.split("Step");
    instruction.shift();
    // return instruction;
    setInstructionsSteps(instruction);
  };

  const add = () => {
    setValue(value + 1);
    console.log(instructionsSteps);
  };
  const minus = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  return (
    <div>
      <h2>{currentRecipe.title}</h2>
      <div className="recipePage">
        <div className="ingredients">
          <h3>Ingredients</h3>
          <div>
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
        <img
          src="https://topfood.club/en/uploads/2021-09-13-a7yuvc-proseivat-muku.jpg"
          alt="dish"
          style={{ width: 500 }}
        />
      </div>
      <div>
        {instructionsSteps &&
          instructionsSteps.map((item, index) => {
            return <p key={"instructions" + index}>Step {item}</p>;
          })}
      </div>
      <div>
        {currentRecipe.tags &&
          currentRecipe.tags.map((item) => {
            return (
              <p>
                <span>{item}</span>
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default Recipe;
