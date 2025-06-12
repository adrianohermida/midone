import React, { useState, useEffect } from "react";
import { Grid, List, MoreHorizontal } from "lucide-react";
import Button from "../Base/Button";

interface ResponsiveGridProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  viewModes?: ("grid" | "list" | "table")[];
  defaultView?: "grid" | "list" | "table";
  spacing?: "tight" | "normal" | "loose";
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
    ultrawide: number;
  };
  className?: string;
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  title,
  subtitle,
  actions,
  searchable = false,
  sortable = false,
  filterable = false,
  viewModes = ["grid", "list"],
  defaultView = "grid",
  spacing = "normal",
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    ultrawide: 4,
  },
  className = "",
}) => {
  const [currentView, setCurrentView] = useState(defaultView);
  const [deviceType, setDeviceType] = useState<
    "mobile" | "tablet" | "desktop" | "ultrawide"
  >("desktop");

  // Detectar tipo de dispositivo
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else if (width < 1920) {
        setDeviceType("desktop");
      } else {
        setDeviceType("ultrawide");
      }
    };

    detectDevice();
    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
  }, []);

  // Configurações de espaçamento
  const spacingClasses = {
    tight: "gap-2 lg:gap-3",
    normal: "gap-4 lg:gap-6",
    loose: "gap-6 lg:gap-8",
  };

  // Configurações de colunas responsivas
  const getGridClasses = () => {
    const colsMap = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    };

    if (currentView === "list") {
      return "grid-cols-1";
    }

    if (currentView === "table") {
      return "grid-cols-1";
    }

    // Grid view
    const mobileClass = colsMap[Math.min(columns.mobile, 3)] || "grid-cols-1";
    const tabletClass = `md:${colsMap[Math.min(columns.tablet, 4)] || "grid-cols-2"}`;
    const desktopClass = `lg:${colsMap[Math.min(columns.desktop, 6)] || "grid-cols-3"}`;
    const ultrawideClass = `xl:${colsMap[Math.min(columns.ultrawide, 6)] || "grid-cols-4"}`;

    return `${mobileClass} ${tabletClass} ${desktopClass} ${ultrawideClass}`;
  };

  return (
    <div className={`space-y-4 lg:space-y-6 ${className}`}>
      {/* Header */}
      {(title || subtitle || actions || viewModes.length > 1) && (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Title Section */}
          {(title || subtitle) && (
            <div>
              {title && (
                <h2 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Controls Section */}
          <div className="flex items-center justify-between lg:justify-end space-x-4">
            {/* View Mode Toggle */}
            {viewModes.length > 1 && (
              <div className="flex bg-slate-100 dark:bg-darkmode-700 rounded-lg p-1">
                {viewModes.includes("grid") && (
                  <Button
                    variant={
                      currentView === "grid" ? "primary" : "outline-secondary"
                    }
                    size="sm"
                    onClick={() => setCurrentView("grid")}
                    className="px-3 py-1.5"
                  >
                    <Grid className="w-4 h-4" />
                    <span className="hidden sm:ml-2 sm:inline">Grade</span>
                  </Button>
                )}
                {viewModes.includes("list") && (
                  <Button
                    variant={
                      currentView === "list" ? "primary" : "outline-secondary"
                    }
                    size="sm"
                    onClick={() => setCurrentView("list")}
                    className="px-3 py-1.5"
                  >
                    <List className="w-4 h-4" />
                    <span className="hidden sm:ml-2 sm:inline">Lista</span>
                  </Button>
                )}
              </div>
            )}

            {/* Actions */}
            {actions}
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className={`grid ${getGridClasses()} ${spacingClasses[spacing]}`}>
        {children}
      </div>

      {/* Mobile Optimizations */}
      {deviceType === "mobile" && (
        <div className="fixed bottom-4 right-4 z-40">
          <Button variant="primary" className="rounded-full shadow-lg p-3">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResponsiveGrid;
