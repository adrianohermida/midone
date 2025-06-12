import _ from "lodash";
import { useState, useRef } from "react";
import fakerData from "@/utils/faker";
import Button from "@/components/Base/Button";
import {
  FormInput,
  FormLabel,
  FormSelect,
  FormTextarea,
} from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import { Menu, Tab, Dialog } from "@/components/Base/Headless";

// Mock legal cases data
const legalCases = [
  {
    id: 1,
    number: "001/2024",
    client: "João Silva",
    type: "Direito Civil",
    status: "Em andamento",
    value: 15000,
    paid: 5000,
    installments: [
      {
        id: 1,
        value: 5000,
        dueDate: "2024-01-15",
        status: "Pago",
        paidDate: "2024-01-14",
      },
      { id: 2, value: 5000, dueDate: "2024-02-15", status: "Pendente" },
      { id: 3, value: 5000, dueDate: "2024-03-15", status: "Pendente" },
    ],
  },
  {
    id: 2,
    number: "002/2024",
    client: "Maria Santos",
    type: "Direito Trabalhista",
    status: "Finalizado",
    value: 25000,
    paid: 25000,
    installments: [
      {
        id: 1,
        value: 12500,
        dueDate: "2024-01-10",
        status: "Pago",
        paidDate: "2024-01-09",
      },
      {
        id: 2,
        value: 12500,
        dueDate: "2024-02-10",
        status: "Pago",
        paidDate: "2024-02-08",
      },
    ],
  },
  {
    id: 3,
    number: "003/2024",
    client: "Carlos Lima",
    type: "Direito Penal",
    status: "Em andamento",
    value: 30000,
    paid: 10000,
    installments: [
      {
        id: 1,
        value: 10000,
        dueDate: "2024-01-20",
        status: "Pago",
        paidDate: "2024-01-19",
      },
      { id: 2, value: 10000, dueDate: "2024-02-20", status: "Atrasado" },
      { id: 3, value: 10000, dueDate: "2024-03-20", status: "Pendente" },
    ],
  },
];

