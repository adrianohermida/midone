import React from "react";
import JuridicioDashboardCompleto from "../../../views/Juridico/JuridicioDashboardCompleto";

const ProcessosPage: React.FC = () => {
  // Dashboard completo standalone - sem layout wrapper para evitar duplicação
  return <JuridicioDashboardCompleto />;
};

export default ProcessosPage;
