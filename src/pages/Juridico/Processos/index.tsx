import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import ProcessosView from "../../../views/Juridico/ProcessosView";

const ProcessosPage: React.FC = () => {
  return (
    <DashboardLayout>
      <ProcessosView />
    </DashboardLayout>
  );
};

export default ProcessosPage;
