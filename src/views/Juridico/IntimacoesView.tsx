import React, { useState, useEffect } from "react";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Calendar,
  User,
  MapPin,
  Search,
  Filter,
  Eye,
  Download,
  CheckSquare,
  XCircle,
  MoreHorizontal,
} from "lucide-react";
import Button from "../../components/Base/Button";
import { FormInput, FormSelect } from "../../components/Base/Form";
import Table from "../../components/Base/Table";
import { Disclosure, Menu } from "../../components/Base/Headless";
import Tippy from "../../components/Base/Tippy";
import juridicoData from "../../data/juridico.json";

interface Intimacao {
  id: string;
  processo: string;
  cliente: string;
  numero_intimacao: string;
  data_recebimento: string;
  tipo: string;
  assunto: string;
  conteudo: string;
  prazo_cumprimento: string;
  status: string;
  urgencia: string;
  responsavel: string;
  origem: string;
  meio_intimacao: string;
  acao_necessaria: string;
  observacoes: string;
}

const IntimacoesView: React.FC = () => {
  const [intimacoes, setIntimacoes] = useState<Intimacao[]>([]);
  const [filtros, setFiltros] = useState({
    status: "",
    tipo: "",
    urgencia: "",
    responsavel: "",
    busca: "",
    dataInicio: "",
    dataFim: "",
  });
  const [intimacaoSelecionada, setIntimacaoSelecionada] =
    useState<Intimacao | null>(null);

  useEffect(() => {
    setIntimacoes(juridicoData.intimacoes);
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

  const calcularDiasRestantes = (prazo: string) => {
    const hoje = new Date();
    const dataPrazo = new Date(prazo);
    const diferenca = Math.ceil(
      (dataPrazo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diferenca;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pendente: "bg-yellow-100 text-yellow-800",
      cumprida: "bg-green-100 text-green-800",
      vencida: "bg-red-100 text-red-800",
      em_andamento: "bg-blue-100 text-blue-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status: string) => {
    const texts = {
      pendente: "Pendente",
      cumprida: "Cumprida",
      vencida: "Vencida",
      em_andamento: "Em Andamento",
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getUrgenciaColor = (urgencia: string) => {
    const colors = {
      alta: "text-red-500",
      media: "text-yellow-500",
      baixa: "text-green-500",
    };
    return colors[urgencia as keyof typeof colors] || "text-gray-500";
  };

  const getUrgenciaIcon = (urgencia: string) => {
    if (urgencia === "alta") return <AlertTriangle className="w-4 h-4" />;
    if (urgencia === "media") return <Clock className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const getTipoIcon = (tipo: string) => {
    const icons = {
      Audiência: <Calendar className="w-4 h-4 text-blue-500" />,
      Prazo: <Clock className="w-4 h-4 text-orange-500" />,
      Decisão: <FileText className="w-4 h-4 text-purple-500" />,
      Citação: <Bell className="w-4 h-4 text-red-500" />,
    };
    return (
      icons[tipo as keyof typeof icons] || (
        <FileText className="w-4 h-4 text-gray-500" />
      )
    );
  };

  const getPrazoClass = (prazo: string, status: string) => {
    if (status === "cumprida") return "text-green-600";
    if (status === "vencida") return "text-red-600";

    const dias = calcularDiasRestantes(prazo);
    if (dias <= 0) return "text-red-600 font-bold";
    if (dias <= 3) return "text-red-500 font-medium";
    if (dias <= 7) return "text-yellow-600";
    return "text-slate-600";
  };

  const intimacoesFiltradas = intimacoes.filter((intimacao) => {
    const matchBusca =
      !filtros.busca ||
      intimacao.processo.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      intimacao.cliente.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      intimacao.assunto.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      intimacao.numero_intimacao
        .toLowerCase()
        .includes(filtros.busca.toLowerCase());

    const matchStatus = !filtros.status || intimacao.status === filtros.status;
    const matchTipo = !filtros.tipo || intimacao.tipo === filtros.tipo;
    const matchUrgencia =
      !filtros.urgencia || intimacao.urgencia === filtros.urgencia;
    const matchResponsavel =
      !filtros.responsavel || intimacao.responsavel === filtros.responsavel;

    return (
      matchBusca &&
      matchStatus &&
      matchTipo &&
      matchUrgencia &&
      matchResponsavel
    );
  });

  const marcarComoCumprida = (id: string) => {
    setIntimacoes((prev) =>
      prev.map((int) => (int.id === id ? { ...int, status: "cumprida" } : int)),
    );
  };

  const marcarComoAndamento = (id: string) => {
    setIntimacoes((prev) =>
      prev.map((int) =>
        int.id === id ? { ...int, status: "em_andamento" } : int,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Central de Intimações
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Gerencie todas as intimações recebidas e controle os prazos
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline-secondary"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar Relatório
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Verificar Novas
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Pendentes
              </p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {intimacoes.filter((i) => i.status === "pendente").length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Urgência Alta
              </p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {intimacoes.filter((i) => i.urgencia === "alta").length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Cumpridas
              </p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {intimacoes.filter((i) => i.status === "cumprida").length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Vencendo Hoje
              </p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {
                  intimacoes.filter((i) => {
                    const dias = calcularDiasRestantes(i.prazo_cumprimento);
                    return dias === 0 && i.status === "pendente";
                  }).length
                }
              </p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="xl:col-span-2">
            <FormInput
              type="text"
              placeholder="Buscar por processo, cliente ou número..."
              value={filtros.busca}
              onChange={(e) =>
                setFiltros({ ...filtros, busca: e.target.value })
              }
            />
          </div>
          <FormSelect
            value={filtros.status}
            onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
          >
            <option value="">Todos os Status</option>
            <option value="pendente">Pendentes</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="cumprida">Cumpridas</option>
            <option value="vencida">Vencidas</option>
          </FormSelect>
          <FormSelect
            value={filtros.tipo}
            onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
          >
            <option value="">Todos os Tipos</option>
            <option value="Audiência">Audiência</option>
            <option value="Prazo">Prazo</option>
            <option value="Decisão">Decisão</option>
            <option value="Citação">Citação</option>
          </FormSelect>
          <FormSelect
            value={filtros.urgencia}
            onChange={(e) =>
              setFiltros({ ...filtros, urgencia: e.target.value })
            }
          >
            <option value="">Todas as Urgências</option>
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
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

      {/* Lista de Intimações - Accordion */}
      <div className="space-y-3">
        {intimacoesFiltradas.map((intimacao) => (
          <Disclosure key={intimacao.id}>
            {({ open }) => (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                <Disclosure.Button className="w-full px-6 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Ícone do Tipo */}
                      <div className="flex-shrink-0">
                        {getTipoIcon(intimacao.tipo)}
                      </div>

                      {/* Informações Principais */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-medium text-slate-800 dark:text-slate-100 truncate">
                            {intimacao.assunto}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(intimacao.status)}`}
                          >
                            {getStatusText(intimacao.status)}
                          </span>
                          <div
                            className={`flex items-center gap-1 ${getUrgenciaColor(intimacao.urgencia)}`}
                          >
                            {getUrgenciaIcon(intimacao.urgencia)}
                            <span className="text-xs font-medium capitalize">
                              {intimacao.urgencia}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                          <span>{intimacao.processo}</span>
                          <span>{intimacao.cliente}</span>
                          <span>
                            Recebida: {formatarData(intimacao.data_recebimento)}
                          </span>
                        </div>
                      </div>

                      {/* Prazo */}
                      <div className="flex-shrink-0 text-right">
                        <p
                          className={`text-sm font-medium ${getPrazoClass(intimacao.prazo_cumprimento, intimacao.status)}`}
                        >
                          {formatarData(intimacao.prazo_cumprimento)}
                        </p>
                        <p className="text-xs text-slate-500">
                          {intimacao.status === "cumprida"
                            ? "Cumprida"
                            : intimacao.status === "vencida"
                              ? "Vencida"
                              : `${calcularDiasRestantes(intimacao.prazo_cumprimento)} dias`}
                        </p>
                      </div>

                      {/* Seta */}
                      <div className="flex-shrink-0">
                        <svg
                          className={`w-5 h-5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Disclosure.Button>

                <Disclosure.Panel className="px-6 pb-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="pt-4 space-y-4">
                    {/* Conteúdo da Intimação */}
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                      <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                        Conteúdo da Intimação
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {intimacao.conteudo}
                      </p>
                    </div>

                    {/* Detalhes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                          Informações Gerais
                        </h5>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="text-slate-500">Número:</span>{" "}
                            {intimacao.numero_intimacao}
                          </p>
                          <p>
                            <span className="text-slate-500">Tipo:</span>{" "}
                            {intimacao.tipo}
                          </p>
                          <p>
                            <span className="text-slate-500">Meio:</span>{" "}
                            {intimacao.meio_intimacao}
                          </p>
                          <p>
                            <span className="text-slate-500">Origem:</span>{" "}
                            {intimacao.origem}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                          Ação Necessária
                        </h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {intimacao.acao_necessaria}
                        </p>
                      </div>

                      <div>
                        <h5 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                          Responsável
                        </h5>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">
                            {intimacao.responsavel}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Observações */}
                    {intimacao.observacoes && (
                      <div>
                        <h5 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                          Observações
                        </h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {intimacao.observacoes}
                        </p>
                      </div>
                    )}

                    {/* Ações */}
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200 dark:border-slate-600">
                      {intimacao.status === "pendente" && (
                        <>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => marcarComoAndamento(intimacao.id)}
                            className="flex items-center gap-2"
                          >
                            <Clock className="w-4 h-4" />
                            Marcar em Andamento
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => marcarComoCumprida(intimacao.id)}
                            className="flex items-center gap-2"
                          >
                            <CheckSquare className="w-4 h-4" />
                            Marcar como Cumprida
                          </Button>
                        </>
                      )}

                      {intimacao.status === "em_andamento" && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => marcarComoCumprida(intimacao.id)}
                          className="flex items-center gap-2"
                        >
                          <CheckSquare className="w-4 h-4" />
                          Finalizar Cumprimento
                        </Button>
                      )}

                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Ver Processo
                      </Button>

                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Baixar PDF
                      </Button>

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
                              <Calendar className="w-4 h-4" />
                              Agendar Lembrete
                            </div>
                          </Menu.Item>
                          <Menu.Item>
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Gerar Petição
                            </div>
                          </Menu.Item>
                          <Menu.Item>
                            <div className="flex items-center gap-2 text-red-600">
                              <XCircle className="w-4 h-4" />
                              Marcar como Vencida
                            </div>
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </div>
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>

      {intimacoesFiltradas.length === 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
          <Bell className="w-16 h-16 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
            Nenhuma intimação encontrada
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            {filtros.busca ||
            filtros.status ||
            filtros.tipo ||
            filtros.urgencia ||
            filtros.responsavel
              ? "Tente ajustar os filtros para encontrar intimações."
              : "Não há intimações disponíveis no momento."}
          </p>
        </div>
      )}

      {/* Resumo Rodapé */}
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p>
            Exibindo {intimacoesFiltradas.length} de {intimacoes.length}{" "}
            intimações
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Urgência Alta
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              Vencendo
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Cumpridas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntimacoesView;
