import React from "react";
import Tab from "../components/Tab";
import ResultGrid from "../components/ResultGrid";
import SearchBar from "../components/SearchBar";

const Homepage = () => {
  return (
    <div className="w-full pb-6">
      <SearchBar />
      <Tab />
      <ResultGrid />
    </div>
  );
};

export default Homepage;