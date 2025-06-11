import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  fetchIntimations,
  markIntimationsAsRead,
  markIntimationsAsUnread,
  setFilters,
  clearFilters,
} from "@/stores/intimationsSlice";
import type { Intimation } from "@/types/legal-cases";

// Components
import Lucide from "@/components/Base/Lucide";
import { FormInput, FormSelect } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";
import Alert from "@/components/Base/Alert";
import Pagination from "@/components/Base/Pagination";
import { Menu } from "@/components/Base/Headless";

const IntimationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { intimations, unreadCount, loading, error, filters } = useAppSelector(
    (state) => state.intimations,
  );

  const [selectedIntimations, setSelectedIntimations] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(fetchIntimations(filters));
  }, [dispatch, filters]);

  const handleSearch = () => {
    const searchFilters = {
      ...filters,
      // In a real implementation, you'd add search functionality to the API
    };
    dispatch(setFilters(searchFilters));
  };

  const handleMarkAsRead = async (intimationIds: string[]) => {
    try {
      await dispatch(markIntimationsAsRead(intimationIds)).unwrap();
      setSelectedIntimations([]);
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleMarkAsUnread = async (intimationIds: string[]) => {
    try {
      await dispatch(markIntimationsAsUnread(intimationIds)).unwrap();
      setSelectedIntimations([]);
    } catch (error) {
      console.error("Error marking as unread:", error);
    }
  };

  const handleSelectAll = () => {
    if (selectedIntimations.length === paginatedIntimations.length) {
      setSelectedIntimations([]);
    } else {
      setSelectedIntimations(paginatedIntimations.map((i) => i.id));
    }
  };

  const handleSelectIntimation = (intimationId: string) => {
    setSelectedIntimations((prev) =>
      prev.includes(intimationId)
        ? prev.filter((id) => id !== intimationId)
        : [...prev, intimationId],
    );
  };

  const handleApplyFilters = (newFilters: any) => {
    dispatch(setFilters(newFilters));
    setShowFilters(false);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Filter intimations based on search
  const filteredIntimations = intimations.filter(
    (intimation) =>
      intimation.numeroProcesso
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      intimation.conteudo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intimation.tribunal.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Paginate results
  const totalPages = Math.ceil(filteredIntimations.length / itemsPerPage);
  const paginatedIntimations = filteredIntimations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Intimações e Publicações
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {filteredIntimations.length} intimações encontradas
            {unreadCount > 0 && (
              <span className="ml-2 text-red-600 font-medium">
                • {unreadCount} não lidas
              </span>
            )}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(fetchIntimations(filters))}
            disabled={loading}
          >
            {loading ? (
              <LoadingIcon icon="oval" className="w-4 h-4 mr-2" />
            ) : (
              <Lucide icon="RefreshCw" className="w-4 h-4 mr-2" />
            )}
            Atualizar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // Navigate to intimation sources configuration
            }}
          >
            <Lucide icon="Settings" className="w-4 h-4 mr-2" />
            Configurar Fontes
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
              placeholder="Buscar por número do processo, conteúdo ou tribunal..."
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
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setSearchTerm("");
                dispatch(clearFilters());
              }}
            >
              <Lucide icon="X" className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormSelect
                value={
                  filters.lido === undefined ? "" : filters.lido.toString()
                }
                onChange={(e) => {
                  const value = e.target.value;
                  handleApplyFilters({
                    ...filters,
                    lido: value === "" ? undefined : value === "true",
                  });
                }}
              >
                <option value="">Todas as intimações</option>
                <option value="false">Não lidas</option>
                <option value="true">Lidas</option>
              </FormSelect>

              <FormInput
                type="date"
                placeholder="Data inicial"
                value={filters.dataInicio || ""}
                onChange={(e) => {
                  handleApplyFilters({
                    ...filters,
                    dataInicio: e.target.value || undefined,
                  });
                }}
              />

              <FormInput
                type="date"
                placeholder="Data final"
                value={filters.dataFim || ""}
                onChange={(e) => {
                  handleApplyFilters({
                    ...filters,
                    dataFim: e.target.value || undefined,
                  });
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedIntimations.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {selectedIntimations.length} intimações selecionadas
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleMarkAsRead(selectedIntimations)}
              >
                <Lucide icon="Check" className="w-4 h-4 mr-2" />
                Marcar como Lidas
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleMarkAsUnread(selectedIntimations)}
              >
                <Lucide icon="Eye" className="w-4 h-4 mr-2" />
                Marcar como Não Lidas
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setSelectedIntimations([])}
              >
                <Lucide icon="X" className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

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
            Carregando intimações...
          </span>
        </div>
      )}

      {/* Content */}
      {!loading && (
        <>
          {/* Select All */}
          {paginatedIntimations.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    selectedIntimations.length ===
                      paginatedIntimations.length &&
                    paginatedIntimations.length > 0
                  }
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                  Selecionar todas as intimações desta página
                </label>
              </div>
            </div>
          )}

          {/* Intimations List */}
          {paginatedIntimations.length > 0 ? (
            <div className="space-y-4">
              {paginatedIntimations.map((intimation) => (
                <div
                  key={intimation.id}
                  className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm border transition-all duration-200 ${
                    intimation.lido
                      ? "border-slate-200 dark:border-slate-700"
                      : "border-blue-200 dark:border-blue-700 bg-blue-50/30 dark:bg-blue-900/10"
                  } ${
                    selectedIntimations.includes(intimation.id)
                      ? "ring-2 ring-primary/20"
                      : ""
                  }`}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedIntimations.includes(intimation.id)}
                          onChange={() => handleSelectIntimation(intimation.id)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <div
                          className={`w-3 h-3 rounded-full ${
                            intimation.lido ? "bg-slate-400" : "bg-blue-500"
                          }`}
                        />
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-mono text-sm font-medium text-slate-700 dark:text-slate-300">
                              {intimation.numeroProcesso}
                            </span>
                            {intimation.urgente && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200">
                                <Lucide
                                  icon="AlertTriangle"
                                  className="w-3 h-3 mr-1"
                                />
                                Urgente
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                            <div className="flex items-center">
                              <Lucide
                                icon="Calendar"
                                className="w-3 h-3 mr-1"
                              />
                              <span>
                                {formatDate(intimation.dataMovimento)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Lucide
                                icon="Building"
                                className="w-3 h-3 mr-1"
                              />
                              <span>{intimation.tribunal}</span>
                            </div>
                            {intimation.vara && (
                              <div className="flex items-center">
                                <Lucide
                                  icon="MapPin"
                                  className="w-3 h-3 mr-1"
                                />
                                <span>{intimation.vara}</span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <Lucide icon="Tag" className="w-3 h-3 mr-1" />
                              <span>{intimation.fonte}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {intimation.dataLimitePrazo && (
                          <div className="flex items-center text-xs text-amber-600 dark:text-amber-400 mr-4">
                            <Lucide icon="Clock" className="w-3 h-3 mr-1" />
                            <span>
                              Prazo:{" "}
                              {new Date(
                                intimation.dataLimitePrazo,
                              ).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        )}

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
                                intimation.lido
                                  ? handleMarkAsUnread([intimation.id])
                                  : handleMarkAsRead([intimation.id])
                              }
                            >
                              <Lucide
                                icon={intimation.lido ? "Eye" : "Check"}
                                className="w-4 h-4 mr-3"
                              />
                              {intimation.lido
                                ? "Marcar como não lida"
                                : "Marcar como lida"}
                            </Menu.Item>
                            <Menu.Item>
                              <Lucide icon="Share" className="w-4 h-4 mr-3" />
                              Compartilhar
                            </Menu.Item>
                            <Menu.Item>
                              <Lucide
                                icon="Bookmark"
                                className="w-4 h-4 mr-3"
                              />
                              Favoritar
                            </Menu.Item>
                            <Menu.Item>
                              <Lucide
                                icon="FileText"
                                className="w-4 h-4 mr-3"
                              />
                              Ver Processo
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        {truncateText(intimation.conteudo)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center space-x-4">
                        {!intimation.lido && (
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleMarkAsRead([intimation.id])}
                          >
                            <Lucide icon="Check" className="w-3 h-3 mr-1" />
                            Marcar como lida
                          </Button>
                        )}
                        <Button variant="outline-secondary" size="sm">
                          <Lucide
                            icon="ExternalLink"
                            className="w-3 h-3 mr-1"
                          />
                          Ver processo
                        </Button>
                      </div>

                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {intimation.lido ? "Lida" : "Não lida"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Lucide
                icon="Bell"
                className="w-16 h-16 text-slate-400 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Nenhuma intimação encontrada
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Não há intimações correspondentes aos filtros aplicados
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setSearchTerm("");
                  dispatch(clearFilters());
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredIntimations.length,
                )}{" "}
                de {filteredIntimations.length} intimações
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default IntimationsPage;
