import { useState, useEffect } from "react";

export type DeviceType = "mobile" | "tablet" | "desktop" | "ultrawide";

export interface ResponsiveConfig {
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isUltrawide: boolean;
  screenWidth: number;
  screenHeight: number;
  columns: {
    mobile: number;
    tablet: number;
    desktop: number;
    ultrawide: number;
  };
  spacing: {
    mobile: string;
    tablet: string;
    desktop: string;
    ultrawide: string;
  };
  padding: {
    mobile: string;
    tablet: string;
    desktop: string;
    ultrawide: string;
  };
}

export const useResponsive = () => {
  const [config, setConfig] = useState<ResponsiveConfig>({
    deviceType: "desktop",
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isUltrawide: false,
    screenWidth: typeof window !== "undefined" ? window.innerWidth : 1920,
    screenHeight: typeof window !== "undefined" ? window.innerHeight : 1080,
    columns: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
      ultrawide: 4,
    },
    spacing: {
      mobile: "gap-3",
      tablet: "gap-4",
      desktop: "gap-6",
      ultrawide: "gap-8",
    },
    padding: {
      mobile: "p-4",
      tablet: "p-6",
      desktop: "p-6 lg:p-8",
      ultrawide: "p-8",
    },
  });

  useEffect(() => {
    const updateConfig = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      let deviceType: DeviceType = "desktop";

      if (width < 768) {
        deviceType = "mobile";
      } else if (width < 1024) {
        deviceType = "tablet";
      } else if (width < 1920) {
        deviceType = "desktop";
      } else {
        deviceType = "ultrawide";
      }

      setConfig((prev) => ({
        ...prev,
        deviceType,
        isMobile: deviceType === "mobile",
        isTablet: deviceType === "tablet",
        isDesktop: deviceType === "desktop",
        isUltrawide: deviceType === "ultrawide",
        screenWidth: width,
        screenHeight: height,
      }));
    };

    updateConfig();
    window.addEventListener("resize", updateConfig);

    return () => window.removeEventListener("resize", updateConfig);
  }, []);

  // Funções auxiliares
  const getGridCols = (
    customColumns?: Partial<ResponsiveConfig["columns"]>,
  ) => {
    const cols = { ...config.columns, ...customColumns };

    const colsMap = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    };

    const mobileClass = colsMap[Math.min(cols.mobile, 6)] || "grid-cols-1";
    const tabletClass = `md:${colsMap[Math.min(cols.tablet, 6)] || "grid-cols-2"}`;
    const desktopClass = `lg:${colsMap[Math.min(cols.desktop, 6)] || "grid-cols-3"}`;
    const ultrawideClass = `xl:${colsMap[Math.min(cols.ultrawide, 6)] || "grid-cols-4"}`;

    return `${mobileClass} ${tabletClass} ${desktopClass} ${ultrawideClass}`;
  };

  const getSpacing = () => {
    return config.spacing[config.deviceType];
  };

  const getPadding = () => {
    return config.padding[config.deviceType];
  };

  const getMaxWidth = () => {
    switch (config.deviceType) {
      case "mobile":
        return "max-w-none";
      case "tablet":
        return "max-w-4xl";
      case "desktop":
        return "max-w-7xl";
      case "ultrawide":
        return "max-w-none";
      default:
        return "max-w-7xl";
    }
  };

  const shouldShowSidebar = () => {
    return config.deviceType === "desktop" || config.deviceType === "ultrawide";
  };

  const shouldCompactHeader = () => {
    return config.deviceType === "mobile";
  };

  const getCardSize = () => {
    switch (config.deviceType) {
      case "mobile":
        return "sm";
      case "tablet":
        return "md";
      case "desktop":
        return "md";
      case "ultrawide":
        return "lg";
      default:
        return "md";
    }
  };

  const getOptimalItemsPerPage = (baseItems: number = 12) => {
    switch (config.deviceType) {
      case "mobile":
        return Math.max(6, Math.floor(baseItems * 0.5));
      case "tablet":
        return Math.max(8, Math.floor(baseItems * 0.75));
      case "desktop":
        return baseItems;
      case "ultrawide":
        return Math.floor(baseItems * 1.5);
      default:
        return baseItems;
    }
  };

  const getBreakpointClasses = (classes: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
    ultrawide?: string;
  }) => {
    const mobile = classes.mobile || "";
    const tablet = classes.tablet ? `md:${classes.tablet}` : "";
    const desktop = classes.desktop ? `lg:${classes.desktop}` : "";
    const ultrawide = classes.ultrawide ? `xl:${classes.ultrawide}` : "";

    return [mobile, tablet, desktop, ultrawide].filter(Boolean).join(" ");
  };

  const shouldShowElement = (minDevice: DeviceType = "mobile") => {
    const deviceOrder: DeviceType[] = [
      "mobile",
      "tablet",
      "desktop",
      "ultrawide",
    ];
    const currentIndex = deviceOrder.indexOf(config.deviceType);
    const minIndex = deviceOrder.indexOf(minDevice);

    return currentIndex >= minIndex;
  };

  return {
    ...config,
    getGridCols,
    getSpacing,
    getPadding,
    getMaxWidth,
    shouldShowSidebar,
    shouldCompactHeader,
    getCardSize,
    getOptimalItemsPerPage,
    getBreakpointClasses,
    shouldShowElement,
  };
};

// Hook para detectar orientação
export const useOrientation = () => {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "landscape",
  );

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? "portrait" : "landscape",
      );
    };

    updateOrientation();
    window.addEventListener("resize", updateOrientation);

    return () => window.removeEventListener("resize", updateOrientation);
  }, []);

  return orientation;
};

// Hook para detectar se está em modo touch
export const useTouch = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
};

export default useResponsive;
