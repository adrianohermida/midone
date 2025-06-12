import React, { useState, useEffect } from "react";
import {
  Calendar,
  FileText,
  Bell,
  Clock,
  Users,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Filter,
  Search,
  Eye,
  Edit,
  Trash,
  AlertTriangle,
  CheckCircle,
  XCircle,
  PlayCircle,
  PauseCircle,
  DollarSign,
  MapPin,
  Building,
  User,
  Phone,
  Mail,
  Download,
  Share2,
  Star,
  Bookmark,
  Archive,
  RefreshCw,
  SortAsc,
  SortDesc,
  Grid,
  List,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Target,
  Award,
  Zap,
} from "lucide-react";
import Button from "../../components/Base/Button";
import { FormInput, FormSelect } from "../../components/Base/Form";
import { Tab, Menu, Disclosure, Popover } from "../../components/Base/Headless";
import Slideover from "../../components/Base/Headless/Slideover";
import Table from "../../components/Base/Table";
import Tippy from "../../components/Base/Tippy";
import juridicoData from "../../data/juridico.json";

interface Processo {
  id: string;
  numero: string;
  cliente: {
    nome: string;
    tipo: string;
    cpf?: string;
    cnpj?: string;
    contato: string;
    email?: string;
    telefone?: string;
  };
  tipo: string;
  area: string;
  status: string;
  valor_causa: number;
  data_distribuicao: string;
  comarca: string;
  vara: string;
  responsavel: string;
  descricao: string;
  prazos: Array<{
    id: string;
    descricao: string;
    data_limite: string;
    dias_restantes: number;
    status: string;
    tipo: string;
  }>;
  andamentos: Array<{
    id: string;
    data: string;
    tipo: string;
    descricao: string;
    responsavel: string;
  }>;
  documentos: Array<{
    id: string;
    nome: string;
    tipo: string;
    data_upload: string;
    tamanho: string;
  }>;
}

interface Filtros {
  busca: string;
  status: string;
  tipo: string;
  area: string;
  responsavel: string;
  comarca: string;
  prazoVencimento: string;
  valorMin: string;
  valorMax: string;
  dataInicio: string;
  dataFim: string;
}

