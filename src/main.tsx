import ReactDOM from "react-dom/client";
import React from "react";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    React.createElement(
      "div",
      { style: { color: "red", fontSize: "30px", padding: "50px" } },
      "MINIMAL REACT TEST - If you see this, React works!",
    ),
  );
}
