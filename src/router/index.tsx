import { Routes, Route } from "react-router-dom";
import Debug from "@/pages/Debug";

const Router = () => {
  return (
    <div style={{ padding: "20px", backgroundColor: "#e8f4fd" }}>
      <h1 style={{ color: "blue" }}>🚀 Router Carregado!</h1>
      <Routes>
        <Route path="/debug" element={<Debug />} />
        <Route
          path="/"
          element={
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                margin: "10px",
              }}
            >
              <h2 style={{ color: "green" }}>✅ Homepage Funcionando!</h2>
              <p>Esta é a página principal.</p>
            </div>
          }
        />
        <Route
          path="*"
          element={
            <div
              style={{
                padding: "20px",
                backgroundColor: "#ffcccc",
                margin: "10px",
              }}
            >
              <h2 style={{ color: "red" }}>❌ Página não encontrada</h2>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default Router;
