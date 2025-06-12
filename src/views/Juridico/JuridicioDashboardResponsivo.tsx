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
  Grid,
  List,
  Activity,
  Archive,
  User,
  Building,
  DollarSign,
  Send,
  Phone,
  Mail,
  Shield,
  Briefcase,
  Award,
  Bookmark,
  MapPin,
  Hash,
  Tag,
  X,
  ChevronDown,
  Filter as FilterIcon,
  PieChart,
  TrendingDown,
  Percent,
  Calculator,
  FileCheck,
  Gavel,
  AlertCircle,
  CheckSquare,
  Play,
  Pause,
  FastForward,
  Laptop,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Minimize2,
  RotateCcw,
} from "lucide-react";

// Componentes
import Button from "../../components/Base/Button";
import { FormInput, FormSelect } from "../../components/Base/Form";
import Table from "../../components/Base/Table";
import Slideover from "../../components/Base/Headless/Slideover";
import { Menu, Popover, Disclosure } from "../../components/Base/Headless";
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

interface MetricaCard {
  id: string;
  titulo: string;
  valor: string | number;
  variacao: number;
  icon: React.ComponentType<any>;
  cor: string;
  formato?: "numero" | "moeda" | "percentual";
  tendencia?: "up" | "down" | "stable";
}

const JuridicioDashboardResponsivo: React.FC = () => {
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const [activeTab, setActiveTab] = useState("overview");
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [deviceType, setDeviceType] = useState<
    "mobile" | "tablet" | "desktop" | "ultrawide"
  >("desktop");

  // Estados para controles
  const [filtros, setFiltros] = useState({
    busca: "",
    status: "",
    tipo: "",
    responsavel: "",
    periodo: "30d",
    urgencia: "",
    comarca: "",
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
    {
      id: "3",
      tipo: "intimacao",
      titulo: "Intimação Recebida",
      descricao: "Para apresentar alegações finais",
      timestamp: "1 hora atrás",
      usuario: "Dra. Maria Santos",
      status: "info",
      processo: "0009876-54.2024.8.02.0003",
    },
    {
      id: "4",
      tipo: "audiencia",
      titulo: "Audiência Agendada",
      descricao: "Conciliação para próxima quinta-feira",
      timestamp: "2 horas atrás",
      usuario: "Dr. Carlos Lima",
      status: "info",
      processo: "0001111-22.2024.8.02.0004",
    },
  ]);

  // Detectar tipo de dispositivo com base na largura da tela
  useEffect(() => {
    const detectDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else if (width < 1920) {
        setDeviceType("desktop");
      } else {
        setDeviceType("ultrawide");
      }
    };

    detectDeviceType();
    window.addEventListener("resize", detectDeviceType);
    return () => window.removeEventListener("resize", detectDeviceType);
  }, []);

  // Métricas principais adaptadas ao tipo de dispositivo
  const metricas: MetricaCard[] = [
    {
      id: "processos",
      titulo: "Processos Ativos",
      valor: juridicoData.dashboard.metricas.processos_ativos,
      variacao: 12.5,
      icon: FileText,
      cor: "blue",
      formato: "numero",
      tendencia: "up",
    },
    {
      id: "prazos",
      titulo: "Prazos Críticos",
      valor: juridicoData.dashboard.metricas.prazos_vencendo,
      variacao: -8.2,
      icon: Clock,
      cor: "red",
      formato: "numero",
      tendencia: "down",
    },
    {
      id: "intimacoes",
      titulo: "Intimações Pendentes",
      valor: juridicoData.dashboard.metricas.intimacoes_pendentes,
      variacao: 5.8,
      icon: Bell,
      cor: "yellow",
      formato: "numero",
      tendencia: "up",
    },
    {
      id: "eficiencia",
      titulo: "Eficiência IA",
      valor: 94.2,
      variacao: 2.1,
      icon: Bot,
      cor: "purple",
      formato: "percentual",
      tendencia: "up",
    },
    {
      id: "sucesso",
      titulo: "Taxa de Sucesso",
      valor: 87.5,
      variacao: 4.3,
      icon: CheckCircle,
      cor: "green",
      formato: "percentual",
      tendencia: "up",
    },
    {
      id: "faturamento",
      titulo: "Faturamento Mensal",
      valor: 485000,
      variacao: 15.7,
      icon: DollarSign,
      cor: "emerald",
      formato: "moeda",
      tendencia: "up",
    },
  ];

  // Formatação de valores
  const formatarValor = (valor: number | string, formato?: string): string => {
    const num = typeof valor === "string" ? parseFloat(valor) : valor;

    switch (formato) {
      case "moeda":
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(num);
      case "percentual":
        return `${num.toFixed(1)}%`;
      default:
        return num.toLocaleString("pt-BR");
    }
  };

  const getVariacaoColor = (variacao: number): string => {
    return variacao >= 0 ? "text-green-600" : "text-red-600";
  };

  const getVariacaoIcon = (variacao: number) => {
    return variacao >= 0 ? TrendingUp : TrendingDown;
  };

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

  // Configurações responsivas baseadas no tipo de dispositivo
  const getResponsiveConfig = () => {
    switch (deviceType) {
      case "mobile":
        return {
          metricasGrid: "grid-cols-2",
          mainGrid: "grid-cols-1",
          showSidebar: false,
          compactHeader: true,
          cardSpacing: "gap-3",
          padding: "p-3",
        };
      case "tablet":
        return {
          metricasGrid: "grid-cols-3",
          mainGrid: "grid-cols-1 lg:grid-cols-2",
          showSidebar: !sidebarCollapsed,
          compactHeader: false,
          cardSpacing: "gap-4",
          padding: "p-4",
        };
      case "desktop":
        return {
          metricasGrid: "grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
          mainGrid: "grid-cols-1 lg:grid-cols-3",
          showSidebar: !sidebarCollapsed,
          compactHeader: false,
          cardSpacing: "gap-6",
          padding: "p-6",
        };
      case "ultrawide":
        return {
          metricasGrid: "grid-cols-6",
          mainGrid: "grid-cols-1 xl:grid-cols-4",
          showSidebar: !sidebarCollapsed,
          compactHeader: false,
          cardSpacing: "gap-8",
          padding: "p-8",
        };
      default:
        return {
          metricasGrid: "grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
          mainGrid: "grid-cols-1 lg:grid-cols-3",
          showSidebar: !sidebarCollapsed,
          compactHeader: false,
          cardSpacing: "gap-6",
          padding: "p-6",
        };
    }
  };

  const responsiveConfig = getResponsiveConfig();

  // Auto-atualização
  useEffect(() => {
    const interval = setInterval(() => {
      const novaAtividade: ActivityItem = {
        id: Date.now().toString(),
        tipo: "sistema",
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
        {/* Header Superior Adaptativo */}
        <div className="sticky top-0 z-50 bg-white dark:bg-darkmode-600 border-b border-slate-200 dark:border-darkmode-400 shadow-sm">
          <div
            className={`px-4 sm:px-6 ${deviceType === "ultrawide" ? "max-w-none" : "max-w-7xl mx-auto"}`}
          >
            <div className="flex justify-between items-center h-16">
              {/* Logo e Título Responsivo */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  {!responsiveConfig.compactHeader && (
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

                {/* Controles de Layout para Desktop/Ultrawide */}
                {(deviceType === "desktop" || deviceType === "ultrawide") && (
                  <div className="flex items-center space-x-2 ml-6">
                    <Tippy content="Modo compacto">
                      <Button
                        variant={
                          isCompactMode ? "primary" : "outline-secondary"
                        }
                        size="sm"
                        onClick={() => setIsCompactMode(!isCompactMode)}
                        className="p-2"
                      >
                        {isCompactMode ? (
                          <Minimize2 className="w-4 h-4" />
                        ) : (
                          <Maximize2 className="w-4 h-4" />
                        )}
                      </Button>
                    </Tippy>

                    <Tippy content="Expandir/Recolher sidebar">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="p-2"
                      >
                        {sidebarCollapsed ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </Button>
                    </Tippy>

                    {/* Indicador de Dispositivo */}
                    <div className="flex items-center space-x-2 px-3 py-1 bg-slate-100 dark:bg-darkmode-700 rounded-lg">
                      {deviceType === "mobile" && (
                        <Smartphone className="w-4 h-4 text-slate-500" />
                      )}
                      {deviceType === "tablet" && (
                        <Tablet className="w-4 h-4 text-slate-500" />
                      )}
                      {deviceType === "desktop" && (
                        <Laptop className="w-4 h-4 text-slate-500" />
                      )}
                      {deviceType === "ultrawide" && (
                        <Monitor className="w-4 h-4 text-slate-500" />
                      )}
                      <span className="text-xs text-slate-500 capitalize">
                        {deviceType}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Área Central - Busca Adaptativa */}
              {deviceType !== "mobile" && (
                <div
                  className={`flex-1 mx-4 ${deviceType === "ultrawide" ? "max-w-4xl" : "max-w-2xl"}`}
                >
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
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {filtros.busca ? (
                        <button
                          onClick={() => setFiltros({ ...filtros, busca: "" })}
                          className="text-slate-400 hover:text-slate-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      ) : (
                        <kbd className="px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-300 rounded dark:bg-darkmode-600 dark:text-slate-400 dark:border-darkmode-500">
                          ⌘K
                        </kbd>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Ações e Controles Responsivos */}
              <div className="flex items-center space-x-2">
                {/* Filtros Avançados - Escondido em mobile */}
                {deviceType !== "mobile" && (
                  <Popover className="relative">
                    <Popover.Button
                      as={Button}
                      variant="outline-secondary"
                      size="sm"
                    >
                      <FilterIcon className="w-4 h-4 mr-2" />
                      {deviceType !== "tablet" && "Filtros"}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Popover.Button>
                    <Popover.Panel className="absolute right-0 z-50 mt-2 w-96 bg-white dark:bg-darkmode-600 rounded-xl shadow-xl border border-slate-200 dark:border-darkmode-400">
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          Filtros Avançados
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
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
                              <option value="Suspenso">Suspenso</option>
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
                              <option value="Tributário">Tributário</option>
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
                                urgencia: "",
                                comarca: "",
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
                  {atividades.filter(
                    (a) => a.status === "warning" || a.status === "error",
                  ).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {
                        atividades.filter(
                          (a) => a.status === "warning" || a.status === "error",
                        ).length
                      }
                    </span>
                  )}
                </Button>

                {/* Chat da Equipe - Escondido em mobile */}
                {deviceType !== "mobile" && (
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
                  {deviceType === "mobile" ? "" : "Novo"}
                </Button>

                {/* Menu de Configurações */}
                <Menu as="div" className="relative">
                  <Menu.Button
                    as={Button}
                    variant="outline-secondary"
                    size="sm"
                    className="p-2"
                  >
                    <Settings className="w-4 h-4" />
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
            className={`px-4 sm:px-6 ${deviceType === "ultrawide" ? "max-w-none" : "max-w-7xl mx-auto"}`}
          >
            <div className="flex space-x-1 overflow-x-auto scrollbar-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                      isActive
                        ? "border-primary text-primary bg-primary/5"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2.5" />
                    {deviceType === "mobile" ? "" : tab.label}
                    {tab.badge && tab.badge > 0 && (
                      <span
                        className={`ml-2.5 px-2 py-0.5 text-xs font-medium rounded-full ${
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

        {/* Conteúdo Principal Responsivo */}
        <div className="flex-1">
          {activeTab === "overview" ? (
            <div
              className={`${deviceType === "ultrawide" ? "max-w-none" : "max-w-7xl mx-auto"} ${responsiveConfig.padding}`}
            >
              {/* Métricas Principais Responsivas */}
              <div
                className={`grid ${responsiveConfig.metricasGrid} ${responsiveConfig.cardSpacing} mb-8`}
              >
                {metricas.map((metrica) => {
                  const Icon = metrica.icon;
                  const VariacaoIcon = getVariacaoIcon(metrica.variacao);

                  return (
                    <div
                      key={metrica.id}
                      className={`bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400 hover:shadow-md transition-all duration-200 hover:scale-105 ${
                        isCompactMode ? "p-3" : "p-4 lg:p-6"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`${isCompactMode ? "w-8 h-8" : "w-10 h-10"} rounded-lg flex items-center justify-center bg-${metrica.cor}-100 dark:bg-${metrica.cor}-900/30`}
                        >
                          <Icon
                            className={`${isCompactMode ? "w-4 h-4" : "w-5 h-5"} text-${metrica.cor}-600`}
                          />
                        </div>
                        <div
                          className={`flex items-center text-xs font-medium ${getVariacaoColor(metrica.variacao)}`}
                        >
                          <VariacaoIcon className="w-3 h-3 mr-1" />
                          {Math.abs(metrica.variacao).toFixed(1)}%
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3
                          className={`${isCompactMode ? "text-lg" : "text-2xl"} font-bold text-slate-900 dark:text-slate-100`}
                        >
                          {formatarValor(metrica.valor, metrica.formato)}
                        </h3>
                        <p
                          className={`text-xs text-slate-500 dark:text-slate-400 font-medium ${isCompactMode ? "truncate" : ""}`}
                        >
                          {metrica.titulo}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Grid Principal Responsivo */}
              <div
                className={`grid ${responsiveConfig.mainGrid} ${responsiveConfig.cardSpacing}`}
              >
                {/* Painel Principal - Processos Críticos */}
                <div
                  className={`${deviceType === "ultrawide" ? "xl:col-span-3" : "lg:col-span-2"} space-y-6`}
                >
                  {/* Processos Críticos */}
                  <div className="bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400">
                    <div
                      className={`${responsiveConfig.padding} border-b border-slate-200 dark:border-darkmode-400`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            Processos Críticos
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Requerem atenção imediata ou têm prazos próximos
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

                    <div className={responsiveConfig.padding}>
                      <div
                        className={`grid ${deviceType === "mobile" ? "grid-cols-1" : deviceType === "ultrawide" ? "grid-cols-3" : "grid-cols-1 xl:grid-cols-2"} ${responsiveConfig.cardSpacing}`}
                      >
                        {juridicoData.processos
                          .slice(
                            0,
                            deviceType === "mobile"
                              ? 2
                              : deviceType === "ultrawide"
                                ? 6
                                : 4,
                          )
                          .map((processo, index) => (
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
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    processo.prazos.length > 0 &&
                                    processo.prazos[0].dias_restantes <= 3
                                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                      : processo.prazos.length > 0 &&
                                          processo.prazos[0].dias_restantes <= 7
                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                        : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  }`}
                                >
                                  {processo.prazos.length > 0 &&
                                  processo.prazos[0].dias_restantes <= 3
                                    ? "CRÍTICO"
                                    : processo.prazos.length > 0 &&
                                        processo.prazos[0].dias_restantes <= 7
                                      ? "URGENTE"
                                      : "NORMAL"}
                                </span>
                              </div>

                              <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-500 dark:text-slate-400">
                                    Status:
                                  </span>
                                  <span
                                    className={`px-2 py-0.5 text-xs font-medium rounded ${
                                      processo.status === "Em Andamento"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                        : processo.status ===
                                            "Aguardando Julgamento"
                                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                          : processo.status === "Finalizado"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                                    }`}
                                  >
                                    {processo.status}
                                  </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                  <span className="text-slate-500 dark:text-slate-400">
                                    Valor:
                                  </span>
                                  <span className="font-medium text-slate-900 dark:text-slate-100">
                                    {formatarValor(
                                      processo.valor_causa,
                                      "moeda",
                                    )}
                                  </span>
                                </div>

                                {processo.prazos.length > 0 && (
                                  <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">
                                      Próximo prazo:
                                    </span>
                                    <span
                                      className={`font-medium ${
                                        processo.prazos[0].dias_restantes <= 3
                                          ? "text-red-600"
                                          : processo.prazos[0].dias_restantes <=
                                              7
                                            ? "text-yellow-600"
                                            : "text-slate-900 dark:text-slate-100"
                                      }`}
                                    >
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
                      </div>
                    </div>
                  </div>

                  {/* Gráficos Responsivos para Desktop/Ultrawide */}
                  {(deviceType === "desktop" || deviceType === "ultrawide") && (
                    <div
                      className={`grid ${deviceType === "ultrawide" ? "grid-cols-3" : "grid-cols-1 md:grid-cols-2"} ${responsiveConfig.cardSpacing}`}
                    >
                      {/* Performance Mensal */}
                      <div className="bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            Performance Mensal
                          </h3>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setActiveTab("relatorios")}
                          >
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Detalhes
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              Processos Iniciados
                            </span>
                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              24
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-darkmode-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: "78%" }}
                            ></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              Taxa de Sucesso
                            </span>
                            <span className="text-sm font-semibold text-green-600">
                              94.2%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-darkmode-700 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: "94%" }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Distribuição por Área */}
                      <div className="bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            Distribuição por Área
                          </h3>
                          <PieChart className="w-5 h-5 text-slate-400" />
                        </div>

                        <div className="space-y-3">
                          {[
                            {
                              area: "Trabalhista",
                              valor: 45,
                              cor: "bg-blue-500",
                            },
                            { area: "Cível", valor: 30, cor: "bg-green-500" },
                            {
                              area: "Empresarial",
                              valor: 15,
                              cor: "bg-yellow-500",
                            },
                            {
                              area: "Tributário",
                              valor: 10,
                              cor: "bg-purple-500",
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-3 h-3 rounded-full ${item.cor}`}
                                ></div>
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                  {item.area}
                                </span>
                              </div>
                              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                {item.valor}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card adicional para ultrawide */}
                      {deviceType === "ultrawide" && (
                        <div className="bg-gradient-to-br from-primary/10 to-blue-50 dark:from-primary/20 dark:to-blue-900/20 rounded-xl shadow-sm border border-primary/20 p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                              IA Insights
                            </h3>
                            <Bot className="w-6 h-6 text-primary" />
                          </div>

                          <div className="space-y-3">
                            <div className="p-3 bg-white/50 dark:bg-darkmode-600/50 rounded-lg">
                              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                Análise Preditiva
                              </p>
                              <p className="text-xs text-slate-600 dark:text-slate-400">
                                87% chance de êxito no processo #1234
                              </p>
                            </div>

                            <div className="p-3 bg-white/50 dark:bg-darkmode-600/50 rounded-lg">
                              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                Automação Sugerida
                              </p>
                              <p className="text-xs text-slate-600 dark:text-slate-400">
                                5 petições prontas para protocolo
                              </p>
                            </div>
                          </div>

                          <Button
                            variant="primary"
                            size="sm"
                            className="w-full mt-4"
                            onClick={() => setActiveTab("ia-insights")}
                          >
                            Ver Todos os Insights
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Sidebar Direita - Adaptativa */}
                {responsiveConfig.showSidebar && (
                  <div className="space-y-6">
                    {/* Chat da Equipe - Preview */}
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
                          .slice(0, deviceType === "ultrawide" ? 6 : 4)
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
                          .slice(0, deviceType === "ultrawide" ? 8 : 5)
                          .map((atividade) => {
                            const iconMap = {
                              processo: FileText,
                              publicacao: Bell,
                              intimacao: AlertTriangle,
                              prazo: Clock,
                              audiencia: Calendar,
                              sistema: Bot,
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
              </div>
            </div>
          ) : (
            // Renderizar a view específica da aba ativa
            <div
              className={`${deviceType === "ultrawide" ? "max-w-none" : "max-w-7xl mx-auto"} ${responsiveConfig.padding}`}
            >
              {currentTab?.component &&
                React.createElement(currentTab.component)}
            </div>
          )}
        </div>

        {/* Slideovers */}

        {/* Novo Processo */}
        <Slideover
          open={showNovoProcesso}
          onClose={() => setShowNovoProcesso(false)}
          size="xl"
        >
          <Slideover.Panel>
            <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Assistente de Criação de Processo
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Preencha os dados do novo processo com auxílio da IA
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
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Interface inteligente para cadastro de novos processos com
                  validação automática e sugestões baseadas em IA.
                </p>
              </div>
            </div>
          </Slideover.Panel>
        </Slideover>

        {/* Chat Completo */}
        <Slideover open={showChat} onClose={() => setShowChat(false)} size="lg">
          <Slideover.Panel>
            <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Chat da Equipe Jurídica
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {chatMessages.filter((m) => !m.lida).length} mensagens não
                    lidas
                  </span>
                </div>
              </div>
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
                        {!message.lida && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                            Nova
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {message.mensagem}
                      </p>
                      {message.tipo === "sistema" && (
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="mt-2"
                        >
                          Ver Detalhes
                        </Button>
                      )}
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

        {/* Configurações */}
        <Slideover
          open={showConfiguracoes}
          onClose={() => setShowConfiguracoes(false)}
          size="lg"
        >
          <Slideover.Panel>
            <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Configurações do Sistema
              </h2>
            </Slideover.Title>
            <div className="px-6 py-6">
              <div className="text-center py-12">
                <Settings className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Painel de Configurações
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Configure preferências do sistema, integrações e automações.
                </p>
              </div>
            </div>
          </Slideover.Panel>
        </Slideover>

        {/* Notificações */}
        <Slideover
          open={showNotificacoes}
          onClose={() => setShowNotificacoes(false)}
          size="md"
        >
          <Slideover.Panel>
            <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Central de Notificações
              </h2>
            </Slideover.Title>
            <div className="px-6 py-6">
              <div className="space-y-4">
                {atividades
                  .filter((a) => a.status === "warning" || a.status === "error")
                  .map((notificacao) => (
                    <div
                      key={notificacao.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        notificacao.status === "error"
                          ? "bg-red-50 border-red-500 dark:bg-red-900/20"
                          : "bg-yellow-50 border-yellow-500 dark:bg-yellow-900/20"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <AlertTriangle
                          className={`w-5 h-5 mt-0.5 ${
                            notificacao.status === "error"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                            {notificacao.titulo}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {notificacao.descricao}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                            {notificacao.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Slideover.Panel>
        </Slideover>

        {/* Log de Atividades */}
        <Slideover
          open={showAtividades}
          onClose={() => setShowAtividades(false)}
          size="lg"
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
                    sistema: Bot,
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
                              : atividade.status === "error"
                                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
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
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {atividade.timestamp} • {atividade.usuario}
                          </p>
                          {atividade.processo && (
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="text-xs"
                            >
                              Ver Processo
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Slideover.Panel>
        </Slideover>

        {/* Toast de Notificação */}
        <Notification
          getRef={(el) => {}}
          options={{ placement: "top-right" }}
          className="hidden"
        >
          Sistema sincronizado com sucesso!
        </Notification>
      </div>
    </div>
  );
};

export default JuridicioDashboardResponsivo;
