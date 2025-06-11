import React from "react";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import RelatoriosView from "../../../../views/Juridico/RelatoriosView";

const RelatoriosPage: React.FC = () => {
  return (
    <DashboardLayout>
      <RelatoriosView />
    </DashboardLayout>
  );
};

export default RelatoriosPage;
