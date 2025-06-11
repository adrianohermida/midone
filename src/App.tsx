function App() {
  console.log("App component rendering");
  return React.createElement(
    "div",
    {
      style: {
        padding: "50px",
        backgroundColor: "#f0f8ff",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      },
    },
    [
      React.createElement(
        "h1",
        {
          key: "title",
          style: { color: "navy", fontSize: "32px" },
        },
        "🎉 REACT APP FUNCIONANDO!",
      ),
      React.createElement(
        "p",
        {
          key: "description",
          style: { color: "darkgreen", fontSize: "18px" },
        },
        "Se você está vendo isso, o React está carregado!",
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
}

export default App;
