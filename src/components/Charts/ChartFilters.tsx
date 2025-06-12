import { useState, useEffect } from "react";
import { FormSelect, FormInput, FormLabel } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";
import Litepicker from "@/components/Base/Litepicker";

interface ChartFiltersProps {
  onFiltersChange: (filters: ChartFilterData) => void;
  availableFilters?: {
    dateRange?: boolean;
    category?: boolean;
    status?: boolean;
    custom?: boolean;
  };
  customFilters?: Array<{
    key: string;
    label: string;
    type: "select" | "input" | "date";
    options?: Array<{ value: string; label: string }>;
  }>;
}

export interface ChartFilterData {
  dateRange?: {
    start: string;
    end: string;
  };
  category?: string;
  status?: string;
  customFilters?: Record<string, any>;
}

const ChartFilters: React.FC<ChartFiltersProps> = ({
  onFiltersChange,
  availableFilters = { dateRange: true, category: true, status: true },
  customFilters = [],
}) => {
  const [filters, setFilters] = useState<ChartFilterData>({
    dateRange: {
      start: "",
      end: "",
    },
    category: "",
    status: "",
    customFilters: {},
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Predefined filter options
  const categories = [
    { value: "", label: "Todas as Categorias" },
    { value: "revenue", label: "Receita" },
    { value: "cases", label: "Casos" },
    { value: "clients", label: "Clientes" },
    { value: "processes", label: "Processos" },
    { value: "meetings", label: "Reuniões" },
  ];

  const statuses = [
    { value: "", label: "Todos os Status" },
    { value: "active", label: "Ativo" },
    { value: "pending", label: "Pendente" },
    { value: "completed", label: "Concluído" },
    { value: "cancelled", label: "Cancelado" },
  ];

  // Quick date presets
  const datePresets = [
    { label: "Últimos 7 dias", days: 7 },
    { label: "Últimos 30 dias", days: 30 },
    { label: "Últimos 3 meses", days: 90 },
    { label: "Último ano", days: 365 },
  ];

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const updateFilter = (key: keyof ChartFilterData, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateCustomFilter = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      customFilters: {
        ...prev.customFilters,
        [key]: value,
      },
    }));
  };

  const applyDatePreset = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);

    updateFilter("dateRange", {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    });
  };

  const clearFilters = () => {
    setFilters({
      dateRange: { start: "", end: "" },
      category: "",
      status: "",
      customFilters: {},
    });
  };

  const exportData = (format: "csv" | "excel" | "pdf") => {
    // This would connect to your export service
    console.log(`Exporting chart data as ${format} with filters:`, filters);
    // Implementation would depend on your backend API
  };

  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-white dark:bg-darkmode-600 dark:border-darkmode-400">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium">Filtros de Dados</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Lucide
              icon={isExpanded ? "ChevronUp" : "ChevronDown"}
              className="w-4 h-4 mr-1"
            />
            {isExpanded ? "Ocultar" : "Expandir"}
          </Button>

          <Menu>
            <Menu.Button as={Button} variant="outline-primary" size="sm">
              <Lucide icon="Download" className="w-4 h-4 mr-1" />
              Exportar
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item onClick={() => exportData("csv")}>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                CSV
              </Menu.Item>
              <Menu.Item onClick={() => exportData("excel")}>
                <Lucide icon="FileSpreadsheet" className="w-4 h-4 mr-2" />
                Excel
              </Menu.Item>
              <Menu.Item onClick={() => exportData("pdf")}>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" />
                PDF
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <div className={`space-y-4 ${!isExpanded ? "hidden" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Range Filter */}
          {availableFilters.dateRange && (
            <div className="space-y-2">
              <FormLabel>Período</FormLabel>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <FormInput
                    type="date"
                    value={filters.dateRange?.start || ""}
                    onChange={(e) =>
                      updateFilter("dateRange", {
                        ...filters.dateRange,
                        start: e.target.value,
                      })
                    }
                    placeholder="Data inicial"
                  />
                  <FormInput
                    type="date"
                    value={filters.dateRange?.end || ""}
                    onChange={(e) =>
                      updateFilter("dateRange", {
                        ...filters.dateRange,
                        end: e.target.value,
                      })
                    }
                    placeholder="Data final"
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {datePresets.map((preset) => (
                    <Button
                      key={preset.days}
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => applyDatePreset(preset.days)}
                      className="text-xs"
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Category Filter */}
          {availableFilters.category && (
            <div>
              <FormLabel>Categoria</FormLabel>
              <FormSelect
                value={filters.category || ""}
                onChange={(e) => updateFilter("category", e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </FormSelect>
            </div>
          )}

          {/* Status Filter */}
          {availableFilters.status && (
            <div>
              <FormLabel>Status</FormLabel>
              <FormSelect
                value={filters.status || ""}
                onChange={(e) => updateFilter("status", e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </FormSelect>
            </div>
          )}

          {/* Custom Filters */}
          {customFilters.map((filter) => (
            <div key={filter.key}>
              <FormLabel>{filter.label}</FormLabel>
              {filter.type === "select" && (
                <FormSelect
                  value={filters.customFilters?.[filter.key] || ""}
                  onChange={(e) =>
                    updateCustomFilter(filter.key, e.target.value)
                  }
                >
                  {filter.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FormSelect>
              )}
              {filter.type === "input" && (
                <FormInput
                  type="text"
                  value={filters.customFilters?.[filter.key] || ""}
                  onChange={(e) =>
                    updateCustomFilter(filter.key, e.target.value)
                  }
                  placeholder={filter.label}
                />
              )}
              {filter.type === "date" && (
                <FormInput
                  type="date"
                  value={filters.customFilters?.[filter.key] || ""}
                  onChange={(e) =>
                    updateCustomFilter(filter.key, e.target.value)
                  }
                />
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-darkmode-400">
          <Button variant="outline-secondary" size="sm" onClick={clearFilters}>
            <Lucide icon="X" className="w-4 h-4 mr-1" />
            Limpar Filtros
          </Button>

          <div className="text-sm text-slate-500">
            Filtros aplicados automaticamente
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartFilters;
