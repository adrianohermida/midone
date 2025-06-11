import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../stores/hooks";
import {
  Brain,
  Scale,
  TrendingUp,
  Target,
  Zap,
  Shield,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  FileText,
  Users,
  DollarSign,
  Calendar,
  Bell,
  Star,
  Award,
  Lightbulb,
  Cpu,
  Network,
  Gauge,
  Activity,
  Workflow,
  Bot,
  LineChart,
  PieChart,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Plus,
  Settings,
  Filter,
  Download,
  Share2,
  RefreshCw,
} from "lucide-react";
import Button from "../../components/Base/Button";
import { FormInput, FormSelect } from "../../components/Base/Form";
import { Tab } from "../../components/Base/Headless";
import Tippy from "../../components/Base/Tippy";
import juridicoData from "../../data/juridico.json";

interface InsightIA {
  id: string;
  tipo: "preditivo" | "risco" | "oportunidade" | "otimizacao";
  titulo: string;
  descricao: string;
  impacto: "alto" | "medio" | "baixo";
  confianca: number;
  acao_recomendada: string;
  prazo_estimado: string;
  valor_estimado?: number;
}

interface MetricaIA {
  nome: string;
  valor: number;
  unidade: string;
  tendencia: "alta" | "baixa" | "estavel";
  comparacao_periodo: number;
  meta: number;
  cor: string;
  icone: React.ComponentType<{ className?: string }>;
}

