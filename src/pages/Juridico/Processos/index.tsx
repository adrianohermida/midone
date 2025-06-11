import React from "react";
import JuridicioDashboardModerno from "../../../views/Juridico/JuridicioDashboardModerno";

const ProcessosPage: React.FC = () => {
  // Não usar DashboardLayout aqui pois o dashboard moderno já tem seu próprio layout
  return <JuridicioDashboardModerno />;
};

export default ProcessosPage;
