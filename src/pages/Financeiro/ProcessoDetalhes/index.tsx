import _ from "lodash";
import { useParams } from "react-router-dom";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { Menu, Tab } from "@/components/Base/Headless";
import Table from "@/components/Base/Table";
import Breadcrumb from "@/components/Base/Breadcrumb";
import Alert from "@/components/Base/Alert";
import ReportLineChart from "@/components/ReportLineChart";
import financeiroData from "@/data/financeiro.json";

function Main() {
  const { id } = useParams();

  // Mock data específico para processos jurídicos
  const processo = {
    id: id || "1",
    numeroProcesso: "5002345-67.2023.5.02.0001",
    cliente: "Silva & Associados Ltda.",
    email: "contato@silvaassociados.com.br",
    area: "Trabalhista",
    assunto: "Reclamação Trabalhista",
    advogado: "Dr. João Silva",
    oab: "OAB/SP 123456",
    status: "Em Andamento",
    dataDistribuicao: "2023-05-15",
    valor: "R$ 50.000,00",
    instancia: "1ª Instância - TRT 2ª Região",
    vara: "35ª Vara do Trabalho de São Paulo",
    reclamante: "Maria José da Silva",
    reclamado: "Silva & Associados Ltda.",
  };

  const honorarios = financeiroData.honorarios.filter(
    (h) => h.id.toString() === id,
  );
  const custas = financeiroData.custas.filter((c) => c.id.toString() === id);

  const totalHonorarios = honorarios.reduce((sum, h) => sum + h.valor, 0);
  const totalCustas = custas.reduce((sum, c) => sum + c.valor, 0);
  const totalGeral = totalHonorarios + totalCustas;

  return (
    <>
      <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">
          Processo {processo.numeroProcesso}
        </h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="Download" className="w-4 h-4 mr-2" />
            Relatório Financeiro
          </Button>
          <Menu className="ml-auto sm:ml-0">
            <Menu.Button as="button" className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="MoreVertical" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-48">
              <Menu.Item>
                <Lucide icon="Scale" className="w-4 h-4 mr-2" />
                Lançar Honorário
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Receipt" className="w-4 h-4 mr-2" />
                Adicionar Custa
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Send" className="w-4 h-4 mr-2" />
                Enviar Fatura
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="DollarSign" className="w-4 h-4 mr-2" />
                Registrar Pagamento
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro">Financeiro</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro/honorarios">
          Honorários
        </Breadcrumb.Link>
        <Breadcrumb.Link to={`/financeiro/processo/${id}`} active={true}>
          Processo #{id}
        </Breadcrumb.Link>
      </Breadcrumb>

      {/* Alert de Status Financeiro */}
      <div className="mt-5 intro-y">
        <Alert variant="primary" className="flex items-center">
          <Lucide icon="Info" className="w-6 h-6 mr-2" />
          <div>
            <strong>Situação Financeira:</strong> Total faturado R${" "}
            {new Intl.NumberFormat("pt-BR").format(totalGeral)}| Honorários: R${" "}
            {new Intl.NumberFormat("pt-BR").format(totalHonorarios)}| Custas: R${" "}
            {new Intl.NumberFormat("pt-BR").format(totalCustas)}
          </div>
        </Alert>
      </div>

      <div className="grid grid-cols-11 gap-6 mt-5">
        {/* Coluna Principal */}
        <div className="col-span-11 lg:col-span-8">
          {/* Informações do Processo */}
          <div className="intro-y box p-5">
            <Tab.Group>
              <Tab.List className="nav-pills" variant="pills">
                <Tab>
                  <Tab.Button className="w-full py-2">
                    Dados do Processo
                  </Tab.Button>
                </Tab>
                <Tab>
                  <Tab.Button className="w-full py-2">
                    Movimentação Financeira
                  </Tab.Button>
                </Tab>
                <Tab>
                  <Tab.Button className="w-full py-2">
                    Histórico de Pagamentos
                  </Tab.Button>
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-5">
                <Tab.Panel>
                  <div className="p-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <div className="text-slate-500 text-xs uppercase tracking-wider">
                          Informações Processuais
                        </div>
                        <div className="mt-3 space-y-3">
                          <div>
                            <label className="text-xs text-slate-500">
                              Número do Processo
                            </label>
                            <div className="font-mono font-medium">
                              {processo.numeroProcesso}
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500">
                              Área Jurídica
                            </label>
                            <div>
                              {processo.area} - {processo.assunto}
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500">
                              Instância/Vara
                            </label>
                            <div>{processo.instancia}</div>
                            <div className="text-sm text-slate-600">
                              {processo.vara}
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500">
                              Data de Distribuição
                            </label>
                            <div>
                              {new Date(
                                processo.dataDistribuicao,
                              ).toLocaleDateString("pt-BR")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-xs uppercase tracking-wider">
                          Partes do Processo
                        </div>
                        <div className="mt-3 space-y-3">
                          <div>
                            <label className="text-xs text-slate-500">
                              Cliente (Representado)
                            </label>
                            <div className="font-medium">
                              {processo.cliente}
                            </div>
                            <div className="text-sm text-slate-600">
                              {processo.email}
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500">
                              Advogado Responsável
                            </label>
                            <div>{processo.advogado}</div>
                            <div className="text-sm text-slate-600">
                              {processo.oab}
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500">
                              Requerente
                            </label>
                            <div>{processo.reclamante}</div>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500">
                              Requerido
                            </label>
                            <div>{processo.reclamado}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="p-5">
                    {/* Gráfico de Evolução */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-4">
                        Evolução dos Custos
                      </h3>
                      <ReportLineChart height={250} />
                    </div>

                    {/* Tabela de Honorários */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-4">
                        Honorários Lançados
                      </h3>
                      <Table>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>SERVIÇO</Table.Th>
                            <Table.Th className="text-center">HORAS</Table.Th>
                            <Table.Th className="text-center">
                              VALOR/HORA
                            </Table.Th>
                            <Table.Th className="text-center">TOTAL</Table.Th>
                            <Table.Th className="text-center">STATUS</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {honorarios.map((honorario, index) => (
                            <Table.Tr key={index}>
                              <Table.Td>{honorario.servico}</Table.Td>
                              <Table.Td className="text-center">
                                {honorario.horas}h
                              </Table.Td>
                              <Table.Td className="text-center">
                                R$ {honorario.valorHora}
                              </Table.Td>
                              <Table.Td className="text-center font-medium">
                                R${" "}
                                {new Intl.NumberFormat("pt-BR").format(
                                  honorario.valor,
                                )}
                              </Table.Td>
                              <Table.Td className="text-center">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    honorario.status === "Pago"
                                      ? "bg-success/10 text-success"
                                      : honorario.status === "Pendente"
                                        ? "bg-warning/10 text-warning"
                                        : "bg-danger/10 text-danger"
                                  }`}
                                >
                                  {honorario.status}
                                </span>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </div>

                    {/* Tabela de Custas */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Custas Processuais
                      </h3>
                      <Table>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>TIPO DE CUSTA</Table.Th>
                            <Table.Th className="text-center">VALOR</Table.Th>
                            <Table.Th className="text-center">
                              RESPONSÁVEL
                            </Table.Th>
                            <Table.Th className="text-center">
                              VENCIMENTO
                            </Table.Th>
                            <Table.Th className="text-center">STATUS</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {custas.map((custa, index) => (
                            <Table.Tr key={index}>
                              <Table.Td>{custa.tipo}</Table.Td>
                              <Table.Td className="text-center font-medium">
                                R${" "}
                                {new Intl.NumberFormat("pt-BR").format(
                                  custa.valor,
                                )}
                              </Table.Td>
                              <Table.Td className="text-center">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    custa.responsavel === "Cliente"
                                      ? "bg-primary/10 text-primary"
                                      : "bg-warning/10 text-warning"
                                  }`}
                                >
                                  {custa.responsavel}
                                </span>
                              </Table.Td>
                              <Table.Td className="text-center">
                                {new Date(
                                  custa.dataVencimento,
                                ).toLocaleDateString("pt-BR")}
                              </Table.Td>
                              <Table.Td className="text-center">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    custa.status === "Pago"
                                      ? "bg-success/10 text-success"
                                      : custa.status === "Pendente"
                                        ? "bg-warning/10 text-warning"
                                        : "bg-danger/10 text-danger"
                                  }`}
                                >
                                  {custa.status}
                                </span>
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="p-5">
                    <div className="text-center py-8 text-slate-500">
                      <Lucide
                        icon="Clock"
                        className="w-12 h-12 mx-auto mb-4 text-slate-300"
                      />
                      <h3 className="text-lg font-medium mb-2">
                        Histórico de Pagamentos
                      </h3>
                      <p>
                        Nenhum pagamento registrado para este processo ainda.
                      </p>
                      <Button variant="primary" className="mt-4">
                        <Lucide icon="Plus" className="w-4 h-4 mr-2" />
                        Registrar Primeiro Pagamento
                      </Button>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
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
                <span>Honorários:</span>
                <span className="font-medium">
                  R$ {new Intl.NumberFormat("pt-BR").format(totalHonorarios)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Custas:</span>
                <span className="font-medium">
                  R$ {new Intl.NumberFormat("pt-BR").format(totalCustas)}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200/60 dark:border-darkmode-400 pt-3 font-medium text-lg">
                <span>Total:</span>
                <span>
                  R$ {new Intl.NumberFormat("pt-BR").format(totalGeral)}
                </span>
              </div>
            </div>
          </div>

          {/* Status do Processo */}
          <div className="intro-y box p-5 mt-5">
            <div className="text-base font-medium pb-3 border-b border-slate-200/60 dark:border-darkmode-400">
              Status do Processo
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <div className="text-slate-500 text-xs">
                  Situação Processual
                </div>
                <div className="font-medium text-warning">
                  {processo.status}
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Valor da Causa</div>
                <div className="font-medium">{processo.valor}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Última Atualização</div>
                <div>Hoje, 14:30</div>
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
                <Lucide icon="Scale" className="w-4 h-4 mr-2" />
                Lançar Honorário
              </Button>
              <Button variant="outline-secondary" className="w-full">
                <Lucide icon="Receipt" className="w-4 h-4 mr-2" />
                Adicionar Custa
              </Button>
              <Button variant="outline-secondary" className="w-full">
                <Lucide icon="Send" className="w-4 h-4 mr-2" />
                Enviar Fatura
              </Button>
              <Button variant="outline-secondary" className="w-full">
                <Lucide icon="FileDown" className="w-4 h-4 mr-2" />
                Relatório PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
