import React, { useState, useEffect } from "react";
import {
  Bell,
  FileText,
  Search,
  Filter,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import Button from "../../components/Base/Button";
import { FormInput, FormSelect } from "../../components/Base/Form";
import Table from "../../components/Base/Table";
import Tippy from "../../components/Base/Tippy";
import juridicoData from "../../data/juridico.json";

interface Publicacao {
  id: string;
  processo: string;
  cliente: string;
  data: string;
  tipo: string;
  assunto: string;
  conteudo: string;
  fonte: string;
  status: string;
  urgencia: string;
  prazo?: string;
  responsavel: string;
}

const PublicacoesView: React.FC = () => {
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [filtros, setFiltros] = useState({
    status: "",
    tipo: "",
    urgencia: "",
    fonte: "",
    busca: "",
    dataInicio: "",
    dataFim: "",
  });
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    setPublicacoes(juridicoData.publicacoes);
  }, []);

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatarDataPrazo = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const getStatusColor = (status: string) => {
    const colors = {
      lida: "bg-green-100 text-green-800",
      nao_lida: "bg-red-100 text-red-800",
      visualizada: "bg-blue-100 text-blue-800",
      arquivada: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status: string) => {
    const texts = {
      lida: "Lida",
      nao_lida: "Não Lida",
      visualizada: "Visualizada",
      arquivada: "Arquivada",
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
      Intimação: <Bell className="w-4 h-4 text-blue-500" />,
      Despacho: <FileText className="w-4 h-4 text-green-500" />,
      Citação: <AlertTriangle className="w-4 h-4 text-red-500" />,
      Sentença: <CheckCircle className="w-4 h-4 text-purple-500" />,
      Decisão: <ExternalLink className="w-4 h-4 text-orange-500" />,
    };
    return (
      icons[tipo as keyof typeof icons] || (
        <FileText className="w-4 h-4 text-gray-500" />
      )
    );
  };

  const publicacoesFiltradas = publicacoes.filter((pub) => {
    const matchBusca =
      !filtros.busca ||
      pub.processo.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      pub.cliente.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      pub.assunto.toLowerCase().includes(filtros.busca.toLowerCase());

    const matchStatus = !filtros.status || pub.status === filtros.status;
    const matchTipo = !filtros.tipo || pub.tipo === filtros.tipo;
    const matchUrgencia =
      !filtros.urgencia || pub.urgencia === filtros.urgencia;
    const matchFonte = !filtros.fonte || pub.fonte === filtros.fonte;

    return (
      matchBusca && matchStatus && matchTipo && matchUrgencia && matchFonte
    );
  });

  const handleAtualizarPublicacoes = async () => {
    setAtualizando(true);
    // Simular chamada à API
    setTimeout(() => {
      setAtualizando(false);
      // Aqui seria feita a integração com a API Advise
    }, 2000);
  };

  const marcarComoLida = (id: string) => {
    setPublicacoes((prev) =>
      prev.map((pub) => (pub.id === id ? { ...pub, status: "lida" } : pub)),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Publicações Judiciais
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Acompanhe todas as publicações dos tribunais em tempo real
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline-secondary"
            onClick={handleAtualizarPublicacoes}
            disabled={atualizando}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`w-4 h-4 ${atualizando ? "animate-spin" : ""}`}
            />
            {atualizando ? "Atualizando..." : "Atualizar"}
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Não Lidas
              </p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {publicacoes.filter((p) => p.status === "nao_lida").length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Urgência Alta
              </p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {publicacoes.filter((p) => p.urgencia === "alta").length}
              </p>
            </div>
            <Bell className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Hoje</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {
                  publicacoes.filter((p) => p.data.startsWith("2024-02-10"))
                    .length
                }
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Total
              </p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
                {publicacoes.length}
              </p>
            </div>
            <FileText className="w-8 h-8 text-slate-500" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          <div className="xl:col-span-2">
            <FormInput
              type="text"
              placeholder="Buscar por processo, cliente ou assunto..."
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
            <option value="nao_lida">Não Lidas</option>
            <option value="lida">Lidas</option>
            <option value="visualizada">Visualizadas</option>
            <option value="arquivada">Arquivadas</option>
          </FormSelect>
          <FormSelect
            value={filtros.tipo}
            onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
          >
            <option value="">Todos os Tipos</option>
            <option value="Intimação">Intimação</option>
            <option value="Despacho">Despacho</option>
            <option value="Citação">Citação</option>
            <option value="Sentença">Sentença</option>
            <option value="Decisão">Decisão</option>
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
          <FormSelect
            value={filtros.fonte}
            onChange={(e) => setFiltros({ ...filtros, fonte: e.target.value })}
          >
            <option value="">Todas as Fontes</option>
            <option value="DJE-TRT3">DJE-TRT3</option>
            <option value="DJE-TJSP">DJE-TJSP</option>
            <option value="DJE-TRT2">DJE-TRT2</option>
            <option value="DOU">DOU</option>
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

      {/* Lista de Publicações */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <Table className="text-sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="w-12"></Table.Th>
                <Table.Th>Data/Hora</Table.Th>
                <Table.Th>Processo</Table.Th>
                <Table.Th>Tipo</Table.Th>
                <Table.Th>Assunto</Table.Th>
                <Table.Th>Fonte</Table.Th>
                <Table.Th>Urgência</Table.Th>
                <Table.Th>Prazo</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Responsável</Table.Th>
                <Table.Th className="text-center">Ações</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {publicacoesFiltradas.map((publicacao) => (
                <Table.Tr
                  key={publicacao.id}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer ${
                    publicacao.status === "nao_lida"
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : ""
                  }`}
                  onClick={() => marcarComoLida(publicacao.id)}
                >
                  <Table.Td>
                    <div className="flex justify-center">
                      {getTipoIcon(publicacao.tipo)}
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <div className="font-medium text-slate-800 dark:text-slate-100">
                      {formatarData(publicacao.data)}
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-100">
                        {publicacao.processo}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {publicacao.cliente}
                      </p>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded text-xs font-medium">
                      {publicacao.tipo}
                    </span>
                  </Table.Td>
                  <Table.Td>
                    <div className="max-w-xs">
                      <p className="font-medium text-slate-800 dark:text-slate-100 truncate">
                        {publicacao.assunto}
                      </p>
                      <Tippy content={publicacao.conteudo}>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate cursor-help">
                          {publicacao.conteudo}
                        </p>
                      </Tippy>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      {publicacao.fonte}
                    </span>
                  </Table.Td>
                  <Table.Td>
                    <div
                      className={`flex items-center gap-1 ${getUrgenciaColor(publicacao.urgencia)}`}
                    >
                      {getUrgenciaIcon(publicacao.urgencia)}
                      <span className="text-xs font-medium capitalize">
                        {publicacao.urgencia}
                      </span>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    {publicacao.prazo ? (
                      <div className="text-sm">
                        <p className="font-medium">
                          {formatarDataPrazo(publicacao.prazo)}
                        </p>
                        <p className="text-xs text-slate-500">
                          {Math.ceil(
                            (new Date(publicacao.prazo).getTime() -
                              new Date().getTime()) /
                              (1000 * 60 * 60 * 24),
                          )}{" "}
                          dias
                        </p>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs">-</span>
                    )}
                  </Table.Td>
                  <Table.Td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(publicacao.status)}`}
                    >
                      {getStatusText(publicacao.status)}
                    </span>
                  </Table.Td>
                  <Table.Td>
                    <p className="text-sm font-medium">
                      {publicacao.responsavel}
                    </p>
                  </Table.Td>
                  <Table.Td>
                    <div className="flex items-center justify-center gap-2">
                      <Tippy content="Visualizar Detalhes">
                        <Button variant="outline-secondary" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Tippy>
                      <Tippy content="Baixar PDF">
                        <Button variant="outline-secondary" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </Tippy>
                      <Tippy content="Abrir no Tribunal">
                        <Button variant="outline-secondary" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Tippy>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>

        {publicacoesFiltradas.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-2">
              Nenhuma publicação encontrada
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {filtros.busca ||
              filtros.status ||
              filtros.tipo ||
              filtros.urgencia ||
              filtros.fonte
                ? "Tente ajustar os filtros para encontrar publicações."
                : "Não há publicações disponíveis no momento."}
            </p>
          </div>
        )}
      </div>

      {/* Resumo Rodapé */}
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p>
            Exibindo {publicacoesFiltradas.length} de {publicacoes.length}{" "}
            publicações
          </p>
          <p>Última atualização: {formatarData(new Date().toISOString())}</p>
        </div>
      </div>
    </div>
  );
};

export default PublicacoesView;
