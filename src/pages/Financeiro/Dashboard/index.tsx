import _ from "lodash";
import clsx from "clsx";
import fakerData from "@/utils/faker";
import Button from "@/components/Base/Button";
import Pagination from "@/components/Base/Pagination";
import { FormInput, FormSelect } from "@/components/Base/Form";
import Alert from "@/components/Base/Alert";
import Lucide from "@/components/Base/Lucide";
import Tippy from "@/components/Base/Tippy";
import ReportBarChart1 from "@/components/ReportBarChart1";
import ReportDonutChart2 from "@/components/ReportDonutChart2";
import SimpleLineChart3 from "@/components/SimpleLineChart3";
import SimpleLineChart4 from "@/components/SimpleLineChart4";
import { Menu, Tab } from "@/components/Base/Headless";
import Table from "@/components/Base/Table";
import Breadcrumb from "@/components/Base/Breadcrumb";

function Main() {
  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Dashboard Financeiro</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="FileDown" className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
          <Menu className="ml-auto sm:ml-0">
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="Receipt" className="w-4 h-4 mr-2" />
                Nova Fatura
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="CreditCard" className="w-4 h-4 mr-2" />
                Recebimento
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                Nota Fiscal
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro" active={true}>
          Financeiro
        </Breadcrumb.Link>
      </Breadcrumb>

      <div className="relative">
        <div className="grid grid-cols-12 gap-6">
          <div className="z-20 col-span-12 xl:col-span-9 2xl:col-span-9">
            <div className="mt-6 -mb-6 intro-y">
              <Alert
                variant="success"
                dismissible
                className="flex items-center mb-6 box dark:border-darkmode-600"
              >
                {({ dismiss }) => (
                  <>
                    <span>
                      Sistema Financeiro Jurídico do Lawdesk CRM.
                      <strong className="ml-1">Módulo Beta</strong> - Gerencie
                      honorários, custas e faturamento jurídico.
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="py-0.5 px-2 -my-3 ml-2"
                        onClick={() =>
                          window.open("/financeiro/faturamento", "_blank")
                        }
                      >
                        Ver Faturas
                      </Button>
                    </span>
                    <Alert.DismissButton
                      className="text-success-700"
                      onClick={dismiss}
                    />
                  </>
                )}
              </Alert>
            </div>

            {/* Cards de Estatísticas */}
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
                        <Tippy
                          content="Receita total do mês"
                          className="tooltip"
                        >
                          <div className="report-box__indicator bg-success cursor-pointer">
                            33%
                            <Lucide
                              icon="ChevronUp"
                              className="w-4 h-4 ml-0.5"
                            />
                          </div>
                        </Tippy>
                      </div>
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      R$ 125.400,00
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Receita Mensal
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="Receipt"
                        className="report-box__icon text-pending"
                      />
                      <div className="ml-auto">
                        <Tippy
                          content="Faturas emitidas este mês"
                          className="tooltip"
                        >
                          <div className="report-box__indicator bg-danger cursor-pointer">
                            2%
                            <Lucide
                              icon="ChevronDown"
                              className="w-4 h-4 ml-0.5"
                            />
                          </div>
                        </Tippy>
                      </div>
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      42
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Faturas Emitidas
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="Clock"
                        className="report-box__icon text-warning"
                      />
                      <div className="ml-auto">
                        <Tippy
                          content="Contas a receber em atraso"
                          className="tooltip"
                        >
                          <div className="report-box__indicator bg-success cursor-pointer">
                            12%
                            <Lucide
                              icon="ChevronUp"
                              className="w-4 h-4 ml-0.5"
                            />
                          </div>
                        </Tippy>
                      </div>
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      R$ 8.200,00
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Contas em Atraso
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="Users"
                        className="report-box__icon text-success"
                      />
                      <div className="ml-auto">
                        <Tippy
                          content="Clientes ativos no mês"
                          className="tooltip"
                        >
                          <div className="report-box__indicator bg-success cursor-pointer">
                            22%
                            <Lucide
                              icon="ChevronUp"
                              className="w-4 h-4 ml-0.5"
                            />
                          </div>
                        </Tippy>
                      </div>
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      152
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Clientes Ativos
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-12 gap-6 mt-5">
              {/* Gráfico de Receita */}
              <div className="col-span-12 lg:col-span-6 mt-8">
                <div className="intro-y block sm:flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">
                    Receita por Área Jurídica
                  </h2>
                  <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
                    <Lucide
                      icon="Calendar"
                      className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
                    />
                    <FormInput
                      type="text"
                      className="sm:w-56 box pl-10"
                      placeholder="Selecionar período"
                    />
                  </div>
                </div>
                <div className="intro-y box p-5 mt-12 sm:mt-5">
                  <Tab.Group>
                    <Tab.List variant="pills" className="w-60 mx-auto">
                      <Tab>
                        <Tab.Button className="w-full py-2">Mensal</Tab.Button>
                      </Tab>
                      <Tab>
                        <Tab.Button className="w-full py-2">Anual</Tab.Button>
                      </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-5">
                      <Tab.Panel>
                        <div className="mt-8">
                          <ReportBarChart1 height={213} />
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="mt-8">
                          <SimpleLineChart3 height={213} />
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>

              {/* Distribuição de Receita */}
              <div className="col-span-12 lg:col-span-6 mt-8">
                <div className="intro-y flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">
                    Distribuição por Tipo de Serviço
                  </h2>
                </div>
                <div className="intro-y box p-5 mt-5">
                  <div className="mt-3">
                    <ReportDonutChart2 height={213} />
                  </div>
                  <div className="w-52 sm:w-auto mx-auto mt-8">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="truncate">Honorários Advocatícios</span>
                      <span className="font-medium xl:ml-auto">R$ 89.200</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                      <span className="truncate">Custas Processuais</span>
                      <span className="font-medium xl:ml-auto">R$ 23.100</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                      <span className="truncate">Serviços Extras</span>
                      <span className="font-medium xl:ml-auto">R$ 13.100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transações Recentes */}
            <div className="col-span-12 mt-8">
              <div className="intro-y flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Transações Recentes
                </h2>
                <a
                  href="/financeiro/transacoes"
                  className="ml-auto text-primary truncate"
                >
                  Ver Todas
                </a>
              </div>
              <div className="intro-y box p-5 mt-5">
                <div className="flex flex-col sm:flex-row sm:items-end xl:items-start">
                  <form
                    id="tabulator-html-filter-form"
                    className="xl:flex sm:mr-auto"
                  >
                    <div className="sm:flex items-center sm:mr-4">
                      <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                        Cliente:
                      </label>
                      <FormInput
                        id="tabulator-html-filter-field"
                        type="text"
                        className="mt-2 sm:mt-0"
                        placeholder="Buscar cliente..."
                      />
                    </div>
                    <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                      <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                        Tipo:
                      </label>
                      <FormSelect
                        id="tabulator-html-filter-type"
                        className="mt-2 sm:mt-0"
                      >
                        <option value="">Todos</option>
                        <option value="Honorário">Honorário</option>
                        <option value="Custa">Custa</option>
                        <option value="Despesa">Despesa</option>
                      </FormSelect>
                    </div>
                    <div className="mt-2 xl:mt-0">
                      <Button
                        id="tabulator-html-filter-go"
                        variant="primary"
                        type="button"
                        className="w-full sm:w-16"
                      >
                        Filtrar
                      </Button>
                    </div>
                  </form>
                  <div className="flex mt-5 sm:mt-0">
                    <Button
                      id="tabulator-print"
                      variant="outline-secondary"
                      className="w-1/2 sm:w-auto mr-2"
                    >
                      <Lucide icon="Printer" className="w-4 h-4 mr-2" />
                      Imprimir
                    </Button>
                    <Menu className="w-1/2 sm:w-auto">
                      <Menu.Button
                        as={Button}
                        variant="outline-secondary"
                        className="w-full sm:w-auto"
                      >
                        <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                        Exportar
                        <Lucide
                          icon="ChevronDown"
                          className="w-4 h-4 ml-auto sm:ml-2"
                        />
                      </Menu.Button>
                      <Menu.Items className="w-40">
                        <Menu.Item>
                          <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                          Exportar CSV
                        </Menu.Item>
                        <Menu.Item>
                          <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                          Exportar Excel
                        </Menu.Item>
                        <Menu.Item>
                          <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                          Exportar PDF
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>
                </div>
                <div className="overflow-x-auto scrollbar-hidden">
                  <Table className="mt-5 table-report -mb-6">
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th className="whitespace-nowrap">
                          CLIENTE
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap">TIPO</Table.Th>
                        <Table.Th className="text-center whitespace-nowrap">
                          VALOR
                        </Table.Th>
                        <Table.Th className="text-center whitespace-nowrap">
                          STATUS
                        </Table.Th>
                        <Table.Th className="text-center whitespace-nowrap">
                          DATA
                        </Table.Th>
                        <Table.Th className="text-center whitespace-nowrap">
                          AÇÕES
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {_.take(fakerData, 10).map((faker, fakerKey) => (
                        <Table.Tr key={fakerKey} className="intro-x">
                          <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                            <a
                              href=""
                              className="font-medium whitespace-nowrap"
                            >
                              {faker.users[0].name}
                            </a>
                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                              {faker.users[0].email}
                            </div>
                          </Table.Td>
                          <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                            <span className="text-slate-500 text-xs">
                              {
                                ["Honorário", "Custa", "Despesa"][
                                  Math.floor(Math.random() * 3)
                                ]
                              }
                            </span>
                          </Table.Td>
                          <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                            <span className="font-medium text-success">
                              +R${" "}
                              {new Intl.NumberFormat("pt-BR").format(
                                faker.totals,
                              )}
                            </span>
                          </Table.Td>
                          <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                            <div
                              className={clsx([
                                "flex items-center justify-center",
                                { "text-success": faker.trueFalse[0] },
                                { "text-danger": !faker.trueFalse[0] },
                              ])}
                            >
                              <Lucide
                                icon="CheckSquare"
                                className="w-4 h-4 mr-2"
                              />
                              {faker.trueFalse[0] ? "Pago" : "Pendente"}
                            </div>
                          </Table.Td>
                          <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                            {faker.formattedTimes[0]}
                          </Table.Td>
                          <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                            <div className="flex items-center justify-center">
                              <a className="flex items-center mr-3" href="">
                                <Lucide
                                  icon="CheckSquare"
                                  className="w-4 h-4 mr-1"
                                />
                                Editar
                              </a>
                              <a
                                className="flex items-center text-danger"
                                href=""
                              >
                                <Lucide
                                  icon="Trash2"
                                  className="w-4 h-4 mr-1"
                                />
                                Excluir
                              </a>
                            </div>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Direita */}
          <div className="col-span-12 xl:col-span-3 2xl:col-span-3">
            {/* Ações Rápidas */}
            <div className="intro-y">
              <div className="box p-5">
                <div className="text-base font-medium">Ações Rápidas</div>
                <div className="mt-5">
                  <Button
                    variant="primary"
                    className="w-full mb-3"
                    onClick={() =>
                      (window.location.href = "/financeiro/honorarios")
                    }
                  >
                    <Lucide icon="Scale" className="w-4 h-4 mr-2" />
                    Honorários
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="w-full mb-3"
                    onClick={() =>
                      (window.location.href = "/financeiro/custas")
                    }
                  >
                    <Lucide icon="Receipt" className="w-4 h-4 mr-2" />
                    Custas Processuais
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="w-full mb-3"
                    onClick={() =>
                      (window.location.href = "/financeiro/fluxo-caixa")
                    }
                  >
                    <Lucide icon="TrendingUp" className="w-4 h-4 mr-2" />
                    Fluxo de Caixa
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="w-full"
                    onClick={() =>
                      (window.location.href = "/financeiro/relatorios")
                    }
                  >
                    <Lucide icon="BarChart3" className="w-4 h-4 mr-2" />
                    Relatórios
                  </Button>
                </div>
              </div>
            </div>

            {/* Resumo de Vendas */}
            <div className="intro-y box p-5 mt-6">
              <div className="text-base font-medium">Resumo do Mês</div>
              <div className="mt-4">
                <SimpleLineChart4 height={158} />
              </div>
              <div className="flex items-center mt-5">
                <div className="text-2xl font-medium">R$ 125.400</div>
                <div className="ml-auto text-success font-medium text-xs bg-success/10 px-2 py-1 rounded">
                  +12.5%
                </div>
              </div>
              <div className="text-slate-500 mt-1">
                Comparado ao mês anterior
              </div>
            </div>

            {/* Clientes Devedores */}
            <div className="intro-y box p-5 mt-6">
              <div className="text-base font-medium">Clientes em Atraso</div>
              <div className="mt-4">
                {_.take(fakerData, 5).map((faker, fakerKey) => (
                  <div key={fakerKey} className="flex items-center mt-4">
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Lawdesk CRM"
                        className="rounded-full"
                        src={faker.photos[0]}
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-xs">
                        {faker.users[0].name}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        R$ {new Intl.NumberFormat("pt-BR").format(faker.totals)}
                      </div>
                    </div>
                    <div className="text-danger text-xs">
                      {Math.floor(Math.random() * 30) + 1} dias
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline-secondary"
                  className="w-full mt-4"
                  onClick={() =>
                    (window.location.href = "/financeiro/transacoes")
                  }
                >
                  Ver Todos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
