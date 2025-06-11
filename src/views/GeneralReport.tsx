import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const GeneralReport: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Lawdesk CRM
            </h1>
            <p className="text-gray-600 mt-1">
              Visão geral do sistema jurídico
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Atualizar Dados
          </button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Processos Ativos */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                <span className="mr-1">+12%</span>
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">347</p>
              <p className="text-sm text-gray-500 mt-1">Processos Ativos</p>
            </div>
          </div>

          {/* Novos Clientes */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                <span className="mr-1">+8%</span>
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">89</p>
              <p className="text-sm text-gray-500 mt-1">Novos Clientes</p>
            </div>
          </div>

          {/* Audiências Agendadas */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                <span className="mr-1">+5%</span>
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">23</p>
              <p className="text-sm text-gray-500 mt-1">Audiências Agendadas</p>
            </div>
          </div>

          {/* Prazos Vencendo */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex items-center bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                <span className="mr-1">Urgente</span>
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">7</p>
              <p className="text-sm text-gray-500 mt-1">Prazos Vencendo</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Report */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Sales Report
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                10 Jun, 2025 - 10 Jul, 2025
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-6 mb-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">$15,000</p>
                  <p className="text-sm text-gray-500">This Month</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">$10,000</p>
                  <p className="text-sm text-gray-500">Last Month</p>
                </div>
              </div>
            </div>

            {/* Mock Chart */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Sales Chart</p>
              </div>
            </div>
          </div>

          {/* Weekly Top Seller & Sales Report */}
          <div className="space-y-6">
            {/* Weekly Top Seller */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Weekly Top Seller
                </h3>
                <button className="text-sm text-blue-500 hover:text-blue-600">
                  Show More
                </button>
              </div>

              <div className="flex items-center justify-center h-32">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-700">
                        62%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">17 - 30 Years old</span>
                  <span className="ml-auto font-medium">62%</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">31 - 50 Years old</span>
                  <span className="ml-auto font-medium">33%</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">&gt;= 50 Years old</span>
                  <span className="ml-auto font-medium">10%</span>
                </div>
              </div>
            </div>

            {/* Sales Report Pie Chart */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Sales Report
                </h3>
                <button className="text-sm text-blue-500 hover:text-blue-600">
                  Show More
                </button>
              </div>

              <div className="flex items-center justify-center h-32">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-700">
                        62%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">17 - 30 Years old</span>
                  <span className="ml-auto font-medium">62%</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">31 - 50 Years old</span>
                  <span className="ml-auto font-medium">33%</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">&gt;= 50 Years old</span>
                  <span className="ml-auto font-medium">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Official Store */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Official Store
              </h3>
              <button className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Filter by city
              </button>
            </div>

            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Store Locations Map</p>
              </div>
            </div>
          </div>

          {/* Weekly Best Sellers */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Best Sellers
            </h3>

            <div className="space-y-4">
              {[
                {
                  name: "Samsung Galaxy S20",
                  date: "07 January 2022",
                  amount: "$875",
                  change: "+$60",
                  positive: true,
                },
                {
                  name: "iPhone 13 Pro Max",
                  date: "14 June 2022",
                  amount: "$1,200",
                  change: "+$85",
                  positive: true,
                },
                {
                  name: 'MacBook Pro 16"',
                  date: "17 August 2022",
                  amount: "$2,400",
                  change: "+$120",
                  positive: true,
                },
                {
                  name: "Sony WH-1000XM4",
                  date: "18 July 2020",
                  amount: "$350",
                  change: "-$25",
                  positive: false,
                },
                {
                  name: "Dell XPS 13",
                  date: "11 October 2020",
                  amount: "$1,100",
                  change: "+$48",
                  positive: true,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{item.amount}</p>
                    <p
                      className={`text-sm ${item.positive ? "text-green-600" : "text-red-600"}`}
                    >
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GeneralReport;
