import React from "react";
import { Routes, Route } from "react-router-dom";

const TestPage = () => {
  return (
    <div style={{ padding: "20px", color: "black", backgroundColor: "white" }}>
      <h1>Test Page - React is Working!</h1>
      <p>This confirms that React is rendering correctly.</p>
      <div>Current time: {new Date().toLocaleString()}</div>
    </div>
  );
};

const TestRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<TestPage />} />
      <Route path="*" element={<TestPage />} />
    </Routes>
  );
};

export default TestRouter;
