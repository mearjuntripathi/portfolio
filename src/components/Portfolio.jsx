import React, { useState } from "react";
import { Project } from "../information";
import { ProjectItem } from "./Components";
import { elementToggleFunc } from "../function";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const uniqueCategories = ["All", ...new Set(Project.map((project) => project.category))];

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    toggleSelect();
  };

  const toggleSelect = () => {
    const select = document.querySelector("[data-select]");
    if (select) elementToggleFunc(select);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProjects = Project.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <article className="portfolio active" data-page="portfolio">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>

      <section className="projects">
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
          <div className="input">
            <i className="uil uil-search"></i>
            <input
              type="text"
              placeholder="$ grep ..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </ul>

        <div className="filter-select-box">
          <button className="filter-select" data-select onClick={toggleSelect}>
            <div className="select-value" data-select-value>
              {capitalizeFirstLetter(selectedCategory)}
            </div>
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
          <div className="input">
            <i className="uil uil-search"></i>
            <input
              type="text"
              placeholder="$ grep ..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

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
