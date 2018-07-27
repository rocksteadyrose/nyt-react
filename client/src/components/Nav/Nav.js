import React from "react";

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
