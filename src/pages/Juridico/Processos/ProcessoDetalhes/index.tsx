import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  MessageSquare,
  Upload,
  Download,
  Edit,
  MoreHorizontal,
  Phone,
  Mail,
  Building,
  CheckCircle,
  AlertTriangle,
  Bell,
} from "lucide-react";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import Button from "../../../../base-components/Button";
import { Tab } from "../../../../base-components/Headless";
import Table from "../../../../base-components/Table";
import { Menu } from "../../../../base-components/Headless";
import Tippy from "../../../../base-components/Tippy";
import juridicoData from "../../../../data/juridico.json";

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
  partes: {
    requerente: string;
    requerido: string;
  };
  prazos: Array<any>;
  documentos: Array<any>;
  andamentos: Array<any>;
  agenda: Array<any>;
  publicacoes: Array<any>;
  intimacoes: Array<any>;
  mensagens: Array<any>;
  tickets: Array<any>;
}

const ProcessoDetalhesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [processo, setProcesso] = useState<Processo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar processo por ID
    const processoEncontrado = juridicoData.processos.find((p) => p.id === id);
    if (processoEncontrado) {
      setProcesso(processoEncontrado);
    }
    setLoading(false);
  }, [id]);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const formatarDataHora = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Carregando processo...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!processo) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
            Processo não encontrado
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            O processo solicitado não foi encontrado ou você não tem permissão
            para acessá-lo.
          </p>
          <Button onClick={() => navigate("/juridico/processos")}>
            Voltar para Processos
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/juridico/processos")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {processo.numero}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {processo.descricao}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline-primary"
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Editar
            </Button>
            <Menu>
              <Menu.Button as={Button} variant="outline-secondary">
                <MoreHorizontal className="w-4 h-4" />
              </Menu.Button>
              <Menu.Items className="w-48">
                <Menu.Item>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Baixar Relatório
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
                    <Bell className="w-4 h-4" />
                    Configurar Alertas
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        {/* Informações Básicas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dados do Processo */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
              Informações do Processo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Número do Processo
                  </label>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    {processo.numero}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Tipo/Área
                  </label>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    {processo.tipo} - {processo.area}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Comarca/Vara
                  </label>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    {processo.comarca} - {processo.vara}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Responsável
                  </label>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    {processo.responsavel}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Status
                  </label>
                  <div className="mt-1">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(processo.status)}`}
                    >
                      {processo.status}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Data de Distribuição
                  </label>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    {formatarData(processo.data_distribuicao)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Valor da Causa
                  </label>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    {formatarMoeda(processo.valor_causa)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dados do Cliente */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
              Cliente
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  {processo.cliente.tipo === "PJ" ? (
                    <Building className="w-5 h-5 text-blue-600" />
                  ) : (
                    <User className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    {processo.cliente.nome}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {processo.cliente.tipo === "PJ"
                      ? "Pessoa Jurídica"
                      : "Pessoa Física"}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {processo.cliente.tipo === "PJ" ? "CNPJ" : "CPF"}
                </label>
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  {processo.cliente.tipo === "PJ"
                    ? processo.cliente.cnpj
                    : processo.cliente.cpf}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Contato
                </label>
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  {processo.cliente.contato}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-600">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="w-full flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Entrar em Contato
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Partes do Processo */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
            Partes do Processo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Requerente/Autor
              </label>
              <p className="font-medium text-slate-800 dark:text-slate-100 mt-1">
                {processo.partes.requerente}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Requerido/Réu
              </label>
              <p className="font-medium text-slate-800 dark:text-slate-100 mt-1">
                {processo.partes.requerido}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs de Detalhes */}
        <Tab.Group>
          <Tab.List className="bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <Tab className="w-full py-3 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Andamentos
              </div>
            </Tab>
            <Tab className="w-full py-3 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Prazos
              </div>
            </Tab>
            <Tab className="w-full py-3 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Documentos
              </div>
            </Tab>
            <Tab className="w-full py-3 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Agenda
              </div>
            </Tab>
            <Tab className="w-full py-3 px-4 text-sm font-medium rounded-md ui-selected:bg-primary ui-selected:text-white ui-not-selected:text-slate-500 ui-not-selected:hover:text-slate-700 dark:ui-not-selected:text-slate-400 dark:ui-not-selected:hover:text-slate-300 transition-colors">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Mensagens
              </div>
            </Tab>
          </Tab.List>

          <Tab.Panels>
            {/* Andamentos */}
            <Tab.Panel>
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
                    Histórico de Andamentos
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {processo.andamentos.map((andamento) => (
                      <div
                        key={andamento.id}
                        className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-800 dark:text-slate-100">
                              {andamento.tipo}
                            </h4>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              {formatarData(andamento.data)}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">
                            {andamento.descricao}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Por: {andamento.responsavel}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Prazos */}
            <Tab.Panel>
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
                      Prazos Processuais
                    </h3>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4" />
                      Novo Prazo
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Tipo</Table.Th>
                        <Table.Th>Data Limite</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Dias Restantes</Table.Th>
                        <Table.Th>Ações</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {processo.prazos.map((prazo) => (
                        <Table.Tr key={prazo.id}>
                          <Table.Td>{prazo.tipo}</Table.Td>
                          <Table.Td>{formatarData(prazo.data_limite)}</Table.Td>
                          <Table.Td>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                prazo.status === "pendente"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {prazo.status === "pendente"
                                ? "Pendente"
                                : "Cumprido"}
                            </span>
                          </Table.Td>
                          <Table.Td>
                            <span
                              className={`font-medium ${
                                prazo.dias_restantes <= 3
                                  ? "text-red-600"
                                  : prazo.dias_restantes <= 7
                                    ? "text-yellow-600"
                                    : "text-green-600"
                              }`}
                            >
                              {prazo.dias_restantes} dias
                            </span>
                          </Table.Td>
                          <Table.Td>
                            <div className="flex gap-2">
                              <Tippy content="Marcar como Cumprido">
                                <Button variant="outline-secondary" size="sm">
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              </Tippy>
                              <Tippy content="Editar Prazo">
                                <Button variant="outline-secondary" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </Tippy>
                            </div>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </div>
              </div>
            </Tab.Panel>

            {/* Documentos */}
            <Tab.Panel>
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
                      Documentos do Processo
                    </h3>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Nome do Arquivo</Table.Th>
                        <Table.Th>Categoria</Table.Th>
                        <Table.Th>Tamanho</Table.Th>
                        <Table.Th>Data Upload</Table.Th>
                        <Table.Th>Ações</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {processo.documentos.map((doc) => (
                        <Table.Tr key={doc.id}>
                          <Table.Td>
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-slate-400" />
                              {doc.nome}
                            </div>
                          </Table.Td>
                          <Table.Td>{doc.categoria}</Table.Td>
                          <Table.Td>{doc.tamanho}</Table.Td>
                          <Table.Td>{formatarData(doc.data_upload)}</Table.Td>
                          <Table.Td>
                            <div className="flex gap-2">
                              <Tippy content="Baixar">
                                <Button variant="outline-secondary" size="sm">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </Tippy>
                              <Tippy content="Visualizar">
                                <Button variant="outline-secondary" size="sm">
                                  <FileText className="w-4 h-4" />
                                </Button>
                              </Tippy>
                            </div>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </div>
              </div>
            </Tab.Panel>

            {/* Agenda */}
            <Tab.Panel>
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
                  Eventos da Agenda
                </h3>
                {processo.agenda.length > 0 ? (
                  <div className="space-y-4">
                    {processo.agenda.map((evento) => (
                      <div
                        key={evento.id}
                        className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                      >
                        <Calendar className="w-5 h-5 text-blue-500 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800 dark:text-slate-100">
                            {evento.titulo}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {formatarDataHora(evento.data)}
                          </p>
                          {evento.local && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {evento.local}
                            </p>
                          )}
                        </div>
                        <div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              evento.status === "agendado"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {evento.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                    Nenhum evento agendado para este processo.
                  </p>
                )}
              </div>
            </Tab.Panel>

            {/* Mensagens */}
            <Tab.Panel>
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-4">
                  Mensagens Internas
                </h3>
                {processo.mensagens.length > 0 ? (
                  <div className="space-y-4">
                    {processo.mensagens.map((mensagem) => (
                      <div
                        key={mensagem.id}
                        className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-800 dark:text-slate-100">
                              {mensagem.autor}
                            </h4>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              {formatarDataHora(mensagem.data)}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">
                            {mensagem.mensagem}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                    Nenhuma mensagem interna registrada.
                  </p>
                )}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </DashboardLayout>
  );
};

export default ProcessoDetalhesPage;
