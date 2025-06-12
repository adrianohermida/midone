import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../stores/hooks";
import {
  Scale,
  FileText,
  Bell,
  Calendar,
  BarChart3,
  Search,
  Plus,
  MessageSquare,
  Eye,
  Edit,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  TrendingUp,
  Download,
  Share2,
  Settings,
  Zap,
  Bot,
  Target,
  Star,
  MoreHorizontal,
  RefreshCw,
  Layout,
  Activity,
  User,
  DollarSign,
  Send,
  Phone,
  Mail,
  Shield,
  Briefcase,
  Award,
  X,
  ChevronDown,
  Filter as FilterIcon,
} from "lucide-react";

// Componentes responsivos
import ResponsiveCard from "../../components/ResponsiveCard";
import ResponsiveGrid from "../../components/ResponsiveGrid";
import useResponsive from "../../hooks/useResponsive";

// Componentes base
import Button from "../../components/Base/Button";
import { FormInput, FormSelect } from "../../components/Base/Form";
import Table from "../../components/Base/Table";
import Slideover from "../../components/Base/Headless/Slideover";
import { Menu, Popover } from "../../components/Base/Headless";
import Tippy from "../../components/Base/Tippy";
import Notification from "../../components/Base/Notification";

// Views especializadas
import ProcessosView from "./ProcessosView";
import PublicacoesView from "./PublicacoesView";
import IntimacoesView from "./IntimacoesView";
import AgendaView from "./AgendaView";
import RelatoriosView from "./RelatoriosView";
import CentralInteligenciaJuridica from "./CentralInteligenciaJuridica";

// Dados
import juridicoData from "../../data/juridico.json";

interface ChatMessage {
  id: string;
  autor: string;
  mensagem: string;
  timestamp: string;
  avatar?: string;
  tipo: "texto" | "arquivo" | "sistema";
  lida?: boolean;
}

interface ActivityItem {
  id: string;
  tipo: "processo" | "publicacao" | "intimacao" | "prazo" | "audiencia";
  titulo: string;
  descricao: string;
  timestamp: string;
  usuario: string;
  status: "info" | "success" | "warning" | "error";
  processo?: string;
}

