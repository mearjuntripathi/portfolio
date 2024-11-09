import React, { useState } from "react";
import { Project } from "../information";
import { ProjectItem } from "./Components";
import { elementToggleFunc } from "../function";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories and add "All" at the beginning
  const uniqueCategories = ["All", ...new Set(Project.map((project) => project.category))];

  // Function to capitalize the first letter of each category
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    toggleSelect();
  };

  const toggleSelect = () => {
    const select = document.querySelector("[data-select]");
    elementToggleFunc(select);
  };

  const filteredProjects = selectedCategory === "All"
    ? Project
    : Project.filter((project) => project.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <article className="portfolio active" data-page="portfolio">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>

      <section className="projects">
        {/* Main filter buttons */}
        <ul className="filter-list">
          {uniqueCategories.map((category, index) => (
            <li className="filter-item" key={index}>
              <button
                className={selectedCategory === category ? "active" : ""}
                onClick={() => handleCategoryChange(category)}
                data-filter-btn
              >
                {capitalizeFirstLetter(category)}
              </button>
            </li>
          ))}
        </ul>

        {/* Dropdown filter select box */}
        <div className="filter-select-box">
          <button className="filter-select" data-select onClick={toggleSelect}>
            <div className="select-value" data-select-value>{capitalizeFirstLetter(selectedCategory)}</div>
            <div className="select-icon">
              <ion-icon name="chevron-down"></ion-icon>
            </div>
          </button>
          <ul className="select-list">
            {uniqueCategories.map((category, index) => (
              <li className="select-item" key={index}>
                <button
                  className={selectedCategory === category ? "active" : ""}
                  onClick={() => handleCategoryChange(category)}
                  data-select-item
                >
                  {capitalizeFirstLetter(category)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Project list */}
        <ul className="project-list">
          {filteredProjects.map((item, index) => (
            <ProjectItem key={index} {...item} />
          ))}
        </ul>
      </section>
    </article>
  );
};

export default Portfolio;
