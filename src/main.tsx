import ReactDOM from "react-dom/client";
import React from "react";

function App() {
  return React.createElement(
    "div",
    {
      style: {
        color: "red",
        fontSize: "30px",
        padding: "50px",
        backgroundColor: "yellow",
      },
    },
    "REACT IS NOW WORKING!",
  );
}

const root = document.getElementById("root");
if (root) {
  console.log("Root element found, rendering React...");
  ReactDOM.createRoot(root).render(React.createElement(App));
} else {
  console.error("Root element not found!");
}
