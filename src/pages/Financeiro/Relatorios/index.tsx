import _ from "lodash";
import { useState } from "react";
import Button from "@/components/Base/Button";
import { FormSelect } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import { Menu, Tab } from "@/components/Base/Headless";
import Breadcrumb from "@/components/Base/Breadcrumb";
import ReportDonutChart from "@/components/ReportDonutChart";
import ReportBarChart1 from "@/components/ReportBarChart1";
import ReportPieChart from "@/components/ReportPieChart";
import VerticalBarChart from "@/components/VerticalBarChart";
import Table from "@/components/Base/Table";
import financeiroData from "@/data/financeiro.json";

function Main() {
  const [selectedReport, setSelectedReport] = useState("receita");
  const [selectedPeriod, setSelectedPeriod] = useState("mensal");

  const relatorios = financeiroData.relatorios;

  const totalReceita = relatorios.receitaPorArea.reduce(
    (sum, area) => sum + area.valor,
    0,
  );
  const totalCasos = relatorios.receitaPorArea.reduce(
    (sum, area) => sum + area.casos,
    0,
  );
  const ticketMedio = totalReceita / totalCasos;

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Relatórios Jurídicos</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="FileDown" className="w-4 h-4 mr-2" />
            Exportar Tudo
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
                Dashboard Executivo
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="TrendingUp" className="w-4 h-4 mr-2" />
                Análise de Performance
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Users" className="w-4 h-4 mr-2" />
                Relatório por Advogado
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Calendar" className="w-4 h-4 mr-2" />
                Agendamento Automático
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro">Financeiro</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro/relatorios" active={true}>
          Relatórios
        </Breadcrumb.Link>
      </Breadcrumb>

      {/* Cards de KPIs */}
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
                    22%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                R$ {new Intl.NumberFormat("pt-BR").format(totalReceita)}
              </div>
              <div className="text-base text-slate-500 mt-1">Receita Total</div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="Scale"
                  className="report-box__icon text-success"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-success cursor-pointer">
                    18%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {totalCasos}
              </div>
              <div className="text-base text-slate-500 mt-1">Casos Ativos</div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="TrendingUp"
                  className="report-box__icon text-warning"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-warning cursor-pointer">
                    12%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                R$ {new Intl.NumberFormat("pt-BR").format(ticketMedio)}
              </div>
              <div className="text-base text-slate-500 mt-1">Ticket Médio</div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="AlertTriangle"
                  className="report-box__icon text-danger"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-danger cursor-pointer">
                    4.6%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {relatorios.inadimplencia[relatorios.inadimplencia.length - 1]
                  ?.percentual || 0}
                %
              </div>
              <div className="text-base text-slate-500 mt-1">
                Taxa de Inadimplência
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seletores de Relatório */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y">
          <div className="box p-5">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="sm:flex items-center sm:mr-4">
                <label className="w-20 flex-none xl:w-auto xl:flex-initial mr-2">
                  Relatório:
                </label>
                <FormSelect
                  className="mt-2 sm:mt-0"
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                >
                  <option value="receita">Receita por Área Jurídica</option>
                  <option value="inadimplencia">
                    Análise de Inadimplência
                  </option>
                  <option value="clientes">Top Clientes</option>
                  <option value="performance">Performance por Advogado</option>
                  <option value="temporal">Evolução Temporal</option>
                </FormSelect>
              </div>
              <div className="sm:flex items-center sm:mr-4 mt-2 sm:mt-0">
                <label className="w-20 flex-none xl:w-auto xl:flex-initial mr-2">
                  Período:
                </label>
                <FormSelect
                  className="mt-2 sm:mt-0"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="mensal">Últimos 12 meses</option>
                  <option value="trimestral">Últimos 4 trimestres</option>
                  <option value="anual">Últimos 3 anos</option>
                  <option value="ytd">Ano atual</option>
                </FormSelect>
              </div>
              <div className="mt-2 sm:mt-0 sm:ml-auto">
                <Button variant="primary" className="w-full sm:w-auto">
                  <Lucide icon="RefreshCw" className="w-4 h-4 mr-2" />
                  Atualizar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo dos Relatórios */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        {selectedReport === "receita" && (
          <>
            {/* Gráfico de Receita por Área */}
            <div className="col-span-12 lg:col-span-8">
              <div className="intro-y box p-5">
                <div className="flex items-center pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
                  <div className="text-base font-medium">
                    Receita por Área Jurídica
                  </div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="ml-auto"
                  >
                    <Lucide icon="Download" className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
                <div className="mt-8">
                  <ReportBarChart1 height={400} />
                </div>
              </div>
            </div>

            {/* Distribuição Percentual */}
            <div className="col-span-12 lg:col-span-4">
              <div className="intro-y box p-5">
                <div className="flex items-center pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
                  <div className="text-base font-medium">Distribuição</div>
                </div>
                <div className="mt-8">
                  <ReportDonutChart height={250} />
                </div>
                <div className="w-52 sm:w-auto mx-auto mt-8">
                  {relatorios.receitaPorArea.map((area, index) => (
                    <div key={index} className="flex items-center mt-4">
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${
                          index === 0
                            ? "bg-primary"
                            : index === 1
                              ? "bg-pending"
                              : index === 2
                                ? "bg-warning"
                                : index === 3
                                  ? "bg-danger"
                                  : "bg-success"
                        }`}
                      ></div>
                      <span className="truncate">{area.area}</span>
                      <span className="font-medium xl:ml-auto">
                        {area.percentual}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabela Detalhada */}
            <div className="col-span-12">
              <div className="intro-y box p-5">
                <div className="flex items-center pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
                  <div className="text-base font-medium">
                    Detalhamento por Área Jurídica
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table className="mt-5">
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>ÁREA JURÍDICA</Table.Th>
                        <Table.Th className="text-center">RECEITA</Table.Th>
                        <Table.Th className="text-center">% DO TOTAL</Table.Th>
                        <Table.Th className="text-center">CASOS</Table.Th>
                        <Table.Th className="text-center">
                          TICKET MÉDIO
                        </Table.Th>
                        <Table.Th className="text-center">CRESCIMENTO</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {relatorios.receitaPorArea.map((area, index) => (
                        <Table.Tr key={index}>
                          <Table.Td>
                            <div className="flex items-center">
                              <div
                                className={`w-3 h-3 rounded-full mr-3 ${
                                  index === 0
                                    ? "bg-primary"
                                    : index === 1
                                      ? "bg-pending"
                                      : index === 2
                                        ? "bg-warning"
                                        : index === 3
                                          ? "bg-danger"
                                          : "bg-success"
                                }`}
                              ></div>
                              <div className="font-medium">{area.area}</div>
                            </div>
                          </Table.Td>
                          <Table.Td className="text-center font-medium">
                            R${" "}
                            {new Intl.NumberFormat("pt-BR").format(area.valor)}
                          </Table.Td>
                          <Table.Td className="text-center">
                            <div className="flex items-center justify-center">
                              <div className="w-full bg-slate-200 rounded-full h-2 mr-3">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${area.percentual}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">
                                {area.percentual}%
                              </span>
                            </div>
                          </Table.Td>
                          <Table.Td className="text-center">
                            {area.casos}
                          </Table.Td>
                          <Table.Td className="text-center">
                            R${" "}
                            {new Intl.NumberFormat("pt-BR").format(
                              area.valor / area.casos,
                            )}
                          </Table.Td>
                          <Table.Td className="text-center">
                            <div
                              className={`flex items-center justify-center ${
                                Math.random() > 0.5
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              <Lucide
                                icon={
                                  Math.random() > 0.5
                                    ? "TrendingUp"
                                    : "TrendingDown"
                                }
                                className="w-4 h-4 mr-1"
                              />
                              {(Math.random() * 20 + 5).toFixed(1)}%
                            </div>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedReport === "inadimplencia" && (
          <>
            {/* Gráfico de Inadimplência */}
            <div className="col-span-12 lg:col-span-8">
              <div className="intro-y box p-5">
                <div className="flex items-center pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
                  <div className="text-base font-medium">
                    Evolução da Inadimplência
                  </div>
                </div>
                <div className="mt-8">
                  <VerticalBarChart height={400} />
                </div>
              </div>
            </div>

            {/* Métricas de Inadimplência */}
            <div className="col-span-12 lg:col-span-4">
              <div className="intro-y box p-5">
                <div className="flex items-center pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
                  <div className="text-base font-medium">Métricas</div>
                </div>
                <div className="mt-8 space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-medium text-danger">
                      {relatorios.inadimplencia[
                        relatorios.inadimplencia.length - 1
                      ]?.percentual || 0}
                      %
                    </div>
                    <div className="text-slate-500 text-sm">Taxa Atual</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-medium">
                      R${" "}
                      {new Intl.NumberFormat("pt-BR").format(
                        relatorios.inadimplencia[
                          relatorios.inadimplencia.length - 1
                        ]?.vencido || 0,
                      )}
                    </div>
                    <div className="text-slate-500 text-sm">Valor Vencido</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-medium text-warning">
                      +2.3%
                    </div>
                    <div className="text-slate-500 text-sm">
                      vs. Mês Anterior
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedReport === "clientes" && (
          <div className="col-span-12">
            <div className="intro-y box p-5">
              <div className="flex items-center pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <div className="text-base font-medium">
                  Top Clientes por Receita
                </div>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="ml-auto"
                >
                  <Lucide icon="Users" className="w-4 h-4 mr-2" />
                  Ver Todos os Clientes
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table className="mt-5">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>POSIÇÃO</Table.Th>
                      <Table.Th>CLIENTE</Table.Th>
                      <Table.Th className="text-center">RECEITA TOTAL</Table.Th>
                      <Table.Th className="text-center">PROCESSOS</Table.Th>
                      <Table.Th className="text-center">
                        ÚLTIMO PAGAMENTO
                      </Table.Th>
                      <Table.Th className="text-center">STATUS</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {relatorios.topClientes.map((cliente, index) => (
                      <Table.Tr key={index}>
                        <Table.Td>
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full font-medium">
                            {index + 1}
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <div className="font-medium">{cliente.cliente}</div>
                        </Table.Td>
                        <Table.Td className="text-center font-medium text-success">
                          R${" "}
                          {new Intl.NumberFormat("pt-BR").format(cliente.valor)}
                        </Table.Td>
                        <Table.Td className="text-center">
                          {cliente.processos}
                        </Table.Td>
                        <Table.Td className="text-center">
                          {new Date(cliente.ultimoPagamento).toLocaleDateString(
                            "pt-BR",
                          )}
                        </Table.Td>
                        <Table.Td className="text-center">
                          <div className="flex items-center justify-center text-success">
                            <Lucide
                              icon="CheckCircle"
                              className="w-4 h-4 mr-2"
                            />
                            Ativo
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Main;
