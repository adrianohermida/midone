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
import Litepicker from "@/components/Base/Litepicker";
import crmData from "@/data/crm.json";

function Main() {
  const [viewMode, setViewMode] = useState("table");
  const [filterTipo, setFilterTipo] = useState([]);
  const [filterCategoria, setFilterCategoria] = useState("");
  const [filterTags, setFilterTags] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  const contatos = crmData.contatos;
  const metricas = crmData.metricas.contatos;

  const getTipoColor = (tipo: string) => {
    return tipo === "Pessoa Física"
      ? "bg-primary/10 text-primary"
      : "bg-success/10 text-success";
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Cliente":
        return "text-success";
      case "Lead":
        return "text-warning";
      case "Parte Adversa":
        return "text-danger";
      default:
        return "text-slate-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "text-success";
      case "Prospecção":
        return "text-warning";
      case "Em Processo":
        return "text-primary";
      case "Inativo":
        return "text-danger";
      default:
        return "text-slate-500";
    }
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Gestão de Contatos</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md">
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Novo Contato
          </Button>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="MoreVertical" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-48">
              <Menu.Item>
                <Lucide icon="Upload" className="w-4 h-4 mr-2" />
                Importar Planilha
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Download" className="w-4 h-4 mr-2" />
                Exportar Contatos
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Users" className="w-4 h-4 mr-2" />
                Detectar Duplicatas
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Tags" className="w-4 h-4 mr-2" />
                Gerenciar Tags
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <Breadcrumb className="mt-2 intro-y">
        <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
        <Breadcrumb.Link to="/crm/contatos" active={true}>
          CRM - Contatos
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
                    {metricas.novosUltimoMes}
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {metricas.total}
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
                  icon="UserCheck"
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
                {metricas.clientes}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Clientes Ativos
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
          <div className="report-box zoom-in">
            <div className="box p-5">
              <div className="flex">
                <Lucide
                  icon="Target"
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
                {metricas.leads}
              </div>
              <div className="text-base text-slate-500 mt-1">
                Leads em Prospecção
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
                    {metricas.conversaoLeadCliente.toFixed(1)}%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="text-3xl font-medium leading-8 mt-6">
                {metricas.conversaoLeadCliente.toFixed(1)}%
              </div>
              <div className="text-base text-slate-500 mt-1">
                Taxa de Conversão
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Controles */}
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
                    placeholder="Nome, email, CPF/CNPJ..."
                  />
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Tipo:
                  </label>
                  <TomSelect
                    value={filterTipo}
                    onChange={setFilterTipo}
                    options={{
                      placeholder: "Todos os tipos",
                    }}
                    className="mt-2 sm:mt-0"
                    multiple
                  >
                    <option value="Pessoa Física">Pessoa Física</option>
                    <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                  </TomSelect>
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Categoria:
                  </label>
                  <FormSelect
                    className="mt-2 sm:mt-0"
                    value={filterCategoria}
                    onChange={(e) => setFilterCategoria(e.target.value)}
                  >
                    <option value="">Todas</option>
                    <option value="Cliente">Cliente</option>
                    <option value="Lead">Lead</option>
                    <option value="Parte Adversa">Parte Adversa</option>
                    <option value="Fornecedor">Fornecedor</option>
                  </FormSelect>
                </div>
                <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label className="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
                    Tags:
                  </label>
                  <TomSelect
                    value={filterTags}
                    onChange={setFilterTags}
                    options={{
                      placeholder: "Filtrar por tags",
                    }}
                    className="mt-2 sm:mt-0"
                    multiple
                  >
                    <option value="VIP">VIP</option>
                    <option value="Empresarial">Empresarial</option>
                    <option value="Trabalhista">Trabalhista</option>
                    <option value="Civil">Civil</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Urgente">Urgente</option>
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
              <div className="flex mt-5 sm:mt-0">
                <Button
                  variant={
                    viewMode === "table" ? "primary" : "outline-secondary"
                  }
                  className="w-1/2 sm:w-auto mr-2"
                  onClick={() => setViewMode("table")}
                >
                  <Lucide icon="List" className="w-4 h-4 mr-2" />
                  Tabela
                </Button>
                <Button
                  variant={
                    viewMode === "cards" ? "primary" : "outline-secondary"
                  }
                  className="w-1/2 sm:w-auto"
                  onClick={() => setViewMode("cards")}
                >
                  <Lucide icon="Grid3x3" className="w-4 h-4 mr-2" />
                  Cards
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualização Tabela */}
      {viewMode === "table" && (
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12 overflow-auto intro-y">
            <Table className="border-spacing-y-[10px] border-separate -mt-2">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="border-b-0 whitespace-nowrap">
                    CONTATO
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    TIPO / CATEGORIA
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    CONTATO
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    LOCALIZAÇÃO
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    ÚLTIMO CONTATO
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    TAGS
                  </Table.Th>
                  <Table.Th className="text-center border-b-0 whitespace-nowrap">
                    AÇÕES
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {contatos.map((contato, index) => (
                  <Table.Tr key={index} className="intro-x">
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div className="flex items-center">
                        <div className="w-10 h-10 image-fit zoom-in">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Lucide
                              icon={
                                contato.tipo === "Pessoa Física"
                                  ? "User"
                                  : "Building"
                              }
                              className="w-5 h-5 text-primary"
                            />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium whitespace-nowrap">
                            {contato.nome}
                          </div>
                          <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                            {contato.documento}
                          </div>
                        </div>
                      </div>
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div
                        className={clsx([
                          "px-2 py-1 rounded-full text-xs font-medium inline-block mb-1",
                          getTipoColor(contato.tipo),
                        ])}
                      >
                        {contato.tipo}
                      </div>
                      <div
                        className={clsx([
                          "font-medium text-sm",
                          getCategoriaColor(contato.categoria),
                        ])}
                      >
                        {contato.categoria}
                      </div>
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div className="text-sm">
                        <div>{contato.email}</div>
                        <div className="text-slate-500">{contato.celular}</div>
                      </div>
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div className="text-sm">
                        <div>
                          {contato.endereco.cidade}/{contato.endereco.estado}
                        </div>
                        <div className="text-slate-500">
                          {contato.endereco.bairro}
                        </div>
                      </div>
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div className="text-sm">
                        {new Date(contato.ultimoContato).toLocaleDateString(
                          "pt-BR",
                        )}
                      </div>
                      <div className="text-slate-500 text-xs">
                        {Math.ceil(
                          (new Date().getTime() -
                            new Date(contato.ultimoContato).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        dias atrás
                      </div>
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div className="flex flex-wrap gap-1">
                        {contato.tags.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {contato.tags.length > 2 && (
                          <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">
                            +{contato.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div className="flex items-center justify-center">
                        <Tippy content="Ver detalhes" className="tooltip">
                          <a
                            className="flex items-center mr-3 text-primary"
                            href={`/crm/contatos/${contato.id}`}
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
                              Editar Contato
                            </Menu.Item>
                            <Menu.Item>
                              <Lucide
                                icon="MessageCircle"
                                className="w-4 h-4 mr-2"
                              />
                              Enviar Mensagem
                            </Menu.Item>
                            <Menu.Item>
                              <Lucide icon="Plus" className="w-4 h-4 mr-2" />
                              Criar Negócio
                            </Menu.Item>
                            <Menu.Item>
                              <Lucide
                                icon="FileText"
                                className="w-4 h-4 mr-2"
                              />
                              Histórico
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
      )}

      {/* Visualização Cards */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-12 gap-6 mt-5">
          {contatos.map((contato, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-6 xl:col-span-4 intro-y"
            >
              <div className="box p-5">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Lucide
                      icon={
                        contato.tipo === "Pessoa Física" ? "User" : "Building"
                      }
                      className="w-6 h-6 text-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-base">{contato.nome}</div>
                    <div className="text-slate-500 text-sm mt-1">
                      {contato.documento}
                    </div>
                    <div className="flex items-center mt-2">
                      <div
                        className={clsx([
                          "px-2 py-1 rounded-full text-xs font-medium mr-2",
                          getTipoColor(contato.tipo),
                        ])}
                      >
                        {contato.tipo}
                      </div>
                      <div
                        className={clsx([
                          "text-xs font-medium",
                          getCategoriaColor(contato.categoria),
                        ])}
                      >
                        {contato.categoria}
                      </div>
                    </div>
                  </div>
                  <Menu>
                    <Menu.Button className="flex items-center text-slate-500">
                      <Lucide icon="MoreVertical" className="w-4 h-4" />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item>
                        <Lucide icon="Eye" className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="Edit" className="w-4 h-4 mr-2" />
                        Editar
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="MessageCircle" className="w-4 h-4 mr-2" />
                        Contatar
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Lucide
                      icon="Mail"
                      className="w-4 h-4 mr-2 text-slate-500"
                    />
                    <span className="truncate">{contato.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Lucide
                      icon="Phone"
                      className="w-4 h-4 mr-2 text-slate-500"
                    />
                    <span>{contato.celular}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Lucide
                      icon="MapPin"
                      className="w-4 h-4 mr-2 text-slate-500"
                    />
                    <span>
                      {contato.endereco.cidade}/{contato.endereco.estado}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    {contato.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      Último contato:{" "}
                      {new Date(contato.ultimoContato).toLocaleDateString(
                        "pt-BR",
                      )}
                    </div>
                    <div
                      className={clsx([
                        "text-xs font-medium",
                        getStatusColor(contato.status),
                      ])}
                    >
                      {contato.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Main;