const CentralInteligenciaJuridica: React.FC = () => {
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const [activeTab, setActiveTab] = useState("dashboard-ia");
  const [filtroTempo, setFiltroTempo] = useState("30d");
  const [filtroTipoInsight, setFiltroTipoInsight] = useState("todos");

  const [insightsIA, setInsightsIA] = useState<InsightIA[]>([
    {
      id: "1",
      tipo: "preditivo",
      titulo: "Alta Probabilidade de Sucesso - Processo 12345",
      descricao:
        "IA detectou 94% de probabilidade de decisão favorável baseado em jurisprudência similar",
      impacto: "alto",
      confianca: 94,
      acao_recomendada: "Priorizar recursos para este processo",
      prazo_estimado: "3-4 meses",
      valor_estimado: 150000,
    },
    {
      id: "2",
      tipo: "risco",
      titulo: "Risco de Prescrição - 3 Processos",
      descricao:
        "Identificados processos com risco iminente de prescrição nos próximos 60 dias",
      impacto: "alto",
      confianca: 89,
      acao_recomendada: "Revisar prazos e tomar ações preventivas",
      prazo_estimado: "60 dias",
    },
    {
      id: "3",
      tipo: "oportunidade",
      titulo: "Oportunidade de Acordo - Cliente XYZ",
      descricao:
        "Análise indica momento favorável para proposta de acordo em 5 processos",
      impacto: "medio",
      confianca: 87,
      acao_recomendada: "Agendar reunião para discussão de acordo",
      prazo_estimado: "15 dias",
      valor_estimado: 75000,
    },
    {
      id: "4",
      tipo: "otimizacao",
      titulo: "Otimização de Recursos Humanos",
      descricao:
        "IA sugere redistribuição de 8 processos para melhorar eficiência da equipe",
      impacto: "medio",
      confianca: 82,
      acao_recomendada: "Redistribuir processos conforme recomendação",
      prazo_estimado: "1 semana",
    },
  ]);

  const [metricas, setMetricas] = useState<MetricaIA[]>([
    {
      nome: "Taxa de Sucesso",
      valor: 87.3,
      unidade: "%",
      tendencia: "alta",
      comparacao_periodo: 5.2,
      meta: 85,
      cor: "text-green-600",
      icone: TrendingUp,
    },
    {
      nome: "Tempo Médio Processo",
      valor: 8.2,
      unidade: "meses",
      tendencia: "baixa",
      comparacao_periodo: -1.8,
      meta: 10,
      cor: "text-blue-600",
      icone: Clock,
    },
    {
      nome: "Eficiência IA",
      valor: 94.1,
      unidade: "%",
      tendencia: "alta",
      comparacao_periodo: 8.3,
      meta: 90,
      cor: "text-purple-600",
      icone: Cpu,
    },
    {
      nome: "ROI Médio",
      valor: 340,
      unidade: "%",
      tendencia: "alta",
      comparacao_periodo: 15.7,
      meta: 300,
      cor: "text-yellow-600",
      icone: DollarSign,
    },
    {
      nome: "Satisfação Cliente",
      valor: 9.1,
      unidade: "/10",
      tendencia: "alta",
      comparacao_periodo: 0.8,
      meta: 8.5,
      cor: "text-pink-600",
      icone: Star,
    },
    {
      nome: "Automação",
      valor: 76.4,
      unidade: "%",
      tendencia: "alta",
      comparacao_periodo: 12.1,
      meta: 80,
      cor: "text-indigo-600",
      icone: Zap,
    },
  ]);

  const getImpactoColor = (impacto: string) => {
    const colors = {
      alto: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      medio:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      baixo:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    };
    return (
      colors[impacto as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const getTipoIcon = (tipo: string) => {
    const icons = {
      preditivo: <Brain className="w-5 h-5 text-blue-600" />,
      risco: <AlertTriangle className="w-5 h-5 text-red-600" />,
      oportunidade: <Target className="w-5 h-5 text-green-600" />,
      otimizacao: <Zap className="w-5 h-5 text-purple-600" />,
    };
    return (
      icons[tipo as keyof typeof icons] || (
        <Brain className="w-5 h-5 text-gray-600" />
      )
    );
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor);
  };

  const renderMetricaCard = (metrica: MetricaIA, index: number) => {
    const Icon = metrica.icone;
    const isAcimaMeta = metrica.valor >= metrica.meta;

    return (
      <div
        key={index}
        className="bg-white dark:bg-darkmode-600 rounded-lg shadow-sm border border-slate-200 dark:border-darkmode-400 p-6 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-slate-100 dark:bg-darkmode-700`}>
              <Icon className={`w-5 h-5 ${metrica.cor}`} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-300">
                {metrica.nome}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Meta: {metrica.meta}
                {metrica.unidade}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {metrica.tendencia === "alta" ? (
              <ArrowUp className="w-4 h-4 text-green-500" />
            ) : metrica.tendencia === "baixa" ? (
              <ArrowDown className="w-4 h-4 text-red-500" />
            ) : (
              <div className="w-4 h-4" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-300">
              {metrica.valor}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {metrica.unidade}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-medium ${
                metrica.comparacao_periodo > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {metrica.comparacao_periodo > 0 ? "+" : ""}
              {metrica.comparacao_periodo}% vs período anterior
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                isAcimaMeta
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {isAcimaMeta ? "Meta ✓" : "Abaixo da meta"}
            </span>
          </div>

          {/* Barra de Progresso */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Progresso</span>
              <span>{Math.round((metrica.valor / metrica.meta) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-darkmode-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isAcimaMeta ? "bg-green-500" : "bg-yellow-500"
                }`}
                style={{
                  width: `${Math.min((metrica.valor / metrica.meta) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-darkmode-800">
        {/* Header */}
        <div className="bg-white dark:bg-darkmode-600 border-b border-slate-200 dark:border-darkmode-400">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-medium text-slate-800 dark:text-slate-300">
                      Central de Inteligência Jurídica
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Powered by Advanced AI
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FormSelect
                  value={filtroTempo}
                  onChange={(e) => setFiltroTempo(e.target.value)}
                  className="w-32"
                >
                  <option value="7d">7 dias</option>
                  <option value="30d">30 dias</option>
                  <option value="90d">90 dias</option>
                  <option value="1y">1 ano</option>
                </FormSelect>

                <Button variant="outline-secondary">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Atualizar IA
                </Button>

                <Button variant="primary">
                  <Download className="w-4 h-4 mr-2" />
                  Relatório IA
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-darkmode-600 border-b border-slate-200 dark:border-darkmode-400">
          <div className="px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: "dashboard-ia", label: "Dashboard IA", icon: Brain },
                {
                  id: "insights",
                  label: "Insights Preditivos",
                  icon: Lightbulb,
                },
                { id: "automacao", label: "Automação", icon: Workflow },
                {
                  id: "analytics",
                  label: "Analytics Avançado",
                  icon: BarChart3,
                },
                { id: "compliance", label: "Compliance IA", icon: Shield },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {activeTab === "dashboard-ia" && (
            <div className="space-y-6">
              {/* Métricas de Performance IA */}
              <div>
                <h2 className="text-lg font-medium text-slate-900 dark:text-slate-300 mb-4">
                  Métricas de Performance IA
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {metricas.map((metrica, index) =>
                    renderMetricaCard(metrica, index),
                  )}
                </div>
              </div>

              {/* Status da IA */}
              <div className="bg-white dark:bg-darkmode-600 rounded-lg shadow-sm border border-slate-200 dark:border-darkmode-400 p-6">
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-300 mb-4">
                  Status do Sistema IA
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                      <Cpu className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-300">
                      Processamento IA
                    </h4>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      Ativo
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Última análise: há 5 min
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                      <Network className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-300">
                      Modelo Neural
                    </h4>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      v3.2.1
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Precisão: 94.7%
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
                      <Gauge className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-300">
                      Performance
                    </h4>
                    <p className="text-2xl font-bold text-purple-600 mt-1">
                      Excelente
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Latência: 0.2s
                    </p>
                  </div>
                </div>
              </div>

              {/* Insights Recentes */}
              <div className="bg-white dark:bg-darkmode-600 rounded-lg shadow-sm border border-slate-200 dark:border-darkmode-400 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-300">
                    Insights IA Mais Recentes
                  </h3>
                  <Button variant="outline-secondary" size="sm">
                    Ver Todos
                  </Button>
                </div>
                <div className="space-y-4">
                  {insightsIA.slice(0, 3).map((insight) => (
                    <div
                      key={insight.id}
                      className="border border-slate-200 dark:border-darkmode-400 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {getTipoIcon(insight.tipo)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-slate-900 dark:text-slate-300">
                              {insight.titulo}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactoColor(insight.impacto)}`}
                              >
                                {insight.impacto.toUpperCase()}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {insight.confianca}% confiança
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            {insight.descricao}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-500 dark:text-slate-400">
                            <div>
                              <span className="font-medium">Ação:</span>{" "}
                              {insight.acao_recomendada}
                            </div>
                            <div>
                              <span className="font-medium">Prazo:</span>{" "}
                              {insight.prazo_estimado}
                            </div>
                            {insight.valor_estimado && (
                              <div>
                                <span className="font-medium">Impacto:</span>{" "}
                                {formatarMoeda(insight.valor_estimado)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Outras abas */}
          {activeTab !== "dashboard-ia" && (
            <div className="bg-white dark:bg-darkmode-600 rounded-lg shadow-sm border border-slate-200 dark:border-darkmode-400">
              <div className="px-6 py-8">
                <div className="text-center">
                  <Brain className="mx-auto h-12 w-12 text-slate-400" />
                  <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-300">
                    {activeTab.charAt(0).toUpperCase() +
                      activeTab.slice(1).replace("-", " ")}{" "}
                    em Desenvolvimento
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Funcionalidade avançada de IA será disponibilizada em breve.
                  </p>
                  <div className="mt-6">
                    <Button variant="primary">
                      <Bell className="w-4 h-4 mr-2" />
                      Notificar quando disponível
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CentralInteligenciaJuridica;
