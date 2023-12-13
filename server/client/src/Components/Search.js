import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
  };

  const handleSearch = () => {
    navigate(`/search/${searchQuery}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container>
      <Container sx={{ border: "1px solid white", width: "fit-content" }}>
        <InputBase
          sx={{ ml: 1, flex: 1, color: "white" }}
          placeholder="Find recipe..."
          inputProps={{ "aria-label": "find recipe..." }}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <IconButton
          onClick={handleSearch}
          type="button"
          sx={{ p: "10px", color: "white" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Container>
    </Container>
  );
};

export default Search;
