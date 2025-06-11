import React, { useState, useEffect } from "react";
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
  Mail,
  Phone,
  Send,
  Target,
  Bookmark,
  Star,
  MoreHorizontal,
  RefreshCw,
  Layout,
  Grid,
  List,
  Activity,
  Archive,
  Tag,
  MapPin,
  Building,
  User,
  Calculator,
  Gavel,
  FileCheck,
  ClipboardList,
  Workflow,
  Timer,
  Briefcase,
  Shield,
} from "lucide-react";
import Button from "../../components/Base/Button";
import { FormInput, FormSelect } from "../../components/Base/Form";
import { Tab } from "../../components/Base/Headless";
import Table from "../../components/Base/Table";
import Slideover from "../../components/Base/Headless/Slideover";
import { Menu } from "../../components/Base/Headless";
import Tippy from "../../components/Base/Tippy";
import juridicoData from "../../data/juridico.json";

interface DashboardTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  active: boolean;
}

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

interface AutomacaoConfig {
  prazosAutomaticos: boolean;
  notificacoesIA: boolean;
  integracaoWhatsApp: boolean;
  alertasPersonalizados: boolean;
}

const JuridicioDashboardModerno: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "kanban">("grid");
  const [filtros, setFiltros] = useState({
    busca: "",
    status: "",
    tipo: "",
    responsavel: "",
    prioridade: "",
    periodo: "30d",
  });
  const [showNovoProcesso, setShowNovoProcesso] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showAutomacao, setShowAutomacao] = useState(false);
  const [automacaoConfig, setAutomacaoConfig] = useState<AutomacaoConfig>({
    prazosAutomaticos: true,
    notificacoesIA: false,
    integracaoWhatsApp: true,
    alertasPersonalizados: true,
  });
  const [processos, setProcessos] = useState<ProcessoCard[]>([]);

  useEffect(() => {
    // Simular carregamento de dados
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

  const tabs: DashboardTab[] = [
    {
      id: "overview",
      label: "Visão Geral",
      icon: Layout,
      active: activeTab === "overview",
    },
    {
      id: "processos",
      label: "Processos",
      icon: FileText,
      badge: processos.length,
      active: activeTab === "processos",
    },
    {
      id: "publicacoes",
      label: "Publicações",
      icon: Bell,
      badge: juridicoData.publicacoes.filter((p) => p.status === "nao_lida")
        .length,
      active: activeTab === "publicacoes",
    },
    {
      id: "intimacoes",
      label: "Intimações",
      icon: AlertTriangle,
      badge: juridicoData.intimacoes.filter((i) => i.status === "pendente")
        .length,
      active: activeTab === "intimacoes",
    },
    {
      id: "agenda",
      label: "Agenda",
      icon: Calendar,
      active: activeTab === "agenda",
    },
    {
      id: "relatorios",
      label: "Relatórios",
      icon: BarChart3,
      active: activeTab === "relatorios",
    },
    {
      id: "automacao",
      label: "Automação IA",
      icon: Bot,
      active: activeTab === "automacao",
    },
  ];

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
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

  const renderMetricasCard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              Processos Ativos
            </p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
              {juridicoData.dashboard.metricas.processos_ativos}
            </p>
            <div className="flex items-center mt-2 text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-xs">+12% este mês</span>
            </div>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              Prazos Vencendo
            </p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {juridicoData.dashboard.metricas.prazos_vencendo}
            </p>
            <div className="flex items-center mt-2 text-red-600">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span className="text-xs">Próximos 7 dias</span>
            </div>
          </div>
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <Clock className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              Intimações
            </p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {juridicoData.dashboard.metricas.intimacoes_pendentes}
            </p>
            <div className="flex items-center mt-2 text-yellow-600">
              <Bell className="w-4 h-4 mr-1" />
              <span className="text-xs">Pendentes</span>
            </div>
          </div>
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <Bell className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              Publicações
            </p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {juridicoData.dashboard.metricas.publicacoes_hoje}
            </p>
            <div className="flex items-center mt-2 text-blue-600">
              <Activity className="w-4 h-4 mr-1" />
              <span className="text-xs">Hoje</span>
            </div>
          </div>
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Archive className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              Agenda
            </p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {juridicoData.dashboard.metricas.agenda_eventos}
            </p>
            <div className="flex items-center mt-2 text-green-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-xs">Esta semana</span>
            </div>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              Tickets
            </p>
            <p className="text-2xl font-bold text-orange-600 mt-1">
              {juridicoData.dashboard.metricas.tickets_abertos}
            </p>
            <div className="flex items-center mt-2 text-orange-600">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span className="text-xs">Abertos</span>
            </div>
          </div>
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <MessageSquare className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderProcessoCard = (processo: ProcessoCard) => (
    <div
      key={processo.id}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200 group"
    >
      <div className="p-6">
        {/* Header do Card */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                {processo.numero}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadeColor(processo.prioridade)}`}
              >
                {processo.prioridade.toUpperCase()}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm truncate">
              {processo.cliente}
            </p>
          </div>
          <Menu>
            <Menu.Button
              as={Button}
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Menu.Button>
            <Menu.Items>
              <Menu.Item>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Ver Detalhes
                </div>
              </Menu.Item>
              <Menu.Item>
                <div className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Editar
                </div>
              </Menu.Item>
              <Menu.Item>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </div>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>

        {/* Informações do Processo */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Tipo
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {processo.tipo}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Status
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(processo.status)}`}
            >
              {processo.status}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Valor da Causa
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {formatarMoeda(processo.valorCausa)}
            </span>
          </div>
          {processo.prazoProximo && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Próximo Prazo
              </span>
              <span className="text-sm font-medium text-red-600">
                {formatarData(processo.prazoProximo)}
              </span>
            </div>
          )}
        </div>

        {/* Footer do Card */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-blue-600" />
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {processo.responsavel}
            </span>
          </div>
          <div className="flex gap-2">
            <Tippy content="Ver Detalhes">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </Tippy>
            <Tippy content="Chat">
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </Tippy>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {renderMetricasCard()}

            {/* Processos Urgentes */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Processos Urgentes
                </h2>
                <Button variant="ghost" size="sm">
                  Ver Todos
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {processos.slice(0, 3).map(renderProcessoCard)}
              </div>
            </div>

            {/* Atividades Recentes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  Publicações Recentes
                </h3>
                <div className="space-y-3">
                  {juridicoData.publicacoes.slice(0, 3).map((pub) => (
                    <div
                      key={pub.id}
                      className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                    >
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Bell className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 dark:text-slate-100 text-sm truncate">
                          {pub.assunto}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {pub.processo} • {formatarData(pub.data)}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pub.status === "nao_lida"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {pub.status === "nao_lida" ? "Nova" : "Lida"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  Próximos Eventos
                </h3>
                <div className="space-y-3">
                  {juridicoData.agenda.slice(0, 3).map((evento) => (
                    <div
                      key={evento.id}
                      className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                    >
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <Calendar className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 dark:text-slate-100 text-sm truncate">
                          {evento.titulo}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {formatarData(evento.data)} • {evento.cliente}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "processos":
        return (
          <div className="space-y-6">
            {/* Controles de Visualização */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FormInput
                  type="text"
                  placeholder="Buscar processos..."
                  value={filtros.busca}
                  onChange={(e) =>
                    setFiltros({ ...filtros, busca: e.target.value })
                  }
                  className="w-64"
                />
                <FormSelect
                  value={filtros.status}
                  onChange={(e) =>
                    setFiltros({ ...filtros, status: e.target.value })
                  }
                  className="w-40"
                >
                  <option value="">Todos Status</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Aguardando Julgamento">Aguardando</option>
                  <option value="Finalizado">Finalizado</option>
                </FormSelect>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "kanban" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("kanban")}
                  >
                    <Layout className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  variant="primary"
                  onClick={() => setShowNovoProcesso(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Processo
                </Button>
              </div>
            </div>

            {/* Lista de Processos */}
            <div
              className={`grid gap-4 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {processos.map(renderProcessoCard)}
            </div>
          </div>
        );

      case "automacao":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="w-8 h-8" />
                <div>
                  <h2 className="text-xl font-bold">Automação Inteligente</h2>
                  <p className="text-blue-100">
                    Configure automações para otimizar seu escritório
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  Configurações de Automação
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-100">
                        Prazos Automáticos
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Calcular prazos automaticamente
                      </p>
                    </div>
                    <Button
                      variant={
                        automacaoConfig.prazosAutomaticos
                          ? "primary"
                          : "outline-secondary"
                      }
                      size="sm"
                      onClick={() =>
                        setAutomacaoConfig({
                          ...automacaoConfig,
                          prazosAutomaticos: !automacaoConfig.prazosAutomaticos,
                        })
                      }
                    >
                      {automacaoConfig.prazosAutomaticos ? "Ativo" : "Inativo"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-100">
                        Notificações IA
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Alertas inteligentes por IA
                      </p>
                    </div>
                    <Button
                      variant={
                        automacaoConfig.notificacoesIA
                          ? "primary"
                          : "outline-secondary"
                      }
                      size="sm"
                      onClick={() =>
                        setAutomacaoConfig({
                          ...automacaoConfig,
                          notificacoesIA: !automacaoConfig.notificacoesIA,
                        })
                      }
                    >
                      {automacaoConfig.notificacoesIA ? "Ativo" : "Inativo"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-100">
                        WhatsApp Integration
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Enviar atualizações via WhatsApp
                      </p>
                    </div>
                    <Button
                      variant={
                        automacaoConfig.integracaoWhatsApp
                          ? "primary"
                          : "outline-secondary"
                      }
                      size="sm"
                      onClick={() =>
                        setAutomacaoConfig({
                          ...automacaoConfig,
                          integracaoWhatsApp:
                            !automacaoConfig.integracaoWhatsApp,
                        })
                      }
                    >
                      {automacaoConfig.integracaoWhatsApp ? "Ativo" : "Inativo"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  Recursos Avançados
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-300">
                        Auto-protocolo
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Protocolo automático de petições
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-300">
                        Compliance
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Verificação automática de conformidade
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Target className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-800 dark:text-purple-300">
                        Análise Preditiva
                      </p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">
                        Previsão de resultados processuais
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg inline-block mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
              Conteúdo em Desenvolvimento
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Esta seção está sendo desenvolvida e estará disponível em breve.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header Unificado */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Scale className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  Gestão Processual
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Plataforma unificada de gestão jurídica
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline-secondary"
                onClick={() => setShowAutomacao(true)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => setShowChat(true)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat da Equipe
              </Button>
              <Button variant="primary">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-t-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    tab.active
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 border-b-2 border-blue-600"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
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
      <div className="p-6">{renderTabContent()}</div>

      {/* Slideovers */}
      <Slideover
        open={showNovoProcesso}
        onClose={() => setShowNovoProcesso(false)}
        size="lg"
      >
        <Slideover.Panel>
          <Slideover.Title className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-medium">Novo Processo</h2>
          </Slideover.Title>
          <div className="p-6">
            <div className="text-center py-12">
              <Plus className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
                Formulário de Novo Processo
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Interface de criação de processo será implementada aqui.
              </p>
            </div>
          </div>
        </Slideover.Panel>
      </Slideover>

      <Slideover open={showChat} onClose={() => setShowChat(false)} size="md">
        <Slideover.Panel>
          <Slideover.Title className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-medium">Chat da Equipe Jurídica</h2>
          </Slideover.Title>
          <div className="p-6">
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
                Chat Interno
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Sistema de comunicação da equipe será implementado aqui.
              </p>
            </div>
          </div>
        </Slideover.Panel>
      </Slideover>
    </div>
  );
};

export default JuridicioDashboardModerno;
