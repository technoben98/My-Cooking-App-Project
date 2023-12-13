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

const Recipes = (props) => {
  const [recipe, setRecipe] = useState([]);
  const searchValue = props.searchValue;

  useEffect(() => {
    getRecipes();
  }, [props]);

  const getRecipes = async () => {
    try {
      const response = await axios.get("/recipes/all");
      if (searchValue) {
        const filteredRecipes = response.data.recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        if (filteredRecipes.length === 0) {
          console.log(filteredRecipes);
          console.log(filteredRecipes == []);
          setRecipe([]);
        } else {
          console.log(filteredRecipes);
          setRecipe(filteredRecipes);
        }
      } else {
        setRecipe(response.data.recipes);
      }
    } catch (e) {
      console.log(e);
    }
  };
  if (recipe.length === 0) {
    return <h1>No recipes found</h1>;
  } else {
    return (
      <div>
        <h2>Result for "{searchValue}"</h2>
        <div className="cards">
          {recipe.map((item) => {
            return (
              <div key={item.recipe_id}>
                <Card
                  sx={{
                    width: 300,
                    height: 300,
                    margin: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #487b5f",
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
                      <Button
                        size="small"
                        sx={{
                          color: "#159d15",
                          fontSize: "1.1em",
                        }}
                      >
                        Learn More
                      </Button>
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
export default Recipes;
