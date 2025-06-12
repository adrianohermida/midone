import { useState, useEffect } from "react";
import { useResponsive } from "./useResponsive";

export type ThemeType = "rubick" | "enigma" | "icewall" | "tinker";
export type LayoutType = "side-menu" | "top-menu" | "simple-menu";

interface ThemeResponsiveConfig {
  // Layout configs
  layout: {
    containerClass: string;
    headerHeight: string;
    contentPadding: string;
    contentBackground: string;
    borderRadius: string;
  };

  // Header configs
  header: {
    background: string;
    textColor: string;
    borderColor: string;
    logoFilter: string;
    showBreadcrumb: boolean;
  };

  // Search configs
  search: {
    width: string;
    focusWidth: string;
    placeholder: string;
    background: string;
    expandable: boolean;
  };

  // Menu configs
  menu: {
    showIcons: boolean;
    showLabels: boolean;
    compactMode: boolean;
    maxItems: number;
  };

  // Mobile specific
  mobile: {
    headerCompact: boolean;
    sidebarOverlay: boolean;
    searchFullWidth: boolean;
    hideSecondaryActions: boolean;
  };
}

export const useThemeResponsive = (
  theme: ThemeType,
  layout: LayoutType = "top-menu",
) => {
  const { deviceType, isMobile, isTablet, isDesktop, isUltrawide } =
    useResponsive();
  const [config, setConfig] = useState<ThemeResponsiveConfig | null>(null);

  // Theme-specific configurations
  const getThemeConfig = (): ThemeResponsiveConfig => {
    const baseConfig = {
      mobile: {
        layout: {
          containerClass: `${theme} px-3 py-3`,
          headerHeight: "h-14",
          contentPadding: "px-4 md:px-[22px]",
          contentBackground: "bg-slate-100 dark:bg-darkmode-700",
          borderRadius: "rounded-[20px]",
        },
        header: {
          background: "bg-transparent",
          textColor: "text-white",
          borderColor: "border-white/[0.08]",
          logoFilter: "justice-scale-white",
          showBreadcrumb: false,
        },
        search: {
          width: "w-full",
          focusWidth: "w-full",
          placeholder: "Buscar...",
          background: "bg-slate-200 dark:bg-darkmode-400/70",
          expandable: true,
        },
        menu: {
          showIcons: true,
          showLabels: false,
          compactMode: true,
          maxItems: 4,
        },
        mobile: {
          headerCompact: true,
          sidebarOverlay: true,
          searchFullWidth: true,
          hideSecondaryActions: true,
        },
      },

      tablet: {
        layout: {
          containerClass: `${theme} px-5 py-4`,
          headerHeight: "h-16",
          contentPadding: "px-4 md:px-[22px]",
          contentBackground: "bg-slate-100 dark:bg-darkmode-700",
          borderRadius: "rounded-[25px]",
        },
        header: {
          background: "bg-transparent",
          textColor: "text-white",
          borderColor: "border-white/[0.08]",
          logoFilter: "justice-scale-white",
          showBreadcrumb: true,
        },
        search: {
          width: "w-48",
          focusWidth: "w-64",
          placeholder: "Buscar...",
          background: "bg-slate-200 dark:bg-darkmode-400/70",
          expandable: false,
        },
        menu: {
          showIcons: true,
          showLabels: true,
          compactMode: false,
          maxItems: 6,
        },
        mobile: {
          headerCompact: false,
          sidebarOverlay: false,
          searchFullWidth: false,
          hideSecondaryActions: false,
        },
      },

      desktop: {
        layout: {
          containerClass: `${theme} px-5 sm:px-8 py-5`,
          headerHeight: "h-16",
          contentPadding: "px-4 md:px-[22px]",
          contentBackground: "bg-slate-100 dark:bg-darkmode-700",
          borderRadius: "rounded-[30px]",
        },
        header: {
          background: "bg-transparent",
          textColor: "text-white",
          borderColor: "border-white/[0.08]",
          logoFilter: "justice-scale-white",
          showBreadcrumb: true,
        },
        search: {
          width: "w-56",
          focusWidth: "w-72",
          placeholder: "Buscar processos, clientes...",
          background: "bg-slate-200 dark:bg-darkmode-400/70",
          expandable: false,
        },
        menu: {
          showIcons: true,
          showLabels: true,
          compactMode: false,
          maxItems: 8,
        },
        mobile: {
          headerCompact: false,
          sidebarOverlay: false,
          searchFullWidth: false,
          hideSecondaryActions: false,
        },
      },

      ultrawide: {
        layout: {
          containerClass: `${theme} px-8 py-6`,
          headerHeight: "h-18",
          contentPadding: "px-6 md:px-[32px]",
          contentBackground: "bg-slate-100 dark:bg-darkmode-700",
          borderRadius: "rounded-[35px]",
        },
        header: {
          background: "bg-transparent",
          textColor: "text-white",
          borderColor: "border-white/[0.08]",
          logoFilter: "justice-scale-white",
          showBreadcrumb: true,
        },
        search: {
          width: "w-64",
          focusWidth: "w-80",
          placeholder: "Buscar processos, clientes, documentos...",
          background: "bg-slate-200 dark:bg-darkmode-400/70",
          expandable: false,
        },
        menu: {
          showIcons: true,
          showLabels: true,
          compactMode: false,
          maxItems: 12,
        },
        mobile: {
          headerCompact: false,
          sidebarOverlay: false,
          searchFullWidth: false,
          hideSecondaryActions: false,
        },
      },
    };

    return baseConfig[deviceType];
  };

  // Theme-specific adjustments
  const applyThemeAdjustments = (
    baseConfig: ThemeResponsiveConfig,
  ): ThemeResponsiveConfig => {
    const adjustments = {
      rubick: {
        layout: {
          containerClass: baseConfig.layout.containerClass.replace(
            theme,
            `${theme} before:content-[''] before:bg-gradient-to-b before:from-theme-1 before:to-theme-2 dark:before:from-darkmode-800 dark:before:to-darkmode-800 before:fixed before:inset-0 before:z-[-1]`,
          ),
        },
        header: {
          ...baseConfig.header,
          background: "bg-transparent",
        },
      },

      enigma: {
        layout: {
          containerClass: baseConfig.layout.containerClass.replace(
            theme,
            `${theme} md:py-0 before:content-[''] before:bg-gradient-to-b before:from-theme-1 before:to-theme-2 dark:before:from-darkmode-800 dark:before:to-darkmode-800 md:before:bg-none md:bg-slate-200 md:dark:bg-darkmode-800 before:fixed before:inset-0 before:z-[-1]`,
          ),
        },
        header: {
          ...baseConfig.header,
          background: "bg-transparent",
        },
      },

      icewall: {
        layout: {
          containerClass: baseConfig.layout.containerClass.replace(
            theme,
            `${theme} relative after:content-[''] after:bg-gradient-to-b after:from-theme-1 after:to-theme-2 dark:after:from-darkmode-800 dark:after:to-darkmode-800 after:fixed after:inset-0 after:z-[-2]`,
          ),
        },
        header: {
          ...baseConfig.header,
          background: "bg-transparent",
        },
      },

      tinker: {
        layout: {
          containerClass: baseConfig.layout.containerClass.replace(
            theme,
            `${theme} md:bg-black/[0.15] dark:bg-transparent relative md:py-0 after:content-[''] after:bg-gradient-to-b after:from-theme-1 after:to-theme-2 dark:after:from-darkmode-800 dark:after:to-darkmode-800 after:fixed after:inset-0 after:z-[-2]`,
          ),
        },
        header: {
          ...baseConfig.header,
          background: "bg-transparent",
        },
      },
    };

    return {
      ...baseConfig,
      ...adjustments[theme],
    };
  };

  // Layout-specific adjustments
  const applyLayoutAdjustments = (
    config: ThemeResponsiveConfig,
  ): ThemeResponsiveConfig => {
    if (layout === "side-menu") {
      return {
        ...config,
        menu: {
          ...config.menu,
          maxItems: isMobile ? 8 : 20, // Sidebar can show more items
          compactMode: isMobile,
        },
      };
    }

    if (layout === "simple-menu") {
      return {
        ...config,
        menu: {
          ...config.menu,
          maxItems: isMobile ? 4 : 6,
          compactMode: true,
        },
      };
    }

    return config; // top-menu
  };

  useEffect(() => {
    const baseConfig = getThemeConfig();
    const themeConfig = applyThemeAdjustments(baseConfig);
    const finalConfig = applyLayoutAdjustments(themeConfig);
    setConfig(finalConfig);
  }, [theme, layout, deviceType]);

  return {
    config,
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    isUltrawide,

    // Helper functions
    getContainerClass: () => config?.layout.containerClass || "",
    getHeaderClass: () => config?.header.background || "",
    getSearchWidth: () => config?.search.width || "w-56",
    shouldShowBreadcrumb: () => config?.header.showBreadcrumb || false,
    shouldUseCompactMenu: () => config?.menu.compactMode || false,
    getMaxMenuItems: () => config?.menu.maxItems || 6,

    // Mobile helpers
    shouldExpandSearch: () => config?.mobile.searchFullWidth || false,
    shouldUseOverlay: () => config?.mobile.sidebarOverlay || false,
    shouldHideSecondaryActions: () =>
      config?.mobile.hideSecondaryActions || false,
  };
};

export default useThemeResponsive;
