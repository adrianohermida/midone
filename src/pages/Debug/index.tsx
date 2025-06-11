function Debug() {
  return (
    <div
      style={{ padding: "20px", backgroundColor: "#f0f0f0", margin: "20px" }}
    >
      <h1 style={{ color: "red", fontSize: "24px" }}>
        🔧 DEBUG PAGE - FUNCIONANDO!
      </h1>
      <p style={{ color: "blue" }}>
        Se você está vendo esta mensagem, as rotas estão funcionando!
      </p>
      <p>Current URL: {window.location.pathname}</p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
    </div>
  );
}

export default Debug;
