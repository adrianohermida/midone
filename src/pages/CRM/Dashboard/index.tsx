import _ from "lodash";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";
import Table from "@/components/Base/Table";
import Breadcrumb from "@/components/Base/Breadcrumb";
import ReportDonutChart from "@/components/ReportDonutChart";
import ReportLineChart from "@/components/ReportLineChart";
import SimpleLineChart4 from "@/components/SimpleLineChart4";
import crmData from "@/data/crm.json";

function Main() {
  const contatos = crmData.contatos;
  const negocios = crmData.negocios;
  const tickets = crmData.tickets;
  const metricas = crmData.metricas;

  const negociosRecentes = negocios.slice(0, 5);
  const ticketsAbertos = tickets.filter((t) => t.status === "Aberto");
  const clientesVIP = contatos.filter((c) => c.tags.includes("VIP"));

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Dashboard CRM Jurídico</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="FileDown" className="w-4 h-4 mr-2" />
            Relatório Executivo
          </Button>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="MoreVertical" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-48">
              <Menu.Item>
                <Lucide icon="Settings" className="w-4 h-4 mr-2" />
                Configurar Dashboard
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Target" className="w-4 h-4 mr-2" />
                Configurar Metas
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Bell" className="w-4 h-4 mr-2" />
                Alertas e Notificações
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Calendar" className="w-4 h-4 mr-2" />
                Agendar Relatórios
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/crm" active={true}>
          CRM Dashboard
        </Breadcrumb.Link>
      </Breadcrumb>

      {/* Cards de KPIs Principais */}
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
                    +{metricas.contatos.novosUltimoMes}
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {metricas.contatos.total}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Total de Contatos
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
                  className="report-box__icon text-success"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-success cursor-pointer">
                    R${" "}
                    {new Intl.NumberFormat("pt-BR").format(
                      metricas.negocios.ticketMedio,
                    )}
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                R${" "}
                {new Intl.NumberFormat("pt-BR").format(
                  metricas.negocios.totalPipeline,
                )}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Pipeline de Vendas
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
                  className="report-box__icon text-warning"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-success cursor-pointer">
                    {metricas.negocios.taxaConversao}%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {metricas.negocios.taxaConversao}%
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
                  icon="MessageSquare"
                  className="report-box__icon text-danger"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-warning cursor-pointer">
                    {metricas.suporte.ticketsAbertos}
                    <Lucide icon="AlertTriangle" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {metricas.suporte.satisfacaoCliente}%
              </div>
              <div className="text-base text-slate-500 mt-1">
                Satisfação Cliente
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos e Análises */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        {/* Funil de Vendas */}
        <div className="col-span-12 lg:col-span-8 mt-8">
          <div className="intro-y block sm:flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Funil de Vendas - Pipeline Corporativo
            </h2>
            <div className="sm:ml-auto mt-3 sm:mt-0">
              <Button variant="outline-secondary" size="sm">
                <Lucide icon="RefreshCw" className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
            </div>
          </div>
          <div className="intro-y box p-5 mt-12 sm:mt-5">
            <div className="mt-8">
              <ReportLineChart height={300} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-medium text-slate-600">15</div>
                <div className="text-slate-500 text-sm">Leads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-warning">8</div>
                <div className="text-slate-500 text-sm">Qualificação</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-primary">5</div>
                <div className="text-slate-500 text-sm">Proposta</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-success">3</div>
                <div className="text-slate-500 text-sm">Fechamento</div>
              </div>
            </div>
          </div>
        </div>

        {/* Distribuição de Clientes */}
        <div className="col-span-12 lg:col-span-4 mt-8">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Tipos de Cliente
            </h2>
          </div>
          <div className="intro-y box p-5 mt-5">
            <div className="mt-3">
              <ReportDonutChart height={213} />
            </div>
            <div className="w-52 sm:w-auto mx-auto mt-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <span className="truncate">Pessoa Jurídica</span>
                <span className="font-medium xl:ml-auto">45%</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                <span className="truncate">Pessoa Física</span>
                <span className="font-medium xl:ml-auto">35%</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                <span className="truncate">Leads</span>
                <span className="font-medium xl:ml-auto">20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seções de Gestão */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* Negócios em Destaque */}
        <div className="col-span-12 lg:col-span-8">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Negócios em Andamento
            </h2>
            <a href="/crm/negocios" className="ml-auto text-primary truncate">
              Ver Pipeline Completo
            </a>
          </div>
          <div className="intro-y box p-5 mt-5">
            <div className="overflow-x-auto">
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>NEGÓCIO</Table.Th>
                    <Table.Th className="text-center">VALOR</Table.Th>
                    <Table.Th className="text-center">ETAPA</Table.Th>
                    <Table.Th className="text-center">RESPONSÁVEL</Table.Th>
                    <Table.Th className="text-center">PROB.</Table.Th>
                    <Table.Th className="text-center">AÇÕES</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {negociosRecentes.map((negocio, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <div className="font-medium">{negocio.titulo}</div>
                        <div className="text-slate-500 text-sm">
                          {negocio.descricao}
                        </div>
                      </Table.Td>
                      <Table.Td className="text-center font-medium text-success">
                        R${" "}
                        {new Intl.NumberFormat("pt-BR").format(negocio.valor)}
                      </Table.Td>
                      <Table.Td className="text-center">
                        <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                          {negocio.etapa}
                        </span>
                      </Table.Td>
                      <Table.Td className="text-center text-sm">
                        {negocio.responsavel}
                      </Table.Td>
                      <Table.Td className="text-center font-medium">
                        {negocio.probabilidade}%
                      </Table.Td>
                      <Table.Td className="text-center">
                        <div className="flex items-center justify-center">
                          <a
                            className="flex items-center mr-3 text-primary"
                            href={`/crm/negocios/${negocio.id}`}
                          >
                            <Lucide icon="Eye" className="w-4 h-4" />
                          </a>
                          <a className="flex items-center text-success" href="">
                            <Lucide icon="Edit" className="w-4 h-4" />
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

        {/* Sidebar de Atividades */}
        <div className="col-span-12 lg:col-span-4">
          {/* Tickets de Suporte */}
          <div className="intro-y">
            <div className="box p-5">
              <div className="flex items-center">
                <h2 className="text-base font-medium">Tickets Urgentes</h2>
                <a href="/crm/suporte" className="ml-auto text-primary text-xs">
                  Ver Todos
                </a>
              </div>
              <div className="mt-5">
                {ticketsAbertos.slice(0, 3).map((ticket, index) => (
                  <div key={index} className="flex items-center mt-4">
                    <div className="w-8 h-8 bg-danger/10 rounded-full flex items-center justify-center mr-3">
                      <Lucide
                        icon="AlertTriangle"
                        className="w-4 h-4 text-danger"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        #{ticket.id} - {ticket.titulo}
                      </div>
                      <div className="text-slate-500 text-xs">
                        {
                          crmData.contatos.find(
                            (c) => c.id === ticket.contatoId,
                          )?.nome
                        }
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      {ticket.prioridade}
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline-secondary"
                  className="w-full mt-4"
                  onClick={() => (window.location.href = "/crm/suporte")}
                >
                  Gerenciar Suporte
                </Button>
              </div>
            </div>
          </div>

          {/* Clientes VIP */}
          <div className="intro-y box p-5 mt-6">
            <div className="flex items-center">
              <h2 className="text-base font-medium">Clientes VIP</h2>
              <a href="/crm/contatos" className="ml-auto text-primary text-xs">
                Ver Todos
              </a>
            </div>
            <div className="mt-5">
              {clientesVIP.slice(0, 4).map((cliente, index) => (
                <div key={index} className="flex items-center mt-4">
                  <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center mr-3">
                    <Lucide icon="Star" className="w-4 h-4 text-warning" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{cliente.nome}</div>
                    <div className="text-slate-500 text-xs">
                      {cliente.valorMedio &&
                        `R$ ${new Intl.NumberFormat("pt-BR").format(cliente.valorMedio)} médio`}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {Math.ceil(
                      (new Date().getTime() -
                        new Date(cliente.ultimoContato).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}
                    d
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance do Mês */}
          <div className="intro-y box p-5 mt-6">
            <div className="text-base font-medium">Performance do Mês</div>
            <div className="mt-4">
              <SimpleLineChart4 height={120} />
            </div>
            <div className="flex items-center mt-5">
              <div className="text-2xl font-medium">
                +{metricas.contatos.conversaoLeadCliente.toFixed(1)}%
              </div>
              <div className="ml-auto text-success font-medium text-xs bg-success/10 px-2 py-1 rounded">
                Conversão
              </div>
            </div>
            <div className="text-slate-500 mt-1">vs. mês anterior</div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12">
          <div className="intro-y box p-5">
            <div className="text-base font-medium pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
              Ações Rápidas do CRM
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
              <Button
                variant="outline-primary"
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => (window.location.href = "/crm/contatos")}
              >
                <Lucide icon="UserPlus" className="w-6 h-6 mb-2" />
                <span className="text-sm">Novo Contato</span>
              </Button>
              <Button
                variant="outline-primary"
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => (window.location.href = "/crm/negocios")}
              >
                <Lucide icon="Target" className="w-6 h-6 mb-2" />
                <span className="text-sm">Novo Negócio</span>
              </Button>
              <Button
                variant="outline-primary"
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => (window.location.href = "/crm/suporte")}
              >
                <Lucide icon="MessageSquare" className="w-6 h-6 mb-2" />
                <span className="text-sm">Abrir Ticket</span>
              </Button>
              <Button
                variant="outline-primary"
                className="h-20 flex flex-col items-center justify-center"
              >
                <Lucide icon="BarChart3" className="w-6 h-6 mb-2" />
                <span className="text-sm">Relatórios</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
