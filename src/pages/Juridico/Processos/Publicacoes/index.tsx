import React from "react";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import PublicacoesView from "../../../../views/Juridico/PublicacoesView";

const PublicacoesPage: React.FC = () => {
  return (
    <DashboardLayout>
      <PublicacoesView />
    </DashboardLayout>
  );
};

export default PublicacoesPage;
