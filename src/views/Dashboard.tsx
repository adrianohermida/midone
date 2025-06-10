import React from "react";
import MainLayout from "../layouts/MainLayout";

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
            <p className="text-gray-600">This is your main dashboard view</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
