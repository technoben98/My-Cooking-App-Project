import { useNavigate } from "react-router-dom";

const ChooseMyBook = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/MyRecipes")}>My Recipes</button>
      <button onClick={() => navigate("/MyFavorite")}>My Favorites</button>
    </div>
  );
};
export default ChooseMyBook;
