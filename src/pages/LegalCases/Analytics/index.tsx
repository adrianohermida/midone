import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/stores/hooks";
import type { CaseAnalytics, LegalArea, CaseStatus } from "@/types/legal-cases";

// Components
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Chart from "@/components/Base/Chart";
import { FormSelect } from "@/components/Base/Form";
import { Tab } from "@/components/Base/Headless";

const LegalCasesAnalytics: React.FC = () => {
  const { cases } = useAppSelector((state) => state.legalCases);
  const [selectedPeriod, setSelectedPeriod] = useState("12months");
  const [analytics, setAnalytics] = useState<CaseAnalytics>({
    totalCases: 0,
    activeCases: 0,
    archivedCases: 0,
    unreadIntimations: 0,
    overdueDeadlines: 0,
    casesByArea: {} as Record<LegalArea, number>,
    casesByStatus: {} as Record<CaseStatus, number>,
    casesByPriority: {} as Record<any, number>,
    monthlyTrends: [],
  });

  useEffect(() => {
    if (cases.length > 0) {
      calculateAnalytics();
    }
  }, [cases, selectedPeriod]);

  const calculateAnalytics = () => {
    // Calculate basic metrics
    const totalCases = cases.length;
    const activeCases = cases.filter((c) => c.status === "ativo").length;
    const archivedCases = cases.filter((c) => c.status === "arquivado").length;

    // Group by area
    const casesByArea = cases.reduce(
      (acc, case_) => {
        acc[case_.area] = (acc[case_.area] || 0) + 1;
        return acc;
      },
      {} as Record<LegalArea, number>,
    );

    // Group by status
    const casesByStatus = cases.reduce(
      (acc, case_) => {
        acc[case_.status] = (acc[case_.status] || 0) + 1;
        return acc;
      },
      {} as Record<CaseStatus, number>,
    );

    // Group by priority
    const casesByPriority = cases.reduce(
      (acc, case_) => {
        acc[case_.prioridade] = (acc[case_.prioridade] || 0) + 1;
        return acc;
      },
      {} as Record<any, number>,
    );

    // Generate monthly trends (mock data for demonstration)
    const monthlyTrends = [
      { month: "Jan", newCases: 15, closedCases: 8, intimations: 45 },
      { month: "Fev", newCases: 22, closedCases: 12, intimations: 38 },
      { month: "Mar", newCases: 18, closedCases: 15, intimations: 52 },
      { month: "Abr", newCases: 25, closedCases: 10, intimations: 41 },
      { month: "Mai", newCases: 30, closedCases: 18, intimations: 48 },
      { month: "Jun", newCases: 28, closedCases: 20, intimations: 55 },
      { month: "Jul", newCases: 35, closedCases: 25, intimations: 42 },
      { month: "Ago", newCases: 32, closedCases: 22, intimations: 58 },
      { month: "Set", newCases: 28, closedCases: 19, intimations: 47 },
      { month: "Out", newCases: 31, closedCases: 24, intimations: 53 },
      { month: "Nov", newCases: 26, closedCases: 21, intimations: 49 },
      { month: "Dez", newCases: 23, closedCases: 18, intimations: 44 },
    ];

    setAnalytics({
      totalCases,
      activeCases,
      archivedCases,
      unreadIntimations: 15, // Mock data
      overdueDeadlines: 3, // Mock data
      casesByArea,
      casesByStatus,
      casesByPriority,
      monthlyTrends,
    });
  };

  // Chart configurations
  const trendsChartData = {
    labels: analytics.monthlyTrends.map((trend) => trend.month),
    datasets: [
      {
        label: "Novos Processos",
        data: analytics.monthlyTrends.map((trend) => trend.newCases),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
      {
        label: "Processos Finalizados",
        data: analytics.monthlyTrends.map((trend) => trend.closedCases),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const areaChartData = {
    labels: Object.keys(analytics.casesByArea).map((area) => {
      const areaLabels: Record<string, string> = {
        civil: "Cível",
        trabalhista: "Trabalhista",
        criminal: "Criminal",
        tributario: "Tributário",
        familia: "Família",
        consumidor: "Consumidor",
        previdenciario: "Previdenciário",
        administrativo: "Administrativo",
        empresarial: "Empresarial",
        ambiental: "Ambiental",
      };
      return areaLabels[area] || area;
    }),
    datasets: [
      {
        data: Object.values(analytics.casesByArea),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
          "#84cc16",
          "#f97316",
          "#ec4899",
          "#6b7280",
        ],
      },
    ],
  };

  const statusChartData = {
    labels: Object.keys(analytics.casesByStatus).map((status) => {
      const statusLabels: Record<string, string> = {
        ativo: "Ativo",
        suspenso: "Suspenso",
        arquivado: "Arquivado",
        finalizado: "Finalizado",
        em_recurso: "Em Recurso",
      };
      return statusLabels[status] || status;
    }),
    datasets: [
      {
        data: Object.values(analytics.casesByStatus),
        backgroundColor: [
          "#10b981",
          "#f59e0b",
          "#6b7280",
          "#3b82f6",
          "#8b5cf6",
        ],
      },
    ],
  };

  const intimationsChartData = {
    labels: analytics.monthlyTrends.map((trend) => trend.month),
    datasets: [
      {
        label: "Intimações",
        data: analytics.monthlyTrends.map((trend) => trend.intimations),
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Relatórios e Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Análise detalhada da gestão processual e performance do escritório
          </p>
        </div>
        <div className="flex space-x-3">
          <FormSelect
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="3months">Últimos 3 meses</option>
            <option value="6months">Últimos 6 meses</option>
            <option value="12months">Últimos 12 meses</option>
            <option value="24months">Últimos 24 meses</option>
          </FormSelect>
          <Button variant="outline-primary">
            <Lucide icon="Download" className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total de Processos",
            value: analytics.totalCases,
            icon: "FileText",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            change: "+12%",
          },
          {
            title: "Taxa de Sucesso",
            value: "85%",
            icon: "TrendingUp",
            color: "text-green-600",
            bgColor: "bg-green-50",
            change: "+3%",
          },
          {
            title: "Tempo Médio de Resolução",
            value: "8.5 meses",
            icon: "Clock",
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
            change: "-1.2 meses",
          },
          {
            title: "Receita Mensal",
            value: "R$ 145.800",
            icon: "DollarSign",
            color: "text-green-600",
            bgColor: "bg-green-50",
            change: "+18%",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {card.value}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs font-medium text-green-600">
                    {card.change}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                    vs. período anterior
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <Lucide
                  icon={card.icon as any}
                  className={`w-6 h-6 ${card.color}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <Tab.Group>
          <div className="border-b border-slate-200 dark:border-slate-700">
            <Tab.List className="flex space-x-8 px-6">
              <Tab
                className={({ selected }) =>
                  `py-4 px-1 border-b-2 font-medium text-sm ${
                    selected
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`
                }
              >
                Tendências Gerais
              </Tab>
              <Tab
                className={({ selected }) =>
                  `py-4 px-1 border-b-2 font-medium text-sm ${
                    selected
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`
                }
              >
                Por Área do Direito
              </Tab>
              <Tab
                className={({ selected }) =>
                  `py-4 px-1 border-b-2 font-medium text-sm ${
                    selected
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`
                }
              >
                Status dos Processos
              </Tab>
              <Tab
                className={({ selected }) =>
                  `py-4 px-1 border-b-2 font-medium text-sm ${
                    selected
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`
                }
              >
                Intimações
              </Tab>
            </Tab.List>
          </div>

          <Tab.Panels>
            <Tab.Panel className="p-6">
              <div className="h-96">
                <Chart
                  type="line"
                  width="100%"
                  height="100%"
                  data={trendsChartData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: {
                        display: true,
                        text: "Tendências Mensais - Novos Processos vs Finalizados",
                      },
                    },
                  }}
                />
              </div>
            </Tab.Panel>

            <Tab.Panel className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Distribuição por Área do Direito
                  </h3>
                  <div className="h-80">
                    <Chart
                      type="pie"
                      width="100%"
                      height="100%"
                      data={areaChartData}
                      options={pieChartOptions}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Performance por Área
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(analytics.casesByArea).map(
                      ([area, count]) => {
                        const percentage = (count / analytics.totalCases) * 100;
                        const areaLabels: Record<string, string> = {
                          civil: "Cível",
                          trabalhista: "Trabalhista",
                          criminal: "Criminal",
                          tributario: "Tributário",
                          familia: "Família",
                        };

                        return (
                          <div
                            key={area}
                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                          >
                            <div>
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                {areaLabels[area] || area}
                              </span>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                {count} processos
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                {percentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>
            </Tab.Panel>

            <Tab.Panel className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Status dos Processos
                  </h3>
                  <div className="h-80">
                    <Chart
                      type="doughnut"
                      width="100%"
                      height="100%"
                      data={statusChartData}
                      options={pieChartOptions}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Detalhamento
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(analytics.casesByStatus).map(
                      ([status, count]) => {
                        const percentage = (count / analytics.totalCases) * 100;
                        const statusLabels: Record<string, string> = {
                          ativo: "Ativo",
                          suspenso: "Suspenso",
                          arquivado: "Arquivado",
                          finalizado: "Finalizado",
                          em_recurso: "Em Recurso",
                        };

                        return (
                          <div
                            key={status}
                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                          >
                            <div>
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                {statusLabels[status] || status}
                              </span>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                {count} processos
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                {percentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>
            </Tab.Panel>

            <Tab.Panel className="p-6">
              <div className="h-96">
                <Chart
                  type="line"
                  width="100%"
                  height="100%"
                  data={intimationsChartData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: {
                        display: true,
                        text: "Volume de Intimações por Mês",
                      },
                    },
                  }}
                />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Clients */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Principais Clientes
          </h3>
          <div className="space-y-3">
            {[
              { name: "Empresa ABC Ltda", processes: 12, value: "R$ 45.000" },
              { name: "João Silva & Cia", processes: 8, value: "R$ 32.000" },
              { name: "Maria Santos", processes: 6, value: "R$ 28.000" },
              { name: "Tech Solutions Inc", processes: 5, value: "R$ 25.000" },
            ].map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-300">
                    {client.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {client.processes} processos
                  </p>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {client.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tribunals */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Tribunais Mais Utilizados
          </h3>
          <div className="space-y-3">
            {[
              { name: "TJSP", processes: 25, percentage: 45 },
              { name: "TJRJ", processes: 12, percentage: 22 },
              { name: "TST", processes: 8, percentage: 15 },
              { name: "STJ", processes: 5, percentage: 9 },
            ].map((tribunal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {tribunal.name}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {tribunal.processes} processos
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${tribunal.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Métricas de Performance
          </h3>
          <div className="space-y-4">
            {[
              {
                metric: "Tempo médio de resposta",
                value: "2.1 dias",
                trend: "down",
              },
              { metric: "Taxa de sucesso", value: "87%", trend: "up" },
              { metric: "Processos por advogado", value: "15.3", trend: "up" },
              {
                metric: "Prazo médio de resolução",
                value: "8.2 meses",
                trend: "down",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {item.metric}
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {item.value}
                  </p>
                </div>
                <div
                  className={`p-1 rounded ${
                    item.trend === "up"
                      ? "text-green-600 bg-green-50"
                      : "text-red-600 bg-red-50"
                  }`}
                >
                  <Lucide
                    icon={item.trend === "up" ? "TrendingUp" : "TrendingDown"}
                    className="w-4 h-4"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalCasesAnalytics;
