import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="Header">
      <div>
        <h1>Weather App</h1>
      </div>
      <nav>
        <a href="/?city=Seoul">Seoul</a>
        <a href="/?city=Chicago">Chicago</a>
        <a href="/?city=Toronto">Toronto</a>
        <a href="/?city=Shanghai">Shanghai</a>
        <a href="/?city=New York">New York</a>
      </nav>
    </header>
  );
}

export default Header;
