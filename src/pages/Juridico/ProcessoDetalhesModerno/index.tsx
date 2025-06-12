import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../stores/hooks";
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
  Share2,
  Star,
  Bookmark,
  Activity,
  Eye,
  Send,
  Bot,
  Zap,
  Shield,
  Target,
  Users,
  Briefcase,
  Scale,
  Gavel,
} from "lucide-react";
import Button from "../../../components/Base/Button";
import { Tab } from "../../../components/Base/Headless";
import Table from "../../../components/Base/Table";
import { Menu } from "../../../components/Base/Headless";
import Tippy from "../../../components/Base/Tippy";
import juridicoData from "../../../data/juridico.json";

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

const ProcessoDetalhesModerno: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const [processo, setProcesso] = useState<Processo | null>(null);
  const [activeTab, setActiveTab] = useState("visao-geral");
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
      "Em Andamento":
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "Aguardando Julgamento":
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      Finalizado:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      Suspenso:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
      Arquivado: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${darkMode ? "dark" : ""} bg-slate-50 dark:bg-slate-900`}
      >
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
              Carregando processo...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!processo) {
    return (
      <div
        className={`min-h-screen ${darkMode ? "dark" : ""} bg-slate-50 dark:bg-slate-900`}
      >
        <div className="p-8">
          <div className="text-center py-16">
            <FileText className="w-24 h-24 mx-auto text-slate-400 mb-6" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Processo não encontrado
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
              O processo solicitado não foi encontrado ou você não tem permissão
              para acessá-lo.
            </p>
            <Button onClick={() => navigate("/juridico/processos")} size="lg">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar para Processos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "visao-geral", label: "Visão Geral", icon: Eye },
    { id: "andamentos", label: "Andamentos", icon: Activity },
    { id: "prazos", label: "Prazos", icon: Clock },
    { id: "documentos", label: "Documentos", icon: FileText },
    { id: "agenda", label: "Agenda", icon: Calendar },
    { id: "publicacoes", label: "Publicações", icon: Bell },
    { id: "intimacoes", label: "Intimações", icon: AlertTriangle },
    { id: "mensagens", label: "Chat", icon: MessageSquare },
    { id: "tickets", label: "Suporte", icon: Users },
    { id: "ia-insights", label: "IA Insights", icon: Bot },
  ];

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark" : ""} bg-slate-50 dark:bg-slate-900`}
    >
      {/* Header Moderno */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Info do Processo */}
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                onClick={() => navigate("/juridico/processos")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </Button>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {processo.numero}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    {processo.descricao}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(processo.status)}`}
                >
                  {processo.status}
                </span>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Building className="w-4 h-4" />
                  <span className="text-sm">{processo.comarca}</span>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-3">
              <Tippy content="Favoritar Processo">
                <Button variant="ghost" size="sm">
                  <Star className="w-5 h-5" />
                </Button>
              </Tippy>
              <Tippy content="Compartilhar">
                <Button variant="ghost" size="sm">
                  <Share2 className="w-5 h-5" />
                </Button>
              </Tippy>
              <Button
                variant="outline-primary"
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Editar
              </Button>
              <Button variant="primary" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat
              </Button>
              <Menu>
                <Menu.Button as={Button} variant="ghost">
                  <MoreHorizontal className="w-5 h-5" />
                </Menu.Button>
                <Menu.Items className="w-56">
                  <Menu.Item>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Baixar Relatório Completo
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Enviar por Email
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      Análise por IA
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-t-xl text-sm font-medium transition-all duration-200 whitespace-nowrap relative ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 border-b-3 border-blue-600"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-8">
        {activeTab === "visao-geral" && (
          <div className="space-y-8">
            {/* Cards de Informações Principais */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Dados do Processo */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                  Informações do Processo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Número do Processo
                      </label>
                      <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-1">
                        {processo.numero}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Tipo/Área
                      </label>
                      <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-1">
                        {processo.tipo} - {processo.area}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Comarca/Vara
                      </label>
                      <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-1">
                        {processo.comarca} - {processo.vara}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Status
                      </label>
                      <div className="mt-2">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(processo.status)}`}
                        >
                          {processo.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Data de Distribuição
                      </label>
                      <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-1">
                        {formatarData(processo.data_distribuicao)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Valor da Causa
                      </label>
                      <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-1">
                        {formatarMoeda(processo.valor_causa)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dados do Cliente */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                  Cliente
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      {processo.cliente.tipo === "PJ" ? (
                        <Building className="w-8 h-8 text-blue-600" />
                      ) : (
                        <User className="w-8 h-8 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
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
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {processo.cliente.tipo === "PJ" ? "CNPJ" : "CPF"}
                    </label>
                    <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-1">
                      {processo.cliente.tipo === "PJ"
                        ? processo.cliente.cnpj
                        : processo.cliente.cpf}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Contato
                    </label>
                    <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-1">
                      {processo.cliente.contato}
                    </p>
                  </div>

                  <div className="pt-6 space-y-3">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="w-full flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Ligar
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="w-full flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="w-full flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Partes do Processo */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                Partes do Processo
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                    Requerente/Autor
                  </h3>
                  <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    {processo.partes.requerente}
                  </p>
                </div>
                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                    Requerido/Réu
                  </h3>
                  <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    {processo.partes.requerido}
                  </p>
                </div>
              </div>
            </div>

            {/* Resumo de Atividades */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                  Prazos Críticos
                </h3>
                <div className="space-y-4">
                  {processo.prazos.map((prazo) => (
                    <div
                      key={prazo.id}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                    >
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-100">
                          {prazo.tipo}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {formatarData(prazo.data_limite)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {prazo.dias_restantes <= 3 ? (
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        <span
                          className={`font-semibold ${
                            prazo.dias_restantes <= 3
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {prazo.dias_restantes} dias
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                  Últimos Andamentos
                </h3>
                <div className="space-y-4">
                  {processo.andamentos.slice(0, 3).map((andamento) => (
                    <div
                      key={andamento.id}
                      className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                    >
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                          {andamento.tipo}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {andamento.descricao}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatarData(andamento.data)} • Por:{" "}
                          {andamento.responsavel}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Outros conteúdos das abas */}
        {activeTab !== "visao-geral" && (
          <div className="text-center py-16">
            <div className="p-8 bg-slate-100 dark:bg-slate-700 rounded-2xl inline-block mb-6">
              <Bot className="w-16 h-16 text-slate-400 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              {tabs.find((t) => t.id === activeTab)?.label} em Desenvolvimento
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Esta seção será implementada com recursos avançados de IA e
              automação.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessoDetalhesModerno;
