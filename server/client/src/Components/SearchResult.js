import React from "react";
import { useParams } from "react-router-dom";
import Recipes from "./Recipes";

const SearchResults = () => {
  const { searchValue } = useParams();
  return <Recipes searchValue={searchValue} />;
};

export default SearchResults;
