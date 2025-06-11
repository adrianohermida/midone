import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";

function App() {
  return (
    <div
      style={{
        color: "green",
        fontSize: "30px",
        padding: "50px",
        backgroundColor: "lightblue",
      }}
    >
      REACT + ROUTER + REDUX WORKING!
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  console.log("Root element found, rendering React with Router and Redux...");
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
} else {
  console.error("Root element not found!");
}
