import React from "react";
import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-expand-lg bg-primary sticky-top">
    <a className="navbar-brand" href="/">
      NYT ARTICLE SCRUBBER
    </a>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="/saved">Saved Articles</a>
        </li>
      </ul>
  </nav>
);

export default Nav;
