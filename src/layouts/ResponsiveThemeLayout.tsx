import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import { selectMenu } from "@/stores/menuSlice";
import { selectTheme } from "@/stores/themeSlice";
import {
  FormattedMenu,
  linkTo,
  nestedMenu,
  forceActiveMenuContext,
  forceActiveMenu,
} from "@/themes/Rubick/TopMenu/top-menu"; // Import das funções base
import UnifiedTopMenu from "@/components/UnifiedTopMenu";
import MobileMenu from "@/components/MobileMenu";
import useThemeResponsive, {
  ThemeType,
  LayoutType,
} from "@/hooks/useThemeResponsive";
import Lucide from "@/components/Base/Lucide";
import clsx from "clsx";

interface ResponsiveThemeLayoutProps {
  theme: ThemeType;
  layout?: LayoutType;
  children?: React.ReactNode;
}

const ResponsiveThemeLayout: React.FC<ResponsiveThemeLayoutProps> = ({
  theme,
  layout = "top-menu",
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    config,
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    isUltrawide,
    getContainerClass,
    shouldShowBreadcrumb,
    shouldUseCompactMenu,
    getMaxMenuItems,
  } = useThemeResponsive(theme, layout);

  // Estados do menu
  const [formattedMenu, setFormattedMenu] = useState<
    Array<FormattedMenu | "divider">
  >([]);
  const menuStore = useAppSelector(selectMenu(layout));
  const menu = () => nestedMenu(menuStore, location);

  useEffect(() => {
    setFormattedMenu(menu());
  }, [menuStore, location.pathname]);

  if (!config) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-darkmode-800 flex items-center justify-center">
        <div className="text-center">
          <Lucide
            icon="Loader2"
            className="w-8 h-8 animate-spin mx-auto mb-4"
          />
          <div className="text-sm text-slate-500">Carregando tema...</div>
        </div>
      </div>
    );
  }

  // Renderizar navegação superior (apenas para top-menu layout)
  const renderTopNavigation = () => {
    if (layout !== "top-menu") return null;

    return (
      <nav className="relative z-50 hidden top-nav md:block">
        <ul
          className={`flex flex-wrap ${
            isMobile
              ? "px-4"
              : isTablet
                ? "px-6"
                : isDesktop
                  ? "px-6 xl:px-[50px]"
                  : "px-8 xl:px-[60px]"
          }`}
        >
          {formattedMenu.slice(0, getMaxMenuItems()).map(
            (menu, menuKey) =>
              menu != "divider" && (
                <li key={menuKey}>
                  <a
                    href={menu.subMenu ? "#" : menu.pathname}
                    className={clsx([
                      menu.active ? "top-menu top-menu--active" : "top-menu",
                    ])}
                    onClick={(event) => {
                      event.preventDefault();
                      linkTo(menu, navigate);
                    }}
                  >
                    <div className="top-menu__icon">
                      <Lucide icon={menu.icon || "Home"} />
                    </div>
                    <div className="top-menu__title">
                      {shouldUseCompactMenu()
                        ? menu.title.length > 8
                          ? menu.title.substring(0, 8) + "..."
                          : menu.title
                        : menu.title}
                      {menu.subMenu && (
                        <Lucide
                          className="top-menu__sub-icon"
                          icon="ChevronDown"
                        />
                      )}
                    </div>
                  </a>
                  {menu.subMenu && (
                    <ul>
                      {menu.subMenu.map((subMenu, subMenuKey) => (
                        <li key={subMenuKey}>
                          <a
                            href={subMenu.subMenu ? "#" : subMenu.pathname}
                            className="top-menu"
                            onClick={(event) => {
                              event.preventDefault();
                              linkTo(subMenu, navigate);
                            }}
                          >
                            <div className="top-menu__icon">
                              <Lucide icon={subMenu.icon || "Activity"} />
                            </div>
                            <div className="top-menu__title">
                              {subMenu.title}
                              {subMenu.subMenu && (
                                <Lucide
                                  className="top-menu__sub-icon"
                                  icon="ChevronDown"
                                />
                              )}
                            </div>
                          </a>
                          {subMenu.subMenu && (
                            <ul>
                              {subMenu.subMenu.map(
                                (lastSubMenu, lastSubMenuKey) => (
                                  <li key={lastSubMenuKey}>
                                    <a
                                      href={lastSubMenu.pathname}
                                      className="top-menu"
                                      onClick={(event) => {
                                        event.preventDefault();
                                        linkTo(lastSubMenu, navigate);
                                      }}
                                    >
                                      <div className="top-menu__icon">
                                        <Lucide
                                          icon={lastSubMenu.icon || "Zap"}
                                        />
                                      </div>
                                      <div className="top-menu__title">
                                        {lastSubMenu.title}
                                      </div>
                                    </a>
                                  </li>
                                ),
                              )}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ),
          )}
        </ul>
      </nav>
    );
  };

  // Renderizar conteúdo com wrapper adequado para cada tema
  const renderContent = () => {
    const contentClass = clsx([
      config.layout.contentBackground,
      config.layout.contentPadding,
      config.layout.borderRadius,
      "min-w-0 min-h-screen flex-1 pb-10 relative",
      "before:content-[''] before:w-full before:h-px before:block",
    ]);

    // Ajustes específicos por tema
    switch (theme) {
      case "rubick":
        return (
          <div className={contentClass}>
            <Outlet />
            {children}
          </div>
        );

      case "enigma":
        return (
          <div
            className={clsx([
              "max-w-full md:max-w-none",
              config.layout.borderRadius,
              config.layout.contentPadding,
              "min-w-0 min-h-screen",
              config.layout.contentBackground,
              "flex-1 pb-10 mt-5 relative dark:bg-darkmode-700",
              "before:content-[''] before:w-full before:h-px before:block",
            ])}
          >
            <Outlet />
            {children}
          </div>
        );

      case "icewall":
        return (
          <div
            className={clsx([
              "wrapper relative",
              "before:content-[''] before:z-[-1] before:translate-y-[35px] before:opacity-0 before:w-[95%] before:rounded-[1.3rem] before:bg-transparent xl:before:bg-white/10 before:h-full before:-mt-4 before:absolute before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/50",
            ])}
          >
            <div
              className={clsx([
                "wrapper-box bg-transparent xl:bg-theme-1 flex rounded-[1.3rem] md:pt-[80px] -mt-[7px] md:-mt-[67px] xl:-mt-[62px] dark:bg-transparent xl:dark:bg-darkmode-400 translate-y-[35px]",
                "before:hidden xl:before:block before:absolute before:inset-0 before:bg-black/[0.15] before:rounded-[1.3rem] before:z-[-1]",
              ])}
            >
              <div
                className={clsx([
                  config.layout.contentPadding,
                  "max-w-full md:max-w-auto rounded-[1.3rem] flex-1 min-w-0 min-h-screen pb-10 shadow-sm",
                  config.layout.contentBackground,
                  "before:content-[''] before:w-full before:h-px before:block",
                ])}
              >
                <Outlet />
                {children}
              </div>
            </div>
          </div>
        );

      case "tinker":
        return (
          <div
            className={clsx([
              config.layout.borderRadius,
              "md:rounded-[35px_35px_0px_0px] min-w-0 min-h-screen max-w-full md:max-w-none",
              config.layout.contentBackground,
              "flex-1 pb-10",
              config.layout.contentPadding,
              "relative mt-8 dark:bg-darkmode-700",
              "before:content-[''] before:w-full before:h-px before:block",
              "after:content-[''] after:z-[-1] after:rounded-[40px_40px_0px_0px] after:w-[97%] after:inset-y-0 after:absolute after:left-0 after:right-0 after:bg-white/10 after:-mt-4 after:mx-auto after:dark:bg-darkmode-400/50",
            ])}
          >
            <Outlet />
            {children}
          </div>
        );

      default:
        return (
          <div className={contentClass}>
            <Outlet />
            {children}
          </div>
        );
    }
  };

  return (
    <forceActiveMenuContext.Provider
      value={{
        forceActiveMenu: (pathname) => {
          forceActiveMenu(location, pathname);
          setFormattedMenu(menu());
        },
      }}
    >
      <div className={getContainerClass()}>
        <MobileMenu />

        {/* Header Unificado */}
        <UnifiedTopMenu theme={theme} />

        {/* Navegação Superior (apenas para top-menu) */}
        {renderTopNavigation()}

        {/* Conteúdo Principal */}
        {renderContent()}
      </div>
    </forceActiveMenuContext.Provider>
  );
};

export default ResponsiveThemeLayout;
