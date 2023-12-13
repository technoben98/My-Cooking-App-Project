import { Stack } from "@mui/material";
import MyRecipes from "./MyRecipes";
import MyFavorites from "./MyFavourites";

const ChooseMyBook = (props) => {
  return (
    <div>
      <Stack style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <div style={{ width: "45%" }}>
          <MyRecipes />
        </div>

        <div style={{ width: "5%" }}></div>
        <div style={{ width: "45%" }}>
          <MyFavorites />
        </div>
      </Stack>
    </div>
  );
};
export default ChooseMyBook;
