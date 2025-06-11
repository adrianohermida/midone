import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div
      style={{
        color: "red",
        fontSize: "30px",
        padding: "50px",
        backgroundColor: "yellow",
      }}
    >
      REACT + ROUTER WORKING!
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  console.log("Root element found, rendering React with Router...");
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
} else {
  console.error("Root element not found!");
}
