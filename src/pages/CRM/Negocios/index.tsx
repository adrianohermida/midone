import _ from "lodash";
import clsx from "clsx";
import { useState } from "react";
import Button from "@/components/Base/Button";
import { FormInput, FormSelect } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Tippy from "@/components/Base/Tippy";
import { Menu } from "@/components/Base/Headless";
import Table from "@/components/Base/Table";
import Breadcrumb from "@/components/Base/Breadcrumb";
import TomSelect from "@/components/Base/TomSelect";
import crmData from "@/data/crm.json";

function Main() {
  const [viewMode, setViewMode] = useState("kanban");
  const [selectedPipeline, setSelectedPipeline] = useState("1");
  const [filterResponsavel, setFilterResponsavel] = useState([]);

  const negocios = crmData.negocios;
  const pipelines = crmData.pipelines;
  const metricas = crmData.metricas.negocios;

  const pipelineAtual = pipelines.find(
    (p) => p.id.toString() === selectedPipeline,
  );
  const negociosPipeline = negocios.filter(
    (n) => n.pipeline === pipelineAtual?.nome,
  );

  const getNegociosByEtapa = (etapa: string) => {
    return negociosPipeline.filter((n) => n.etapa === etapa);
  };

  const getTotalByEtapa = (etapa: string) => {
    return getNegociosByEtapa(etapa).reduce((sum, n) => sum + n.valor, 0);
  };

  const getProbabilidadeColor = (probabilidade: number) => {
    if (probabilidade >= 75) return "text-success";
    if (probabilidade >= 50) return "text-warning";
    if (probabilidade >= 25) return "text-primary";
    return "text-slate-500";
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Pipeline de Negócios</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Novo Negócio
          </Button>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Settings" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-48">
              <Menu.Item>
                <Lucide icon="BarChart3" className="w-4 h-4 mr-2" />
                Relatório de Vendas
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Target" className="w-4 h-4 mr-2" />
                Configurar Metas
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Workflow" className="w-4 h-4 mr-2" />
                Gerenciar Pipelines
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Download" className="w-4 h-4 mr-2" />
                Exportar Dados
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/crm/negocios" active={true}>
          CRM - Negócios
        </Breadcrumb.Link>
      </Breadcrumb>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="DollarSign"
                  className="report-box__icon text-primary"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-success cursor-pointer">
                    15%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                R${" "}
                {new Intl.NumberFormat("pt-BR").format(metricas.totalPipeline)}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Total no Pipeline
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="TrendingUp"
                  className="report-box__icon text-success"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-success cursor-pointer">
                    {metricas.taxaConversao}%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {metricas.taxaConversao}%
              </div>
              <div className="text-base text-slate-500 mt-1">
                Taxa de Conversão
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="Target"
                  className="report-box__icon text-warning"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-warning cursor-pointer">
                    {metricas.negociosAtivos}
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {metricas.negociosAtivos}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Negócios Ativos
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="Calendar"
                  className="report-box__icon text-danger"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-danger cursor-pointer">
                    {metricas.cicloVendas}d
                    <Lucide icon="ChevronDown" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {metricas.cicloVendas} dias
              </div>
              <div className="text-base text-slate-500 mt-1">
                Ciclo Médio de Vendas
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controles e Filtros */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y">
          <div className="box p-5">
            <div className="flex flex-col sm:flex-row sm:items-end xl:items-start">
              <div className="xl:flex sm:mr-auto">
                <div className="sm:flex items-center sm:mr-4">
                  <label className="w-16 flex-none xl:w-auto xl:flex-initial mr-2">
                    Pipeline:
                  </label>
                  <FormSelect
                    className="mt-2 sm:mt-0"
                    value={selectedPipeline}
                    onChange={(e) => setSelectedPipeline(e.target.value)}
                  >
                    {pipelines.map((pipeline) => (
                      <option key={pipeline.id} value={pipeline.id}>
                        {pipeline.nome}
                      </option>
                    ))}
                  </FormSelect>
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-16 flex-none xl:w-auto xl:flex-initial mr-2">
                    Responsável:
                  </label>
                  <TomSelect
                    value={filterResponsavel}
                    onChange={setFilterResponsavel}
                    options={{
                      placeholder: "Todos",
                    }}
                    className="mt-2 sm:mt-0"
                    multiple
                  >
                    <option value="Dr. João Silva">Dr. João Silva</option>
                    <option value="Dra. Ana Costa">Dra. Ana Costa</option>
                    <option value="Dr. Pedro Martins">Dr. Pedro Martins</option>
                  </TomSelect>
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-16 flex-none xl:w-auto xl:flex-initial mr-2">
                    Buscar:
                  </label>
                  <FormInput
                    type="text"
                    className="mt-2 sm:mt-0"
                    placeholder="Título do negócio..."
                  />
                </div>
              </div>
              <div className="flex mt-5 sm:mt-0">
                <Button
                  variant={
                    viewMode === "kanban" ? "primary" : "outline-secondary"
                  }
                  className="w-1/2 sm:w-auto mr-2"
                  onClick={() => setViewMode("kanban")}
                >
                  <Lucide icon="Columns" className="w-4 h-4 mr-2" />
                  Kanban
                </Button>
                <Button
                  variant={
                    viewMode === "list" ? "primary" : "outline-secondary"
                  }
                  className="w-1/2 sm:w-auto"
                  onClick={() => setViewMode("list")}
                >
                  <Lucide icon="List" className="w-4 h-4 mr-2" />
                  Lista
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualização Kanban */}
      {viewMode === "kanban" && pipelineAtual && (
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12 intro-y">
            <div className="box p-5">
              <div className="flex overflow-x-auto space-x-6 pb-4">
                {pipelineAtual.etapas.map((etapa, etapaIndex) => (
                  <div key={etapaIndex} className="flex-none w-80">
                    {/* Header da Coluna */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 dark:bg-darkmode-400 rounded-lg">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: etapa.cor }}
                        ></div>
                        <div>
                          <h3 className="font-medium">{etapa.nome}</h3>
                          <p className="text-xs text-slate-500">
                            {getNegociosByEtapa(etapa.nome).length} negócios
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">
                          R${" "}
                          {new Intl.NumberFormat("pt-BR").format(
                            getTotalByEtapa(etapa.nome),
                          )}
                        </div>
                        <div className="text-xs text-slate-500">
                          {etapa.probabilidade}% prob.
                        </div>
                      </div>
                    </div>

                    {/* Cards dos Negócios */}
                    <div className="space-y-3 min-h-[400px]">
                      {getNegociosByEtapa(etapa.nome).map(
                        (negocio, negocioIndex) => (
                          <div
                            key={negocioIndex}
                            className="bg-white dark:bg-darkmode-600 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-darkmode-400 cursor-move hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-medium text-sm line-clamp-2">
                                {negocio.titulo}
                              </h4>
                              <Menu>
                                <Menu.Button className="flex items-center text-slate-500 hover:text-slate-700">
                                  <Lucide
                                    icon="MoreVertical"
                                    className="w-4 h-4"
                                  />
                                </Menu.Button>
                                <Menu.Items className="w-40">
                                  <Menu.Item>
                                    <Lucide
                                      icon="Eye"
                                      className="w-4 h-4 mr-2"
                                    />
                                    Ver Detalhes
                                  </Menu.Item>
                                  <Menu.Item>
                                    <Lucide
                                      icon="Edit"
                                      className="w-4 h-4 mr-2"
                                    />
                                    Editar
                                  </Menu.Item>
                                  <Menu.Item>
                                    <Lucide
                                      icon="Trash2"
                                      className="w-4 h-4 mr-2"
                                    />
                                    Excluir
                                  </Menu.Item>
                                </Menu.Items>
                              </Menu>
                            </div>

                            <div className="text-lg font-bold text-success mb-2">
                              R${" "}
                              {new Intl.NumberFormat("pt-BR").format(
                                negocio.valor,
                              )}
                            </div>

                            <div className="flex items-center text-xs text-slate-500 mb-2">
                              <Lucide icon="User" className="w-3 h-3 mr-1" />
                              <span className="truncate">
                                {negocio.responsavel}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div
                                className={clsx([
                                  "text-xs font-medium",
                                  getProbabilidadeColor(negocio.probabilidade),
                                ])}
                              >
                                {negocio.probabilidade}% prob.
                              </div>
                              <div className="text-xs text-slate-500">
                                {Math.ceil(
                                  (new Date(
                                    negocio.dataEstimadaFechamento ||
                                      negocio.dataAbertura,
                                  ).getTime() -
                                    new Date().getTime()) /
                                    (1000 * 60 * 60 * 24),
                                )}{" "}
                                dias
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mt-2">
                              {negocio.tags.slice(0, 2).map((tag, i) => (
                                <span
                                  key={i}
                                  className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {negocio.contatoId && (
                              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-darkmode-400">
                                <div className="flex items-center text-xs">
                                  <Lucide
                                    icon="User"
                                    className="w-3 h-3 mr-1 text-slate-400"
                                  />
                                  <span className="text-slate-500 truncate">
                                    {crmData.contatos.find(
                                      (c) => c.id === negocio.contatoId,
                                    )?.nome || "Contato não encontrado"}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ),
                      )}

                      {/* Botão para adicionar negócio */}
                      <button className="w-full p-4 border-2 border-dashed border-slate-300 dark:border-darkmode-400 rounded-lg text-slate-500 hover:border-primary hover:text-primary transition-colors">
                        <Lucide icon="Plus" className="w-5 h-5 mx-auto mb-2" />
                        <span className="text-sm">Adicionar Negócio</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visualização Lista */}
      {viewMode === "list" && (
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12 overflow-auto intro-y">
            <Table className="border-spacing-y-[10px] border-separate -mt-2">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="border-b-0 whitespace-nowrap">
                    NEGÓCIO
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    VALOR
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    ETAPA
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    RESPONSÁVEL
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    FECHAMENTO ESTIMADO
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    PROBABILIDADE
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    AÇÕES
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {negocios.map((negocio, index) => (
                  <Table.Tr key={index} className="intro-x">
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div>
                        <div className="font-medium whitespace-nowrap">
                          {negocio.titulo}
                        </div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          {negocio.descricao}
                        </div>
                      </div>
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div className="font-medium text-success text-lg">
                        R${" "}
                        {new Intl.NumberFormat("pt-BR").format(negocio.valor)}
                      </div>
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div className="flex items-center justify-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{
                            backgroundColor:
                              pipelineAtual?.etapas.find(
                                (e) => e.nome === negocio.etapa,
                              )?.cor || "#6B7280",
                          }}
                        ></div>
                        <span className="text-sm">{negocio.etapa}</span>
                      </div>
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div className="text-sm">{negocio.responsavel}</div>
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div className="text-sm">
                        {negocio.dataEstimadaFechamento
                          ? new Date(
                              negocio.dataEstimadaFechamento,
                            ).toLocaleDateString("pt-BR")
                          : "-"}
                      </div>
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div
                        className={clsx([
                          "font-medium",
                          getProbabilidadeColor(negocio.probabilidade),
                        ])}
                      >
                        {negocio.probabilidade}%
                      </div>
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div className="flex items-center justify-center">
                        <Tippy content="Ver detalhes" className="tooltip">
                          <a
                            className="flex items-center mr-3 text-primary"
                            href={`/crm/negocios/${negocio.id}`}
                          >
                            <Lucide icon="Eye" className="w-4 h-4" />
                          </a>
                        </Tippy>
                        <Menu>
                          <Menu.Button className="flex items-center text-slate-500">
                            <Lucide icon="MoreVertical" className="w-4 h-4" />
                          </Menu.Button>
                          <Menu.Items className="w-40">
                            <Menu.Item>
                              <Lucide icon="Edit" className="w-4 h-4 mr-2" />
                              Editar
                            </Menu.Item>
                            <Menu.Item>
                              <Lucide
                                icon="ArrowRight"
                                className="w-4 h-4 mr-2"
                              />
                              Mover Etapa
                            </Menu.Item>
                            <Menu.Item>
                              <Lucide
                                icon="CheckCircle"
                                className="w-4 h-4 mr-2"
                              />
                              Marcar como Ganho
                            </Menu.Item>
                            <Menu.Item>
                              <Lucide icon="XCircle" className="w-4 h-4 mr-2" />
                              Marcar como Perdido
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
      )}
    </>
  );
}

export default Main;
