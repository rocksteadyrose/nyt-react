import React from "react";
import "./DeleteButton.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const DeleteButton = props => (
  <span className="deletebutton" {...props}>
    ✗
  </span>
);

export default DeleteButton;
