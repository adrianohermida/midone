import ReactDOM from "react-dom/client";
import React from "react";

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
      REACT IS NOW WORKING WITH JSX!
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  console.log("Root element found, rendering React with JSX...");
  ReactDOM.createRoot(root).render(<App />);
} else {
  console.error("Root element not found!");
}
