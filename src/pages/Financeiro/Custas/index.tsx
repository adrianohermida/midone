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
import financeiroData from "@/data/financeiro.json";

function Main() {
  const [statusFilter, setStatusFilter] = useState("");
  const [responsavelFilter, setResponsavelFilter] = useState([]);

  const custas = financeiroData.custas;

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

  const getResponsavelColor = (responsavel: string) => {
    return responsavel === "Cliente" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning";
  };

  const totalCustas = custas.reduce((sum, c) => sum + c.valor, 0);
  const custasVencidas = custas.filter(c => c.status === "Vencido").length;
  const custas Pendentes = custas.filter(c => c.status === "Pendente").length;

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Custas Processuais</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Nova Custa
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
                Relatório de Custas
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="AlertTriangle" className="w-4 h-4 mr-2" />
                Custas Vencidas
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="DollarSign" className="w-4 h-4 mr-2" />
                Reembolsos
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro">Financeiro</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro/custas" active={true}>
          Custas Processuais
        </Breadcrumb.Link>
      </Breadcrumb>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide icon="Receipt" className="report-box__icon text-primary" />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-success cursor-pointer">
                    8%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                R$ {new Intl.NumberFormat('pt-BR').format(totalCustas)}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Total em Custas
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide icon="Clock" className="report-box__icon text-warning" />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-warning cursor-pointer">
                    5%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {custasPendentes}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Custas Pendentes
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide icon="AlertTriangle" className="report-box__icon text-danger" />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-danger cursor-pointer">
                    12%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {custasVencidas}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Custas Vencidas
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide icon="TrendingUp" className="report-box__icon text-success" />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-success cursor-pointer">
                    3%
                    <Lucide icon="ChevronDown" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                R$ {Math.round(totalCustas / custas.length)}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Valor Médio
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
                    Processo:
                  </label>
                  <FormInput
                    type="text"
                    className="mt-2 sm:mt-0"
                    placeholder="Número do processo..."
                  />
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Tipo:
                  </label>
                  <FormSelect className="mt-2 sm:mt-0">
                    <option value="">Todos os tipos</option>
                    <option value="Taxa Judiciária">Taxa Judiciária</option>
                    <option value="Perícia Técnica">Perícia Técnica</option>
                    <option value="Publicação Edital">Publicação Edital</option>
                    <option value="Diligência">Diligência</option>
                    <option value="Porte de Remessa">Porte de Remessa</option>
                  </FormSelect>
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Responsável:
                  </label>
                  <TomSelect
                    value={responsavelFilter}
                    onChange={setResponsavelFilter}
                    options={{
                      placeholder: "Todos",
                    }}
                    className="mt-2 sm:mt-0"
                    multiple
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Escritório">Escritório</option>
                  </TomSelect>
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Status:
                  </label>
                  <FormSelect 
                    className="mt-2 sm:mt-0"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Pago">Pago</option>
                    <option value="Vencido">Vencido</option>
                  </FormSelect>
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

      {/* Tabela de Custas */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 overflow-auto intro-y">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  PROCESSO / TIPO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  VALOR
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  RESPONSÁVEL
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  VENCIMENTO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  STATUS
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  OBSERVAÇÕES
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  AÇÕES
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {custas.map((custa, index) => (
                <Table.Tr key={index} className="intro-x">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div>
                      <div className="font-medium font-mono text-sm">
                        {custa.processo}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {custa.tipo}
                      </div>
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="font-medium text-lg">
                      R$ {new Intl.NumberFormat('pt-BR').format(custa.valor)}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className={clsx([
                      "px-2 py-1 rounded-full text-xs font-medium inline-block",
                      getResponsavelColor(custa.responsavel)
                    ])}>
                      {custa.responsavel}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-sm">
                      {new Date(custa.dataVencimento).toLocaleDateString('pt-BR')}
                    </div>
                    {custa.dataPagamento && (
                      <div className="text-slate-500 text-xs mt-1">
                        Pago: {new Date(custa.dataPagamento).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className={clsx([
                      "flex items-center justify-center font-medium",
                      getStatusColor(custa.status)
                    ])}>
                      <Lucide
                        icon={
                          custa.status === "Pago" ? "CheckSquare" :
                          custa.status === "Pendente" ? "Clock" : "AlertTriangle"
                        }
                        className="w-4 h-4 mr-2"
                      />
                      {custa.status}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-xs text-slate-600 max-w-xs">
                      {custa.observacoes}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="flex items-center justify-center">
                      <Tippy content="Ver detalhes" className="tooltip">
                        <a 
                          className="flex items-center mr-3 text-primary" 
                          href={`/financeiro/processo/${custa.id}`}
                        >
                          <Lucide icon="Eye" className="w-4 h-4" />
                        </a>
                      </Tippy>
                      <Menu>
                        <Menu.Button className="flex items-center text-slate-500">
                          <Lucide icon="MoreVertical" className="w-4 h-4" />
                        </Menu.Button>
                        <Menu.Items className="w-48">
                          <Menu.Item>
                            <Lucide icon="Edit" className="w-4 h-4 mr-2" />
                            Editar Custa
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="DollarSign" className="w-4 h-4 mr-2" />
                            Marcar como Pago
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="Receipt" className="w-4 h-4 mr-2" />
                            Gerar Comprovante
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="RefreshCw" className="w-4 h-4 mr-2" />
                            Solicitar Reembolso
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="Trash2" className="w-4 h-4 mr-2" />
                            Excluir
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

      {/* Aviso de Custas Vencidas */}
      {custasVencidas > 0 && (
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12 intro-y">
            <div className="alert alert-warning show flex items-center mb-2">
              <Lucide icon="AlertTriangle" className="w-6 h-6 mr-2" />
              <div>
                <strong>Atenção!</strong> Você possui {custasVencidas} custas vencidas que precisam de atenção.
                <Button variant="outline-warning" size="sm" className="ml-4">
                  Ver Custas Vencidas
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Main;