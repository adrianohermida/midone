import _ from "lodash";
import clsx from "clsx";
import fakerData from "@/utils/faker";
import Button from "@/components/Base/Button";
import Pagination from "@/components/Base/Pagination";
import { FormInput, FormSelect } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import Tippy from "@/components/Base/Tippy";
import { Menu } from "@/components/Base/Headless";
import Table from "@/components/Base/Table";
import Breadcrumb from "@/components/Base/Breadcrumb";

function Main() {
  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Serviços Jurídicos</h2>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro">Financeiro</Breadcrumb.Link>
        <Breadcrumb.Link to="/financeiro/produtos" active={true}>
          Serviços
        </Breadcrumb.Link>
      </Breadcrumb>

      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Novo Serviço
          </Button>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="Scale" className="w-4 h-4 mr-2" />
                Serviço Advocatício
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                Consultoria
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Users" className="w-4 h-4 mr-2" />
                Assessoria
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <div className="hidden mx-auto md:block text-slate-500">
            Mostrando 1 a 10 de 35 serviços
          </div>
          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto">
            <div className="flex w-full sm:w-auto">
              <div className="relative w-56 text-slate-500">
                <FormInput
                  type="text"
                  className="w-56 pr-10 !box"
                  placeholder="Buscar serviço..."
                />
                <Lucide
                  icon="Search"
                  className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                />
              </div>
              <FormSelect className="w-56 ml-2 sm:w-auto !box">
                <option>Área Jurídica</option>
                <option>Trabalhista</option>
                <option>Civil</option>
                <option>Criminal</option>
                <option>Empresarial</option>
                <option>Tributário</option>
              </FormSelect>
            </div>
          </div>
        </div>

        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  SERVIÇO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  ÁREA JURÍDICA
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  VALOR/HORA
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  VALOR FIXO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  COMPLEXIDADE
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
              {[
                {
                  name: "Elaboração de Petição Inicial",
                  area: "Civil",
                  hourlyRate: 350,
                  fixedPrice: 1500,
                  complexity: "Média",
                  active: true,
                  description: "Redação de petição inicial para ações cíveis",
                },
                {
                  name: "Acompanhamento de Audiência",
                  area: "Trabalhista",
                  hourlyRate: 450,
                  fixedPrice: 800,
                  complexity: "Alta",
                  active: true,
                  description: "Representação em audiências trabalhistas",
                },
                {
                  name: "Consultoria Empresarial",
                  area: "Empresarial",
                  hourlyRate: 500,
                  fixedPrice: null,
                  complexity: "Alta",
                  active: true,
                  description: "Assessoria jurídica empresarial",
                },
                {
                  name: "Elaboração de Contrato",
                  area: "Civil",
                  hourlyRate: 300,
                  fixedPrice: 1200,
                  complexity: "Média",
                  active: true,
                  description: "Redação de contratos diversos",
                },
                {
                  name: "Defesa Criminal",
                  area: "Criminal",
                  hourlyRate: 600,
                  fixedPrice: 5000,
                  complexity: "Alta",
                  active: true,
                  description: "Defesa em processos criminais",
                },
                {
                  name: "Recurso de Apelação",
                  area: "Civil",
                  hourlyRate: 400,
                  fixedPrice: 2500,
                  complexity: "Alta",
                  active: true,
                  description: "Elaboração de recursos de apelação",
                },
                {
                  name: "Mediação e Arbitragem",
                  area: "Civil",
                  hourlyRate: 350,
                  fixedPrice: 1800,
                  complexity: "Média",
                  active: false,
                  description: "Serviços de mediação e arbitragem",
                },
                {
                  name: "Planejamento Tributário",
                  area: "Tributário",
                  hourlyRate: 550,
                  fixedPrice: null,
                  complexity: "Alta",
                  active: true,
                  description: "Consultoria em planejamento tributário",
                },
              ].map((service, serviceKey) => (
                <Table.Tr key={serviceKey} className="intro-x">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="font-medium whitespace-nowrap">
                      {service.name}
                    </div>
                    <div className="text-slate-500 text-xs mt-0.5 whitespace-nowrap">
                      {service.description}
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                      className={clsx([
                        "px-2 py-1 rounded-full text-xs font-medium",
                        {
                          "bg-primary/10 text-primary":
                            service.area === "Civil",
                        },
                        {
                          "bg-warning/10 text-warning":
                            service.area === "Trabalhista",
                        },
                        {
                          "bg-success/10 text-success":
                            service.area === "Empresarial",
                        },
                        {
                          "bg-danger/10 text-danger":
                            service.area === "Criminal",
                        },
                        {
                          "bg-info/10 text-info": service.area === "Tributário",
                        },
                      ])}
                    >
                      {service.area}
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span className="font-medium">
                      R$ {service.hourlyRate}/h
                    </span>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span className="font-medium">
                      {service.fixedPrice
                        ? `R$ ${new Intl.NumberFormat("pt-BR").format(service.fixedPrice)}`
                        : "-"}
                    </span>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                      className={clsx([
                        "flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium",
                        {
                          "bg-success/10 text-success":
                            service.complexity === "Baixa",
                        },
                        {
                          "bg-warning/10 text-warning":
                            service.complexity === "Média",
                        },
                        {
                          "bg-danger/10 text-danger":
                            service.complexity === "Alta",
                        },
                      ])}
                    >
                      <div
                        className={clsx([
                          "w-2 h-2 rounded-full mr-2",
                          { "bg-success": service.complexity === "Baixa" },
                          { "bg-warning": service.complexity === "Média" },
                          { "bg-danger": service.complexity === "Alta" },
                        ])}
                      ></div>
                      {service.complexity}
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                      className={clsx([
                        "flex items-center justify-center",
                        { "text-success": service.active },
                        { "text-danger": !service.active },
                      ])}
                    >
                      <Lucide
                        icon={service.active ? "CheckSquare" : "XSquare"}
                        className="w-4 h-4 mr-2"
                      />
                      {service.active ? "Ativo" : "Inativo"}
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                      <a className="flex items-center mr-3" href="">
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                        Editar
                      </a>
                      <Menu>
                        <Menu.Button className="flex items-center text-slate-500">
                          <Lucide icon="MoreVertical" className="w-4 h-4" />
                        </Menu.Button>
                        <Menu.Items className="w-40">
                          <Menu.Item>
                            <Lucide icon="Copy" className="w-4 h-4 mr-2" />
                            Duplicar
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="Archive" className="w-4 h-4 mr-2" />
                            Arquivar
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

      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 lg:col-span-4">
          <div className="intro-y box p-5">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-theme-9 rounded-full mr-3"></div>
              <span className="truncate text-lg font-medium">
                Serviços Ativos
              </span>
            </div>
            <div className="text-3xl font-medium leading-8 mt-6">28</div>
            <div className="text-base text-slate-500 mt-1">
              De 35 cadastrados
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="intro-y box p-5">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-theme-11 rounded-full mr-3"></div>
              <span className="truncate text-lg font-medium">
                Valor Médio/Hora
              </span>
            </div>
            <div className="text-3xl font-medium leading-8 mt-6">R$ 425</div>
            <div className="text-base text-slate-500 mt-1">
              Todos os serviços
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="intro-y box p-5">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-theme-12 rounded-full mr-3"></div>
              <span className="truncate text-lg font-medium">
                Área Mais Rentável
              </span>
            </div>
            <div className="text-3xl font-medium leading-8 mt-6 text-success">
              Criminal
            </div>
            <div className="text-base text-slate-500 mt-1">R$ 600/hora</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
