console.log("🚀 INÍCIO: main.tsx carregando...");

try {
  console.log("📦 Importando React...");
  import("react")
    .then((React) => {
      console.log("✅ React importado com sucesso", React);

      return import("react-dom/client");
    })
    .then((ReactDOM) => {
      console.log("✅ ReactDOM importado com sucesso", ReactDOM);

      const rootElement = document.getElementById("root");
      console.log("🎯 Root element:", rootElement);

      if (rootElement) {
        console.log("🏗️ Criando root...");
        const root = ReactDOM.createRoot(rootElement);

        console.log("🎨 Renderizando App...");
        const AppElement = React.createElement(
          "div",
          {
            style: {
              padding: "50px",
              backgroundColor: "#ffeeee",
              minHeight: "100vh",
              fontFamily: "Arial, sans-serif",
            },
          },
          [
            React.createElement(
              "h1",
              {
                key: "title",
                style: { color: "red", fontSize: "40px" },
              },
              "🔥 DIRECT REACT FUNCIONANDO!",
            ),
            React.createElement(
              "p",
              {
                key: "description",
                style: { color: "darkblue", fontSize: "20px" },
              },
              "React está carregado diretamente!",
            ),
            React.createElement(
              "p",
              {
                key: "timestamp",
              },
              "Timestamp: " + new Date().toLocaleString(),
            ),
          ],
        );

        root.render(AppElement);
        console.log("🎉 App renderizado com sucesso!");
      } else {
        console.error("❌ Root element não encontrado!");
      }
    })
    .catch((error) => {
      console.error("💥 Erro ao importar dependências:", error);
    });
} catch (error) {
  console.error("💥 Erro geral:", error);
}
