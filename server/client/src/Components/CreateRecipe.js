import React, { useState } from "react";
import { TextField, Autocomplete, Stack, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../Auth/useAuth";
import {
  ingredientsMeasurements,
  tags,
  tagsWithDependencies,
} from "../iternalStorage/db";

const CreateRecipe = (props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedMainTags, setSelectedMainTags] = useState([]);
  const [selectedDependentTags, setSelectedDependentTags] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddIngredient = () => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      { name: "", quantity: "", measurement: "" },
    ]);
  };

  const handleAddInstructions = () => {
    setInstructions((prevInstructions) => [
      ...prevInstructions,
      `Step ${prevInstructions.length + 1}: `,
    ]);
  };

  const handleMainTagsChange = (event, newValue) => {
    setSelectedMainTags(newValue);
  };

  const handleDependentTagsChange = (event, newValue) => {
    setSelectedDependentTags(newValue);
  };

  const handleCreateRecipe = async () => {
    const formattedInstructions = instructions.join(" ");
    const recipe = {
      title,
      quantity: 1,
      img: image,
      ingredient: Object.fromEntries(
        ingredients.map((ing) => [
          ing.name,
          ing.quantity + " " + ing.measurement,
        ])
      ),
      instuctions: formattedInstructions,
      author: user.toLowerCase(),
      tags: [...selectedMainTags, ...selectedDependentTags],
    };

    console.log(recipe);
    try {
      const response = await axios.post("/recipes/new", recipe);

      console.log(response.data);
      navigate("/recipes");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{}}>
      <div
        style={{
          width: "50vw",
          margin: "auto",
          backgroundImage:
            "url(https://e0.pxfuel.com/wallpapers/106/809/desktop-wallpaper-raw-steaks-with-cooking-ingredients-food-menu-design-cooking-ingredients-food-concept.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          minHeight: "95vh",
          backgroundClip: "inherit",
          boxShadow: "0px 0px 20px 13px #487b5f",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            backgroundColor: "rgba(255,255,255,0.75)",
            padding: "50px",
            width: "35vw",
            margin: "auto",
            border: "1px solid black",
          }}
        >
          <h2>Create Recipe</h2>
          <h3>
            Enter recipe for <b>1</b> portion
          </h3>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
              console.log(title);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Add link to image"
            variant="outlined"
            onChange={(e) => setImage(e.target.value)}
          />
          {ingredients.map((ing, index) => (
            <Stack
              key={index}
              spacing={2}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <TextField
                id={`ingredient-name-${index}`}
                label="Ingredient name"
                variant="outlined"
                value={ing.name}
                onChange={(e) => {
                  setIngredients((prevIngredients) => {
                    const updatedIngredients = [...prevIngredients];
                    updatedIngredients[index] = {
                      ...updatedIngredients[index],
                      name: e.target.value,
                    };
                    console.log(updatedIngredients);
                    return updatedIngredients;
                  });
                }}
                sx={{ width: "33%" }}
              />
              <TextField
                id={`ingredient-quantity-${index}`}
                label="Quantity of ingredient"
                variant="outlined"
                value={ing.quantity}
                onChange={(e) => {
                  setIngredients((prevIngredients) => {
                    const updatedIngredients = [...prevIngredients];
                    updatedIngredients[index] = {
                      ...updatedIngredients[index],
                      quantity: e.target.value,
                    };
                    console.log(updatedIngredients);
                    return updatedIngredients;
                  });
                }}
                sx={{ width: "33%" }}
              />
              <Autocomplete
                disablePortal
                id={`ingredient-measurement-${index}`}
                options={ingredientsMeasurements}
                getOptionLabel={(option) => option}
                value={ing.measurement || ""}
                sx={{ width: "33%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Measurement" />
                )}
                onChange={(e, value) => {
                  setIngredients((prevIngredients) => {
                    const updatedIngredients = [...prevIngredients];
                    updatedIngredients[index] = {
                      ...updatedIngredients[index],
                      measurement: value || "",
                    };
                    console.log(updatedIngredients);
                    return updatedIngredients;
                  });
                }}
                clearOnBlur={false}
              />
            </Stack>
          ))}
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1C3829" }}
            onClick={handleAddIngredient}
          >
            Add ingredient
          </Button>
          {instructions.map((instruction, index) => (
            <Stack
              key={index}
              spacing={2}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextField
                id={`instruction-${index}`}
                label={`Step ${index + 1}`}
                variant="outlined"
                onChange={(e) => {
                  const updatedInstructions = [...instructions];
                  updatedInstructions[index] = `Step ${index + 1}: ${
                    e.target.value
                  }`;
                  setInstructions(updatedInstructions);
                }}
                sx={{ width: "35vw" }}
              />
            </Stack>
          ))}
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1C3829" }}
            onClick={handleAddInstructions}
          >
            Add step
          </Button>
          <Autocomplete
            multiple
            id="main-tags"
            options={tags}
            value={selectedMainTags}
            onChange={handleMainTagsChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Main Tags"
                placeholder="Select Tags"
              />
            )}
          />
          <Autocomplete
            multiple
            id="dependent-tags"
            options={selectedMainTags.reduce(
              (acc, tag) => [...acc, ...(tagsWithDependencies[tag] || [])],
              []
            )}
            value={selectedDependentTags}
            onChange={handleDependentTagsChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Additional Tags"
                placeholder="Select Tags"
              />
            )}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1C3829" }}
            onClick={handleCreateRecipe}
          >
            Create
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default CreateRecipe;
