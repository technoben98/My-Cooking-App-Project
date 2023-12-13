import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const RecipesByFilter = ({ selectedTag }) => {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    getRecipes();
  }, [selectedTag]);

  const getRecipes = async () => {
    try {
      const response = await axios.get("/recipes/all");
      const allRecipes = response.data.recipes;

      const filteredRecipes = selectedTag
        ? allRecipes.filter((recipe) => recipe.tags.includes(selectedTag))
        : allRecipes;

      setRecipe(filteredRecipes);
    } catch (e) {
      console.log(e);
    }
  };
  if (recipe.length === 0) {
    return <h1>No recipes found</h1>;
  } else {
    return (
      <div>
        <h2>All Recipes</h2>
        <div className="cards">
          {recipe.map((item) => {
            return (
              <div key={item.recipe_id}>
                <Card
                  sx={{
                    width: 350,
                    height: 300,
                    margin: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="dish"
                    height="140"
                    image={
                      item.img ||
                      "https://e0.pxfuel.com/wallpapers/794/280/desktop-wallpaper-different-veggies-seamless-vector-pattern-of-hand-drawn-fresh-tasty-vegetarian-raw-food-repeat-with-cooking-fresh-tasty-organic-vegetables-for-cooking-book-menu-or-textile-fabric-print-stock-vector.jpg"
                    }
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/recipe/${item.recipe_id}`}>
                      <Button size="small">Learn More</Button>
                    </Link>
                  </CardActions>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
export default RecipesByFilter;
