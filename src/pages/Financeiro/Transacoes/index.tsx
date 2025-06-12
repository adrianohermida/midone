import _ from "lodash";
import clsx from "clsx";
import fakerData from "@/utils/faker";
import Button from "@/components/Base/Button";
import Pagination from "@/components/Base/Pagination";
import { FormInput, FormSelect } from "@/components/Base/Form";
import TinySlider from "@/components/Base/TinySlider";
import Lucide from "@/components/Base/Lucide";
import Tippy from "@/components/Base/Tippy";
import { Menu } from "@/components/Base/Headless";
import Table from "@/components/Base/Table";
import Breadcrumb from "@/components/Base/Breadcrumb";

function Main() {
  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">
        Contas a Pagar/Receber
      </h2>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro">Financeiro</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro/transacoes" active={true}>
          Transações
        </Breadcrumb.Link>
      </Breadcrumb>

      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y xl:flex-nowrap">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Nova Transação
          </Button>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="CreditCard" className="w-4 h-4 mr-2" />
                Recebimento
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="DollarSign" className="w-4 h-4 mr-2" />
                Pagamento
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Receipt" className="w-4 h-4 mr-2" />
                Honorário
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                Custa Processual
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <div className="hidden mx-auto md:block text-slate-500">
            Mostrando 1 a 10 de 150 transações
          </div>
          <div className="w-full mt-3 xl:w-auto xl:mt-0 xl:ml-auto">
            <div className="flex w-full xl:w-auto">
              <div className="relative w-56 text-slate-500">
                <FormInput
                  type="text"
                  className="w-56 pr-10 !box"
                  placeholder="Buscar transação..."
                />
                <Lucide
                  icon="Search"
                  className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                />
              </div>
              <FormSelect className="w-56 ml-2 xl:w-auto !box">
                <option>Status</option>
                <option>Pendente</option>
                <option>Pago</option>
                <option>Vencido</option>
                <option>Cancelado</option>
              </FormSelect>
            </div>
          </div>
        </div>

        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y 2xl:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  CLIENTE/FORNECEDOR
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  TIPO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  PROCESSO/REFERÊNCIA
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  VALOR
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  VENCIMENTO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  STATUS
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  AÇÕES
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {_.take(fakerData, 10).map((faker, fakerKey) => (
                <Table.Tr key={fakerKey} className="intro-x">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="flex items-center">
                      <div className="w-9 h-9 image-fit zoom-in">
                        <Tippy
                          content={`${faker.users[0].name}`}
                          className="tooltip"
                        >
                          <img
                            alt="Lawdesk CRM"
                            className="border-white rounded-lg shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                            src={faker.photos[0]}
                          />
                        </Tippy>
                      </div>
                      <div className="ml-4">
                        <a href="" className="font-medium whitespace-nowrap">
                          {faker.users[0].name}
                        </a>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                          {faker.users[0].email}
                        </div>
                      </div>
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="flex items-center justify-center">
                      <div
                        className={clsx([
                          "w-3 h-3 rounded-full mr-2",
                          { "bg-success": fakerKey % 4 === 0 },
                          { "bg-warning": fakerKey % 4 === 1 },
                          { "bg-pending": fakerKey % 4 === 2 },
                          { "bg-danger": fakerKey % 4 === 3 },
                        ])}
                      ></div>
                      <span className="text-xs">
                        {
                          ["Honorário", "Custa", "Despesa", "Recebimento"][
                            fakerKey % 4
                          ]
                        }
                      </span>
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span className="text-slate-500 text-xs font-mono">
                      {fakerKey % 2 === 0
                        ? `${Math.floor(Math.random() * 9000) + 1000000}-${Math.floor(Math.random() * 90) + 10}.2024.${Math.floor(Math.random() * 9) + 1}.02.000${Math.floor(Math.random() * 9) + 1}`
                        : "Consultoria"}
                    </span>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span
                      className={clsx([
                        "font-medium",
                        {
                          "text-success":
                            fakerKey % 4 === 0 || fakerKey % 4 === 3,
                        },
                        {
                          "text-danger":
                            fakerKey % 4 === 1 || fakerKey % 4 === 2,
                        },
                      ])}
                    >
                      {fakerKey % 4 === 0 || fakerKey % 4 === 3 ? "+" : "-"}R${" "}
                      {new Intl.NumberFormat("pt-BR").format(faker.totals)}
                    </span>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span className="text-slate-500 text-xs">
                      {new Date(
                        Date.now() +
                          (Math.random() * 30 - 15) * 24 * 60 * 60 * 1000,
                      ).toLocaleDateString("pt-BR")}
                    </span>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                      className={clsx([
                        "flex items-center justify-center",
                        { "text-success": faker.trueFalse[0] },
                        {
                          "text-warning":
                            !faker.trueFalse[0] && fakerKey % 3 === 0,
                        },
                        {
                          "text-danger":
                            !faker.trueFalse[0] && fakerKey % 3 !== 0,
                        },
                      ])}
                    >
                      <Lucide
                        icon={
                          faker.trueFalse[0]
                            ? "CheckSquare"
                            : fakerKey % 3 === 0
                              ? "Clock"
                              : "AlertCircle"
                        }
                        className="w-4 h-4 mr-2"
                      />
                      {faker.trueFalse[0]
                        ? "Pago"
                        : fakerKey % 3 === 0
                          ? "Pendente"
                          : "Vencido"}
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                      <a
                        className="flex items-center mr-3"
                        href={`/financeiro/transacoes/${fakerKey + 1}`}
                      >
                        <Lucide icon="Eye" className="w-4 h-4 mr-1" />
                        Ver
                      </a>
                      <a className="flex items-center mr-3" href="">
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                        Editar
                      </a>
                      <a className="flex items-center text-danger" href="">
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" />
                        Excluir
                      </a>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
        {/* END: Data List */}

        {/* BEGIN: Pagination */}
        <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
          <Pagination className="w-full sm:w-auto sm:mr-auto">
            <Pagination.Link>
              <Lucide icon="ChevronsLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>1</Pagination.Link>
            <Pagination.Link active>2</Pagination.Link>
            <Pagination.Link>3</Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronsRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
          <FormSelect className="w-20 mt-3 !box sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </FormSelect>
        </div>
      </div>

      {/* BEGIN: Quick Stats */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 lg:col-span-4 2xl:col-span-4">
          <div className="intro-y box p-5">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-theme-9 rounded-full mr-3"></div>
              <span className="truncate text-lg font-medium">
                Total a Receber
              </span>
            </div>
            <div className="text-3xl font-medium leading-8 mt-6">
              R$ 89.400,00
            </div>
            <div className="text-base text-slate-500 mt-1">
              45 faturas pendentes
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 2xl:col-span-4">
          <div className="intro-y box p-5">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-theme-11 rounded-full mr-3"></div>
              <span className="truncate text-lg font-medium">
                Total a Pagar
              </span>
            </div>
            <div className="text-3xl font-medium leading-8 mt-6">
              R$ 23.100,00
            </div>
            <div className="text-base text-slate-500 mt-1">
              12 contas pendentes
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 2xl:col-span-4">
          <div className="intro-y box p-5">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-theme-12 rounded-full mr-3"></div>
              <span className="truncate text-lg font-medium">Em Atraso</span>
            </div>
            <div className="text-3xl font-medium leading-8 mt-6 text-danger">
              R$ 8.200,00
            </div>
            <div className="text-base text-slate-500 mt-1">
              7 contas vencidas
            </div>
          </div>
        </div>
      </div>
      {/* END: Quick Stats */}
    </>
  );
}

export default Main;
