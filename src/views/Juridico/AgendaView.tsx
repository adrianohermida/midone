import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash,
  Bell,
  Users,
  Navigation,
  Phone,
  Mail,
  MoreHorizontal,
} from "lucide-react";
import Button from "../../base-components/Button";
import { FormInput, FormSelect } from "../../base-components/Form";
import CalendarComponent from "../../components/Base/Calendar";
import { Menu, Tab } from "../../base-components/Headless";
import Slideover from "../../base-components/Headless/Slideover";
import Tippy from "../../base-components/Tippy";
import juridicoData from "../../data/juridico.json";

interface EventoAgenda {
  id: string;
  titulo: string;
  processo?: string;
  cliente: string;
  data: string;
  data_fim?: string;
  local?: string;
  endereco?: string;
  tipo: string;
  status: string;
  responsavel: string;
  participantes?: string[];
  observacoes?: string;
  assunto?: string;
  acao?: string;
  notificacoes?: {
    cliente: boolean;
    responsavel: boolean;
    antecedencia: string;
  };
}

const AgendaView: React.FC = () => {
  const [eventos, setEventos] = useState<EventoAgenda[]>([]);
  const [filtros, setFiltros] = useState({
    tipo: "",
    status: "",
    responsavel: "",
    busca: "",
    dataInicio: "",
    dataFim: "",
  });
  const [eventoSelecionado, setEventoSelecionado] =
    useState<EventoAgenda | null>(null);
  const [showFormulario, setShowFormulario] = useState(false);
  const [visualizacao, setVisualizacao] = useState<"calendario" | "lista">(
    "calendario",
  );
  const [dataAtual, setDataAtual] = useState(new Date());

  useEffect(() => {
    setEventos(juridicoData.agenda);
  }, []);

  const formatarDataHora = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const formatarHora = (data: string) => {
    return new Date(data).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTipoColor = (tipo: string) => {
    const colors = {
      audiencia: "bg-blue-100 text-blue-800 border-blue-200",
      prazo: "bg-red-100 text-red-800 border-red-200",
      reuniao: "bg-green-100 text-green-800 border-green-200",
      compromisso: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return (
      colors[tipo as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getTipoIcon = (tipo: string) => {
    const icons = {
      audiencia: <Calendar className="w-4 h-4" />,
      prazo: <Clock className="w-4 h-4" />,
      reuniao: <Users className="w-4 h-4" />,
      compromisso: <Bell className="w-4 h-4" />,
    };
    return (
      icons[tipo as keyof typeof icons] || <FileText className="w-4 h-4" />
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      agendado: "bg-blue-100 text-blue-800",
      confirmado: "bg-green-100 text-green-800",
      cancelado: "bg-red-100 text-red-800",
      reagendado: "bg-yellow-100 text-yellow-800",
      realizado: "bg-green-100 text-green-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const eventosFiltrados = eventos.filter((evento) => {
    const matchBusca =
      !filtros.busca ||
      evento.titulo.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      evento.cliente.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      (evento.processo &&
        evento.processo.toLowerCase().includes(filtros.busca.toLowerCase()));

    const matchTipo = !filtros.tipo || evento.tipo === filtros.tipo;
    const matchStatus = !filtros.status || evento.status === filtros.status;
    const matchResponsavel =
      !filtros.responsavel || evento.responsavel === filtros.responsavel;

    return matchBusca && matchTipo && matchStatus && matchResponsavel;
  });

  const eventosHoje = eventos.filter((evento) => {
    const hoje = new Date().toDateString();
    const dataEvento = new Date(evento.data).toDateString();
    return dataEvento === hoje;
  });

  const proximosEventos = eventos
    .filter((evento) => new Date(evento.data) > new Date())
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Agenda Jurídica
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Gerencie compromissos, audiências e prazos processuais
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
            <Button
              variant={visualizacao === "calendario" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setVisualizacao("calendario")}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Calendário
            </Button>
            <Button
              variant={visualizacao === "lista" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setVisualizacao("lista")}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Lista
            </Button>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowFormulario(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Evento
          </Button>
        </div>
      </div>

      {/* Resumo do Dia */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Eventos Hoje
              </p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {eventosHoje.length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Audiências
              </p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {
                  eventos.filter(
                    (e) => e.tipo === "audiencia" && e.status === "agendado",
                  ).length
                }
              </p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Prazos Ativos
              </p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {
                  eventos.filter(
                    (e) => e.tipo === "prazo" && e.status === "agendado",
                  ).length
                }
              </p>
            </div>
            <Clock className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Área Principal */}
        <div className="lg:col-span-3">
          {visualizacao === "calendario" ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-slate-800 dark:text-slate-100">
                    Calendário
                  </h2>
                  {/* Filtros */}
                  <div className="flex gap-3">
                    <FormSelect
                      value={filtros.tipo}
                      onChange={(e) =>
                        setFiltros({ ...filtros, tipo: e.target.value })
                      }
                      className="w-40"
                    >
                      <option value="">Todos os Tipos</option>
                      <option value="audiencia">Audiências</option>
                      <option value="prazo">Prazos</option>
                      <option value="reuniao">Reuniões</option>
                      <option value="compromisso">Compromissos</option>
                    </FormSelect>
                    <FormSelect
                      value={filtros.responsavel}
                      onChange={(e) =>
                        setFiltros({ ...filtros, responsavel: e.target.value })
                      }
                      className="w-40"
                    >
                      <option value="">Todos os Responsáveis</option>
                      <option value="Dr. João Silva">Dr. João Silva</option>
                      <option value="Dra. Ana Costa">Dra. Ana Costa</option>
                      <option value="Dr. Rafael Santos">
                        Dr. Rafael Santos
                      </option>
                    </FormSelect>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <CalendarComponent />
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              {/* Filtros Lista */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <FormInput
                    type="text"
                    placeholder="Buscar eventos..."
                    value={filtros.busca}
                    onChange={(e) =>
                      setFiltros({ ...filtros, busca: e.target.value })
                    }
                  />
                  <FormSelect
                    value={filtros.tipo}
                    onChange={(e) =>
                      setFiltros({ ...filtros, tipo: e.target.value })
                    }
                  >
                    <option value="">Todos os Tipos</option>
                    <option value="audiencia">Audiências</option>
                    <option value="prazo">Prazos</option>
                    <option value="reuniao">Reuniões</option>
                    <option value="compromisso">Compromissos</option>
                  </FormSelect>
                  <FormSelect
                    value={filtros.status}
                    onChange={(e) =>
                      setFiltros({ ...filtros, status: e.target.value })
                    }
                  >
                    <option value="">Todos os Status</option>
                    <option value="agendado">Agendado</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="realizado">Realizado</option>
                    <option value="cancelado">Cancelado</option>
                  </FormSelect>
                  <Button
                    variant="outline-secondary"
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Limpar
                  </Button>
                </div>
              </div>

              {/* Lista de Eventos */}
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {eventosFiltrados.map((evento) => (
                  <div
                    key={evento.id}
                    className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Ícone e Tipo */}
                      <div
                        className={`p-3 rounded-lg border ${getTipoColor(evento.tipo)}`}
                      >
                        {getTipoIcon(evento.tipo)}
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-1">
                              {evento.titulo}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {formatarDataHora(evento.data)}
                                {evento.data_fim && (
                                  <span>
                                    {" "}
                                    - {formatarHora(evento.data_fim)}
                                  </span>
                                )}
                              </div>
                              {evento.local && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {evento.local}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <span className="text-slate-600 dark:text-slate-400">
                                Cliente:{" "}
                                <span className="font-medium">
                                  {evento.cliente}
                                </span>
                              </span>
                              {evento.processo && (
                                <span className="text-slate-600 dark:text-slate-400">
                                  Processo:{" "}
                                  <span className="font-medium">
                                    {evento.processo}
                                  </span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Status e Ações */}
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(evento.status)}`}
                            >
                              {evento.status.charAt(0).toUpperCase() +
                                evento.status.slice(1)}
                            </span>
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
                                    <Eye className="w-4 h-4" />
                                    Ver Detalhes
                                  </div>
                                </Menu.Item>
                                <Menu.Item>
                                  <div className="flex items-center gap-2">
                                    <Edit className="w-4 h-4" />
                                    Editar Evento
                                  </div>
                                </Menu.Item>
                                <Menu.Item>
                                  <div className="flex items-center gap-2">
                                    <Navigation className="w-4 h-4" />
                                    Como Chegar
                                  </div>
                                </Menu.Item>
                                <Menu.Item>
                                  <div className="flex items-center gap-2">
                                    <Bell className="w-4 h-4" />
                                    Notificar Participantes
                                  </div>
                                </Menu.Item>
                                <Menu.Item>
                                  <div className="flex items-center gap-2 text-red-600">
                                    <Trash className="w-4 h-4" />
                                    Cancelar Evento
                                  </div>
                                </Menu.Item>
                              </Menu.Items>
                            </Menu>
                          </div>
                        </div>

                        {/* Informações Adicionais */}
                        {(evento.observacoes || evento.participantes) && (
                          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                            {evento.participantes && (
                              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                                <Users className="w-4 h-4" />
                                <span>
                                  Participantes:{" "}
                                  {evento.participantes.join(", ")}
                                </span>
                              </div>
                            )}
                            {evento.observacoes && (
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {evento.observacoes}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {eventosFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
                    Nenhum evento encontrado
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Não há eventos que correspondam aos filtros selecionados.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Próximos Eventos */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-4">
              Próximos Eventos
            </h3>
            <div className="space-y-3">
              {proximosEventos.map((evento) => (
                <div
                  key={evento.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50"
                >
                  <div
                    className={`p-2 rounded ${getTipoColor(evento.tipo).replace("border-", "border ")}`}
                  >
                    {getTipoIcon(evento.tipo)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 dark:text-slate-100 text-sm truncate">
                      {evento.titulo}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatarDataHora(evento.data)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-4">
              Ações Rápidas
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline-primary"
                size="sm"
                className="w-full justify-start"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Audiência
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                className="w-full justify-start"
              >
                <Clock className="w-4 h-4 mr-2" />
                Definir Prazo
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                className="w-full justify-start"
              >
                <Users className="w-4 h-4 mr-2" />
                Marcar Reunião
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                className="w-full justify-start"
              >
                <Bell className="w-4 h-4 mr-2" />
                Criar Lembrete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slideover - Formulário Novo Evento */}
      <Slideover
        open={showFormulario}
        onClose={() => setShowFormulario(false)}
        size="lg"
      >
        <Slideover.Panel>
          <Slideover.Title className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-medium">Novo Evento</h2>
          </Slideover.Title>
          <div className="p-6">
            <p className="text-slate-600 dark:text-slate-400">
              Formulário para criação de novos eventos será implementado aqui.
            </p>
          </div>
        </Slideover.Panel>
      </Slideover>
    </div>
  );
};

export default AgendaView;
