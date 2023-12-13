import React, { useState } from "react";
import { useParams } from "react-router-dom";
import breakfastImage from "../img/icons/breakfast.png";
import RecipesByFilter from "./RecipesByFilter";
import { filtersByCategory } from "../iternalStorage/db";

const FilteredRecipes = (props) => {
  const { filter } = useParams();
  const [rotatedTags, setRotatedTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(
    filter.charAt(0).toUpperCase() + filter.slice(1)
  );
  console.log(filter);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };
  const handleMouseEnter = (tag) => {
    setRotatedTags((prevTags) => [...prevTags, tag]);
  };

  const handleMouseLeave = (tag) => {
    setRotatedTags((prevTags) => prevTags.filter((prevTag) => prevTag !== tag));
  };

  const selectedFilters = filtersByCategory[filter] || [];
  console.log(selectedFilters);

  return (
    <div>
      <h1>{filter.charAt(0).toUpperCase() + filter.slice(1)}</h1>
      <div
        className="filterMenu"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "stretch",
          fontSize: "1.5em",
          marginTop: "10px",
        }}
      >
        {selectedFilters.map((tag) => (
          <div key={tag} style={{ width: "11%" }}>
            <a
              onClick={() => handleTagClick(tag)}
              onMouseEnter={() => handleMouseEnter(tag)}
              onMouseLeave={() => handleMouseLeave(tag)}
            >
              <img
                src={breakfastImage}
                alt="breakfast"
                className={rotatedTags.includes(tag) ? "rotated" : ""}
              />
              <h4>{tag}</h4>
            </a>
          </div>
        ))}
      </div>
      <h1>{selectedTag}</h1>
      <RecipesByFilter selectedTag={selectedTag} />
    </div>
  );
};

export default FilteredRecipes;
