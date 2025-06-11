import ReactDOM from "react-dom/client";
import App from "./App";

console.log("🔧 Main.tsx carregando...");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
);

console.log("✅ React renderizado!");
