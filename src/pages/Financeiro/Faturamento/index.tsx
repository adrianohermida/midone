import _ from "lodash";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";
import Table from "@/components/Base/Table";
import Breadcrumb from "@/components/Base/Breadcrumb";

function Main() {
  return (
    <>
      <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">Faturamento Jurídico</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="Printer" className="w-4 h-4 mr-2" />
            Imprimir
          </Button>
          <Menu className="ml-auto sm:ml-0">
            <Menu.Button as="button" className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Exportar
                Word
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Exportar PDF
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Mail" className="w-4 h-4 mr-2" /> Enviar por Email
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro">Financeiro</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro/faturamento" active={true}>
          Faturamento
        </Breadcrumb.Link>
      </Breadcrumb>

      {/* BEGIN: Fatura */}
      <div className="mt-5 overflow-hidden intro-y box">
        <div className="text-center border-b border-slate-200/60 dark:border-darkmode-400 sm:text-left">
          <div className="px-5 py-10 sm:px-20 sm:py-20">
            <div className="text-3xl font-semibold text-primary">
              FATURA DE HONORÁRIOS
            </div>
            <div className="mt-2">
              Fatura <span className="font-medium">#LAW-2024-001</span>
            </div>
            <div className="mt-1">15 de Janeiro, 2024</div>
          </div>
          <div className="flex flex-col px-5 pt-10 pb-10 lg:flex-row sm:px-20 sm:pb-20">
            <div>
              <div className="text-base text-slate-500">Dados do Cliente</div>
              <div className="mt-2 text-lg font-medium text-primary">
                Silva & Associados Ltda.
              </div>
              <div className="mt-1">contato@silvaassociados.com.br</div>
              <div className="mt-1">CNPJ: 12.345.678/0001-90</div>
              <div className="mt-1">Rua das Flores, 123 - São Paulo/SP</div>
              <div className="mt-1">CEP: 01234-567</div>
            </div>
            <div className="lg:text-right lg:ml-auto">
              <div className="text-base text-slate-500">
                Escritório de Advocacia
              </div>
              <div className="mt-2 text-lg font-medium text-primary">
                Lawdesk Advocacia
              </div>
              <div className="mt-1">OAB/SP 123.456</div>
              <div className="mt-1">contato@lawdesk.com.br</div>
              <div className="mt-1">Av. Paulista, 1000 - São Paulo/SP</div>
              <div className="mt-1">CEP: 01310-100</div>
            </div>
          </div>
        </div>
        <div className="px-5 pt-10 pb-10 sm:px-20 sm:pb-20">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                  DESCRIÇÃO DOS SERVIÇOS
                </Table.Th>
                <Table.Th className="text-right border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                  PROCESSO/CASO
                </Table.Th>
                <Table.Th className="text-right border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                  HORAS
                </Table.Th>
                <Table.Th className="text-right border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                  VALOR/HORA
                </Table.Th>
                <Table.Th className="text-right border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                  TOTAL
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td className="border-b dark:border-darkmode-400">
                  <div className="font-medium whitespace-nowrap">
                    Elaboração de Contestação
                  </div>
                  <div className="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                    Processo Trabalhista - Reclamação
                  </div>
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32 font-medium">
                  5002345-67.2023.5.02.0001
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32">
                  8h
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32">
                  R$ 350,00
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32 font-medium">
                  R$ 2.800,00
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td className="border-b dark:border-darkmode-400">
                  <div className="font-medium whitespace-nowrap">
                    Acompanhamento de Audiência
                  </div>
                  <div className="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                    Audiência de Instrução e Julgamento
                  </div>
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32 font-medium">
                  5002345-67.2023.5.02.0001
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32">
                  4h
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32">
                  R$ 450,00
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32 font-medium">
                  R$ 1.800,00
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td className="border-b dark:border-darkmode-400">
                  <div className="font-medium whitespace-nowrap">
                    Consulta Jurídica
                  </div>
                  <div className="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                    Orientação sobre direitos trabalhistas
                  </div>
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32 font-medium">
                  Consultoria
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32">
                  2h
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32">
                  R$ 300,00
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32 font-medium">
                  R$ 600,00
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td className="border-b dark:border-darkmode-400">
                  <div className="font-medium whitespace-nowrap">
                    Custas Processuais
                  </div>
                  <div className="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                    Taxa judiciária e despesas processuais
                  </div>
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32 font-medium">
                  5002345-67.2023.5.02.0001
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32">
                  -
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32">
                  -
                </Table.Td>
                <Table.Td className="text-right border-b dark:border-darkmode-400 w-32 font-medium">
                  R$ 450,00
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
        <div className="px-5 pb-10 sm:px-20 sm:pb-20">
          <div className="flex flex-col-reverse sm:flex-row">
            <div className="text-center sm:text-left sm:mr-auto">
              <div className="text-base text-slate-500">
                Informações de Pagamento
              </div>
              <div className="mt-2">
                <div className="mt-1">
                  <strong>Banco:</strong> Banco do Brasil
                </div>
                <div className="mt-1">
                  <strong>Agência:</strong> 1234-5
                </div>
                <div className="mt-1">
                  <strong>Conta:</strong> 67890-1
                </div>
                <div className="mt-1">
                  <strong>PIX:</strong> lawdesk@exemplo.com.br
                </div>
              </div>
              <div className="mt-5">
                <div className="text-base text-slate-500">Observações</div>
                <div className="mt-2 text-sm">
                  • Fatura com vencimento em 30 dias
                  <br />
                  • Multa de 2% ao mês em caso de atraso
                  <br />
                  • Juros de 1% ao mês sobre o valor em atraso
                  <br />• Protesto após 10 dias de vencimento
                </div>
              </div>
            </div>
            <div className="text-center sm:text-right sm:ml-auto">
              <div className="text-base text-slate-500">Resumo da Fatura</div>
              <div className="mt-2">
                <div className="flex justify-between mt-2">
                  <span>Subtotal:</span>
                  <span className="font-medium">R$ 5.650,00</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>ISS (5%):</span>
                  <span className="font-medium">R$ 282,50</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Desconto:</span>
                  <span className="font-medium text-danger">-R$ 100,00</span>
                </div>
                <div className="flex justify-between border-t border-slate-200/60 dark:border-darkmode-400 mt-4 pt-4">
                  <span className="text-base font-medium">Total:</span>
                  <span className="text-xl font-medium text-primary">
                    R$ 5.832,50
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <div className="text-xs text-slate-500">
                  Vencimento: 15/02/2024
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Status:{" "}
                  <span className="text-warning font-medium">Pendente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END: Fatura */}

      {/* BEGIN: Ações */}
      <div className="flex justify-center mt-8 intro-y">
        <div className="flex">
          <Button variant="primary" className="mr-2">
            <Lucide icon="Send" className="w-4 h-4 mr-2" />
            Enviar por Email
          </Button>
          <Button variant="outline-secondary" className="mr-2">
            <Lucide icon="CreditCard" className="w-4 h-4 mr-2" />
            Gerar Boleto
          </Button>
          <Button variant="outline-secondary" className="mr-2">
            <Lucide icon="Download" className="w-4 h-4 mr-2" />
            Baixar PDF
          </Button>
          <Button variant="success">
            <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
            Marcar como Pago
          </Button>
        </div>
      </div>
      {/* END: Ações */}
    </>
  );
}

export default Main;
