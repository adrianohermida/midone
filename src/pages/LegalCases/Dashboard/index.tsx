import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchCases } from "@/stores/legalCasesSlice";
import { fetchIntimations } from "@/stores/intimationsSlice";
import type { CaseAnalytics, LegalArea, CaseStatus } from "@/types/legal-cases";

// Components
import Lucide from "@/components/Base/Lucide";
import { FormInput } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Chart from "@/components/Base/Chart";
import Alert from "@/components/Base/Alert";
import LoadingIcon from "@/components/Base/LoadingIcon";

// Legal Cases Components
import CaseStatsCards from "@/components/LegalCases/CaseStats";
import RecentIntimations from "@/components/LegalCases/RecentIntimations";
import CaseCard from "@/components/LegalCases/CaseCard";
import DeadlineTracker from "@/components/LegalCases/DeadlineTracker";

const LegalCasesDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    cases,
    loading: casesLoading,
    error: casesError,
  } = useAppSelector((state) => state.legalCases);
  const {
    intimations,
    unreadCount,
    loading: intimationsLoading,
  } = useAppSelector((state) => state.intimations);

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

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchCases());
    dispatch(fetchIntimations({ lido: false }));
  }, [dispatch]);

  useEffect(() => {
    // Calculate analytics from cases data
    if (cases.length > 0) {
      const totalCases = cases.length;
      const activeCases = cases.filter((c) => c.status === "ativo").length;
      const archivedCases = cases.filter(
        (c) => c.status === "arquivado",
      ).length;

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

      // Generate monthly trends (mock data for now)
      const monthlyTrends = [
        { month: "Jan", newCases: 15, closedCases: 8, intimations: 45 },
        { month: "Fev", newCases: 22, closedCases: 12, intimations: 38 },
        { month: "Mar", newCases: 18, closedCases: 15, intimations: 52 },
        { month: "Abr", newCases: 25, closedCases: 10, intimations: 41 },
        { month: "Mai", newCases: 30, closedCases: 18, intimations: 48 },
        { month: "Jun", newCases: 28, closedCases: 20, intimations: 55 },
      ];

      setAnalytics({
        totalCases,
        activeCases,
        archivedCases,
        unreadIntimations: unreadCount,
        overdueDeadlines: 5, // Mock data
        casesByArea,
        casesByStatus,
        casesByPriority,
        monthlyTrends,
      });
    }
  }, [cases, unreadCount]);

  const filteredCases = cases.filter(
    (case_) =>
      case_.numeroProcesso.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const recentCases = filteredCases.slice(0, 6);

  const chartData = {
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
      {
        label: "Intimações",
        data: analytics.monthlyTrends.map((trend) => trend.intimations),
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Tendências Mensais - Gestão Processual",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Dashboard Jurídico
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Visão geral da gestão processual e monitoramento de intimações
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline-primary"
            onClick={() => navigate("/legal-cases/intimations")}
            className="relative"
          >
            <Lucide icon="Bell" className="w-4 h-4 mr-2" />
            Intimações
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate("/legal-cases/create")}
          >
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Novo Processo
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {(casesError || intimationsLoading) && (
        <Alert variant="outline-danger" className="flex items-center">
          <Lucide icon="AlertCircle" className="w-4 h-4 mr-2" />
          {casesError || "Erro ao carregar dados das intimações"}
        </Alert>
      )}

      {/* Loading State */}
      {(casesLoading || intimationsLoading) && (
        <div className="flex items-center justify-center py-12">
          <LoadingIcon icon="oval" className="w-8 h-8 mr-3" />
          <span className="text-slate-600 dark:text-slate-400">
            Carregando dados...
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <CaseStatsCards analytics={analytics} />

      {/* Quick Search */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Lucide
              icon="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4"
            />
            <FormInput
              type="search"
              placeholder="Buscar por número do processo, título ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline-primary"
            onClick={() => navigate("/legal-cases/list")}
          >
            Busca Avançada
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Recent Cases & Chart */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recent Cases */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="border-b border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  Processos Recentes
                </h3>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => navigate("/legal-cases/list")}
                >
                  Ver Todos
                </Button>
              </div>
            </div>
            <div className="p-6">
              {recentCases.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {recentCases.map((case_) => (
                    <CaseCard
                      key={case_.id}
                      case={case_}
                      onClick={() => navigate(`/legal-cases/${case_.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Lucide
                    icon="Folder"
                    className="w-12 h-12 text-slate-400 mx-auto mb-3"
                  />
                  <p className="text-slate-600 dark:text-slate-400">
                    Nenhum processo encontrado
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    className="mt-4"
                    onClick={() => navigate("/legal-cases/create")}
                  >
                    Cadastrar Primeiro Processo
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <Chart
              type="line"
              width="100%"
              height={300}
              data={chartData}
              options={chartOptions}
            />
          </div>
        </div>

        {/* Right Column - Intimations & Deadlines */}
        <div className="space-y-6">
          {/* Recent Intimations */}
          <RecentIntimations
            intimations={intimations.slice(0, 5)}
            loading={intimationsLoading}
            onViewAll={() => navigate("/legal-cases/intimations")}
          />

          {/* Deadline Tracker */}
          <DeadlineTracker
            onViewAll={() => navigate("/legal-cases/deadlines")}
          />

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Ações Rápidas
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline-primary"
                className="w-full justify-start"
                onClick={() => navigate("/legal-cases/create")}
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-3" />
                Novo Processo
              </Button>
              <Button
                variant="outline-secondary"
                className="w-full justify-start"
                onClick={() => navigate("/legal-cases/tree")}
              >
                <Lucide icon="GitBranch" className="w-4 h-4 mr-3" />
                Árvore Processual
              </Button>
              <Button
                variant="outline-secondary"
                className="w-full justify-start"
                onClick={() => navigate("/legal-cases/documents")}
              >
                <Lucide icon="FileText" className="w-4 h-4 mr-3" />
                Documentos
              </Button>
              <Button
                variant="outline-secondary"
                className="w-full justify-start"
                onClick={() => navigate("/legal-cases/analytics")}
              >
                <Lucide icon="BarChart3" className="w-4 h-4 mr-3" />
                Relatórios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalCasesDashboard;
