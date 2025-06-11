import { useState, useEffect } from "react";
import {
  FormSelect,
  FormInput,
  FormLabel,
  FormCheck,
} from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { Disclosure } from "@/components/Base/Headless";

interface MapFilter {
  categories: string[];
  regions: string[];
  dateRange: {
    start: string;
    end: string;
  };
  searchTerm: string;
  showClusters: boolean;
  radiusFilter: number;
  centerLocation?: {
    lat: number;
    lng: number;
  };
}

interface MapFiltersProps {
  onFiltersChange: (filters: MapFilter) => void;
  availableCategories?: string[];
  availableRegions?: string[];
  className?: string;
}

const MapFilters: React.FC<MapFiltersProps> = ({
  onFiltersChange,
  availableCategories = [
    "Tribunais",
    "Escritórios",
    "Clientes",
    "Cartórios",
    "Órgãos Públicos",
    "Outros",
  ],
  availableRegions = [
    "Centro",
    "Zona Norte",
    "Zona Sul",
    "Zona Leste",
    "Zona Oeste",
    "Grande São Paulo",
  ],
  className,
}) => {
  const [filters, setFilters] = useState<MapFilter>({
    categories: [],
    regions: [],
    dateRange: { start: "", end: "" },
    searchTerm: "",
    showClusters: true,
    radiusFilter: 10,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const updateFilter = <K extends keyof MapFilter>(
    key: K,
    value: MapFilter[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleRegion = (region: string) => {
    setFilters((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      regions: [],
      dateRange: { start: "", end: "" },
      searchTerm: "",
      showClusters: true,
      radiusFilter: 10,
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateFilter("centerLocation", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    }
  };

  return (
    <div
      className={`bg-white dark:bg-darkmode-600 border border-slate-200 dark:border-darkmode-400 rounded-lg ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-darkmode-400">
        <h3 className="text-base font-medium">Filtros do Mapa</h3>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Lucide
            icon={isExpanded ? "ChevronUp" : "ChevronDown"}
            className="w-4 h-4"
          />
        </Button>
      </div>

      {/* Filters Content */}
      <div className={`p-4 space-y-4 ${!isExpanded ? "hidden" : ""}`}>
        {/* Search */}
        <div>
          <FormLabel>Buscar Localização</FormLabel>
          <div className="relative">
            <FormInput
              type="text"
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
              placeholder="Digite endereço, nome ou CEP..."
              className="pr-10"
            />
            <Lucide
              icon="Search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400"
            />
          </div>
        </div>

        {/* Current Location */}
        <div>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={getCurrentLocation}
            className="w-full"
          >
            <Lucide icon="MapPin" className="w-4 h-4 mr-2" />
            Usar Minha Localização
          </Button>
        </div>

        {/* Categories */}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center justify-between w-full text-left">
                <FormLabel className="mb-0">Categorias</FormLabel>
                <Lucide
                  icon={open ? "ChevronUp" : "ChevronDown"}
                  className="w-4 h-4"
                />
              </Disclosure.Button>
              <Disclosure.Panel className="mt-2 space-y-2">
                {availableCategories.map((category) => (
                  <FormCheck key={category} className="flex items-center">
                    <FormCheck.Input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <FormCheck.Label className="ml-2 text-sm">
                      {category}
                    </FormCheck.Label>
                  </FormCheck>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Regions */}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center justify-between w-full text-left">
                <FormLabel className="mb-0">Regiões</FormLabel>
                <Lucide
                  icon={open ? "ChevronUp" : "ChevronDown"}
                  className="w-4 h-4"
                />
              </Disclosure.Button>
              <Disclosure.Panel className="mt-2 space-y-2">
                {availableRegions.map((region) => (
                  <FormCheck key={region} className="flex items-center">
                    <FormCheck.Input
                      type="checkbox"
                      checked={filters.regions.includes(region)}
                      onChange={() => toggleRegion(region)}
                    />
                    <FormCheck.Label className="ml-2 text-sm">
                      {region}
                    </FormCheck.Label>
                  </FormCheck>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Radius Filter */}
        <div>
          <FormLabel>Raio de Busca (km)</FormLabel>
          <div className="flex items-center space-x-2">
            <FormInput
              type="range"
              min="1"
              max="50"
              value={filters.radiusFilter}
              onChange={(e) =>
                updateFilter("radiusFilter", Number(e.target.value))
              }
              className="flex-1"
            />
            <span className="text-sm text-slate-500 min-w-[3rem]">
              {filters.radiusFilter}km
            </span>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <FormLabel>Período</FormLabel>
          <div className="grid grid-cols-2 gap-2">
            <FormInput
              type="date"
              value={filters.dateRange.start}
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
              value={filters.dateRange.end}
              onChange={(e) =>
                updateFilter("dateRange", {
                  ...filters.dateRange,
                  end: e.target.value,
                })
              }
              placeholder="Data final"
            />
          </div>
        </div>

        {/* Map Options */}
        <div className="space-y-2">
          <FormLabel>Opções de Visualização</FormLabel>
          <FormCheck className="flex items-center">
            <FormCheck.Input
              type="checkbox"
              checked={filters.showClusters}
              onChange={(e) => updateFilter("showClusters", e.target.checked)}
            />
            <FormCheck.Label className="ml-2 text-sm">
              Agrupar marcadores próximos
            </FormCheck.Label>
          </FormCheck>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-darkmode-400">
          <Button variant="outline-secondary" size="sm" onClick={clearFilters}>
            <Lucide icon="X" className="w-4 h-4 mr-1" />
            Limpar
          </Button>

          <div className="text-xs text-slate-500">
            {filters.categories.length + filters.regions.length > 0 && (
              <span>
                {filters.categories.length + filters.regions.length} filtro(s)
                aplicado(s)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapFilters;
