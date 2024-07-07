import React, { useState, useEffect } from "react";
import { NavBar } from "./Components";
import About from "./About";
import Resume from "./Resume";
import Portfolio from "./Portfolio";
import Contact from "./Contact";

export default function MainContent() {
  const initialPage = window.localStorage.getItem('section') || 'About';
  const [activePage, setActivePage] = useState(initialPage);

  useEffect(() => {
    window.localStorage.setItem('section', activePage);
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case "About":
        return <About />;
      case "Resume":
        return <Resume />;
      case "Portfolio":
        return <Portfolio />;
      case "Contact":
        return <Contact />;
      default:
        return <About />;
    }
  };

  return (
    <div className="main-content">
      <NavBar setActivePage={setActivePage} activePage={activePage} />
      {renderPage()}
    </div>
  );
}