import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

console.log("🔧 Main.tsx carregando...");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(React.createElement(App));

console.log("✅ React renderizado!");
