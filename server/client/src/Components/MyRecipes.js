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
import useAuth from "../Auth/useAuth";

const MyRecipes = (props) => {
  const [recipe, setRecipe] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getRecipes();
    }
  }, [user]);

  const getRecipes = async () => {
    try {
      const response = await axios.get(`/recipes/author/${user.toLowerCase()}`);
      console.log(response.data.recipe);
      setRecipe(response.data.recipes);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const responce = await axios.delete(`/recipes/${id}`);
      alert("Your recipe deleted!");
      console.log(responce.status);
      getRecipes();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>Recipes</h2>
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
                  image="https://topfood.club/en/uploads/2021-09-13-a7yuvc-proseivat-muku.jpg"
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

                  <Button
                    onClick={() => deleteRecipe(item.recipe_id)}
                    size="small"
                    sx={{ color: "red" }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MyRecipes;