function Main() {
  const [newCaseModal, setNewCaseModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [newCaseData, setNewCaseData] = useState({
    number: "",
    client: "",
    type: "",
    value: "",
    installments: 1,
    description: "",
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "text-success";
      case "Pendente":
        return "text-warning";
      case "Atrasado":
        return "text-danger";
      default:
        return "text-slate-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-success/10 text-success";
      case "Pendente":
        return "bg-warning/10 text-warning";
      case "Atrasado":
        return "bg-danger/10 text-danger";
      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  const handleCreateCase = () => {
    console.log("Creating new case:", newCaseData);
    setNewCaseModal(false);
    setNewCaseData({
      number: "",
      client: "",
      type: "",
      value: "",
      installments: 1,
      description: "",
    });
  };

  const handlePayment = (caseData: any, installment: any) => {
    setSelectedCase({ case: caseData, installment });
    setPaymentModal(true);
  };

  const confirmPayment = () => {
    console.log("Processing payment for:", selectedCase);
    setPaymentModal(false);
    setSelectedCase(null);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">Gestão de Honorários</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button
            variant="primary"
            onClick={() => setNewCaseModal(true)}
            className="mr-2 shadow-md"
          >
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Novo Caso
          </Button>
          <Menu className="ml-auto sm:ml-0">
            <Menu.Button as="button" className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="ChevronDown" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-48">
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                Relatório Financeiro
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Download" className="w-4 h-4 mr-2" />
                Exportar Dados
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Settings" className="w-4 h-4 mr-2" />
                Configurações
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-5 intro-y">
        <div className="p-5 box">
          <div className="flex items-center">
            <div className="flex-none w-2/4">
              <div className="text-lg font-medium text-success">Recebido</div>
              <div className="mt-1 text-2xl font-bold text-success">
                {formatCurrency(40000)}
              </div>
            </div>
            <div className="flex-none ml-auto">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Lucide icon="TrendingUp" className="w-6 h-6 text-success" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 box">
          <div className="flex items-center">
            <div className="flex-none w-2/4">
              <div className="text-lg font-medium text-warning">Pendente</div>
              <div className="mt-1 text-2xl font-bold text-warning">
                {formatCurrency(25000)}
              </div>
            </div>
            <div className="flex-none ml-auto">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Lucide icon="Clock" className="w-6 h-6 text-warning" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 box">
          <div className="flex items-center">
            <div className="flex-none w-2/4">
              <div className="text-lg font-medium text-danger">Atrasado</div>
              <div className="mt-1 text-2xl font-bold text-danger">
                {formatCurrency(5000)}
              </div>
            </div>
            <div className="flex-none ml-auto">
              <div className="w-12 h-12 bg-danger/10 rounded-lg flex items-center justify-center">
                <Lucide icon="AlertTriangle" className="w-6 h-6 text-danger" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 box">
          <div className="flex items-center">
            <div className="flex-none w-2/4">
              <div className="text-lg font-medium text-primary">Total</div>
              <div className="mt-1 text-2xl font-bold text-primary">
                {formatCurrency(70000)}
              </div>
            </div>
            <div className="flex-none ml-auto">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Lucide icon="DollarSign" className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mt-5 intro-y">
        {/* Cases List */}
        <div className="col-span-12 intro-y">
          <div className="overflow-auto lg:overflow-visible">
            {legalCases.map((legalCase) => (
              <div key={legalCase.id} className="mb-6 box">
                <div className="p-5 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Caso {legalCase.number} - {legalCase.client}
                      </h3>
                      <div className="flex items-center mt-1 space-x-4 text-sm text-slate-600">
                        <span className="flex items-center">
                          <Lucide icon="Scale" className="w-4 h-4 mr-1" />
                          {legalCase.type}
                        </span>
                        <span className="flex items-center">
                          <Lucide icon="Activity" className="w-4 h-4 mr-1" />
                          {legalCase.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {formatCurrency(legalCase.value)}
                      </div>
                      <div className="text-sm text-slate-600">
                        Pago: {formatCurrency(legalCase.paid)}
                        <span className="text-success">
                          (
                          {Math.round((legalCase.paid / legalCase.value) * 100)}
                          %)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Parcelas de Honorários</h4>
                      <Button variant="outline-primary" size="sm">
                        <Lucide icon="Plus" className="w-3 h-3 mr-1" />
                        Nova Parcela
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {legalCase.installments.map((installment) => (
                        <div
                          key={installment.id}
                          className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div>
                              <div className="font-medium">
                                {formatCurrency(installment.value)}
                              </div>
                              <div className="text-sm text-slate-500">
                                Vencimento:{" "}
                                {new Date(
                                  installment.dueDate,
                                ).toLocaleDateString("pt-BR")}
                              </div>
                            </div>
                            <div>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(installment.status)}`}
                              >
                                {installment.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {installment.status === "Pago" &&
                              installment.paidDate && (
                                <span className="text-sm text-success">
                                  Pago em{" "}
                                  {new Date(
                                    installment.paidDate,
                                  ).toLocaleDateString("pt-BR")}
                                </span>
                              )}
                            {installment.status !== "Pago" && (
                              <Button
                                variant={
                                  installment.status === "Atrasado"
                                    ? "danger"
                                    : "primary"
                                }
                                size="sm"
                                onClick={() =>
                                  handlePayment(legalCase, installment)
                                }
                              >
                                <Lucide
                                  icon="CreditCard"
                                  className="w-3 h-3 mr-1"
                                />
                                Registrar Pagamento
                              </Button>
                            )}
                            <Menu>
                              <Menu.Button
                                as={Button}
                                variant="outline-secondary"
                                size="sm"
                              >
                                <Lucide
                                  icon="MoreVertical"
                                  className="w-3 h-3"
                                />
                              </Menu.Button>
                              <Menu.Items className="w-40">
                                <Menu.Item>
                                  <Lucide
                                    icon="FilePenLine"
                                    className="w-4 h-4 mr-2"
                                  />
                                  Editar
                                </Menu.Item>
                                <Menu.Item>
                                  <Lucide
                                    icon="Send"
                                    className="w-4 h-4 mr-2"
                                  />
                                  Enviar Cobrança
                                </Menu.Item>
                                <Menu.Item>
                                  <Lucide
                                    icon="Download"
                                    className="w-4 h-4 mr-2"
                                  />
                                  Gerar Recibo
                                </Menu.Item>
                              </Menu.Items>
                            </Menu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Case Modal */}
      <Dialog
        open={newCaseModal}
        onClose={() => setNewCaseModal(false)}
        className="w-96"
      >
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">Novo Caso</h2>
          </Dialog.Title>
          <Dialog.Description>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormLabel>Número do Caso</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Ex: 001/2024"
                    value={newCaseData.number}
                    onChange={(e) =>
                      setNewCaseData({ ...newCaseData, number: e.target.value })
                    }
                  />
                </div>
                <div>
                  <FormLabel>Cliente</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Nome do cliente"
                    value={newCaseData.client}
                    onChange={(e) =>
                      setNewCaseData({ ...newCaseData, client: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormLabel>Área do Direito</FormLabel>
                  <FormSelect
                    value={newCaseData.type}
                    onChange={(e) =>
                      setNewCaseData({ ...newCaseData, type: e.target.value })
                    }
                  >
                    <option value="">Selecione...</option>
                    <option value="Direito Civil">Direito Civil</option>
                    <option value="Direito Penal">Direito Penal</option>
                    <option value="Direito Trabalhista">
                      Direito Trabalhista
                    </option>
                    <option value="Direito Tributário">
                      Direito Tributário
                    </option>
                    <option value="Direito de Família">
                      Direito de Família
                    </option>
                    <option value="Direito Empresarial">
                      Direito Empresarial
                    </option>
                  </FormSelect>
                </div>
                <div>
                  <FormLabel>Valor Total</FormLabel>
                  <FormInput
                    type="number"
                    placeholder="0,00"
                    value={newCaseData.value}
                    onChange={(e) =>
                      setNewCaseData({ ...newCaseData, value: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <FormLabel>Número de Parcelas</FormLabel>
                <FormSelect
                  value={newCaseData.installments}
                  onChange={(e) =>
                    setNewCaseData({
                      ...newCaseData,
                      installments: parseInt(e.target.value),
                    })
                  }
                >
                  <option value={1}>À vista</option>
                  <option value={2}>2 parcelas</option>
                  <option value={3}>3 parcelas</option>
                  <option value={4}>4 parcelas</option>
                  <option value={6}>6 parcelas</option>
                  <option value={12}>12 parcelas</option>
                </FormSelect>
              </div>

              <div>
                <FormLabel>Descrição</FormLabel>
                <FormTextarea
                  placeholder="Detalhes do caso..."
                  value={newCaseData.description}
                  onChange={(e) =>
                    setNewCaseData({
                      ...newCaseData,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
            </div>
          </Dialog.Description>
          <Dialog.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setNewCaseModal(false)}
              className="w-20 mr-1"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateCase}
              className="w-20"
            >
              Criar
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>

      {/* Payment Modal */}
      <Dialog
        open={paymentModal}
        onClose={() => setPaymentModal(false)}
        className="w-96"
      >
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">
              Registrar Pagamento
            </h2>
          </Dialog.Title>
          <Dialog.Description>
            {selectedCase && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600">
                    Caso: {selectedCase.case.number}
                  </div>
                  <div className="text-sm text-slate-600">
                    Cliente: {selectedCase.case.client}
                  </div>
                  <div className="text-lg font-semibold mt-2">
                    Valor: {formatCurrency(selectedCase.installment.value)}
                  </div>
                </div>

                <div>
                  <FormLabel>Data do Pagamento</FormLabel>
                  <FormInput
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <FormLabel>Forma de Pagamento</FormLabel>
                  <FormSelect>
                    <option value="dinheiro">Dinheiro</option>
                    <option value="transferencia">
                      Transferência Bancária
                    </option>
                    <option value="pix">PIX</option>
                    <option value="cartao">Cartão de Crédito</option>
                    <option value="boleto">Boleto</option>
                  </FormSelect>
                </div>

                <div>
                  <FormLabel>Observações</FormLabel>
                  <FormTextarea
                    placeholder="Observações sobre o pagamento..."
                    rows={3}
                  />
                </div>
              </div>
            )}
          </Dialog.Description>
          <Dialog.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setPaymentModal(false)}
              className="w-20 mr-1"
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={confirmPayment} className="w-20">
              Confirmar
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default Main;
