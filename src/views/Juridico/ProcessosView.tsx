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
} from "lucide-react";
import Button from "../../base-components/Button";
import { FormInput, FormSelect } from "../../base-components/Form";
import { Tab, Menu } from "../../base-components/Headless";
import Slideover from "../../base-components/Headless/Slideover";
import Table from "../../base-components/Table";
import Tippy from "../../base-components/Tippy";
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
    tipo: string;
    data_limite: string;
    status: string;
    dias_restantes: number;
  }>;
}

const ProcessosView: React.FC = () => {
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [filtros, setFiltros] = useState({
    status: "",
    tipo: "",
    responsavel: "",
    comarca: "",
    busca: "",
  });
  const [processoSelecionado, setProcessoSelecionado] =
    useState<Processo | null>(null);
  const [showFormulario, setShowFormulario] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [activeTab, setActiveTab] = useState("lista");

  useEffect(() => {
    setProcessos(juridicoData.processos);
  }, []);

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
      "Em Andamento": "bg-blue-100 text-blue-800",
      "Aguardando Julgamento": "bg-yellow-100 text-yellow-800",
      Finalizado: "bg-green-100 text-green-800",
      Suspenso: "bg-gray-100 text-gray-800",
      Arquivado: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getUrgenciaIcon = (diasRestantes: number) => {
    if (diasRestantes <= 3)
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (diasRestantes <= 7)
      return <Clock className="w-4 h-4 text-yellow-500" />;
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  const processosFiltrados = processos.filter((processo) => {
    const matchBusca =
      !filtros.busca ||
      processo.numero.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      processo.cliente.nome.toLowerCase().includes(filtros.busca.toLowerCase());

    const matchStatus = !filtros.status || processo.status === filtros.status;
    const matchTipo = !filtros.tipo || processo.tipo === filtros.tipo;
    const matchResponsavel =
      !filtros.responsavel || processo.responsavel === filtros.responsavel;
    const matchComarca =
      !filtros.comarca || processo.comarca === filtros.comarca;

    return (
      matchBusca && matchStatus && matchTipo && matchResponsavel && matchComarca
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Gestão de Processos
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Gerencie todos os processos jurídicos de forma unificada
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline-primary"
            onClick={() => setShowChat(true)}
            className="flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Chat Interno
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

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Processos Ativos
              </p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                {juridicoData.dashboard.metricas.processos_ativos}
              </p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Prazos Vencendo
              </p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {juridicoData.dashboard.metricas.prazos_vencendo}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Intimações Pendentes
              </p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {juridicoData.dashboard.metricas.intimacoes_pendentes}
              </p>
            </div>
            <Bell className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Eventos Agenda
              </p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {juridicoData.dashboard.metricas.agenda_eventos}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tab.Group>
        <Tab.List className="bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
          <Tab className="w-full py-2 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Lista de Processos
            </div>
          </Tab>
          <Tab className="w-full py-2 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Agenda Integrada
            </div>
          </Tab>
          <Tab className="w-full py-2 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Publicações
            </div>
          </Tab>
          <Tab className="w-full py-2 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documentos
            </div>
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {/* Lista de Processos */}
          <Tab.Panel>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              {/* Filtros */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                  <div className="lg:col-span-2">
                    <FormInput
                      type="text"
                      placeholder="Buscar por número ou cliente..."
                      value={filtros.busca}
                      onChange={(e) =>
                        setFiltros({ ...filtros, busca: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>
                  <FormSelect
                    value={filtros.status}
                    onChange={(e) =>
                      setFiltros({ ...filtros, status: e.target.value })
                    }
                  >
                    <option value="">Todos os Status</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Aguardando Julgamento">
                      Aguardando Julgamento
                    </option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Suspenso">Suspenso</option>
                  </FormSelect>
                  <FormSelect
                    value={filtros.tipo}
                    onChange={(e) =>
                      setFiltros({ ...filtros, tipo: e.target.value })
                    }
                  >
                    <option value="">Todos os Tipos</option>
                    <option value="Trabalhista">Trabalhista</option>
                    <option value="Cível">Cível</option>
                    <option value="Empresarial">Empresarial</option>
                    <option value="Penal">Penal</option>
                  </FormSelect>
                  <FormSelect
                    value={filtros.responsavel}
                    onChange={(e) =>
                      setFiltros({ ...filtros, responsavel: e.target.value })
                    }
                  >
                    <option value="">Todos os Responsáveis</option>
                    <option value="Dr. João Silva">Dr. João Silva</option>
                    <option value="Dra. Ana Costa">Dra. Ana Costa</option>
                    <option value="Dr. Rafael Santos">Dr. Rafael Santos</option>
                  </FormSelect>
                  <Button
                    variant="outline-secondary"
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filtros
                  </Button>
                </div>
              </div>

              {/* Tabela */}
              <div className="overflow-x-auto">
                <Table className="text-sm">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Processo</Table.Th>
                      <Table.Th>Cliente</Table.Th>
                      <Table.Th>Tipo/Área</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Valor da Causa</Table.Th>
                      <Table.Th>Próximo Prazo</Table.Th>
                      <Table.Th>Responsável</Table.Th>
                      <Table.Th className="text-center">Ações</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {processosFiltrados.map((processo) => (
                      <Table.Tr
                        key={processo.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      >
                        <Table.Td>
                          <div>
                            <p className="font-medium text-slate-800 dark:text-slate-100">
                              {processo.numero}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {processo.comarca} - {processo.vara}
                            </p>
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <div>
                            <p className="font-medium text-slate-800 dark:text-slate-100">
                              {processo.cliente.nome}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {processo.cliente.tipo} -{" "}
                              {processo.cliente.contato}
                            </p>
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <div>
                            <p className="font-medium text-slate-800 dark:text-slate-100">
                              {processo.tipo}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {processo.area}
                            </p>
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(processo.status)}`}
                          >
                            {processo.status}
                          </span>
                        </Table.Td>
                        <Table.Td className="font-medium">
                          {formatarMoeda(processo.valor_causa)}
                        </Table.Td>
                        <Table.Td>
                          {processo.prazos.length > 0 ? (
                            <div className="flex items-center gap-2">
                              {getUrgenciaIcon(
                                processo.prazos[0].dias_restantes,
                              )}
                              <div>
                                <p className="text-sm font-medium">
                                  {processo.prazos[0].tipo}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {formatarData(processo.prazos[0].data_limite)}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400">Nenhum prazo</span>
                          )}
                        </Table.Td>
                        <Table.Td>
                          <p className="text-sm font-medium">
                            {processo.responsavel}
                          </p>
                        </Table.Td>
                        <Table.Td>
                          <div className="flex items-center justify-center gap-2">
                            <Tippy content="Visualizar Detalhes">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => setProcessoSelecionado(processo)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Tippy>
                            <Menu>
                              <Menu.Button
                                as={Button}
                                variant="outline-secondary"
                                size="sm"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Menu.Button>
                              <Menu.Items className="w-48">
                                <Menu.Item>
                                  <div className="flex items-center gap-2">
                                    <Edit className="w-4 h-4" />
                                    Editar Processo
                                  </div>
                                </Menu.Item>
                                <Menu.Item>
                                  <div className="flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Abrir Chat
                                  </div>
                                </Menu.Item>
                                <Menu.Item>
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Ver Documentos
                                  </div>
                                </Menu.Item>
                                <Menu.Item>
                                  <div className="flex items-center gap-2 text-red-600">
                                    <Trash className="w-4 h-4" />
                                    Arquivar
                                  </div>
                                </Menu.Item>
                              </Menu.Items>
                            </Menu>
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </div>
          </Tab.Panel>

          {/* Agenda Integrada */}
          <Tab.Panel>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
                  Agenda Jurídica
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Visualize todos os eventos relacionados aos processos
                </p>
                <Button variant="primary">Ver Agenda Completa</Button>
              </div>
            </div>
          </Tab.Panel>

          {/* Publicações */}
          <Tab.Panel>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="text-center py-12">
                <Bell className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
                  Publicações Judiciais
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Acompanhe todas as publicações dos processos
                </p>
                <Button variant="primary">Ver Todas as Publicações</Button>
              </div>
            </div>
          </Tab.Panel>

          {/* Documentos */}
          <Tab.Panel>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
                  Documentos Processuais
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Gerencie todos os documentos vinculados aos processos
                </p>
                <Button variant="primary">Gerenciar Documentos</Button>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      {/* Slideover - Formulário Novo Processo */}
      <Slideover
        open={showFormulario}
        onClose={() => setShowFormulario(false)}
        size="lg"
      >
        <Slideover.Panel>
          <Slideover.Title className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-medium">Novo Processo</h2>
          </Slideover.Title>
          <div className="p-6">
            <p className="text-slate-600 dark:text-slate-400">
              Formulário para cadastro de novo processo será implementado aqui.
            </p>
          </div>
        </Slideover.Panel>
      </Slideover>

      {/* Chat Interno */}
      <Slideover open={showChat} onClose={() => setShowChat(false)} size="md">
        <Slideover.Panel>
          <Slideover.Title className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-medium">
              Chat Interno - Equipe Jurídica
            </h2>
          </Slideover.Title>
          <div className="h-full">
            <div className="p-6">
              <p className="text-slate-600 dark:text-slate-400">
                Sistema de chat interno para discussão de processos será
                implementado aqui.
              </p>
            </div>
          </div>
        </Slideover.Panel>
      </Slideover>
    </div>
  );
};

export default ProcessosView;
