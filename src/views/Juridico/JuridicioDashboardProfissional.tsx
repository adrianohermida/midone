import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../stores/hooks";
import {
  Scale,
  FileText,
  Bell,
  Calendar,
  BarChart3,
  Search,
  Filter,
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
} from "lucide-react";
import Button from "../../components/Base/Button";
import { FormInput, FormSelect } from "../../components/Base/Form";
import { Tab } from "../../components/Base/Headless";
import Table from "../../components/Base/Table";
import Slideover from "../../components/Base/Headless/Slideover";
import { Menu, Popover } from "../../components/Base/Headless";
import Tippy from "../../components/Base/Tippy";
import Notification from "../../components/Base/Notification";
import juridicoData from "../../data/juridico.json";

interface ProcessoCard {
  id: string;
  numero: string;
  cliente: string;
  tipo: string;
  status: string;
  prioridade: "alta" | "media" | "baixa";
  prazoProximo: string;
  valorCausa: number;
  responsavel: string;
  ultimaAtualizacao: string;
}

interface ChatMessage {
  id: string;
  autor: string;
  mensagem: string;
  timestamp: string;
  avatar?: string;
}

const JuridicioDashboardProfissional: React.FC = () => {
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtros, setFiltros] = useState({
    busca: "",
    status: "",
    tipo: "",
    responsavel: "",
    periodo: "30d",
  });
  const [showNovoProcesso, setShowNovoProcesso] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showConfiguracoes, setShowConfiguracoes] = useState(false);
  const [showFiltrosAvancados, setShowFiltrosAvancados] = useState(false);
  const [processos, setProcessos] = useState<ProcessoCard[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      autor: "Dr. João Silva",
      mensagem: "Urgente: Processo 123456 precisa de análise até amanhã",
      timestamp: "10:30",
      avatar: "JS",
    },
    {
      id: "2",
      autor: "Dra. Maria Santos",
      mensagem: "Audiência confirmada para quinta-feira",
      timestamp: "09:15",
      avatar: "MS",
    },
    {
      id: "3",
      autor: "Dr. Carlos Lima",
      mensagem: "Cliente XYZ aprovou proposta de acordo",
      timestamp: "08:45",
      avatar: "CL",
    },
  ]);

  useEffect(() => {
    const processosData = juridicoData.processos.map((processo) => ({
      id: processo.id,
      numero: processo.numero,
      cliente: processo.cliente.nome,
      tipo: processo.tipo,
      status: processo.status,
      prioridade:
        processo.prazos.length > 0 && processo.prazos[0].dias_restantes <= 3
          ? "alta"
          : "media",
      prazoProximo:
        processo.prazos.length > 0 ? processo.prazos[0].data_limite : "",
      valorCausa: processo.valor_causa,
      responsavel: processo.responsavel,
      ultimaAtualizacao: processo.data_distribuicao,
    }));
    setProcessos(processosData);
  }, []);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Em Andamento":
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "Aguardando Julgamento":
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      Finalizado:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      Suspenso:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPrioridadeColor = (prioridade: string) => {
    const colors = {
      alta: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      media:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      baixa:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    };
    return (
      colors[prioridade as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const processosFiltrados = processos.filter((processo) => {
    if (
      filtros.busca &&
      !processo.numero.toLowerCase().includes(filtros.busca.toLowerCase()) &&
      !processo.cliente.toLowerCase().includes(filtros.busca.toLowerCase())
    ) {
      return false;
    }
    if (filtros.status && processo.status !== filtros.status) return false;
    if (filtros.tipo && processo.tipo !== filtros.tipo) return false;
    if (filtros.responsavel && processo.responsavel !== filtros.responsavel)
      return false;
    return true;
  });

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-darkmode-800">
        {/* Header Consistente com Midone */}
        <div className="bg-white dark:bg-darkmode-600 border-b border-slate-200 dark:border-darkmode-400">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo e Título - Seguindo padrão Midone */}
              <div className="flex items-center">
                <div className="flex items-center">
                  {/* Ícone da Balança como Logo */}
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-medium text-slate-800 dark:text-slate-300">
                      Dashboard Jurídico
                    </h1>
                  </div>
                </div>
              </div>

              {/* Área de Busca e Ações */}
              <div className="flex items-center space-x-4">
                {/* Busca Aprimorada */}
                <div className="hidden md:block">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <FormInput
                      type="text"
                      placeholder="Buscar processos, clientes..."
                      value={filtros.busca}
                      onChange={(e) =>
                        setFiltros({ ...filtros, busca: e.target.value })
                      }
                      className="block w-80 pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm dark:bg-darkmode-700 dark:border-darkmode-400 dark:placeholder-slate-500 dark:text-slate-300"
                    />
                    {filtros.busca && (
                      <button
                        onClick={() => setFiltros({ ...filtros, busca: "" })}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <X className="h-5 w-5 text-slate-400 hover:text-slate-500" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Filtros Avançados */}
                <Popover className="relative">
                  <Popover.Button
                    as={Button}
                    variant="outline-secondary"
                    size="sm"
                  >
                    <FilterIcon className="w-4 h-4 mr-2" />
                    Filtros
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Popover.Button>
                  <Popover.Panel className="absolute right-0 z-50 mt-2 w-80 bg-white dark:bg-darkmode-600 rounded-md shadow-lg border border-slate-200 dark:border-darkmode-400">
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Status
                        </label>
                        <FormSelect
                          value={filtros.status}
                          onChange={(e) =>
                            setFiltros({ ...filtros, status: e.target.value })
                          }
                          className="w-full"
                        >
                          <option value="">Todos</option>
                          <option value="Em Andamento">Em Andamento</option>
                          <option value="Aguardando Julgamento">
                            Aguardando
                          </option>
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
                      <div className="flex justify-end pt-2">
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
                      </div>
                    </div>
                  </Popover.Panel>
                </Popover>

                {/* Botão Novo Processo - Destacado */}
                <Button
                  variant="primary"
                  onClick={() => setShowNovoProcesso(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Processo
                </Button>

                {/* Chat da Equipe */}
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowChat(true)}
                  className="relative"
                >
                  <MessageSquare className="w-4 h-4" />
                  {chatMessages.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chatMessages.length}
                    </span>
                  )}
                </Button>

                {/* Configurações */}
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfiguracoes(true)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation - Estilo Midone */}
        <div className="bg-white dark:bg-darkmode-600 border-b border-slate-200 dark:border-darkmode-400">
          <div className="px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                {
                  id: "overview",
                  label: "Visão Geral",
                  icon: Layout,
                  badge: null,
                },
                {
                  id: "processos",
                  label: "Processos",
                  icon: FileText,
                  badge: processos.length,
                },
                {
                  id: "publicacoes",
                  label: "Publicações",
                  icon: Bell,
                  badge: juridicoData.publicacoes.filter(
                    (p) => p.status === "nao_lida",
                  ).length,
                },
                {
                  id: "intimacoes",
                  label: "Intimações",
                  icon: AlertTriangle,
                  badge: juridicoData.intimacoes.filter(
                    (i) => i.status === "pendente",
                  ).length,
                },
                { id: "agenda", label: "Agenda", icon: Calendar, badge: null },
                {
                  id: "relatorios",
                  label: "Relatórios",
                  icon: BarChart3,
                  badge: null,
                },
                {
                  id: "ia-insights",
                  label: "IA Insights",
                  icon: Bot,
                  badge: null,
                },
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
                      {tab.badge && tab.badge > 0 && (
                        <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                          {tab.badge}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Métricas Principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-darkmode-600 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                            Processos Ativos
                          </dt>
                          <dd className="text-lg font-medium text-slate-900 dark:text-slate-300">
                            {juridicoData.dashboard.metricas.processos_ativos}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-darkmode-700 px-5 py-3">
                    <div className="text-sm">
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="font-medium">+12%</span>
                        <span className="text-slate-500 dark:text-slate-400 ml-1">
                          este mês
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-darkmode-600 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Clock className="h-6 w-6 text-red-500" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                            Prazos Vencendo
                          </dt>
                          <dd className="text-lg font-medium text-slate-900 dark:text-slate-300">
                            {juridicoData.dashboard.metricas.prazos_vencendo}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-darkmode-700 px-5 py-3">
                    <div className="text-sm">
                      <span className="text-red-600 font-medium">
                        Próximos 7 dias
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-darkmode-600 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Bell className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                            Intimações
                          </dt>
                          <dd className="text-lg font-medium text-slate-900 dark:text-slate-300">
                            {
                              juridicoData.dashboard.metricas
                                .intimacoes_pendentes
                            }
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-darkmode-700 px-5 py-3">
                    <div className="text-sm">
                      <span className="text-yellow-600 font-medium">
                        Pendentes
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-darkmode-600 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Zap className="h-6 w-6 text-purple-500" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
                            Automação IA
                          </dt>
                          <dd className="text-lg font-medium text-slate-900 dark:text-slate-300">
                            94%
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-darkmode-700 px-5 py-3">
                    <div className="text-sm">
                      <span className="text-purple-600 font-medium">
                        Eficiência
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Principal */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Processos Críticos */}
                <div className="lg:col-span-2 bg-white dark:bg-darkmode-600 shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg leading-6 font-medium text-slate-900 dark:text-slate-300">
                        Processos Críticos
                      </h3>
                      <div className="flex items-center space-x-3">
                        <div className="flex bg-slate-100 dark:bg-darkmode-700 rounded-lg p-1">
                          <Button
                            variant={viewMode === "grid" ? "primary" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("grid")}
                            className="px-2 py-1"
                          >
                            <Grid className="w-4 h-4" />
                          </Button>
                          <Button
                            variant={viewMode === "list" ? "primary" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("list")}
                            className="px-2 py-1"
                          >
                            <List className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button variant="outline-secondary" size="sm">
                          Ver Todos
                        </Button>
                      </div>
                    </div>

                    {viewMode === "grid" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {processosFiltrados.slice(0, 4).map((processo) => (
                          <div
                            key={processo.id}
                            className="border border-slate-200 dark:border-darkmode-400 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-300 truncate">
                                  {processo.numero}
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                  {processo.cliente}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getPrioridadeColor(processo.prioridade)}`}
                              >
                                {processo.prioridade.toUpperCase()}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">
                                  Status:
                                </span>
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(processo.status)}`}
                                >
                                  {processo.status}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">
                                  Valor:
                                </span>
                                <span className="font-medium text-slate-900 dark:text-slate-300">
                                  {formatarMoeda(processo.valorCausa)}
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-200 dark:border-darkmode-400">
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {processo.responsavel}
                              </span>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="overflow-hidden">
                        <Table>
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th>Processo</Table.Th>
                              <Table.Th>Cliente</Table.Th>
                              <Table.Th>Status</Table.Th>
                              <Table.Th>Valor</Table.Th>
                              <Table.Th></Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            {processosFiltrados.slice(0, 5).map((processo) => (
                              <Table.Tr key={processo.id}>
                                <Table.Td>
                                  <div>
                                    <div className="text-sm font-medium text-slate-900 dark:text-slate-300">
                                      {processo.numero}
                                    </div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400">
                                      {processo.tipo}
                                    </div>
                                  </div>
                                </Table.Td>
                                <Table.Td>
                                  <div className="text-sm text-slate-900 dark:text-slate-300">
                                    {processo.cliente}
                                  </div>
                                </Table.Td>
                                <Table.Td>
                                  <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(processo.status)}`}
                                  >
                                    {processo.status}
                                  </span>
                                </Table.Td>
                                <Table.Td>
                                  <div className="text-sm text-slate-900 dark:text-slate-300">
                                    {formatarMoeda(processo.valorCausa)}
                                  </div>
                                </Table.Td>
                                <Table.Td>
                                  <div className="flex space-x-2">
                                    <Button variant="ghost" size="sm">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </Table.Td>
                              </Table.Tr>
                            ))}
                          </Table.Tbody>
                        </Table>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar Direita */}
                <div className="space-y-6">
                  {/* Chat da Equipe */}
                  <div className="bg-white dark:bg-darkmode-600 shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-slate-900 dark:text-slate-300 mb-4">
                        Chat da Equipe
                      </h3>
                      <div className="space-y-3">
                        {chatMessages.slice(0, 3).map((message) => (
                          <div
                            key={message.id}
                            className="flex items-start space-x-3"
                          >
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                                {message.avatar}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-300">
                                  {message.autor}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {message.timestamp}
                                </p>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {message.mensagem}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="w-full"
                          onClick={() => setShowChat(true)}
                        >
                          Ver Todas as Mensagens
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Recursos Avançados IA */}
                  <div className="bg-white dark:bg-darkmode-600 shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-slate-900 dark:text-slate-300 mb-4">
                        Recursos IA
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <Bot className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                              Análise Preditiva
                            </p>
                            <p className="text-xs text-blue-700 dark:text-blue-400">
                              3 insights disponíveis
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <Shield className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-green-900 dark:text-green-300">
                              Compliance Check
                            </p>
                            <p className="text-xs text-green-700 dark:text-green-400">
                              Tudo em conformidade
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <Zap className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="text-sm font-medium text-purple-900 dark:text-purple-300">
                              Auto-Protocolo
                            </p>
                            <p className="text-xs text-purple-700 dark:text-purple-400">
                              5 petições na fila
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ações Rápidas */}
                  <div className="bg-white dark:bg-darkmode-600 shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-slate-900 dark:text-slate-300 mb-4">
                        Ações Rápidas
                      </h3>
                      <div className="space-y-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Gerar Petição
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Agendar Compromisso
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Convocar Reunião
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Award className="w-4 h-4 mr-2" />
                          Avaliar Performance
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo de outras abas */}
          {activeTab !== "overview" && (
            <div className="bg-white dark:bg-darkmode-600 shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-slate-400">
                    <Bot className="h-12 w-12" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-300">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} em
                    Desenvolvimento
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Esta funcionalidade estará disponível em breve com recursos
                    avançados de IA.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Slideovers */}
        <Slideover
          open={showNovoProcesso}
          onClose={() => setShowNovoProcesso(false)}
          size="lg"
        >
          <Slideover.Panel>
            <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
              <h2 className="text-lg font-medium text-slate-900 dark:text-slate-300">
                Novo Processo
              </h2>
            </Slideover.Title>
            <div className="px-6 py-4">
              <div className="text-center py-12">
                <Plus className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-300 mb-2">
                  Assistente de Criação de Processo
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Interface inteligente para cadastro de novos processos com IA.
                </p>
              </div>
            </div>
          </Slideover.Panel>
        </Slideover>

        <Slideover open={showChat} onClose={() => setShowChat(false)} size="md">
          <Slideover.Panel>
            <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
              <h2 className="text-lg font-medium text-slate-900 dark:text-slate-300">
                Chat da Equipe Jurídica
              </h2>
            </Slideover.Title>
            <div className="px-6 py-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-medium">
                        {message.avatar}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-slate-300">
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
              <div className="mt-6 border-t border-slate-200 dark:border-darkmode-400 pt-4">
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

        <Slideover
          open={showConfiguracoes}
          onClose={() => setShowConfiguracoes(false)}
          size="md"
        >
          <Slideover.Panel>
            <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
              <h2 className="text-lg font-medium text-slate-900 dark:text-slate-300">
                Configurações do Sistema
              </h2>
            </Slideover.Title>
            <div className="px-6 py-4">
              <div className="text-center py-12">
                <Settings className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-300 mb-2">
                  Painel de Configurações
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Configurações avançadas para personalização do sistema.
                </p>
              </div>
            </div>
          </Slideover.Panel>
        </Slideover>

        {/* Notificações Toast */}
        <Notification
          getRef={(el) => {}}
          options={{ placement: "top-right" }}
          className="hidden"
        >
          <Notification.Content>
            Sistema atualizado com sucesso!
          </Notification.Content>
        </Notification>
      </div>
    </div>
  );
};

export default JuridicioDashboardProfissional;
