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
import Litepicker from "@/components/Base/Litepicker";
import financeiroData from "@/data/financeiro.json";

function Main() {
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState([]);

  const honorarios = financeiroData.honorarios;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "text-success";
      case "Pendente":
        return "text-warning";
      case "Vencido":
        return "text-danger";
      default:
        return "text-slate-500";
    }
  };

  const getUrgenciaIcon = (urgencia: string) => {
    switch (urgencia) {
      case "urgente":
        return <Lucide icon="AlertTriangle" className="w-4 h-4 text-danger" />;
      case "alta":
        return <Lucide icon="Clock" className="w-4 h-4 text-warning" />;
      default:
        return <Lucide icon="CheckCircle" className="w-4 h-4 text-success" />;
    }
  };

  const totalHonorarios = honorarios.reduce((sum, h) => sum + h.valor, 0);
  const honorariosPendentes = honorarios.filter(
    (h) => h.status === "Pendente",
  ).length;
  const horasTotais = honorarios.reduce((sum, h) => sum + h.horas, 0);

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Honorários e Contratos</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Novo Honorário
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
                Exportar Excel
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                Exportar PDF
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Send" className="w-4 h-4 mr-2" />
                Enviar Relatório
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro">Financeiro</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro/honorarios" active={true}>
          Honorários
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
                    12%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                R$ {new Intl.NumberFormat("pt-BR").format(totalHonorarios)}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Total em Honorários
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
                  <div className="report-box__indicator bg-danger cursor-pointer">
                    3%
                    <Lucide icon="ChevronDown" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {honorariosPendentes}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Contratos Pendentes
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="Timer"
                  className="report-box__icon text-success"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-success cursor-pointer">
                    8%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {horasTotais}h
              </div>
              <div className="text-base text-slate-500 mt-1">
                Horas Faturadas
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
                  className="report-box__icon text-pending"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-success cursor-pointer">
                    15%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                R$ {Math.round(totalHonorarios / horasTotais)}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Valor Médio/Hora
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
              <form className="xl:flex sm:mr-auto">
                <div className="sm:flex items-center sm:mr-4">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Cliente:
                  </label>
                  <FormInput
                    type="text"
                    className="mt-2 sm:mt-0"
                    placeholder="Buscar cliente..."
                  />
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Área:
                  </label>
                  <TomSelect
                    value={areaFilter}
                    onChange={setAreaFilter}
                    options={{
                      placeholder: "Todas as áreas",
                    }}
                    className="mt-2 sm:mt-0"
                    multiple
                  >
                    <option value="Trabalhista">Trabalhista</option>
                    <option value="Civil">Civil</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Empresarial">Empresarial</option>
                    <option value="Tributário">Tributário</option>
                  </TomSelect>
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Status:
                  </label>
                  <FormSelect className="mt-2 sm:mt-0">
                    <option value="">Todos</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Pago">Pago</option>
                    <option value="Vencido">Vencido</option>
                  </FormSelect>
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Período:
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
                <div className="mt-2 xl:mt-0">
                  <Button
                    variant="primary"
                    type="button"
                    className="w-full sm:w-16"
                  >
                    Filtrar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Honorários */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 overflow-auto intro-y">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  CLIENTE / PROCESSO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  ÁREA / SERVIÇO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  ADVOGADO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  VALOR / HORAS
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  STATUS
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  VENCIMENTO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  AÇÕES
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {honorarios.map((honorario, index) => (
                <Table.Tr key={index} className="intro-x">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="flex items-center">
                      <div className="mr-3">
                        {getUrgenciaIcon(honorario.urgencia)}
                      </div>
                      <div>
                        <div className="font-medium whitespace-nowrap">
                          {honorario.cliente}
                        </div>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5 font-mono">
                          {honorario.processo !== "Consultoria"
                            ? honorario.processo
                            : "Consultoria Jurídica"}
                        </div>
                      </div>
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                      className={clsx([
                        "px-2 py-1 rounded-full text-xs font-medium inline-block",
                        {
                          "bg-primary/10 text-primary":
                            honorario.tipo === "Civil",
                        },
                        {
                          "bg-warning/10 text-warning":
                            honorario.tipo === "Trabalhista",
                        },
                        {
                          "bg-danger/10 text-danger":
                            honorario.tipo === "Criminal",
                        },
                        {
                          "bg-success/10 text-success":
                            honorario.tipo === "Empresarial",
                        },
                      ])}
                    >
                      {honorario.tipo}
                    </div>
                    <div className="text-slate-500 text-xs mt-1">
                      {honorario.servico}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="font-medium text-sm">
                      {honorario.advogado}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {honorario.oab}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="font-medium text-success">
                      R${" "}
                      {new Intl.NumberFormat("pt-BR").format(honorario.valor)}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {honorario.horas}h × R$ {honorario.valorHora}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                      className={clsx([
                        "flex items-center justify-center font-medium",
                        getStatusColor(honorario.status),
                      ])}
                    >
                      <Lucide
                        icon={
                          honorario.status === "Pago"
                            ? "CheckSquare"
                            : honorario.status === "Pendente"
                              ? "Clock"
                              : "AlertCircle"
                        }
                        className="w-4 h-4 mr-2"
                      />
                      {honorario.status}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-sm">
                      {new Date(honorario.vencimento).toLocaleDateString(
                        "pt-BR",
                      )}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {Math.ceil(
                        (new Date(honorario.vencimento).getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      dias
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="flex items-center justify-center">
                      <a
                        className="flex items-center mr-3 text-primary"
                        href={`/financeiro/processo/${honorario.id}`}
                      >
                        <Lucide icon="Eye" className="w-4 h-4 mr-1" />
                        Ver
                      </a>
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
                            <Lucide icon="Send" className="w-4 h-4 mr-2" />
                            Enviar Fatura
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide
                              icon="CreditCard"
                              className="w-4 h-4 mr-2"
                            />
                            Gerar Boleto
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide
                              icon="DollarSign"
                              className="w-4 h-4 mr-2"
                            />
                            Registrar Pagamento
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
    </>
  );
}

export default Main;