const ProcessosView: React.FC = () => {
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "kanban">("grid");
  const [sortBy, setSortBy] = useState<
    "numero" | "cliente" | "valor" | "data" | "prazo"
  >("numero");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedProcessos, setSelectedProcessos] = useState<string[]>([]);
  const [showFiltrosAvancados, setShowFiltrosAvancados] = useState(false);

  // Estados dos modais
  const [showFormulario, setShowFormulario] = useState(false);
  const [showDetalhes, setShowDetalhes] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [processoSelecionado, setProcessoSelecionado] =
    useState<Processo | null>(null);

  // Filtros
  const [filtros, setFiltros] = useState<Filtros>({
    busca: "",
    status: "",
    tipo: "",
    area: "",
    responsavel: "",
    comarca: "",
    prazoVencimento: "",
    valorMin: "",
    valorMax: "",
    dataInicio: "",
    dataFim: "",
  });

  useEffect(() => {
    setProcessos(juridicoData.processos as Processo[]);
  }, []);

  // Função de formatação
  const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor);
  };

  const formatarData = (data: string): string => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  // Funções de status e prioridade
  const getStatusColor = (status: string): string => {
    const colors = {
      "Em Andamento":
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "Aguardando Julgamento":
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      Finalizado:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      Suspenso:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
      Arquivado:
        "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPrioridadePrazo = (
    diasRestantes: number,
  ): { cor: string; texto: string; icon: React.ComponentType<any> } => {
    if (diasRestantes <= 0) {
      return { cor: "bg-red-500 text-white", texto: "VENCIDO", icon: XCircle };
    } else if (diasRestantes <= 3) {
      return {
        cor: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        texto: "CRÍTICO",
        icon: AlertTriangle,
      };
    } else if (diasRestantes <= 7) {
      return {
        cor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        texto: "URGENTE",
        icon: Clock,
      };
    }
    return {
      cor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      texto: "NORMAL",
      icon: CheckCircle,
    };
  };

  // Filtros e ordenação
  const processosFiltrados = processos
    .filter((processo) => {
      const matchBusca =
        !filtros.busca ||
        processo.numero.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        processo.cliente.nome
          .toLowerCase()
          .includes(filtros.busca.toLowerCase()) ||
        processo.responsavel
          .toLowerCase()
          .includes(filtros.busca.toLowerCase());

      const matchStatus = !filtros.status || processo.status === filtros.status;
      const matchTipo = !filtros.tipo || processo.tipo === filtros.tipo;
      const matchArea = !filtros.area || processo.area === filtros.area;
      const matchResponsavel =
        !filtros.responsavel || processo.responsavel === filtros.responsavel;
      const matchComarca =
        !filtros.comarca || processo.comarca === filtros.comarca;

      const matchValor =
        (!filtros.valorMin ||
          processo.valor_causa >= parseFloat(filtros.valorMin || "0")) &&
        (!filtros.valorMax ||
          processo.valor_causa <= parseFloat(filtros.valorMax || "999999999"));

      return (
        matchBusca &&
        matchStatus &&
        matchTipo &&
        matchArea &&
        matchResponsavel &&
        matchComarca &&
        matchValor
      );
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case "numero":
          aValue = a.numero;
          bValue = b.numero;
          break;
        case "cliente":
          aValue = a.cliente.nome;
          bValue = b.cliente.nome;
          break;
        case "valor":
          aValue = a.valor_causa;
          bValue = b.valor_causa;
          break;
        case "data":
          aValue = new Date(a.data_distribuicao);
          bValue = new Date(b.data_distribuicao);
          break;
        case "prazo":
          aValue = a.prazos.length > 0 ? a.prazos[0].dias_restantes : 999;
          bValue = b.prazos.length > 0 ? b.prazos[0].dias_restantes : 999;
          break;
        default:
          aValue = a.numero;
          bValue = b.numero;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const toggleProcessoSelecionado = (processoId: string) => {
    setSelectedProcessos((prev) =>
      prev.includes(processoId)
        ? prev.filter((id) => id !== processoId)
        : [...prev, processoId],
    );
  };

  const selecionarTodos = () => {
    if (selectedProcessos.length === processosFiltrados.length) {
      setSelectedProcessos([]);
    } else {
      setSelectedProcessos(processosFiltrados.map((p) => p.id));
    }
  };

  const limparFiltros = () => {
    setFiltros({
      busca: "",
      status: "",
      tipo: "",
      area: "",
      responsavel: "",
      comarca: "",
      prazoVencimento: "",
      valorMin: "",
      valorMax: "",
      dataInicio: "",
      dataFim: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header com Métricas */}
      <div className="bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Gestão de Processos
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Sistema integrado de gerenciamento processual com IA
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline-primary"
              onClick={() => setShowChat(true)}
              className="flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Chat Interno</span>
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowFormulario(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Novo Processo
            </Button>
          </div>
        </div>

        {/* Métricas Rápidas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Total
                </p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {processos.length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                  Críticos
                </p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                  {
                    processos.filter((p) =>
                      p.prazos.some((pr) => pr.dias_restantes <= 3),
                    ).length
                  }
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                  Urgentes
                </p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                  {
                    processos.filter((p) =>
                      p.prazos.some(
                        (pr) => pr.dias_restantes <= 7 && pr.dias_restantes > 3,
                      ),
                    ).length
                  }
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                  Finalizados
                </p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {processos.filter((p) => p.status === "Finalizado").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Ferramentas */}
      <div className="bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Busca */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <FormInput
                type="text"
                placeholder="Buscar por número, cliente ou responsável..."
                value={filtros.busca}
                onChange={(e) =>
                  setFiltros({ ...filtros, busca: e.target.value })
                }
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Filtros Rápidos */}
          <div className="flex flex-wrap gap-2">
            <FormSelect
              value={filtros.status}
              onChange={(e) =>
                setFiltros({ ...filtros, status: e.target.value })
              }
              className="min-w-[140px]"
            >
              <option value="">Todos Status</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Aguardando Julgamento">Aguardando</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Suspenso">Suspenso</option>
            </FormSelect>

            <FormSelect
              value={filtros.tipo}
              onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
              className="min-w-[140px]"
            >
              <option value="">Todos Tipos</option>
              <option value="Trabalhista">Trabalhista</option>
              <option value="Cível">Cível</option>
              <option value="Empresarial">Empresarial</option>
              <option value="Tributário">Tributário</option>
            </FormSelect>

            <FormSelect
              value={filtros.responsavel}
              onChange={(e) =>
                setFiltros({ ...filtros, responsavel: e.target.value })
              }
              className="min-w-[160px]"
            >
              <option value="">Todos Responsáveis</option>
              <option value="Dr. João Silva">Dr. João Silva</option>
              <option value="Dra. Maria Santos">Dra. Maria Santos</option>
              <option value="Dr. Carlos Lima">Dr. Carlos Lima</option>
            </FormSelect>

            {/* Filtros Avançados */}
            <Popover className="relative">
              <Popover.Button as={Button} variant="outline-secondary" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
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
                        Área Jurídica
                      </label>
                      <FormSelect
                        value={filtros.area}
                        onChange={(e) =>
                          setFiltros({ ...filtros, area: e.target.value })
                        }
                      >
                        <option value="">Todas</option>
                        <option value="Direito Civil">Direito Civil</option>
                        <option value="Direito Trabalhista">
                          Direito Trabalhista
                        </option>
                        <option value="Direito Empresarial">
                          Direito Empresarial
                        </option>
                        <option value="Direito Tributário">
                          Direito Tributário
                        </option>
                      </FormSelect>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Comarca
                      </label>
                      <FormSelect
                        value={filtros.comarca}
                        onChange={(e) =>
                          setFiltros({ ...filtros, comarca: e.target.value })
                        }
                      >
                        <option value="">Todas</option>
                        <option value="São Paulo">São Paulo</option>
                        <option value="Rio de Janeiro">Rio de Janeiro</option>
                        <option value="Belo Horizonte">Belo Horizonte</option>
                      </FormSelect>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Valor Mínimo
                      </label>
                      <FormInput
                        type="number"
                        placeholder="R$ 0,00"
                        value={filtros.valorMin}
                        onChange={(e) =>
                          setFiltros({ ...filtros, valorMin: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Valor Máximo
                      </label>
                      <FormInput
                        type="number"
                        placeholder="R$ 999.999,99"
                        value={filtros.valorMax}
                        onChange={(e) =>
                          setFiltros({ ...filtros, valorMax: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-darkmode-400">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={limparFiltros}
                    >
                      Limpar Filtros
                    </Button>
                    <Button variant="primary" size="sm">
                      Aplicar
                    </Button>
                  </div>
                </div>
              </Popover.Panel>
            </Popover>
          </div>
        </div>

        {/* Controles de View e Ordenação */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-darkmode-400">
          <div className="flex items-center gap-4">
            {/* Seleção em Massa */}
            {selectedProcessos.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {selectedProcessos.length} selecionados
                </span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setShowBulkActions(true)}
                >
                  Ações em Lote
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setSelectedProcessos([])}
                >
                  Limpar
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Ordenação */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Ordenar por:
              </span>
              <Menu as="div" className="relative">
                <Menu.Button as={Button} variant="outline-secondary" size="sm">
                  {sortBy === "numero" && "Número"}
                  {sortBy === "cliente" && "Cliente"}
                  {sortBy === "valor" && "Valor"}
                  {sortBy === "data" && "Data"}
                  {sortBy === "prazo" && "Prazo"}
                  {sortOrder === "asc" ? (
                    <SortAsc className="w-4 h-4 ml-2" />
                  ) : (
                    <SortDesc className="w-4 h-4 ml-2" />
                  )}
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-darkmode-600 rounded-lg shadow-lg border border-slate-200 dark:border-darkmode-400 focus:outline-none z-50">
                  <div className="py-1">
                    {[
                      { value: "numero", label: "Número" },
                      { value: "cliente", label: "Cliente" },
                      { value: "valor", label: "Valor da Causa" },
                      { value: "data", label: "Data" },
                      { value: "prazo", label: "Próximo Prazo" },
                    ].map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <button
                            onClick={() =>
                              handleSort(option.value as typeof sortBy)
                            }
                            className={`${
                              active ? "bg-slate-100 dark:bg-darkmode-700" : ""
                            } group flex w-full items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300`}
                          >
                            {option.label}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Menu>
            </div>

            {/* Modo de Visualização */}
            <div className="flex bg-slate-100 dark:bg-darkmode-700 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "primary" : "outline-secondary"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="px-3 py-1.5"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "outline-secondary"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="px-3 py-1.5"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={
                  viewMode === "kanban" ? "primary" : "outline-secondary"
                }
                size="sm"
                onClick={() => setViewMode("kanban")}
                className="px-3 py-1.5"
              >
                <Target className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="space-y-6">
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {processosFiltrados.map((processo) => {
              const proximoPrazo =
                processo.prazos.length > 0 ? processo.prazos[0] : null;
              const prioridade = proximoPrazo
                ? getPrioridadePrazo(proximoPrazo.dias_restantes)
                : null;
              const PrioridadeIcon = prioridade?.icon || CheckCircle;

              return (
                <div
                  key={processo.id}
                  className="bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400 hover:shadow-md transition-all duration-200 hover:border-primary/50"
                >
                  {/* Header do Card */}
                  <div className="p-4 border-b border-slate-200 dark:border-darkmode-400">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <input
                            type="checkbox"
                            checked={selectedProcessos.includes(processo.id)}
                            onChange={() =>
                              toggleProcessoSelecionado(processo.id)
                            }
                            className="rounded border-slate-300 text-primary focus:ring-primary/20"
                          />
                          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {processo.numero}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                          {processo.cliente.nome}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {prioridade && (
                          <Tippy
                            content={`Prazo ${prioridade.texto.toLowerCase()}`}
                          >
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${prioridade.cor}`}
                            >
                              <PrioridadeIcon className="w-3 h-3 inline mr-1" />
                              {prioridade.texto}
                            </span>
                          </Tippy>
                        )}

                        <Menu as="div" className="relative">
                          <Menu.Button
                            as={Button}
                            variant="outline-secondary"
                            size="sm"
                            className="p-1.5"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Menu.Button>
                          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-darkmode-600 rounded-lg shadow-lg border border-slate-200 dark:border-darkmode-400 focus:outline-none z-50">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      setProcessoSelecionado(processo);
                                      setShowDetalhes(true);
                                    }}
                                    className={`${
                                      active
                                        ? "bg-slate-100 dark:bg-darkmode-700"
                                        : ""
                                    } group flex w-full items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300`}
                                  >
                                    <Eye className="w-4 h-4 mr-3" />
                                    Visualizar
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? "bg-slate-100 dark:bg-darkmode-700"
                                        : ""
                                    } group flex w-full items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300`}
                                  >
                                    <Edit className="w-4 h-4 mr-3" />
                                    Editar
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? "bg-slate-100 dark:bg-darkmode-700"
                                        : ""
                                    } group flex w-full items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300`}
                                  >
                                    <MessageSquare className="w-4 h-4 mr-3" />
                                    Chat
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(processo.status)}`}
                      >
                        {processo.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full dark:bg-darkmode-700 dark:text-slate-300">
                        {processo.tipo}
                      </span>
                    </div>
                  </div>

                  {/* Corpo do Card */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Valor da Causa:
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {formatarMoeda(processo.valor_causa)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Responsável:
                      </span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {processo.responsavel}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Comarca:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">
                        {processo.comarca}
                      </span>
                    </div>

                    {proximoPrazo && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">
                          Próximo prazo:
                        </span>
                        <span
                          className={`font-medium ${
                            proximoPrazo.dias_restantes <= 3
                              ? "text-red-600"
                              : proximoPrazo.dias_restantes <= 7
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {proximoPrazo.dias_restantes} dias
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer do Card */}
                  <div className="p-4 bg-slate-50 dark:bg-darkmode-700 rounded-b-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Atualizado em {formatarData(processo.data_distribuicao)}
                      </span>

                      <div className="flex items-center gap-1">
                        <Tippy content="Visualizar detalhes">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="p-1.5"
                            onClick={() => {
                              setProcessoSelecionado(processo);
                              setShowDetalhes(true);
                            }}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                        </Tippy>

                        <Tippy content="Editar processo">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="p-1.5"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                        </Tippy>

                        <Tippy content="Chat do processo">
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
                </div>
              );
            })}
          </div>
        )}

        {viewMode === "list" && (
          <div className="bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400">
            <div className="p-4 border-b border-slate-200 dark:border-darkmode-400">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Lista de Processos
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={
                      selectedProcessos.length === processosFiltrados.length &&
                      processosFiltrados.length > 0
                    }
                    onChange={selecionarTodos}
                    className="rounded border-slate-300 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Selecionar todos ({processosFiltrados.length})
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="w-12">
                      <input
                        type="checkbox"
                        checked={
                          selectedProcessos.length ===
                            processosFiltrados.length &&
                          processosFiltrados.length > 0
                        }
                        onChange={selecionarTodos}
                        className="rounded border-slate-300 text-primary focus:ring-primary/20"
                      />
                    </Table.Th>
                    <Table.Th>
                      <button
                        onClick={() => handleSort("numero")}
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        Processo
                        {sortBy === "numero" &&
                          (sortOrder === "asc" ? (
                            <SortAsc className="w-4 h-4" />
                          ) : (
                            <SortDesc className="w-4 h-4" />
                          ))}
                      </button>
                    </Table.Th>
                    <Table.Th>
                      <button
                        onClick={() => handleSort("cliente")}
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        Cliente
                        {sortBy === "cliente" &&
                          (sortOrder === "asc" ? (
                            <SortAsc className="w-4 h-4" />
                          ) : (
                            <SortDesc className="w-4 h-4" />
                          ))}
                      </button>
                    </Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>
                      <button
                        onClick={() => handleSort("valor")}
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        Valor
                        {sortBy === "valor" &&
                          (sortOrder === "asc" ? (
                            <SortAsc className="w-4 h-4" />
                          ) : (
                            <SortDesc className="w-4 h-4" />
                          ))}
                      </button>
                    </Table.Th>
                    <Table.Th>
                      <button
                        onClick={() => handleSort("prazo")}
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        Prazo
                        {sortBy === "prazo" &&
                          (sortOrder === "asc" ? (
                            <SortAsc className="w-4 h-4" />
                          ) : (
                            <SortDesc className="w-4 h-4" />
                          ))}
                      </button>
                    </Table.Th>
                    <Table.Th>Responsável</Table.Th>
                    <Table.Th className="text-center w-32">Ações</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {processosFiltrados.map((processo) => {
                    const proximoPrazo =
                      processo.prazos.length > 0 ? processo.prazos[0] : null;
                    const prioridade = proximoPrazo
                      ? getPrioridadePrazo(proximoPrazo.dias_restantes)
                      : null;

                    return (
                      <Table.Tr
                        key={processo.id}
                        className="hover:bg-slate-50 dark:hover:bg-darkmode-700"
                      >
                        <Table.Td>
                          <input
                            type="checkbox"
                            checked={selectedProcessos.includes(processo.id)}
                            onChange={() =>
                              toggleProcessoSelecionado(processo.id)
                            }
                            className="rounded border-slate-300 text-primary focus:ring-primary/20"
                          />
                        </Table.Td>
                        <Table.Td>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              {processo.numero}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {processo.tipo} • {processo.comarca}
                            </div>
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <div>
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              {processo.cliente.nome}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {processo.cliente.tipo}
                            </div>
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
                          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {formatarMoeda(processo.valor_causa)}
                          </div>
                        </Table.Td>
                        <Table.Td>
                          {proximoPrazo ? (
                            <div className="flex items-center gap-2">
                              {prioridade && (
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${prioridade.cor}`}
                                >
                                  {proximoPrazo.dias_restantes} dias
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              Sem prazos
                            </span>
                          )}
                        </Table.Td>
                        <Table.Td>
                          <div className="text-sm text-slate-900 dark:text-slate-100">
                            {processo.responsavel}
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <div className="flex items-center justify-center gap-1">
                            <Tippy content="Visualizar">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                className="p-1.5"
                                onClick={() => {
                                  setProcessoSelecionado(processo);
                                  setShowDetalhes(true);
                                }}
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                            </Tippy>
                            <Tippy content="Editar">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                className="p-1.5"
                              >
                                <Edit className="w-3.5 h-3.5" />
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
                        </Table.Td>
                      </Table.Tr>
                    );
                  })}
                </Table.Tbody>
              </Table>
            </div>
          </div>
        )}

        {viewMode === "kanban" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[
              "Em Andamento",
              "Aguardando Julgamento",
              "Finalizado",
              "Suspenso",
            ].map((status) => {
              const processosStatus = processosFiltrados.filter(
                (p) => p.status === status,
              );

              return (
                <div
                  key={status}
                  className="bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400"
                >
                  <div className="p-4 border-b border-slate-200 dark:border-darkmode-400">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        {status}
                      </h3>
                      <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full dark:bg-darkmode-700 dark:text-slate-400">
                        {processosStatus.length}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                    {processosStatus.map((processo) => (
                      <div
                        key={processo.id}
                        className="p-3 bg-slate-50 dark:bg-darkmode-700 rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                        onClick={() => {
                          setProcessoSelecionado(processo);
                          setShowDetalhes(true);
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {processo.numero}
                          </h4>
                          <MoreHorizontal className="w-4 h-4 text-slate-400" />
                        </div>

                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate mb-2">
                          {processo.cliente.nome}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {processo.responsavel}
                          </span>
                          <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                            {formatarMoeda(processo.valor_causa)}
                          </span>
                        </div>

                        {processo.prazos.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-slate-200 dark:border-darkmode-400">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                Próximo prazo:
                              </span>
                              <span
                                className={`text-xs font-medium ${
                                  processo.prazos[0].dias_restantes <= 3
                                    ? "text-red-600"
                                    : processo.prazos[0].dias_restantes <= 7
                                      ? "text-yellow-600"
                                      : "text-green-600"
                                }`}
                              >
                                {processo.prazos[0].dias_restantes} dias
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Estado Vazio */}
        {processosFiltrados.length === 0 && (
          <div className="bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400 p-12 text-center">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Nenhum processo encontrado
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              {filtros.busca || filtros.status || filtros.tipo
                ? "Tente ajustar os filtros para encontrar processos."
                : "Comece adicionando seu primeiro processo."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {(filtros.busca || filtros.status || filtros.tipo) && (
                <Button variant="outline-secondary" onClick={limparFiltros}>
                  Limpar Filtros
                </Button>
              )}
              <Button variant="primary" onClick={() => setShowFormulario(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Processo
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Slideovers */}

      {/* Formulário de Novo Processo */}
      <Slideover
        open={showFormulario}
        onClose={() => setShowFormulario(false)}
        size="xl"
      >
        <Slideover.Panel>
          <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Novo Processo
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Adicionar processo com assistência de IA
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
                Interface para cadastro de processos com validação automática e
                IA.
              </p>
            </div>
          </div>
        </Slideover.Panel>
      </Slideover>

      {/* Detalhes do Processo */}
      <Slideover
        open={showDetalhes}
        onClose={() => setShowDetalhes(false)}
        size="xl"
      >
        <Slideover.Panel>
          <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Detalhes do Processo
            </h2>
            {processoSelecionado && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {processoSelecionado.numero} •{" "}
                {processoSelecionado.cliente.nome}
              </p>
            )}
          </Slideover.Title>
          <div className="px-6 py-6">
            {processoSelecionado && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                      Informações Básicas
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Número
                        </label>
                        <p className="text-slate-900 dark:text-slate-100">
                          {processoSelecionado.numero}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Cliente
                        </label>
                        <p className="text-slate-900 dark:text-slate-100">
                          {processoSelecionado.cliente.nome}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Tipo
                        </label>
                        <p className="text-slate-900 dark:text-slate-100">
                          {processoSelecionado.tipo}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Status
                        </label>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(processoSelecionado.status)}`}
                        >
                          {processoSelecionado.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                      Detalhes Processuais
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Valor da Causa
                        </label>
                        <p className="text-slate-900 dark:text-slate-100">
                          {formatarMoeda(processoSelecionado.valor_causa)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Comarca
                        </label>
                        <p className="text-slate-900 dark:text-slate-100">
                          {processoSelecionado.comarca}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Vara
                        </label>
                        <p className="text-slate-900 dark:text-slate-100">
                          {processoSelecionado.vara}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Responsável
                        </label>
                        <p className="text-slate-900 dark:text-slate-100">
                          {processoSelecionado.responsavel}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prazos */}
                {processoSelecionado.prazos.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                      Prazos
                    </h3>
                    <div className="space-y-3">
                      {processoSelecionado.prazos.map((prazo) => {
                        const prioridade = getPrioridadePrazo(
                          prazo.dias_restantes,
                        );
                        return (
                          <div
                            key={prazo.id}
                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-darkmode-700 rounded-lg"
                          >
                            <div>
                              <h4 className="font-medium text-slate-900 dark:text-slate-100">
                                {prazo.descricao}
                              </h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Vencimento: {formatarData(prazo.data_limite)}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${prioridade.cor}`}
                            >
                              {prazo.dias_restantes} dias
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Slideover.Panel>
      </Slideover>

      {/* Chat */}
      <Slideover open={showChat} onClose={() => setShowChat(false)} size="lg">
        <Slideover.Panel>
          <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Chat da Equipe
            </h2>
          </Slideover.Title>
          <div className="px-6 py-6">
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Chat em Tempo Real
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Comunicação instantânea com a equipe jurídica.
              </p>
            </div>
          </div>
        </Slideover.Panel>
      </Slideover>

      {/* Ações em Lote */}
      <Slideover
        open={showBulkActions}
        onClose={() => setShowBulkActions(false)}
        size="md"
      >
        <Slideover.Panel>
          <Slideover.Title className="border-b border-slate-200 dark:border-darkmode-400 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Ações em Lote
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {selectedProcessos.length} processos selecionados
            </p>
          </Slideover.Title>
          <div className="px-6 py-6">
            <div className="space-y-4">
              <Button
                variant="outline-primary"
                className="w-full justify-start"
              >
                <Edit className="w-4 h-4 mr-3" />
                Editar Status em Lote
              </Button>
              <Button
                variant="outline-primary"
                className="w-full justify-start"
              >
                <User className="w-4 h-4 mr-3" />
                Alterar Responsável
              </Button>
              <Button
                variant="outline-primary"
                className="w-full justify-start"
              >
                <Download className="w-4 h-4 mr-3" />
                Exportar Selecionados
              </Button>
              <Button
                variant="outline-primary"
                className="w-full justify-start"
              >
                <Archive className="w-4 h-4 mr-3" />
                Arquivar Processos
              </Button>
              <Button variant="outline-danger" className="w-full justify-start">
                <Trash className="w-4 h-4 mr-3" />
                Excluir Selecionados
              </Button>
            </div>
          </div>
        </Slideover.Panel>
      </Slideover>
    </div>
  );
};

export default ProcessosView;
