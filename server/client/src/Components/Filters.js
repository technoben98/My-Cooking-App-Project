import breakfastImage from "../img/icons/breakfast.png";
import AppetizersImage from "../img/icons/Appetizers.png";
import bakeryImage from "../img/icons/bakery.png";
import maindishesImage from "../img/icons/maindishes.png";
import otherImage from "../img/icons/other.png";
import saladImage from "../img/icons/salad.png";
import sidedishImage from "../img/icons/sidedish.png";
import soupImage from "../img/icons/soup.png";
import sweetsImage from "../img/icons/sweets.png";
import { useNavigate } from "react-router-dom";

const Filters = (props) => {
  const navigator = useNavigate();
  return (
    <div
      className="filterMenu"
      style={{
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-around",
        fontSize: "1.5em",
        marginTop: "10px",
      }}
    >
      <button onClick={navigator("filter/breakfast")}>
        <div>
          <img src={breakfastImage} alt="breakfast" />
          <h4>Breakfast</h4>
        </div>
      </button>

      <div>
        <img src={soupImage} alt="soup" />
        <h4>Soup</h4>
      </div>
      <div>
        <img src={maindishesImage} alt="main" />
        <h4>Main dishes</h4>
      </div>
      <div>
        <img src={sidedishImage} alt="side" />
        <h4>Side dish</h4>
      </div>
      <div>
        <img src={saladImage} alt="salad" />
        <h4>Salads</h4>
      </div>
      <div>
        <img src={AppetizersImage} alt="appetizers" />
        <h4>Appetizers</h4>
      </div>
      <div>
        <img src={bakeryImage} alt="bakery" />
        <h4>Bakery</h4>
      </div>
      <div>
        <img src={sweetsImage} alt="salad" />
        <h4>Desserts</h4>
      </div>
      <div>
        <img src={otherImage} alt="other" />
        <h4>Other</h4>
      </div>
    </div>
  );
};
export default Filters;
