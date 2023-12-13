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
import { useState } from "react";

const Filters = (props) => {
  const navigator = useNavigate();
  const [isRotated, setIsRotated] = useState({
    breakfast: false,
    soup: false,
    main: false,
    side: false,
    salad: false,
    appetizers: false,
    bakery: false,
    desserts: false,
    other: false,
    all: false,
  });

  const handleMouseEnter = (image) => {
    setIsRotated((prevState) => ({ ...prevState, [image]: true }));
  };

  const handleMouseLeave = (image) => {
    setIsRotated((prevState) => ({ ...prevState, [image]: false }));
  };

  const handleFilterClick = (filter) => {
    navigator(`filter/${filter}`);
  };

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
      <div>
        <a onClick={() => handleFilterClick("breakfast")}>
          <img
            src={breakfastImage}
            alt="breakfast"
            className={`rotatable-image ${
              isRotated.breakfast ? "rotated" : ""
            }`}
            onMouseEnter={() => handleMouseEnter("breakfast")}
            onMouseLeave={() => handleMouseLeave("breakfast")}
          />
          <h4>Breakfast</h4>
        </a>
      </div>

      <div>
        <a onClick={() => handleFilterClick("soup")}>
          <img
            src={soupImage}
            alt="soup"
            className={`rotatable-image ${isRotated.soup ? "rotated" : ""}`}
            onMouseEnter={() => handleMouseEnter("soup")}
            onMouseLeave={() => handleMouseLeave("soup")}
          />
          <h4>Soup</h4>
        </a>
      </div>
      <div>
        <a onClick={() => handleFilterClick("main")}>
          <img
            src={maindishesImage}
            alt="main"
            className={`rotatable-image ${isRotated.main ? "rotated" : ""}`}
            onMouseEnter={() => handleMouseEnter("main")}
            onMouseLeave={() => handleMouseLeave("main")}
          />
          <h4>Main dishes</h4>
        </a>
      </div>
      <div>
        <a onClick={() => handleFilterClick("side")}>
          <img
            src={sidedishImage}
            alt="side"
            className={`rotatable-image ${isRotated.side ? "rotated" : ""}`}
            onMouseEnter={() => handleMouseEnter("side")}
            onMouseLeave={() => handleMouseLeave("side")}
          />
          <h4>Side dish</h4>
        </a>
      </div>
      <div>
        <a onClick={() => handleFilterClick("salad")}>
          <img
            src={saladImage}
            alt="salad"
            className={`rotatable-image ${isRotated.salad ? "rotated" : ""}`}
            onMouseEnter={() => handleMouseEnter("salad")}
            onMouseLeave={() => handleMouseLeave("salad")}
          />
          <h4>Salads</h4>
        </a>
      </div>
      <div>
        <a onClick={() => handleFilterClick("appetizers")}>
          <img
            src={AppetizersImage}
            alt="appetizers"
            className={`rotatable-image ${
              isRotated.appetizers ? "rotated" : ""
            }`}
            onMouseEnter={() => handleMouseEnter("appetizers")}
            onMouseLeave={() => handleMouseLeave("appetizers")}
          />
          <h4>Appetizers</h4>
        </a>
      </div>
      <div>
        <a onClick={() => handleFilterClick("bakery")}>
          <img
            src={bakeryImage}
            alt="bakery"
            className={`rotatable-image ${isRotated.bakery ? "rotated" : ""}`}
            onMouseEnter={() => handleMouseEnter("bakery")}
            onMouseLeave={() => handleMouseLeave("bakery")}
          />
          <h4>Bakery</h4>
        </a>
      </div>
      <div>
        <a onClick={() => handleFilterClick("desserts")}>
          <img
            src={sweetsImage}
            alt="salad"
            className={`rotatable-image ${isRotated.desserts ? "rotated" : ""}`}
            onMouseEnter={() => handleMouseEnter("desserts")}
            onMouseLeave={() => handleMouseLeave("desserts")}
          />
          <h4>Desserts</h4>
        </a>
      </div>
      <div>
        <a onClick={() => handleFilterClick("other")}>
          <img
            src={otherImage}
            alt="other"
            className={`rotatable-image ${isRotated.other ? "rotated" : ""}`}
            onMouseEnter={() => handleMouseEnter("other")}
            onMouseLeave={() => handleMouseLeave("other")}
          />
          <h4>Other</h4>
        </a>
      </div>
      <div>
        <a onClick={() => navigator("/allRecipes")}>
          <img
            src={otherImage}
            alt="all"
            className={`rotatable-image ${isRotated.all ? "rotated" : ""}`}
            onMouseEnter={() => handleMouseEnter("all")}
            onMouseLeave={() => handleMouseLeave("all")}
          />
          <h4>All recipes</h4>
        </a>
      </div>
    </div>
  );
};
export default Filters;
