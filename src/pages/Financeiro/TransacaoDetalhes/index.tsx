import _ from "lodash";
import { useParams } from "react-router-dom";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";
import Table from "@/components/Base/Table";
import Breadcrumb from "@/components/Base/Breadcrumb";
import Alert from "@/components/Base/Alert";

function Main() {
  const { id } = useParams();

  // Mock data - em produção virá da API
  const transaction = {
    id: id || "1",
    type: "Honorário",
    client: "Silva & Associados Ltda.",
    email: "contato@silvaassociados.com.br",
    cnpj: "12.345.678/0001-90",
    amount: 5832.5,
    status: "Pendente",
    dueDate: "2024-02-15",
    createdDate: "2024-01-15",
    processNumber: "5002345-67.2023.5.02.0001",
    lawyer: "Dr. João Silva (OAB/SP 123456)",
    description: "Elaboração de contestação em processo trabalhista",
    services: [
      {
        description: "Elaboração de Contestação",
        hours: 8,
        hourlyRate: 350,
        total: 2800,
      },
      {
        description: "Acompanhamento de Audiência",
        hours: 4,
        hourlyRate: 450,
        total: 1800,
      },
      {
        description: "Consulta Jurídica",
        hours: 2,
        hourlyRate: 300,
        total: 600,
      },
    ],
    costs: [
      {
        description: "Custas Processuais",
        amount: 450,
      },
    ],
    payments: [
      {
        date: "2024-01-20",
        amount: 1500,
        method: "PIX",
        status: "Confirmado",
      },
    ],
  };

  const subtotal = transaction.services.reduce(
    (sum, service) => sum + service.total,
    0,
  );
  const costsTotal = transaction.costs.reduce(
    (sum, cost) => sum + cost.amount,
    0,
  );
  const tax = subtotal * 0.05; // ISS 5%
  const total = subtotal + costsTotal + tax;
  const paidTotal = transaction.payments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );
  const balance = total - paidTotal;

  return (
    <>
      <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">
          Detalhes da Transação #{transaction.id}
        </h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="Download" className="w-4 h-4 mr-2" />
            Baixar PDF
          </Button>
          <Menu className="ml-auto sm:ml-0">
            <Menu.Button as="button" className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="MoreVertical" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="Send" className="w-4 h-4 mr-2" /> Enviar por Email
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="CreditCard" className="w-4 h-4 mr-2" /> Gerar
                Boleto
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Edit" className="w-4 h-4 mr-2" /> Editar
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro">Financeiro</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro/transacoes">
          Transações
        </Breadcrumb.Link>
        <Breadcrumb.Link to={`/financeiro/transacoes/${id}`} active={true}>
          Transação #{id}
        </Breadcrumb.Link>
      </Breadcrumb>

      {/* Alert de Status */}
      <div className="mt-5 intro-y">
        {transaction.status === "Pendente" && (
          <Alert variant="warning" className="flex items-center">
            <Lucide icon="Clock" className="w-6 h-6 mr-2" />
            <div>
              <strong>Transação Pendente</strong> - Aguardando pagamento.
              Vencimento:{" "}
              {new Date(transaction.dueDate).toLocaleDateString("pt-BR")}
            </div>
          </Alert>
        )}
        {transaction.status === "Pago" && (
          <Alert variant="success" className="flex items-center">
            <Lucide icon="CheckCircle" className="w-6 h-6 mr-2" />
            <div>
              <strong>Transação Paga</strong> - Pagamento confirmado e
              processado.
            </div>
          </Alert>
        )}
      </div>

      <div className="grid grid-cols-11 gap-6 mt-5">
        {/* Coluna Principal */}
        <div className="col-span-11 lg:col-span-8">
          {/* Informações do Cliente */}
          <div className="intro-y box p-5">
            <div className="flex items-center pb-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <div className="font-medium text-base mr-auto">
                Informações do Cliente
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
              <div>
                <div className="text-slate-500 text-xs uppercase tracking-wider">
                  Cliente
                </div>
                <div className="mt-1 text-lg font-medium">
                  {transaction.client}
                </div>
                <div className="mt-1 text-slate-600">{transaction.email}</div>
                <div className="mt-1 text-slate-600">
                  CNPJ: {transaction.cnpj}
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-xs uppercase tracking-wider">
                  Processo
                </div>
                <div className="mt-1 font-medium font-mono">
                  {transaction.processNumber}
                </div>
                <div className="mt-1 text-slate-600">
                  Responsável: {transaction.lawyer}
                </div>
                <div className="mt-1 text-slate-600">
                  {transaction.description}
                </div>
              </div>
            </div>
          </div>

          {/* Serviços Prestados */}
          <div className="intro-y box p-5 mt-5">
            <div className="flex items-center pb-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <div className="font-medium text-base mr-auto">
                Serviços Prestados
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table className="mt-5">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="whitespace-nowrap">DESCRIÇÃO</Table.Th>
                    <Table.Th className="text-right whitespace-nowrap">
                      HORAS
                    </Table.Th>
                    <Table.Th className="text-right whitespace-nowrap">
                      VALOR/HORA
                    </Table.Th>
                    <Table.Th className="text-right whitespace-nowrap">
                      TOTAL
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {transaction.services.map((service, index) => (
                    <Table.Tr key={index}>
                      <Table.Td className="border-b dark:border-darkmode-400">
                        {service.description}
                      </Table.Td>
                      <Table.Td className="text-right border-b dark:border-darkmode-400">
                        {service.hours}h
                      </Table.Td>
                      <Table.Td className="text-right border-b dark:border-darkmode-400">
                        R$ {service.hourlyRate.toFixed(2)}
                      </Table.Td>
                      <Table.Td className="text-right border-b dark:border-darkmode-400 font-medium">
                        R$ {service.total.toFixed(2)}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                  {transaction.costs.map((cost, index) => (
                    <Table.Tr key={`cost-${index}`}>
                      <Table.Td className="border-b dark:border-darkmode-400">
                        {cost.description}
                      </Table.Td>
                      <Table.Td className="text-right border-b dark:border-darkmode-400">
                        -
                      </Table.Td>
                      <Table.Td className="text-right border-b dark:border-darkmode-400">
                        -
                      </Table.Td>
                      <Table.Td className="text-right border-b dark:border-darkmode-400 font-medium">
                        R$ {cost.amount.toFixed(2)}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          </div>

          {/* Histórico de Pagamentos */}
          <div className="intro-y box p-5 mt-5">
            <div className="flex items-center pb-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <div className="font-medium text-base mr-auto">
                Histórico de Pagamentos
              </div>
              <Button variant="outline-secondary" size="sm">
                <Lucide icon="Plus" className="w-4 h-4 mr-2" />
                Registrar Pagamento
              </Button>
            </div>
            {transaction.payments.length > 0 ? (
              <div className="overflow-x-auto">
                <Table className="mt-5">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th className="whitespace-nowrap">DATA</Table.Th>
                      <Table.Th className="whitespace-nowrap">VALOR</Table.Th>
                      <Table.Th className="whitespace-nowrap">MÉTODO</Table.Th>
                      <Table.Th className="whitespace-nowrap">STATUS</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {transaction.payments.map((payment, index) => (
                      <Table.Tr key={index}>
                        <Table.Td className="border-b dark:border-darkmode-400">
                          {new Date(payment.date).toLocaleDateString("pt-BR")}
                        </Table.Td>
                        <Table.Td className="border-b dark:border-darkmode-400 font-medium text-success">
                          R$ {payment.amount.toFixed(2)}
                        </Table.Td>
                        <Table.Td className="border-b dark:border-darkmode-400">
                          {payment.method}
                        </Table.Td>
                        <Table.Td className="border-b dark:border-darkmode-400">
                          <div className="flex items-center text-success">
                            <Lucide
                              icon="CheckCircle"
                              className="w-4 h-4 mr-2"
                            />
                            {payment.status}
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                Nenhum pagamento registrado
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-11 lg:col-span-3">
          {/* Resumo Financeiro */}
          <div className="intro-y box p-5">
            <div className="text-base font-medium pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
              Resumo Financeiro
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Custas:</span>
                <span>R$ {costsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>ISS (5%):</span>
                <span>R$ {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200/60 dark:border-darkmode-400 pt-3 font-medium">
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-success">
                <span>Pago:</span>
                <span>R$ {paidTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-danger font-medium">
                <span>Saldo:</span>
                <span>R$ {balance.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Informações da Transação */}
          <div className="intro-y box p-5 mt-5">
            <div className="text-base font-medium pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
              Detalhes da Transação
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <div className="text-slate-500 text-xs">Tipo</div>
                <div className="font-medium">{transaction.type}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Status</div>
                <div
                  className={`font-medium ${
                    transaction.status === "Pendente"
                      ? "text-warning"
                      : transaction.status === "Pago"
                        ? "text-success"
                        : "text-danger"
                  }`}
                >
                  {transaction.status}
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Data de Criação</div>
                <div>
                  {new Date(transaction.createdDate).toLocaleDateString(
                    "pt-BR",
                  )}
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Vencimento</div>
                <div>
                  {new Date(transaction.dueDate).toLocaleDateString("pt-BR")}
                </div>
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="intro-y box p-5 mt-5">
            <div className="text-base font-medium pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
              Ações Rápidas
            </div>
            <div className="mt-4 space-y-3">
              <Button variant="primary" className="w-full">
                <Lucide icon="DollarSign" className="w-4 h-4 mr-2" />
                Registrar Pagamento
              </Button>
              <Button variant="outline-secondary" className="w-full">
                <Lucide icon="Send" className="w-4 h-4 mr-2" />
                Enviar Cobrança
              </Button>
              <Button variant="outline-secondary" className="w-full">
                <Lucide icon="CreditCard" className="w-4 h-4 mr-2" />
                Gerar Boleto
              </Button>
              <Button variant="outline-secondary" className="w-full">
                <Lucide icon="Edit" className="w-4 h-4 mr-2" />
                Editar Transação
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
