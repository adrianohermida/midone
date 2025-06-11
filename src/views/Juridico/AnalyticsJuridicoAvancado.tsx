import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../stores/hooks";
import {
  Scale,
  BarChart3,
  TrendingUp,
  TrendingDown,
  PieChart,
  LineChart,
  Target,
  Award,
  Clock,
  DollarSign,
  Users,
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Star,
  Zap,
  Brain,
  Eye,
  Filter,
  Download,
  Share2,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Percent,
  Hash,
  Timer,
  Briefcase,
  Building,
  MapPin,
  Tag,
  Activity,
  Gauge,
  Plus,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Button from "../../components/Base/Button";
import { FormInput, FormSelect } from "../../components/Base/Form";
import { Tab } from "../../components/Base/Headless";
import ReportBarChart from "../../components/ReportBarChart";
import ReportDonutChart from "../../components/ReportDonutChart";
import ReportLineChart from "../../components/ReportLineChart";
import Table from "../../components/Base/Table";
import Tippy from "../../components/Base/Tippy";
import juridicoData from "../../data/juridico.json";

interface MetricaAvancada {
  id: string;
  nome: string;
  valor: number;
  unidade: string;
  variacao: number;
  meta: number;
  categoria: "performance" | "financeiro" | "produtividade" | "qualidade";
  icone: React.ComponentType<{ className?: string }>;
  cor: string;
  descricao: string;
  tendencia: "crescente" | "decrescente" | "estavel";
}

interface AnaliseComparativa {
  periodo: string;
  processos_ganhos: number;
  processos_perdidos: number;
  taxa_sucesso: number;
  tempo_medio: number;
  valor_recuperado: number;
  satisfacao_cliente: number;
}

interface RankingAdvogado {
  nome: string;
  processos_ativos: number;
  taxa_sucesso: number;
  tempo_medio: number;
  valor_gerado: number;
  especializacao: string;
  nivel: "junior" | "pleno" | "senior" | "partner";
  avatar: string;
}

const AnalyticsJuridicoAvancado: React.FC = () => {
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const [activeTab, setActiveTab] = useState("overview");
  const [periodoAnalise, setPeriodoAnalise] = useState("30d");
  const [tipoComparacao, setTipoComparacao] = useState("mensal");
  const [filtroArea, setFiltroArea] = useState("todas");

  const [metricas, setMetricas] = useState<MetricaAvancada[]>([
    {
      id: "1",
      nome: "Taxa de Sucesso Global",
      valor: 87.3,
      unidade: "%",
      variacao: 5.2,
      meta: 85,
      categoria: "performance",
      icone: Target,
      cor: "text-green-600",
      descricao: "Percentual de processos com resultado favorável",
      tendencia: "crescente",
    },
    {
      id: "2",
      nome: "Tempo Médio de Resolução",
      valor: 8.2,
      unidade: "meses",
      variacao: -1.8,
      meta: 10,
      categoria: "performance",
      icone: Clock,
      cor: "text-blue-600",
      descricao: "Tempo médio para finalização de processos",
      tendencia: "decrescente",
    },
    {
      id: "3",
      nome: "ROI Médio por Processo",
      valor: 340,
      unidade: "%",
      variacao: 15.7,
      meta: 300,
      categoria: "financeiro",
      icone: DollarSign,
      cor: "text-yellow-600",
      descricao: "Retorno sobre investimento médio",
      tendencia: "crescente",
    },
    {
      id: "4",
      nome: "Produtividade da Equipe",
      valor: 94.1,
      unidade: "pontos",
      variacao: 8.3,
      meta: 90,
      categoria: "produtividade",
      icone: Users,
      cor: "text-purple-600",
      descricao: "Índice de produtividade baseado em múltiplos fatores",
      tendencia: "crescente",
    },
    {
      id: "5",
      nome: "Satisfação do Cliente",
      valor: 9.1,
      unidade: "/10",
      variacao: 0.8,
      meta: 8.5,
      categoria: "qualidade",
      icone: Star,
      cor: "text-pink-600",
      descricao: "Avaliação média dos clientes",
      tendencia: "crescente",
    },
    {
      id: "6",
      nome: "Valor Recuperado",
      valor: 2.8,
      unidade: "M",
      variacao: 22.4,
      meta: 2.5,
      categoria: "financeiro",
      icone: Award,
      cor: "text-indigo-600",
      descricao: "Valor total recuperado em processos",
      tendencia: "crescente",
    },
  ]);

  const [analiseComparativa, setAnaliseComparativa] = useState<
    AnaliseComparativa[]
  >([
    {
      periodo: "Jan 2024",
      processos_ganhos: 42,
      processos_perdidos: 8,
      taxa_sucesso: 84.0,
      tempo_medio: 9.1,
      valor_recuperado: 1.2,
      satisfacao_cliente: 8.7,
    },
    {
      periodo: "Fev 2024",
      processos_ganhos: 38,
      processos_perdidos: 6,
      taxa_sucesso: 86.4,
      tempo_medio: 8.8,
      valor_recuperado: 1.5,
      satisfacao_cliente: 8.9,
    },
    {
      periodo: "Mar 2024",
      processos_ganhos: 45,
      processos_perdidos: 7,
      taxa_sucesso: 86.5,
      tempo_medio: 8.5,
      valor_recuperado: 1.8,
      satisfacao_cliente: 9.0,
    },
    {
      periodo: "Abr 2024",
      processos_ganhos: 52,
      processos_perdidos: 5,
      taxa_sucesso: 91.2,
      tempo_medio: 8.2,
      valor_recuperado: 2.1,
      satisfacao_cliente: 9.2,
    },
    {
      periodo: "Mai 2024",
      processos_ganhos: 48,
      processos_perdidos: 4,
      taxa_sucesso: 92.3,
      tempo_medio: 7.9,
      valor_recuperado: 2.4,
      satisfacao_cliente: 9.1,
    },
    {
      periodo: "Jun 2024",
      processos_ganhos: 55,
      processos_perdidos: 6,
      taxa_sucesso: 90.2,
      tempo_medio: 8.1,
      valor_recuperado: 2.8,
      satisfacao_cliente: 9.3,
    },
  ]);

  const [rankingAdvogados, setRankingAdvogados] = useState<RankingAdvogado[]>([
    {
      nome: "Dr. João Silva",
      processos_ativos: 28,
      taxa_sucesso: 94.2,
      tempo_medio: 7.3,
      valor_gerado: 850000,
      especializacao: "Direito Trabalhista",
      nivel: "senior",
      avatar: "JS",
    },
    {
      nome: "Dra. Maria Santos",
      processos_ativos: 32,
      taxa_sucesso: 91.8,
      tempo_medio: 8.1,
      valor_gerado: 920000,
      especializacao: "Direito Civil",
      nivel: "partner",
      avatar: "MS",
    },
    {
      nome: "Dr. Carlos Lima",
      processos_ativos: 24,
      taxa_sucesso: 89.5,
      tempo_medio: 8.7,
      valor_gerado: 720000,
      especializacao: "Direito Empresarial",
      nivel: "senior",
      avatar: "CL",
    },
    {
      nome: "Dra. Ana Costa",
      processos_ativos: 18,
      taxa_sucesso: 87.3,
      tempo_medio: 9.2,
      valor_gerado: 520000,
      especializacao: "Direito Tributário",
      nivel: "pleno",
      avatar: "AC",
    },
  ]);

  const formatarMoeda = (valor: number) => {
    if (valor >= 1000000) {
      return `R$ ${(valor / 1000000).toFixed(1)}M`;
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor);
  };

  const getNivelColor = (nivel: string) => {
    const colors = {
      junior:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      pleno:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      senior:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      partner:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    };
    return colors[nivel as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const renderMetricaCard = (metrica: MetricaAvancada) => {
    const Icon = metrica.icone;
    const isPositiva = metrica.variacao > 0;
    const atingiuMeta = metrica.valor >= metrica.meta;

    return (
      <div
        key={metrica.id}
        className="bg-white dark:bg-darkmode-600 rounded-lg shadow-sm border border-slate-200 dark:border-darkmode-400 p-6 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-100 dark:bg-darkmode-700 rounded-lg">
              <Icon className={`w-5 h-5 ${metrica.cor}`} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-300">
                {metrica.nome}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {metrica.descricao}
              </p>
            </div>
          </div>
          <Tippy content={`Meta: ${metrica.meta}${metrica.unidade}`}>
            <div
              className={`w-3 h-3 rounded-full ${atingiuMeta ? "bg-green-500" : "bg-yellow-500"}`}
            ></div>
          </Tippy>
        </div>

        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-900 dark:text-slate-300">
              {metrica.unidade === "M" ? metrica.valor : metrica.valor}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {metrica.unidade}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {isPositiva ? (
                <ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${isPositiva ? "text-green-600" : "text-red-600"}`}
              >
                {Math.abs(metrica.variacao)}%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                vs período anterior
              </span>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                atingiuMeta
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {atingiuMeta ? "Meta atingida" : "Abaixo da meta"}
            </span>
          </div>

          {/* Barra de progresso para a meta */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>
                Meta: {metrica.meta}
                {metrica.unidade}
              </span>
              <span>{Math.round((metrica.valor / metrica.meta) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-darkmode-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  atingiuMeta ? "bg-green-500" : "bg-yellow-500"
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
                      Analytics Jurídico Avançado
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Análise inteligente de performance
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FormSelect
                  value={periodoAnalise}
                  onChange={(e) => setPeriodoAnalise(e.target.value)}
                  className="w-36"
                >
                  <option value="7d">Últimos 7 dias</option>
                  <option value="30d">Últimos 30 dias</option>
                  <option value="90d">Últimos 90 dias</option>
                  <option value="6m">Últimos 6 meses</option>
                  <option value="1y">Último ano</option>
                </FormSelect>

                <FormSelect
                  value={filtroArea}
                  onChange={(e) => setFiltroArea(e.target.value)}
                  className="w-40"
                >
                  <option value="todas">Todas as áreas</option>
                  <option value="trabalhista">Trabalhista</option>
                  <option value="civil">Civil</option>
                  <option value="empresarial">Empresarial</option>
                  <option value="tributario">Tributário</option>
                </FormSelect>

                <Button variant="outline-secondary">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Atualizar
                </Button>

                <Button variant="primary">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white dark:bg-darkmode-600 border-b border-slate-200 dark:border-darkmode-400">
          <div className="px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: "overview", label: "Visão Geral", icon: BarChart3 },
                { id: "performance", label: "Performance", icon: Target },
                { id: "financeiro", label: "Financeiro", icon: DollarSign },
                { id: "equipe", label: "Equipe", icon: Users },
                { id: "comparativo", label: "Comparativo", icon: TrendingUp },
                { id: "preditivo", label: "Análise Preditiva", icon: Brain },
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
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Métricas Principais */}
              <div>
                <h2 className="text-lg font-medium text-slate-900 dark:text-slate-300 mb-4">
                  Indicadores-Chave de Performance (KPIs)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {metricas.map(renderMetricaCard)}
                </div>
              </div>

              {/* Gráficos Principais */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-darkmode-600 rounded-lg shadow-sm border border-slate-200 dark:border-darkmode-400 p-6">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-300 mb-4">
                    Evolução da Taxa de Sucesso
                  </h3>
                  <ReportLineChart />
                </div>

                <div className="bg-white dark:bg-darkmode-600 rounded-lg shadow-sm border border-slate-200 dark:border-darkmode-400 p-6">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-300 mb-4">
                    Distribuição por Área Jurídica
                  </h3>
                  <ReportDonutChart />
                </div>
              </div>

              {/* Ranking de Performance */}
              <div className="bg-white dark:bg-darkmode-600 rounded-lg shadow-sm border border-slate-200 dark:border-darkmode-400 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-300">
                    Ranking de Performance da Equipe
                  </h3>
                  <Button variant="outline-secondary" size="sm">
                    Ver Relatório Completo
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Advogado</Table.Th>
                        <Table.Th>Especialização</Table.Th>
                        <Table.Th>Processos Ativos</Table.Th>
                        <Table.Th>Taxa de Sucesso</Table.Th>
                        <Table.Th>Tempo Médio</Table.Th>
                        <Table.Th>Valor Gerado</Table.Th>
                        <Table.Th>Nível</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {rankingAdvogados.map((advogado, index) => (
                        <Table.Tr key={index}>
                          <Table.Td>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                                {advogado.avatar}
                              </div>
                              <span className="font-medium text-slate-900 dark:text-slate-300">
                                {advogado.nome}
                              </span>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {advogado.especializacao}
                            </span>
                          </Table.Td>
                          <Table.Td>
                            <span className="font-medium">
                              {advogado.processos_ativos}
                            </span>
                          </Table.Td>
                          <Table.Td>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">
                                {advogado.taxa_sucesso}%
                              </span>
                              {advogado.taxa_sucesso >= 90 && (
                                <Star className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <span className="text-sm">
                              {advogado.tempo_medio} meses
                            </span>
                          </Table.Td>
                          <Table.Td>
                            <span className="font-medium text-green-600">
                              {formatarMoeda(advogado.valor_gerado)}
                            </span>
                          </Table.Td>
                          <Table.Td>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getNivelColor(advogado.nivel)}`}
                            >
                              {advogado.nivel.charAt(0).toUpperCase() +
                                advogado.nivel.slice(1)}
                            </span>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </div>
              </div>
            </div>
          )}

          {/* Análise Comparativa */}
          {activeTab === "comparativo" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-darkmode-600 rounded-lg shadow-sm border border-slate-200 dark:border-darkmode-400 p-6">
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-300 mb-4">
                  Análise Temporal Comparativa
                </h3>
                <div className="mb-4 flex space-x-4">
                  <FormSelect
                    value={tipoComparacao}
                    onChange={(e) => setTipoComparacao(e.target.value)}
                    className="w-40"
                  >
                    <option value="mensal">Comparação Mensal</option>
                    <option value="trimestral">Comparação Trimestral</option>
                    <option value="anual">Comparação Anual</option>
                  </FormSelect>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Período</Table.Th>
                        <Table.Th>Processos Ganhos</Table.Th>
                        <Table.Th>Processos Perdidos</Table.Th>
                        <Table.Th>Taxa de Sucesso</Table.Th>
                        <Table.Th>Tempo Médio</Table.Th>
                        <Table.Th>Valor Recuperado</Table.Th>
                        <Table.Th>Satisfação</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {analiseComparativa.map((periodo, index) => (
                        <Table.Tr key={index}>
                          <Table.Td>
                            <span className="font-medium">
                              {periodo.periodo}
                            </span>
                          </Table.Td>
                          <Table.Td>
                            <span className="text-green-600 font-medium">
                              {periodo.processos_ganhos}
                            </span>
                          </Table.Td>
                          <Table.Td>
                            <span className="text-red-600 font-medium">
                              {periodo.processos_perdidos}
                            </span>
                          </Table.Td>
                          <Table.Td>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">
                                {periodo.taxa_sucesso}%
                              </span>
                              {index > 0 && analiseComparativa[index - 1] && (
                                <div className="flex items-center">
                                  {periodo.taxa_sucesso >
                                  analiseComparativa[index - 1].taxa_sucesso ? (
                                    <ArrowUp className="w-3 h-3 text-green-500" />
                                  ) : (
                                    <ArrowDown className="w-3 h-3 text-red-500" />
                                  )}
                                </div>
                              )}
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <span className="text-sm">
                              {periodo.tempo_medio} meses
                            </span>
                          </Table.Td>
                          <Table.Td>
                            <span className="font-medium text-green-600">
                              R$ {periodo.valor_recuperado}M
                            </span>
                          </Table.Td>
                          <Table.Td>
                            <div className="flex items-center space-x-1">
                              <span className="font-medium">
                                {periodo.satisfacao_cliente}
                              </span>
                              <Star className="w-4 h-4 text-yellow-500" />
                            </div>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </div>
              </div>

              {/* Gráfico de Tendências */}
              <div className="bg-white dark:bg-darkmode-600 rounded-lg shadow-sm border border-slate-200 dark:border-darkmode-400 p-6">
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-300 mb-4">
                  Tendências de Performance
                </h3>
                <ReportBarChart />
              </div>
            </div>
          )}

          {/* Outras abas */}
          {!["overview", "comparativo"].includes(activeTab) && (
            <div className="bg-white dark:bg-darkmode-600 rounded-lg shadow-sm border border-slate-200 dark:border-darkmode-400">
              <div className="px-6 py-8">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-slate-400" />
                  <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-300">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} em
                    Desenvolvimento
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Análises avançadas serão disponibilizadas em breve.
                  </p>
                  <div className="mt-6">
                    <Button variant="primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Solicitar Acesso Antecipado
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

export default AnalyticsJuridicoAvancado;
