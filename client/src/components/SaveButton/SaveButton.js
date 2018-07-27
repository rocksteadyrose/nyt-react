import React from "react";
import "./SaveButton.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SaveButton = props => (
  <span className="save-button btn" {...props}>
    SAVE
  </span>
);

export default SaveButton;
