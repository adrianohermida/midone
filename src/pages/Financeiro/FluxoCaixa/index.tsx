import _ from "lodash";
import { useState } from "react";
import Button from "@/components/Base/Button";
import { FormSelect } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import { Menu, Tab } from "@/components/Base/Headless";
import Breadcrumb from "@/components/Base/Breadcrumb";
import ReportLineChart from "@/components/ReportLineChart";
import ReportBarChart from "@/components/ReportBarChart";
import SimpleLineChart1 from "@/components/SimpleLineChart1";
import SimpleLineChart2 from "@/components/SimpleLineChart2";
import Litepicker from "@/components/Base/Litepicker";
import financeiroData from "@/data/financeiro.json";

function Main() {
  const [dateFilter, setDateFilter] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  const fluxoCaixa = financeiroData.fluxoCaixa;
  const relatorios = financeiroData.relatorios;

  const totalEntrada = fluxoCaixa.reduce((sum, item) => sum + item.entrada, 0);
  const totalSaida = fluxoCaixa.reduce((sum, item) => sum + item.saida, 0);
  const saldoAtual = totalEntrada - totalSaida;
  const variacao = (((totalEntrada - totalSaida) / totalEntrada) * 100).toFixed(
    1,
  );

  const entradaPorTipo = _.groupBy(
    fluxoCaixa.map((item) => ({ tipo: item.tipo, valor: item.entrada })),
    "tipo",
  );

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Fluxo de Caixa</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="TrendingUp" className="w-4 h-4 mr-2" />
            Projeção
          </Button>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="FileDown" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                Relatório DRE
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="BarChart3" className="w-4 h-4 mr-2" />
                Análise Mensal
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="TrendingUp" className="w-4 h-4 mr-2" />
                Projeção Anual
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro">Financeiro</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro/fluxo-caixa" active={true}>
          Fluxo de Caixa
        </Breadcrumb.Link>
      </Breadcrumb>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-12 gap-6 mt-5">
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
                    {variacao}%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                R$ {new Intl.NumberFormat("pt-BR").format(totalEntrada)}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Total de Entradas
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="TrendingDown"
                  className="report-box__icon text-danger"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-danger cursor-pointer">
                    8%
                    <Lucide icon="ChevronDown" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                R$ {new Intl.NumberFormat("pt-BR").format(totalSaida)}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Total de Saídas
              </div>
            </div>
          </div>
        </div>

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
                R$ {new Intl.NumberFormat("pt-BR").format(saldoAtual)}
              </div>
              <div className="text-base text-slate-500 mt-1">Saldo Atual</div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="Percent"
                  className="report-box__icon text-warning"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-warning cursor-pointer">
                    3%
                    <Lucide icon="ChevronDown" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {(((totalEntrada - totalSaida) / totalEntrada) * 100).toFixed(
                  1,
                )}
                %
              </div>
              <div className="text-base text-slate-500 mt-1">
                Margem Líquida
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y">
          <div className="box p-5">
            <div className="flex flex-col sm:flex-row sm:items-end xl:items-start">
              <div className="xl:flex sm:mr-auto">
                <div className="sm:flex items-center sm:mr-4">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Período:
                  </label>
                  <FormSelect
                    className="mt-2 sm:mt-0"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    <option value="7d">Últimos 7 dias</option>
                    <option value="30d">Últimos 30 dias</option>
                    <option value="90d">Últimos 90 dias</option>
                    <option value="1y">Último ano</option>
                    <option value="custom">Período personalizado</option>
                  </FormSelect>
                </div>
                {selectedPeriod === "custom" && (
                  <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                    <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                      Data:
                    </label>
                    <Litepicker
                      value={dateFilter}
                      onChange={setDateFilter}
                      options={{
                        autoApply: false,
                        singleMode: false,
                        numberOfColumns: 2,
                        numberOfMonths: 2,
                        showWeekNumbers: true,
                        dropdowns: {
                          minYear: 2020,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                      }}
                      className="mt-2 sm:mt-0"
                    />
                  </div>
                )}
                <div className="mt-2 xl:mt-0">
                  <Button
                    variant="primary"
                    type="button"
                    className="w-full sm:w-20"
                  >
                    Atualizar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        {/* Gráfico Principal de Fluxo */}
        <div className="col-span-12 lg:col-span-8 mt-8">
          <div className="intro-y block sm:flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Evolução do Fluxo de Caixa
            </h2>
            <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
              <Lucide
                icon="Calendar"
                className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
              />
              <Litepicker
                value={dateFilter}
                onChange={setDateFilter}
                options={{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 2020,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
                className="sm:w-56 !box pl-10"
              />
            </div>
          </div>
          <div className="intro-y box p-5 mt-12 sm:mt-5">
            <Tab.Group>
              <Tab.List variant="pills" className="w-60 mx-auto">
                <Tab>
                  <Tab.Button className="w-full py-2">
                    Entradas vs Saídas
                  </Tab.Button>
                </Tab>
                <Tab>
                  <Tab.Button className="w-full py-2">
                    Saldo Acumulado
                  </Tab.Button>
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-5">
                <Tab.Panel>
                  <div className="mt-8">
                    <ReportLineChart height={400} />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="mt-8">
                    <SimpleLineChart1 height={400} />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>

        {/* Gráfico de Composição */}
        <div className="col-span-12 lg:col-span-4 mt-8">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Receita por Tipo
            </h2>
          </div>
          <div className="intro-y box p-5 mt-5">
            <div className="mt-3">
              <ReportBarChart height={300} />
            </div>
            <div className="w-52 sm:w-auto mx-auto mt-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <span className="truncate">Honorários</span>
                <span className="font-medium xl:ml-auto">R$ 89.200</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                <span className="truncate">Consultoria</span>
                <span className="font-medium xl:ml-auto">R$ 23.100</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                <span className="truncate">Custas</span>
                <span className="font-medium xl:ml-auto">R$ 13.100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Análise Detalhada */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 lg:col-span-6">
          <div className="intro-y box p-5">
            <div className="flex items-center pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
              <div className="text-base font-medium">Maiores Entradas</div>
            </div>
            <div className="mt-4">
              {fluxoCaixa.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center mt-4">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mr-3">
                    <Lucide
                      icon="TrendingUp"
                      className="w-4 h-4 text-success"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      {item.tipo} -{" "}
                      {new Date(item.data).toLocaleDateString("pt-BR")}
                    </div>
                    <div className="text-slate-500 text-xs">
                      Entrada: R${" "}
                      {new Intl.NumberFormat("pt-BR").format(item.entrada)}
                    </div>
                  </div>
                  <div className="text-success font-medium">
                    +R$ {new Intl.NumberFormat("pt-BR").format(item.entrada)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="intro-y box p-5">
            <div className="flex items-center pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
              <div className="text-base font-medium">Principais Saídas</div>
            </div>
            <div className="mt-4">
              {fluxoCaixa.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center mt-4">
                  <div className="w-8 h-8 bg-danger/10 rounded-full flex items-center justify-center mr-3">
                    <Lucide
                      icon="TrendingDown"
                      className="w-4 h-4 text-danger"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      Despesas Operacionais -{" "}
                      {new Date(item.data).toLocaleDateString("pt-BR")}
                    </div>
                    <div className="text-slate-500 text-xs">
                      Saída: R${" "}
                      {new Intl.NumberFormat("pt-BR").format(item.saida)}
                    </div>
                  </div>
                  <div className="text-danger font-medium">
                    -R$ {new Intl.NumberFormat("pt-BR").format(item.saida)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projeções */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12">
          <div className="intro-y box p-5">
            <div className="flex items-center pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
              <div className="text-base font-medium">
                Projeção para os Próximos 30 Dias
              </div>
              <Button variant="outline-primary" size="sm" className="ml-auto">
                <Lucide icon="Settings" className="w-4 h-4 mr-2" />
                Configurar Projeção
              </Button>
            </div>
            <div className="mt-5">
              <SimpleLineChart2 height={200} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-medium text-success">
                  R${" "}
                  {new Intl.NumberFormat("pt-BR").format(totalEntrada * 1.15)}
                </div>
                <div className="text-slate-500 text-sm">Receita Projetada</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-danger">
                  R$ {new Intl.NumberFormat("pt-BR").format(totalSaida * 1.08)}
                </div>
                <div className="text-slate-500 text-sm">
                  Despesas Projetadas
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-primary">
                  R${" "}
                  {new Intl.NumberFormat("pt-BR").format(
                    totalEntrada * 1.15 - totalSaida * 1.08,
                  )}
                </div>
                <div className="text-slate-500 text-sm">Saldo Projetado</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
