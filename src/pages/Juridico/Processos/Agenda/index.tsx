import React from "react";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import AgendaView from "../../../../views/Juridico/AgendaView";

const AgendaPage: React.FC = () => {
  return (
    <DashboardLayout>
      <AgendaView />
    </DashboardLayout>
  );
};

export default AgendaPage;
