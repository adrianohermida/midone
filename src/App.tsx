import React from "react";

function App() {
  return (
    <div
      style={{
        padding: "50px",
        backgroundColor: "#f0f8ff",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "navy", fontSize: "32px" }}>
        🎉 REACT APP FUNCIONANDO!
      </h1>
      <p style={{ color: "darkgreen", fontSize: "18px" }}>
        Se você está vendo isso, o React está carregado!
      </p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
    </div>
  );
}

export default App;