const JuridicioDashboardMobileFriendly: React.FC = () => {
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const responsive = useResponsive();

  const [activeTab, setActiveTab] = useState("overview");
  const [filtros, setFiltros] = useState({
    busca: "",
    status: "",
    tipo: "",
    responsavel: "",
    periodo: "30d",
  });

  // Estados dos modais/slideovers
  const [showNovoProcesso, setShowNovoProcesso] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showConfiguracoes, setShowConfiguracoes] = useState(false);
  const [showNotificacoes, setShowNotificacoes] = useState(false);
  const [showAtividades, setShowAtividades] = useState(false);

  // Estados de dados
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      autor: "Dr. João Silva",
      mensagem:
        "Urgente: Processo 0001234-56.2024.8.02.0001 precisa de análise jurisprudencial até amanhã",
      timestamp: "10:30",
      avatar: "JS",
      tipo: "texto",
      lida: false,
    },
    {
      id: "2",
      autor: "Dra. Maria Santos",
      mensagem:
        "Audiência confirmada para quinta-feira às 14h - Vara Cível Central",
      timestamp: "09:15",
      avatar: "MS",
      tipo: "texto",
      lida: false,
    },
    {
      id: "3",
      autor: "Dr. Carlos Lima",
      mensagem:
        "Cliente ABC Ltda aprovou proposta de acordo no valor de R$ 150.000",
      timestamp: "08:45",
      avatar: "CL",
      tipo: "texto",
      lida: true,
    },
    {
      id: "4",
      autor: "Sistema IA",
      mensagem:
        "Detectada nova jurisprudência favorável para processo trabalhista #5678",
      timestamp: "08:30",
      avatar: "IA",
      tipo: "sistema",
      lida: false,
    },
  ]);

  const [atividades, setAtividades] = useState<ActivityItem[]>([
    {
      id: "1",
      tipo: "prazo",
      titulo: "Prazo de Contestação",
      descricao: "Vence em 3 dias - Processo 0001234-56.2024",
      timestamp: "2 min atrás",
      usuario: "Dr. João Silva",
      status: "warning",
      processo: "0001234-56.2024.8.02.0001",
    },
    {
      id: "2",
      tipo: "publicacao",
      titulo: "Nova Publicação DJE",
      descricao: "Sentença publicada - Processo favorável",
      timestamp: "15 min atrás",
      usuario: "Sistema",
      status: "success",
      processo: "0005678-90.2024.8.02.0002",
    },
  ]);

  // Métricas principais adaptadas ao dispositivo
  const metricas = [
    {
      id: "processos",
      titulo: "Processos Ativos",
      valor: juridicoData.dashboard.metricas.processos_ativos,
      variacao: 12.5,
      icon: FileText,
      color: "blue" as const,
    },
    {
      id: "prazos",
      titulo: "Prazos Críticos",
      valor: juridicoData.dashboard.metricas.prazos_vencendo,
      variacao: -8.2,
      icon: Clock,
      color: "red" as const,
    },
    {
      id: "intimacoes",
      titulo: "Intimações Pendentes",
      valor: juridicoData.dashboard.metricas.intimacoes_pendentes,
      variacao: 5.8,
      icon: Bell,
      color: "yellow" as const,
    },
    {
      id: "eficiencia",
      titulo: "Eficiência IA",
      valor: "94.2%",
      variacao: 2.1,
      icon: Bot,
      color: "purple" as const,
    },
    {
      id: "sucesso",
      titulo: "Taxa de Sucesso",
      valor: "87.5%",
      variacao: 4.3,
      icon: CheckCircle,
      color: "green" as const,
    },
    {
      id: "faturamento",
      titulo: "Faturamento Mensal",
      valor: "R$ 485.000",
      variacao: 15.7,
      icon: DollarSign,
      color: "emerald" as const,
    },
  ];

  // Configuração das abas
  const tabs = [
    {
      id: "overview",
      label: "Visão Geral",
      icon: Layout,
      badge: null,
      component: null,
    },
    {
      id: "processos",
      label: "Processos",
      icon: FileText,
      badge: juridicoData.processos.length,
      component: ProcessosView,
    },
    {
      id: "publicacoes",
      label: "Publicações",
      icon: Bell,
      badge: juridicoData.publicacoes.filter((p) => p.status === "nao_lida")
        .length,
      component: PublicacoesView,
    },
    {
      id: "intimacoes",
      label: "Intimações",
      icon: AlertTriangle,
      badge: juridicoData.intimacoes.filter((i) => i.status === "pendente")
        .length,
      component: IntimacoesView,
    },
    {
      id: "agenda",
      label: "Agenda",
      icon: Calendar,
      badge: null,
      component: AgendaView,
    },
    {
      id: "relatorios",
      label: "Relatórios",
      icon: BarChart3,
      badge: null,
      component: RelatoriosView,
    },
    {
      id: "ia-insights",
      label: "IA Insights",
      icon: Bot,
      badge: 3,
      component: CentralInteligenciaJuridica,
    },
  ];

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  // Auto-atualização
  useEffect(() => {
    const interval = setInterval(() => {
      const novaAtividade: ActivityItem = {
        id: Date.now().toString(),
        tipo: "processo",
        titulo: "Sincronização Tribunais",
        descricao: "Dados atualizados automaticamente",
        timestamp: "agora",
        usuario: "Sistema IA",
        status: "info",
      };

      setAtividades((prev) => [novaAtividade, ...prev.slice(0, 9)]);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-darkmode-800">
        {/* Header Superior Responsivo */}
        <div className="sticky top-0 z-50 bg-white dark:bg-darkmode-600 border-b border-slate-200 dark:border-darkmode-400 shadow-sm">
          <div
            className={`px-4 sm:px-6 lg:px-8 ${responsive.getMaxWidth()} mx-auto`}
          >
            <div className="flex justify-between items-center h-16">
              {/* Logo e Título */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  {!responsive.shouldCompactHeader() && (
                    <div>
                      <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        Dashboard Jurídico
                      </h1>
                      <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
                        Sistema Integrado de Gestão Processual
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Área Central - Busca (Desktop/Tablet) */}
              {responsive.shouldShowElement("tablet") && (
                <div className="flex-1 max-w-2xl mx-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <FormInput
                      type="text"
                      placeholder="Buscar processos, clientes, prazos..."
                      value={filtros.busca}
                      onChange={(e) =>
                        setFiltros({ ...filtros, busca: e.target.value })
                      }
                      className="block w-full pl-10 pr-12 py-2.5 border border-slate-300 rounded-xl leading-5 bg-slate-50 placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm dark:bg-darkmode-700 dark:border-darkmode-400 dark:placeholder-slate-500 dark:text-slate-300"
                    />
                    {filtros.busca && (
                      <button
                        onClick={() => setFiltros({ ...filtros, busca: "" })}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <X className="h-4 w-4 text-slate-400 hover:text-slate-500" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Ações e Controles */}
              <div className="flex items-center space-x-2">
                {/* Busca Mobile */}
                {responsive.isMobile && (
                  <Button variant="outline-secondary" size="sm" className="p-2">
                    <Search className="w-4 h-4" />
                  </Button>
                )}

                {/* Filtros (Tablet+) */}
                {responsive.shouldShowElement("tablet") && (
                  <Popover className="relative">
                    <Popover.Button
                      as={Button}
                      variant="outline-secondary"
                      size="sm"
                    >
                      <FilterIcon className="w-4 h-4 mr-2" />
                      {!responsive.isMobile && "Filtros"}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Popover.Button>
                    <Popover.Panel className="absolute right-0 z-50 mt-2 w-80 lg:w-96 bg-white dark:bg-darkmode-600 rounded-xl shadow-xl border border-slate-200 dark:border-darkmode-400">
                      <div className="p-4 lg:p-6 space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          Filtros Avançados
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Status
                            </label>
                            <FormSelect
                              value={filtros.status}
                              onChange={(e) =>
                                setFiltros({
                                  ...filtros,
                                  status: e.target.value,
                                })
                              }
                              className="w-full"
                            >
                              <option value="">Todos</option>
                              <option value="Em Andamento">Em Andamento</option>
                              <option value="Aguardando">Aguardando</option>
                              <option value="Finalizado">Finalizado</option>
                            </FormSelect>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Tipo
                            </label>
                            <FormSelect
                              value={filtros.tipo}
                              onChange={(e) =>
                                setFiltros({ ...filtros, tipo: e.target.value })
                              }
                              className="w-full"
                            >
                              <option value="">Todos</option>
                              <option value="Trabalhista">Trabalhista</option>
                              <option value="Cível">Cível</option>
                              <option value="Empresarial">Empresarial</option>
                            </FormSelect>
                          </div>
                        </div>

                        <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-darkmode-400">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              setFiltros({
                                busca: "",
                                status: "",
                                tipo: "",
                                responsavel: "",
                                periodo: "30d",
                              })
                            }
                          >
                            Limpar
                          </Button>
                          <Button variant="primary" size="sm">
                            Aplicar
                          </Button>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Popover>
                )}

                {/* Notificações */}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setShowNotificacoes(true)}
                  className="relative p-2"
                >
                  <Bell className="w-4 h-4" />
                  {atividades.filter((a) => a.status === "warning").length >
                    0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {atividades.filter((a) => a.status === "warning").length}
                    </span>
                  )}
                </Button>

                {/* Chat (Desktop+) */}
                {responsive.shouldShowElement("desktop") && (
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setShowChat(true)}
                    className="relative p-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {chatMessages.filter((m) => !m.lida).length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {chatMessages.filter((m) => !m.lida).length}
                      </span>
                    )}
                  </Button>
                )}

                {/* Novo Processo */}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowNovoProcesso(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {responsive.isMobile ? "" : "Novo"}
                </Button>

                {/* Menu More (Mobile) / Settings (Desktop) */}
                <Menu as="div" className="relative">
                  <Menu.Button
                    as={Button}
                    variant="outline-secondary"
                    size="sm"
                    className="p-2"
                  >
                    {responsive.isMobile ? (
                      <MoreHorizontal className="w-4 h-4" />
                    ) : (
                      <Settings className="w-4 h-4" />
                    )}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 w-56 bg-white dark:bg-darkmode-600 rounded-xl shadow-lg border border-slate-200 dark:border-darkmode-400 focus:outline-none z-50">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setShowConfiguracoes(true)}
                            className={`${
                              active ? "bg-slate-100 dark:bg-darkmode-700" : ""
                            } group flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 w-full text-left`}
                          >
                            <Settings className="w-4 h-4 mr-3" />
                            Configurações
                          </button>
                        )}
                      </Menu.Item>
                      {responsive.isMobile && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => setShowChat(true)}
                              className={`${
                                active
                                  ? "bg-slate-100 dark:bg-darkmode-700"
                                  : ""
                              } group flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 w-full text-left`}
                            >
                              <MessageSquare className="w-4 h-4 mr-3" />
                              Chat da Equipe
                            </button>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setShowAtividades(true)}
                            className={`${
                              active ? "bg-slate-100 dark:bg-darkmode-700" : ""
                            } group flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 w-full text-left`}
                          >
                            <Activity className="w-4 h-4 mr-3" />
                            Atividades
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação por Abas Responsiva */}
        <div className="bg-white dark:bg-darkmode-600 border-b border-slate-200 dark:border-darkmode-400 sticky top-16 z-40">
          <div
            className={`px-4 sm:px-6 lg:px-8 ${responsive.getMaxWidth()} mx-auto`}
          >
            <div className="flex space-x-1 overflow-x-auto scrollbar-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-3 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                      isActive
                        ? "border-primary text-primary bg-primary/5"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {responsive.isMobile ? "" : tab.label}
                    {tab.badge && tab.badge > 0 && (
                      <span
                        className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                          isActive
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-600 dark:bg-darkmode-700 dark:text-slate-400"
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1">
          {activeTab === "overview" ? (
            <div
              className={`${responsive.getMaxWidth()} mx-auto ${responsive.getPadding()}`}
            >
              {/* Métricas Responsivas */}
              <ResponsiveGrid
                title="Métricas Principais"
                subtitle="Acompanhe os indicadores chave do seu escritório"
                columns={{
                  mobile: responsive.isMobile ? 2 : 1,
                  tablet: 3,
                  desktop: 3,
                  ultrawide: 6,
                }}
                spacing="normal"
                className="mb-8"
              >
                {metricas
                  .slice(0, responsive.getOptimalItemsPerPage(6))
                  .map((metrica) => (
                    <ResponsiveCard
                      key={metrica.id}
                      title={metrica.titulo}
                      value={metrica.valor}
                      change={metrica.variacao}
                      changeLabel="este mês"
                      icon={metrica.icon}
                      color={metrica.color}
                      size={responsive.getCardSize()}
                    />
                  ))}
              </ResponsiveGrid>

              {/* Grid Principal Responsivo */}
              <ResponsiveGrid
                columns={{
                  mobile: 1,
                  tablet: 1,
                  desktop: responsive.shouldShowSidebar() ? 2 : 1,
                  ultrawide: responsive.shouldShowSidebar() ? 3 : 2,
                }}
                spacing="normal"
              >
                {/* Painel Principal - Processos Críticos */}
                <div
                  className={
                    responsive.shouldShowSidebar()
                      ? "lg:col-span-2"
                      : "col-span-1"
                  }
                >
                  <div className="bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400">
                    <div className="p-4 lg:p-6 border-b border-slate-200 dark:border-darkmode-400">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            Processos Críticos
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Requerem atenção imediata
                          </p>
                        </div>

                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => setActiveTab("processos")}
                        >
                          Ver Todos
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 lg:p-6">
                      <ResponsiveGrid
                        columns={{
                          mobile: 1,
                          tablet: 2,
                          desktop: responsive.isUltrawide ? 3 : 2,
                          ultrawide: 3,
                        }}
                        spacing="normal"
                      >
                        {juridicoData.processos
                          .slice(0, responsive.getOptimalItemsPerPage(6))
                          .map((processo) => (
                            <div
                              key={processo.id}
                              className="border border-slate-200 dark:border-darkmode-400 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-primary/50"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                                    {processo.numero}
                                  </h4>
                                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                    {processo.cliente.nome}
                                  </p>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                                  CRÍTICO
                                </span>
                              </div>

                              <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-500 dark:text-slate-400">
                                    Status:
                                  </span>
                                  <span className="px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                    {processo.status}
                                  </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-500 dark:text-slate-400">
                                    Valor:
                                  </span>
                                  <span className="font-medium text-slate-900 dark:text-slate-100">
                                    {new Intl.NumberFormat("pt-BR", {
                                      style: "currency",
                                      currency: "BRL",
                                      minimumFractionDigits: 0,
                                    }).format(processo.valor_causa)}
                                  </span>
                                </div>

                                {processo.prazos.length > 0 && (
                                  <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">
                                      Próximo prazo:
                                    </span>
                                    <span className="font-medium text-red-600">
                                      {processo.prazos[0].dias_restantes} dias
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-darkmode-400">
                                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                  {processo.responsavel}
                                </span>
                                <div className="flex space-x-1">
                                  <Tippy content="Visualizar">
                                    <Button
                                      variant="outline-secondary"
                                      size="sm"
                                      className="p-1.5"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </Button>
                                  </Tippy>
                                  <Tippy content="Chat">
                                    <Button
                                      variant="outline-secondary"
                                      size="sm"
                                      className="p-1.5"
                                    >
                                      <MessageSquare className="w-3.5 h-3.5" />
                                    </Button>
                                  </Tippy>
                                </div>
                              </div>
                            </div>
                          ))}
                      </ResponsiveGrid>
                    </div>
                  </div>
                </div>

                {/* Sidebar Direita - Condicional */}
                {responsive.shouldShowSidebar() && (
                  <div className="space-y-6">
                    {/* Chat da Equipe */}
                    <div className="bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400">
                      <div className="p-4 border-b border-slate-200 dark:border-darkmode-400">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                            Chat da Equipe
                          </h3>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {chatMessages.filter((m) => !m.lida).length} novas
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                        {chatMessages
                          .slice(0, responsive.getOptimalItemsPerPage(4))
                          .map((message) => (
                            <div
                              key={message.id}
                              className="flex items-start space-x-3"
                            >
                              <div
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                                  message.tipo === "sistema"
                                    ? "bg-purple-500"
                                    : "bg-primary"
                                }`}
                              >
                                {message.avatar}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                                    {message.autor}
                                  </p>
                                  <div className="flex items-center space-x-2">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      {message.timestamp}
                                    </p>
                                    {!message.lida && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                  </div>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                                  {message.mensagem}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="p-4 border-t border-slate-200 dark:border-darkmode-400">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-full"
                          onClick={() => setShowChat(true)}
                        >
                          Abrir Chat Completo
                        </Button>
                      </div>
                    </div>

                    {/* Atividades Recentes */}
                    <div className="bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400">
                      <div className="p-4 border-b border-slate-200 dark:border-darkmode-400">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                            Atividades Recentes
                          </h3>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setShowAtividades(true)}
                          >
                            <Activity className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
                        {atividades
                          .slice(0, responsive.getOptimalItemsPerPage(5))
                          .map((atividade) => {
                            const iconMap = {
                              processo: FileText,
                              publicacao: Bell,
                              intimacao: AlertTriangle,
                              prazo: Clock,
                              audiencia: Calendar,
                            };
                            const Icon =
                              iconMap[atividade.tipo as keyof typeof iconMap];

                            return (
                              <div
                                key={atividade.id}
                                className="flex items-start space-x-3"
                              >
                                <div
                                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                    atividade.status === "success"
                                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                      : atividade.status === "warning"
                                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        : atividade.status === "error"
                                          ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                          : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                    {atividade.titulo}
                                  </p>
                                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 truncate">
                                    {atividade.descricao}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      {atividade.timestamp}
                                    </p>
                                    {atividade.processo && (
                                      <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        className="text-xs px-2 py-1"
                                      >
                                        Ver
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    {/* Ações Rápidas */}
                    <div className="bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400">
                      <div className="p-4 border-b border-slate-200 dark:border-darkmode-400">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                          Ações Rápidas
                        </h3>
                      </div>

                      <div className="p-4 space-y-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <FileText className="w-4 h-4 mr-3" />
                          Gerar Petição
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Calendar className="w-4 h-4 mr-3" />
                          Agendar Compromisso
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Users className="w-4 h-4 mr-3" />
                          Convocar Reunião
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Download className="w-4 h-4 mr-3" />
                          Relatório Executivo
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </ResponsiveGrid>
            </div>
          ) : (
            // Renderizar a view específica da aba ativa
            <div
              className={`${responsive.getMaxWidth()} mx-auto ${responsive.getPadding()}`}
            >
              {currentTab?.component &&
                React.createElement(currentTab.component)}
            </div>
          )}
        </div>

        {/* Botão Flutuante Mobile */}
        {responsive.isMobile && (
          <div className="fixed bottom-4 right-4 z-50">
            <Button
              variant="primary"
              onClick={() => setShowNovoProcesso(true)}
              className="rounded-full shadow-lg p-4"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>
        )}

        {/* Slideovers Responsivos */}

        {/* Novo Processo */}
        <Slideover
          open={showNovoProcesso}
          onClose={() => setShowNovoProcesso(false)}
          size={responsive.isMobile ? "md" : "xl"}
        >
          <Slideover.Panel>
            <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Novo Processo
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Assistente inteligente para criação
              </p>
            </Slideover.Title>
            <div className="px-6 py-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Formulário Inteligente
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Interface otimizada para {responsive.deviceType}
                </p>
              </div>
            </div>
          </Slideover.Panel>
        </Slideover>

        {/* Chat Completo */}
        <Slideover
          open={showChat}
          onClose={() => setShowChat(false)}
          size={responsive.isMobile ? "md" : "lg"}
        >
          <Slideover.Panel>
            <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Chat da Equipe
              </h2>
            </Slideover.Title>
            <div className="flex-1 flex flex-col h-96">
              <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                {chatMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white ${
                        message.tipo === "sistema"
                          ? "bg-purple-500"
                          : "bg-primary"
                      }`}
                    >
                      {message.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {message.autor}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {message.mensagem}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 dark:border-darkmode-400 p-6">
                <div className="flex space-x-3">
                  <FormInput
                    type="text"
                    placeholder="Digite sua mensagem..."
                    className="flex-1"
                  />
                  <Button variant="primary">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Slideover.Panel>
        </Slideover>

        {/* Outras Slideovers */}
        <Slideover
          open={showConfiguracoes}
          onClose={() => setShowConfiguracoes(false)}
          size={responsive.isMobile ? "md" : "lg"}
        >
          <Slideover.Panel>
            <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Configurações
              </h2>
            </Slideover.Title>
            <div className="px-6 py-6">
              <div className="text-center py-12">
                <Settings className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Painel de Configurações
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Otimizado para {responsive.deviceType}
                </p>
              </div>
            </div>
          </Slideover.Panel>
        </Slideover>

        <Slideover
          open={showNotificacoes}
          onClose={() => setShowNotificacoes(false)}
          size="md"
        >
          <Slideover.Panel>
            <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Notificações
              </h2>
            </Slideover.Title>
            <div className="px-6 py-6">
              <div className="space-y-4">
                {atividades
                  .filter((a) => a.status === "warning")
                  .map((notificacao) => (
                    <div
                      key={notificacao.id}
                      className="p-4 rounded-lg border-l-4 bg-yellow-50 border-yellow-500 dark:bg-yellow-900/20"
                    >
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 mt-0.5 text-yellow-600" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                            {notificacao.titulo}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {notificacao.descricao}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Slideover.Panel>
        </Slideover>

        <Slideover
          open={showAtividades}
          onClose={() => setShowAtividades(false)}
          size={responsive.isMobile ? "md" : "lg"}
        >
          <Slideover.Panel>
            <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Log de Atividades
              </h2>
            </Slideover.Title>
            <div className="px-6 py-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {atividades.map((atividade) => {
                  const iconMap = {
                    processo: FileText,
                    publicacao: Bell,
                    intimacao: AlertTriangle,
                    prazo: Clock,
                    audiencia: Calendar,
                  };
                  const Icon = iconMap[atividade.tipo as keyof typeof iconMap];

                  return (
                    <div
                      key={atividade.id}
                      className="flex items-start space-x-3 p-4 bg-slate-50 dark:bg-darkmode-700 rounded-lg"
                    >
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          atividade.status === "success"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : atividade.status === "warning"
                              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {atividade.titulo}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {atividade.descricao}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                          {atividade.timestamp} • {atividade.usuario}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Slideover.Panel>
        </Slideover>

        {/* Toast Notification */}
        <Notification
          getRef={(el) => {}}
          options={{ placement: "top-right" }}
          className="hidden"
        >
          Sistema otimizado para {responsive.deviceType}!
        </Notification>
      </div>
    </div>
  );
};

export default JuridicioDashboardMobileFriendly;
