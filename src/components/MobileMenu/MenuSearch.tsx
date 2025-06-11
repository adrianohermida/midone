import { useState, useEffect, useMemo } from "react";
import { FormInput } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

interface MenuItem {
  icon?: string;
  pathname?: string;
  title: string;
  subMenu?: MenuItem[];
}

interface MenuSearchProps {
  menuItems: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  className?: string;
}

const MenuSearch: React.FC<MenuSearchProps> = ({
  menuItems,
  onItemClick,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const navigate = useNavigate();

  // Flatten menu items for search
  const flattenMenuItems = useMemo(() => {
    const flatten = (items: MenuItem[], parentTitle?: string): MenuItem[] => {
      let result: MenuItem[] = [];

      items.forEach((item) => {
        if (typeof item === "string") return; // Skip dividers

        const itemWithPath = {
          ...item,
          title: parentTitle ? `${parentTitle} > ${item.title}` : item.title,
        };

        if (item.pathname) {
          result.push(itemWithPath);
        }

        if (item.subMenu) {
          result = result.concat(flatten(item.subMenu, item.title));
        }
      });

      return result;
    };

    return flatten(menuItems);
  }, [menuItems]);

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const results = flattenMenuItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.pathname &&
          item.pathname.toLowerCase().includes(searchTerm.toLowerCase())),
    );

    setSearchResults(results);
  }, [searchTerm, flattenMenuItems]);

  const handleItemClick = (item: MenuItem) => {
    if (item.pathname) {
      navigate(item.pathname);
      onItemClick(item);
    }
    setSearchTerm("");
    setSearchResults([]);
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <div className={clsx("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <FormInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar no menu..."
          className="w-full pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-white/60"
        />
        <Lucide
          icon="Search"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
          >
            <Lucide icon="X" className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-darkmode-800 border border-slate-200 dark:border-darkmode-600 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
          {searchResults.length === 0 ? (
            <div className="p-4 text-center text-slate-500 dark:text-slate-400">
              <Lucide
                icon="SearchX"
                className="w-8 h-8 mx-auto mb-2 opacity-50"
              />
              <p className="text-sm">Nenhum resultado encontrado</p>
              <p className="text-xs">Tente termos diferentes</p>
            </div>
          ) : (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-darkmode-600">
                {searchResults.length} resultado(s) encontrado(s)
              </div>
              {searchResults.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className="w-full px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-darkmode-700 border-b border-slate-100 dark:border-darkmode-700 last:border-b-0 focus:outline-none focus:bg-slate-100 dark:focus:bg-darkmode-700"
                >
                  <div className="flex items-center">
                    {item.icon && (
                      <Lucide
                        icon={item.icon as any}
                        className="w-4 h-4 mr-3 text-slate-500 dark:text-slate-400"
                      />
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {item.title.split(" > ").pop()}
                      </div>
                      {item.title.includes(" > ") && (
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {item.title.split(" > ").slice(0, -1).join(" > ")}
                        </div>
                      )}
                      {item.pathname && (
                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                          {item.pathname}
                        </div>
                      )}
                    </div>
                    <Lucide
                      icon="ArrowRight"
                      className="w-4 h-4 text-slate-400 dark:text-slate-500"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Backdrop for mobile */}
      {isSearching && searchTerm && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={clearSearch}
        />
      )}
    </div>
  );
};

export default MenuSearch;
