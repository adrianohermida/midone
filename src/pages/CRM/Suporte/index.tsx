import _ from "lodash";
import clsx from "clsx";
import { useState } from "react";
import Button from "@/components/Base/Button";
import { FormInput, FormSelect, FormTextarea } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Tippy from "@/components/Base/Tippy";
import { Menu, Tab } from "@/components/Base/Headless";
import Table from "@/components/Base/Table";
import Breadcrumb from "@/components/Base/Breadcrumb";
import TomSelect from "@/components/Base/TomSelect";
import Alert from "@/components/Base/Alert";
import crmData from "@/data/crm.json";

function Main() {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPrioridade, setFilterPrioridade] = useState([]);
  const [filterResponsavel, setFilterResponsavel] = useState([]);

  const tickets = crmData.tickets;
  const metricas = crmData.metricas.suporte;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aberto":
        return "text-danger";
      case "Aguardando Cliente":
        return "text-warning";
      case "Resolvido":
        return "text-success";
      case "Em Andamento":
        return "text-primary";
      default:
        return "text-slate-500";
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Alta":
        return "bg-danger/10 text-danger";
      case "Média":
        return "bg-warning/10 text-warning";
      case "Baixa":
        return "bg-success/10 text-success";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getCanalIcon = (canal: string) => {
    switch (canal) {
      case "Email":
        return "Mail";
      case "WhatsApp":
        return "MessageCircle";
      case "Portal do Cliente":
        return "Globe";
      case "Telefone":
        return "Phone";
      default:
        return "MessageSquare";
    }
  };

  const ticketsAbertos = tickets.filter((t) => t.status === "Aberto");
  const ticketsVencendo = tickets.filter(
    (t) =>
      new Date(t.prazoSLA) < new Date(Date.now() + 2 * 60 * 60 * 1000) &&
      t.status !== "Resolvido",
  );

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Central de Suporte</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Novo Ticket
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
                Relatório SLA
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="MessageSquare" className="w-4 h-4 mr-2" />
                Respostas Rápidas
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Users" className="w-4 h-4 mr-2" />
                Gerenciar Equipe
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Bell" className="w-4 h-4 mr-2" />
                Configurar Alertas
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/crm/suporte" active={true}>
          CRM - Suporte
        </Breadcrumb.Link>
      </Breadcrumb>

      {/* Alertas de SLA */}
      {ticketsVencendo.length > 0 && (
        <div className="mt-5 intro-y">
          <Alert variant="warning" className="flex items-center">
            <Lucide icon="Clock" className="w-6 h-6 mr-2" />
            <div className="mr-auto">
              <strong>Atenção!</strong> {ticketsVencendo.length} tickets
              próximos do vencimento do SLA.
            </div>
            <Button variant="outline-warning" size="sm">
              Ver Tickets
            </Button>
          </Alert>
        </div>
      )}

      {/* Cards de Resumo */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="MessageSquare"
                  className="report-box__icon text-danger"
                />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-danger cursor-pointer">
                    {metricas.ticketsAbertos}
                    <Lucide icon="AlertTriangle" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {metricas.ticketsAbertos}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Tickets Abertos
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
                    +15
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {metricas.ticketsResolvidos}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Tickets Resolvidos
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
                  <div className="report-box__indicator bg-success cursor-pointer">
                    -30min
                    <Lucide icon="ChevronDown" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {metricas.tempoMedioResposta}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Tempo Médio Resposta
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide icon="Star" className="report-box__icon text-primary" />
                <div className="ml-auto">
                  <div className="report-box__indicator bg-success cursor-pointer">
                    +2.1%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {metricas.satisfacaoCliente}%
              </div>
              <div className="text-base text-slate-500 mt-1">
                Satisfação do Cliente
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
                    Buscar:
                  </label>
                  <FormInput
                    type="text"
                    className="mt-2 sm:mt-0"
                    placeholder="Título, cliente, #ticket..."
                  />
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Status:
                  </label>
                  <FormSelect
                    className="mt-2 sm:mt-0"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="Aberto">Aberto</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Aguardando Cliente">
                      Aguardando Cliente
                    </option>
                    <option value="Resolvido">Resolvido</option>
                  </FormSelect>
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Prioridade:
                  </label>
                  <TomSelect
                    value={filterPrioridade}
                    onChange={setFilterPrioridade}
                    options={{
                      placeholder: "Todas",
                    }}
                    className="mt-2 sm:mt-0"
                    multiple
                  >
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </TomSelect>
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
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
                    <option value="Recepção">Recepção</option>
                  </TomSelect>
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

      {/* Lista de Tickets */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 overflow-auto intro-y">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  TICKET / CLIENTE
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  PRIORIDADE
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  CATEGORIA
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  STATUS
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  RESPONSÁVEL
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  SLA / ABERTURA
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  CANAL
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  AÇÕES
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {tickets.map((ticket, index) => (
                <Table.Tr key={index} className="intro-x">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">#{ticket.id}</span>
                        <span className="font-medium">{ticket.titulo}</span>
                      </div>
                      <div className="text-slate-500 text-xs mt-1">
                        {crmData.contatos.find((c) => c.id === ticket.contatoId)
                          ?.nome || "Cliente não encontrado"}
                      </div>
                      <div className="text-slate-400 text-xs mt-1 line-clamp-1">
                        {ticket.descricao}
                      </div>
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                      className={clsx([
                        "px-2 py-1 rounded-full text-xs font-medium inline-flex items-center",
                        getPrioridadeColor(ticket.prioridade),
                      ])}
                    >
                      <Lucide
                        icon={
                          ticket.prioridade === "Alta"
                            ? "AlertTriangle"
                            : ticket.prioridade === "Média"
                              ? "Minus"
                              : "CheckCircle"
                        }
                        className="w-3 h-3 mr-1"
                      />
                      {ticket.prioridade}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-sm">{ticket.categoria}</div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                      className={clsx([
                        "flex items-center justify-center font-medium",
                        getStatusColor(ticket.status),
                      ])}
                    >
                      <Lucide
                        icon={
                          ticket.status === "Aberto"
                            ? "AlertCircle"
                            : ticket.status === "Em Andamento"
                              ? "Clock"
                              : ticket.status === "Aguardando Cliente"
                                ? "MessageCircle"
                                : "CheckCircle"
                        }
                        className="w-4 h-4 mr-2"
                      />
                      {ticket.status}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-sm">{ticket.responsavel}</div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-sm">
                      <div
                        className={clsx([
                          "font-medium",
                          new Date(ticket.prazoSLA) < new Date()
                            ? "text-danger"
                            : new Date(ticket.prazoSLA) <
                                new Date(Date.now() + 2 * 60 * 60 * 1000)
                              ? "text-warning"
                              : "text-success",
                        ])}
                      >
                        {new Date(ticket.prazoSLA).toLocaleDateString("pt-BR")}{" "}
                        {new Date(ticket.prazoSLA).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="text-slate-500 text-xs">
                        Aberto:{" "}
                        {new Date(ticket.abertura).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="flex items-center justify-center">
                      <Lucide
                        icon={getCanalIcon(ticket.canal) as any}
                        className="w-4 h-4 mr-2 text-slate-500"
                      />
                      <span className="text-sm">{ticket.canal}</span>
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="flex items-center justify-center">
                      <Tippy content="Ver conversa" className="tooltip">
                        <a
                          className="flex items-center mr-3 text-primary"
                          href={`/crm/suporte/${ticket.id}`}
                        >
                          <Lucide icon="MessageSquare" className="w-4 h-4" />
                        </a>
                      </Tippy>
                      <Menu>
                        <Menu.Button className="flex items-center text-slate-500">
                          <Lucide icon="MoreVertical" className="w-4 h-4" />
                        </Menu.Button>
                        <Menu.Items className="w-48">
                          <Menu.Item>
                            <Lucide
                              icon="MessageCircle"
                              className="w-4 h-4 mr-2"
                            />
                            Responder
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="UserPlus" className="w-4 h-4 mr-2" />
                            Transferir
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="Clock" className="w-4 h-4 mr-2" />
                            Alterar Prioridade
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide
                              icon="CheckCircle"
                              className="w-4 h-4 mr-2"
                            />
                            Resolver
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="Archive" className="w-4 h-4 mr-2" />
                            Arquivar
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

      {/* Painel de Chat Rápido */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 lg:col-span-8">
          <div className="intro-y box p-5">
            <div className="flex items-center pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
              <div className="text-base font-medium">Resposta Rápida</div>
              <Button variant="outline-primary" size="sm" className="ml-auto">
                <Lucide icon="Zap" className="w-4 h-4 mr-2" />
                IA Jurídica
              </Button>
            </div>
            <div className="mt-5">
              <FormTextarea
                rows={4}
                placeholder="Digite sua resposta aqui... Use @cliente para mencionar o cliente ou #processo para referenciar um processo."
                className="w-full"
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  <Button variant="outline-secondary" size="sm">
                    <Lucide icon="Paperclip" className="w-4 h-4 mr-1" />
                    Anexar
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    <Lucide icon="Smile" className="w-4 h-4 mr-1" />
                    Emoji
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    <Lucide icon="FileText" className="w-4 h-4 mr-1" />
                    Modelo
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline-secondary" size="sm">
                    Rascunho
                  </Button>
                  <Button variant="primary" size="sm">
                    <Lucide icon="Send" className="w-4 h-4 mr-2" />
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="intro-y box p-5">
            <div className="text-base font-medium pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
              Estatísticas do Dia
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span>Tickets Abertos:</span>
                <span className="font-medium text-danger">
                  {ticketsAbertos.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Respondidos:</span>
                <span className="font-medium text-success">12</span>
              </div>
              <div className="flex justify-between">
                <span>Tempo Médio:</span>
                <span className="font-medium">
                  {metricas.tempoMedioResposta}
                </span>
              </div>
              <div className="flex justify-between">
                <span>SLA Atendido:</span>
                <span className="font-medium text-success">
                  {metricas.slaAtendido}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
