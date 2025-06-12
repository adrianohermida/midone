import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  fetchCases,
  setFilters,
  clearFilters,
  setPage,
  setSorting,
  updateCaseStatus,
} from "@/stores/legalCasesSlice";
import type {
  CaseFilters,
  LegalArea,
  CaseStatus,
  CasePriority,
} from "@/types/legal-cases";

// Components
import Lucide from "@/components/Base/Lucide";
import { FormInput, FormSelect } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Pagination from "@/components/Base/Pagination";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { Menu } from "@/components/Base/Headless";
import Table from "@/components/Base/Table";
import Alert from "@/components/Base/Alert";

// Legal Cases Components
import CaseCard from "@/components/LegalCases/CaseCard";

const LegalCasesList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { cases, loading, error, filters, pagination, sortBy, sortOrder } =
    useAppSelector((state) => state.legalCases);

  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [localFilters, setLocalFilters] = useState<CaseFilters>({});

  // Legal Areas options
  const legalAreas: { value: LegalArea; label: string }[] = [
    { value: "civil", label: "Cível" },
    { value: "trabalhista", label: "Trabalhista" },
    { value: "criminal", label: "Criminal" },
    { value: "tributario", label: "Tributário" },
    { value: "familia", label: "Família" },
    { value: "consumidor", label: "Consumidor" },
    { value: "previdenciario", label: "Previdenciário" },
    { value: "administrativo", label: "Administrativo" },
    { value: "empresarial", label: "Empresarial" },
    { value: "ambiental", label: "Ambiental" },
  ];

  // Status options
  const statusOptions: { value: CaseStatus; label: string }[] = [
    { value: "ativo", label: "Ativo" },
    { value: "suspenso", label: "Suspenso" },
    { value: "arquivado", label: "Arquivado" },
    { value: "finalizado", label: "Finalizado" },
    { value: "em_recurso", label: "Em Recurso" },
  ];

  // Priority options
  const priorityOptions: { value: CasePriority; label: string }[] = [
    { value: "alta", label: "Alta" },
    { value: "media", label: "Média" },
    { value: "baixa", label: "Baixa" },
  ];

  useEffect(() => {
    dispatch(
      fetchCases({ filters, page: pagination.page, limit: pagination.limit }),
    );
  }, [dispatch, filters, pagination.page, pagination.limit]);

  const handleSearch = () => {
    const newFilters = {
      ...localFilters,
      search: searchTerm,
    };
    dispatch(setFilters(newFilters));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setLocalFilters({});
    dispatch(clearFilters());
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
    setShowFilters(false);
  };

  const handleSort = (field: string) => {
    const newSortOrder =
      sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    dispatch(setSorting({ sortBy: field, sortOrder: newSortOrder }));
  };

  const handleStatusChange = (caseId: string, newStatus: CaseStatus) => {
    dispatch(updateCaseStatus({ id: caseId, status: newStatus }));
  };

  const getPriorityColor = (priority: CasePriority) => {
    switch (priority) {
      case "alta":
        return "text-red-600 bg-red-50 border-red-200";
      case "media":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "baixa":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case "ativo":
        return "text-green-600 bg-green-50 border-green-200";
      case "suspenso":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "arquivado":
        return "text-slate-600 bg-slate-50 border-slate-200";
      case "finalizado":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "em_recurso":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Gestão de Processos
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {pagination.total} processos encontrados
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/legal-cases/tree")}
          >
            <Lucide icon="GitBranch" className="w-4 h-4 mr-2" />
            Árvore Processual
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate("/legal-cases/create")}
          >
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Novo Processo
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Lucide
              icon="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4"
            />
            <FormInput
              type="search"
              placeholder="Buscar por número, título, cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button variant="outline-primary" onClick={handleSearch}>
              <Lucide icon="Search" className="w-4 h-4 mr-2" />
              Buscar
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Lucide icon="Filter" className="w-4 h-4 mr-2" />
              Filtros
              {Object.keys(filters).length > 0 && (
                <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {Object.keys(filters).length}
                </span>
              )}
            </Button>
            <Button variant="outline-secondary" onClick={handleClearFilters}>
              <Lucide icon="X" className="w-4 h-4" />
            </Button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-2 text-sm ${
                viewMode === "cards"
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              <Lucide icon="Grid3X3" className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-2 text-sm ${
                viewMode === "table"
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              <Lucide icon="List" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormSelect
                value={localFilters.area?.[0] || ""}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    area: e.target.value
                      ? [e.target.value as LegalArea]
                      : undefined,
                  }))
                }
              >
                <option value="">Todas as Áreas</option>
                {legalAreas.map((area) => (
                  <option key={area.value} value={area.value}>
                    {area.label}
                  </option>
                ))}
              </FormSelect>

              <FormSelect
                value={localFilters.status?.[0] || ""}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    status: e.target.value
                      ? [e.target.value as CaseStatus]
                      : undefined,
                  }))
                }
              >
                <option value="">Todos os Status</option>
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </FormSelect>

              <FormSelect
                value={localFilters.prioridade?.[0] || ""}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    prioridade: e.target.value
                      ? [e.target.value as CasePriority]
                      : undefined,
                  }))
                }
              >
                <option value="">Todas as Prioridades</option>
                {priorityOptions.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </FormSelect>

              <FormInput
                type="text"
                placeholder="Tribunal"
                value={localFilters.tribunal?.[0] || ""}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    tribunal: e.target.value ? [e.target.value] : undefined,
                  }))
                }
              />
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <Button
                variant="outline-secondary"
                onClick={() => setShowFilters(false)}
              >
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleApplyFilters}>
                Aplicar Filtros
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="outline-danger" className="flex items-center">
          <Lucide icon="AlertCircle" className="w-4 h-4 mr-2" />
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <LoadingIcon icon="oval" className="w-8 h-8 mr-3" />
          <span className="text-slate-600 dark:text-slate-400">
            Carregando processos...
          </span>
        </div>
      )}

      {/* Content */}
      {!loading && (
        <>
          {viewMode === "cards" ? (
            // Cards View
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {cases.map((case_) => (
                <CaseCard
                  key={case_.id}
                  case={case_}
                  onClick={() => navigate(`/legal-cases/${case_.id}`)}
                  onStatusChange={(status) =>
                    handleStatusChange(case_.id, status)
                  }
                />
              ))}
            </div>
          ) : (
            // Table View
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <Table className="w-full">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th
                      className="cursor-pointer select-none"
                      onClick={() => handleSort("numeroProcesso")}
                    >
                      <div className="flex items-center">
                        Número do Processo
                        <Lucide
                          icon={
                            sortBy === "numeroProcesso"
                              ? sortOrder === "asc"
                                ? "ChevronUp"
                                : "ChevronDown"
                              : "ChevronsUpDown"
                          }
                          className="w-4 h-4 ml-1"
                        />
                      </div>
                    </Table.Th>
                    <Table.Th
                      className="cursor-pointer select-none"
                      onClick={() => handleSort("titulo")}
                    >
                      <div className="flex items-center">
                        Título
                        <Lucide
                          icon={
                            sortBy === "titulo"
                              ? sortOrder === "asc"
                                ? "ChevronUp"
                                : "ChevronDown"
                              : "ChevronsUpDown"
                          }
                          className="w-4 h-4 ml-1"
                        />
                      </div>
                    </Table.Th>
                    <Table.Th>Cliente</Table.Th>
                    <Table.Th>Área</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Prioridade</Table.Th>
                    <Table.Th
                      className="cursor-pointer select-none"
                      onClick={() => handleSort("updatedAt")}
                    >
                      <div className="flex items-center">
                        Atualizado em
                        <Lucide
                          icon={
                            sortBy === "updatedAt"
                              ? sortOrder === "asc"
                                ? "ChevronUp"
                                : "ChevronDown"
                              : "ChevronsUpDown"
                          }
                          className="w-4 h-4 ml-1"
                        />
                      </div>
                    </Table.Th>
                    <Table.Th>Ações</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {cases.map((case_) => (
                    <Table.Tr
                      key={case_.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <Table.Td className="font-mono text-sm">
                        {case_.numeroProcesso}
                      </Table.Td>
                      <Table.Td>
                        <div className="max-w-xs truncate">{case_.titulo}</div>
                      </Table.Td>
                      <Table.Td>{case_.cliente.nome}</Table.Td>
                      <Table.Td>
                        <span className="capitalize">
                          {
                            legalAreas.find((a) => a.value === case_.area)
                              ?.label
                          }
                        </span>
                      </Table.Td>
                      <Table.Td>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(case_.status)}`}
                        >
                          {
                            statusOptions.find((s) => s.value === case_.status)
                              ?.label
                          }
                        </span>
                      </Table.Td>
                      <Table.Td>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(case_.prioridade)}`}
                        >
                          {
                            priorityOptions.find(
                              (p) => p.value === case_.prioridade,
                            )?.label
                          }
                        </span>
                      </Table.Td>
                      <Table.Td className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(case_.updatedAt).toLocaleDateString("pt-BR")}
                      </Table.Td>
                      <Table.Td>
                        <Menu>
                          <Menu.Button
                            as={Button}
                            variant="outline-secondary"
                            size="sm"
                          >
                            <Lucide icon="MoreHorizontal" className="w-4 h-4" />
                          </Menu.Button>
                          <Menu.Items className="w-48">
                            <Menu.Item
                              onClick={() =>
                                navigate(`/legal-cases/${case_.id}`)
                              }
                            >
                              <Lucide icon="Eye" className="w-4 h-4 mr-3" />
                              Ver Detalhes
                            </Menu.Item>
                            <Menu.Item
                              onClick={() =>
                                navigate(`/legal-cases/${case_.id}/edit`)
                              }
                            >
                              <Lucide icon="Edit3" className="w-4 h-4 mr-3" />
                              Editar
                            </Menu.Item>
                            <Menu.Item
                              onClick={() =>
                                navigate(`/legal-cases/${case_.id}/timeline`)
                              }
                            >
                              <Lucide icon="Clock" className="w-4 h-4 mr-3" />
                              Timeline
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          )}

          {/* Empty State */}
          {cases.length === 0 && !loading && (
            <div className="text-center py-12">
              <Lucide
                icon="Folder"
                className="w-16 h-16 text-slate-400 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Nenhum processo encontrado
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Tente ajustar os filtros ou criar um novo processo
              </p>
              <Button
                variant="primary"
                onClick={() => navigate("/legal-cases/create")}
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2" />
                Novo Processo
              </Button>
            </div>
          )}

          {/* Pagination */}
          {cases.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Mostrando {(pagination.page - 1) * pagination.limit + 1} a{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                de {pagination.total} processos
              </div>
              <Pagination
                currentPage={pagination.page}
                totalPages={Math.ceil(pagination.total / pagination.limit)}
                onPageChange={(page) => dispatch(setPage(page))}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LegalCasesList;
