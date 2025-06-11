import React from "react";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import IntimacoesView from "../../../../views/Juridico/IntimacoesView";

const IntimacoesPage: React.FC = () => {
  return (
    <DashboardLayout>
      <IntimacoesView />
    </DashboardLayout>
  );
};

export default IntimacoesPage;
