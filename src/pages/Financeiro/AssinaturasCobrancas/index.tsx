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
import Alert from "@/components/Base/Alert";
import financeiroData from "@/data/financeiro.json";

function Main() {
  const [statusFilter, setStatusFilter] = useState("");

  const assinaturas = financeiroData.assinaturas;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "text-success";
      case "Suspenso":
        return "text-warning";
      case "Cancelado":
        return "text-danger";
      default:
        return "text-slate-500";
    }
  };

  const totalAssinaturas = assinaturas.length;
  const assinaturasAtivas = assinaturas.filter(
    (a) => a.status === "Ativo",
  ).length;
  const receitaMensal = assinaturas.reduce(
    (sum, a) => (a.status === "Ativo" ? sum + a.valor : sum),
    0,
  );
  const receitaAnual = receitaMensal * 12;

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Assinaturas e Cobranças</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Nova Assinatura
          </Button>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Settings" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-48">
              <Menu.Item>
                <Lucide icon="CreditCard" className="w-4 h-4 mr-2" />
                Configurar Pagamentos
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Bell" className="w-4 h-4 mr-2" />
                Alertas de Vencimento
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                Gerar Contratos
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="BarChart3" className="w-4 h-4 mr-2" />
                Análise de Retenção
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro">Financeiro</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro/assinaturas" active={true}>
          Assinaturas
        </Breadcrumb.Link>
      </Breadcrumb>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="Users"
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
                {totalAssinaturas}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Total de Assinaturas
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="CheckCircle"
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
                {assinaturasAtivas}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Assinaturas Ativas
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
                  className="report-box__icon text-warning"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-warning cursor-pointer">
                    15%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                R$ {new Intl.NumberFormat("pt-BR").format(receitaMensal)}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Receita Mensal (MRR)
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
                  className="report-box__icon text-danger"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-success cursor-pointer">
                    22%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                R$ {new Intl.NumberFormat("pt-BR").format(receitaAnual)}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Receita Anual (ARR)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y">
          <Alert variant="warning" className="flex items-center">
            <Lucide icon="Clock" className="w-6 h-6 mr-2" />
            <div className="mr-auto">
              <strong>Vencimentos Próximos:</strong> 3 assinaturas vencem nos
              próximos 7 dias.
            </div>
            <Button variant="outline-warning" size="sm">
              Ver Detalhes
            </Button>
          </Alert>
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
                    Status:
                  </label>
                  <FormSelect
                    className="mt-2 sm:mt-0"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Suspenso">Suspenso</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Vencimento Próximo">
                      Vencimento Próximo
                    </option>
                  </FormSelect>
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Plano:
                  </label>
                  <FormSelect className="mt-2 sm:mt-0">
                    <option value="">Todos os planos</option>
                    <option value="Básico">Assessoria Básica</option>
                    <option value="Completo">Suporte Completo</option>
                    <option value="Premium">Premium</option>
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

      {/* Tabela de Assinaturas */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 overflow-auto intro-y">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  CLIENTE / PLANO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  VALOR MENSAL
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  PRÓXIMO VENCIMENTO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  DURAÇÃO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  STATUS
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  SERVIÇOS INCLUSOS
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  AÇÕES
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {assinaturas.map((assinatura, index) => (
                <Table.Tr key={index} className="intro-x">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div>
                      <div className="font-medium whitespace-nowrap">
                        {assinatura.cliente}
                      </div>
                      <div className="text-slate-500 text-sm mt-0.5">
                        {assinatura.plano}
                      </div>
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="font-medium text-success text-lg">
                      R${" "}
                      {new Intl.NumberFormat("pt-BR").format(assinatura.valor)}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {assinatura.periodicidade}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-sm">
                      {new Date(
                        assinatura.proximoVencimento,
                      ).toLocaleDateString("pt-BR")}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {Math.ceil(
                        (new Date(assinatura.proximoVencimento).getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      dias
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-sm">
                      {Math.floor(
                        (new Date().getTime() -
                          new Date(assinatura.inicioContrato).getTime()) /
                          (1000 * 60 * 60 * 24 * 30),
                      )}{" "}
                      meses
                    </div>
                    <div className="text-slate-500 text-xs">
                      Desde{" "}
                      {new Date(assinatura.inicioContrato).toLocaleDateString(
                        "pt-BR",
                      )}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                      className={clsx([
                        "flex items-center justify-center font-medium",
                        getStatusColor(assinatura.status),
                      ])}
                    >
                      <Lucide
                        icon={
                          assinatura.status === "Ativo"
                            ? "CheckCircle"
                            : assinatura.status === "Suspenso"
                              ? "Pause"
                              : "XCircle"
                        }
                        className="w-4 h-4 mr-2"
                      />
                      {assinatura.status}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="max-w-xs">
                      {assinatura.servicos.map((servico, i) => (
                        <span
                          key={i}
                          className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded mr-1 mb-1"
                        >
                          {servico}
                        </span>
                      ))}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="flex items-center justify-center">
                      <Tippy content="Ver detalhes" className="tooltip">
                        <a
                          className="flex items-center mr-3 text-primary"
                          href={`/financeiro/assinaturas/${assinatura.id}`}
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
                            Editar Assinatura
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide
                              icon="CreditCard"
                              className="w-4 h-4 mr-2"
                            />
                            Cobrar Agora
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                            Gerar Contrato
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="Pause" className="w-4 h-4 mr-2" />
                            Suspender
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="XCircle" className="w-4 h-4 mr-2" />
                            Cancelar
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

      {/* Planos Disponíveis */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12">
          <div className="intro-y box p-5">
            <div className="flex items-center pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
              <div className="text-base font-medium">
                Planos de Assessoria Jurídica Disponíveis
              </div>
              <Button variant="outline-primary" size="sm" className="ml-auto">
                <Lucide icon="Plus" className="w-4 h-4 mr-2" />
                Criar Novo Plano
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {[
                {
                  nome: "Assessoria Básica",
                  valor: 1500,
                  servicos: [
                    "Consultoria Mensal",
                    "Análise de Contratos",
                    "Suporte por Email",
                  ],
                  populares: false,
                },
                {
                  nome: "Suporte Completo",
                  valor: 2500,
                  servicos: [
                    "Consultoria Ilimitada",
                    "Representação Legal",
                    "Gestão de Contratos",
                    "Suporte Prioritário",
                  ],
                  populares: true,
                },
                {
                  nome: "Assessoria Premium",
                  valor: 4500,
                  servicos: [
                    "Todos os Serviços",
                    "Advogado Dedicado",
                    "Suporte 24/7",
                    "Relatórios Personalizados",
                  ],
                  populares: false,
                },
              ].map((plano, index) => (
                <div
                  key={index}
                  className={`relative border-2 rounded-lg p-6 ${
                    plano.populares
                      ? "border-primary bg-primary/5"
                      : "border-slate-200 dark:border-darkmode-400"
                  }`}
                >
                  {plano.populares && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-lg font-medium">{plano.nome}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">
                        R$ {new Intl.NumberFormat("pt-BR").format(plano.valor)}
                      </span>
                      <span className="text-slate-500">/mês</span>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm">
                      {plano.servicos.map((servico, i) => (
                        <li key={i} className="flex items-center">
                          <Lucide
                            icon="Check"
                            className="w-4 h-4 text-success mr-2"
                          />
                          {servico}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plano.populares ? "primary" : "outline-primary"}
                      className="w-full mt-6"
                    >
                      Escolher Plano
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
