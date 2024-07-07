import React, { useState } from "react";
import { Project } from "../information";
import { ProjectItem } from "./Components";
import { elementToggleFunc } from "../function";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    toggleSelect();
  };
  const toggleSelect = () => {
    const select = document.querySelector("[data-select]");
    elementToggleFunc(select);
  }

  const filteredProjects = selectedCategory === "All"
    ? Project
    : Project.filter((project) => project.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <article className="portfolio active" data-page="portfolio">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>

      <section className="projects">
        <ul className="filter-list">
          <li className="filter-item">
            <button className={selectedCategory === "All" ? "active" : ""} onClick={() => handleCategoryChange("All")} data-filter-btn>All</button>
          </li>
          <li className="filter-item">
            <button className={selectedCategory === "APIs" ? "active" : ""} onClick={() => handleCategoryChange("APIs")} data-filter-btn>APIs</button>
          </li>
          <li className="filter-item">
            <button className={selectedCategory === "Web development" ? "active" : ""} onClick={() => handleCategoryChange("Web development")} data-filter-btn>Web development</button>
          </li>
          <li className="filter-item">
            <button className={selectedCategory === "Programming" ? "active" : ""} onClick={() => handleCategoryChange("Programming")} data-filter-btn>Programming</button>
          </li>
        </ul>

        <div className="filter-select-box">
          <button className="filter-select" data-select onClick={toggleSelect}>
            <div className="select-value" data-select-value>{selectedCategory}</div>
            <div className="select-icon">
              <ion-icon name="chevron-down"></ion-icon>
            </div>
          </button>
          <ul className="select-list">
            <li className="select-item">
              <button className={selectedCategory === "All" ? "active" : ""} onClick={() => handleCategoryChange("All")} data-select-item>All</button>
            </li>
            <li className="select-item">
              <button className={selectedCategory === "APIs" ? "active" : ""} onClick={() => handleCategoryChange("APIs")} data-select-item>APIs</button>
            </li>
            <li className="select-item">
              <button className={selectedCategory === "Web development" ? "active" : ""} onClick={() => handleCategoryChange("Web development")} data-select-item>Web development</button>
            </li>
            <li className="select-item">
              <button className={selectedCategory === "Programming" ? "active" : ""} onClick={() => handleCategoryChange("Programming")} data-select-item>Programming</button>
            </li>
          </ul>
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
