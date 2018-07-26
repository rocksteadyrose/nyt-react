import React from "react";
import "./Notes.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Notes = props => (
  <span className="Notes" {...props}>
    NOTES
  </span>
);

export default Notes;
