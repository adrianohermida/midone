import React, { useState, useEffect, Fragment } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
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
import TopBarEnigma from "@/components/Themes/Enigma/TopBar";
import TopBarIcewall from "@/components/Themes/Icewall/TopBar";
import MobileMenu from "@/components/MobileMenu";
import useThemeResponsive, {
  ThemeType,
  LayoutType,
} from "@/hooks/useThemeResponsive";
import Lucide from "@/components/Base/Lucide";
import Breadcrumb from "@/components/Base/Breadcrumb";
import { FormInput } from "@/components/Base/Form";
import { Menu, Popover } from "@/components/Base/Headless";
import { Transition } from "@headlessui/react";
import fakerData from "@/utils/faker";
import justiceScaleUrl from "@/assets/images/justice-scale.svg";
import _ from "lodash";
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
  const [searchDropdown, setSearchDropdown] = useState(false);
  const menuStore = useAppSelector(selectMenu(layout));
  const menu = () => nestedMenu(menuStore, location);

  const showSearchDropdown = () => setSearchDropdown(true);
  const hideSearchDropdown = () => setSearchDropdown(false);

  useEffect(() => {
    setFormattedMenu(menu());
  }, [menuStore, location.pathname]);

  // Renderizar header inline para Rubick e Tinker
  const renderInlineHeader = () => {
    const headerClass =
      theme === "rubick"
        ? "border-b border-white/[0.08] mt-[2.2rem] md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 pt-3 md:pt-0 mb-10"
        : "h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:mx-0 px-4 sm:px-8 md:px-6 mb-10 md:mb-8";

    return (
      <div className={headerClass}>
        <div className={`flex items-center h-[70px] z-[51] relative`}>
          {/* Logo */}
          <Link to="/" className="hidden -intro-x md:flex items-center">
            <img
              alt="Lawdesk Sistema Jurídico"
              className="w-6 h-6 justice-scale-icon justice-scale-white"
              src={justiceScaleUrl}
            />
            <span className="ml-3 text-lg font-semibold text-white">
              Lawdesk
            </span>
          </Link>

          {/* Breadcrumb */}
          <Breadcrumb
            light
            className="h-full md:ml-10 md:pl-10 md:border-l border-white/[0.08] mr-auto -intro-x"
          >
            <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
            <Breadcrumb.Link to="/" active={true}>
              Painel Principal
            </Breadcrumb.Link>
          </Breadcrumb>

          {/* Search */}
          <div className="relative mr-3 intro-x sm:mr-6">
            <div className="hidden sm:block">
              <FormInput
                type="text"
                className="border-transparent w-56 shadow-none rounded-full bg-slate-200 pr-8 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-72 dark:bg-darkmode-400/70"
                placeholder="Buscar..."
                onFocus={showSearchDropdown}
                onBlur={hideSearchDropdown}
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-5 h-5 my-auto mr-3 text-slate-600 dark:text-slate-500"
              />
            </div>
            <a className="relative text-white/70 sm:hidden" href="">
              <Lucide icon="Search" className="w-5 h-5 dark:text-slate-500" />
            </a>

            {/* Search Dropdown */}
            <Transition
              as={Fragment}
              show={searchDropdown}
              enter="transition-all ease-linear duration-150"
              enterFrom="mt-5 invisible opacity-0 translate-y-1"
              enterTo="mt-[3px] visible opacity-100 translate-y-0"
              leave="transition-all ease-linear duration-150"
              leaveFrom="mt-[3px] visible opacity-100 translate-y-0"
              leaveTo="mt-5 invisible opacity-0 translate-y-1"
            >
              <div className="absolute right-0 z-10 mt-[3px]">
                <div className="w-[450px] p-5 box">
                  <div className="mb-2 font-medium">Acesso Rápido</div>
                  <div className="mb-5">
                    <a href="/juridico" className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success">
                        <Lucide icon="Scale" className="w-4 h-4" />
                      </div>
                      <div className="ml-3">Módulo Jurídico</div>
                    </a>
                    <a href="/crm" className="flex items-center mt-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pending/10 text-pending">
                        <Lucide icon="Users" className="w-4 h-4" />
                      </div>
                      <div className="ml-3">CRM - Clientes</div>
                    </a>
                    <a href="/financeiro" className="flex items-center mt-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/80">
                        <Lucide icon="DollarSign" className="w-4 h-4" />
                      </div>
                      <div className="ml-3">Módulo Financeiro</div>
                    </a>
                    <a href="/administracao" className="flex items-center mt-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple/10 dark:bg-purple/20 text-purple">
                        <Lucide icon="Settings" className="w-4 h-4" />
                      </div>
                      <div className="ml-3">Administração</div>
                    </a>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          {/* Notifications */}
          <Popover className="mr-4 intro-x sm:mr-6">
            <Popover.Button className="relative text-white/70 outline-none block before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger">
              <Lucide icon="Bell" className="w-5 h-5 dark:text-slate-500" />
            </Popover.Button>
            <Popover.Panel className="w-[280px] sm:w-[350px] p-5 mt-2">
              <div className="mb-5 font-medium">Notificações</div>
              {_.take(fakerData, 3).map((faker, fakerKey) => (
                <div
                  key={fakerKey}
                  className={clsx([
                    "cursor-pointer relative flex items-center",
                    { "mt-5": fakerKey },
                  ])}
                >
                  <div className="relative flex-none w-12 h-12 mr-1 image-fit">
                    <img
                      alt="Lawdesk"
                      className="rounded-full"
                      src={faker.photos[0]}
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-success dark:border-darkmode-600"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a href="" className="mr-5 font-medium truncate">
                        {faker.users[0].name}
                      </a>
                      <div className="ml-auto text-xs text-slate-400 whitespace-nowrap">
                        {faker.times[0]}
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      {faker.news[0].shortContent}
                    </div>
                  </div>
                </div>
              ))}
            </Popover.Panel>
          </Popover>

          {/* Account Menu */}
          <Menu>
            <Menu.Button className="block w-8 h-8 overflow-hidden scale-110 rounded-full shadow-lg image-fit zoom-in intro-x">
              <img alt="Lawdesk" src={fakerData[9].photos[0]} />
            </Menu.Button>
            <Menu.Items
              className={`w-56 mt-px relative ${theme === "rubick" ? "bg-primary/80" : "bg-primary/70"} before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white`}
            >
              <Menu.Header className="font-normal">
                <div className="font-medium">{fakerData[0].users[0].name}</div>
                <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                  {fakerData[0].jobs[0]}
                </div>
              </Menu.Header>
              <Menu.Divider className="bg-white/[0.08]" />
              <Menu.Item className="hover:bg-white/5">
                <Lucide icon="User" className="w-4 h-4 mr-2" /> Perfil
              </Menu.Item>
              <Menu.Item className="hover:bg-white/5">
                <Lucide icon="Settings" className="w-4 h-4 mr-2" />{" "}
                Configurações
              </Menu.Item>
              {theme === "tinker" && (
                <Menu.Item className="hover:bg-white/5">
                  <Lucide icon="Building2" className="w-4 h-4 mr-2" />{" "}
                  Departamentos
                </Menu.Item>
              )}
              <Menu.Item className="hover:bg-white/5">
                <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Alterar Senha
              </Menu.Item>
              <Menu.Item className="hover:bg-white/5">
                <Lucide icon="HelpCircle" className="w-4 h-4 mr-2" /> Ajuda
              </Menu.Item>
              <Menu.Divider className="bg-white/[0.08]" />
              <Menu.Item className="hover:bg-white/5">
                <Lucide icon="LogOut" className="w-4 h-4 mr-2" /> Sair
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    );
  };

  // Renderizar TopBar baseado no tema
  const renderTopBar = () => {
    if (layout !== "top-menu") return null;

    switch (theme) {
      case "rubick":
        return null; // Rubick usa header inline próprio
      case "enigma":
        return <TopBarEnigma layout="top-menu" />;
      case "icewall":
        return <TopBarIcewall />;
      case "tinker":
        return null; // Tinker usa header inline próprio
      default:
        return null;
    }
  };

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

    const navClass =
      theme === "rubick"
        ? "relative z-50 hidden top-nav md:block"
        : theme === "enigma"
          ? "relative z-50 hidden pt-32 -mt-4 top-nav md:block"
          : theme === "icewall"
            ? "top-nav relative z-50 -mt-2 hidden translate-y-[35px] opacity-0 md:block xl:-mt-[3px] xl:px-6 xl:pt-[12px]"
            : "top-nav relative z-50 -mt-[3px] hidden translate-y-[50px] opacity-0 md:block";

    const ulClass =
      theme === "rubick"
        ? "pb-3 xl:pb-0 xl:px-[50px] flex flex-wrap"
        : theme === "enigma"
          ? "flex flex-wrap px-6 xl:px-[50px]"
          : theme === "icewall"
            ? "h-[50px] flex flex-wrap"
            : "flex flex-wrap h-[58px] px-6 xl:px-[50px]";

    return (
      <nav className={navClass}>
        <ul className={ulClass}>
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
                        ? menu.title.length > 12
                          ? menu.title.substring(0, 10) + "..."
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
    switch (theme) {
      case "rubick":
        return (
          <div className="rounded-[30px] min-w-0 min-h-screen flex-1 pb-10 bg-slate-100 dark:bg-darkmode-700 px-4 md:px-[22px] max-w-full md:max-w-auto before:content-[''] before:w-full before:h-px before:block">
            <Outlet />
            {children}
          </div>
        );

      case "enigma":
        return (
          <div
            className={clsx([
              "max-w-full md:max-w-none rounded-[30px] md:rounded-[35px_35px_0_0] px-4 md:px-[22px] min-w-0 min-h-screen bg-slate-100 flex-1 pb-10 mt-5 relative dark:bg-darkmode-700",
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
              <div className="px-4 md:px-[22px] max-w-full md:max-w-auto rounded-[1.3rem] flex-1 min-w-0 min-h-screen pb-10 shadow-sm bg-slate-100 dark:bg-darkmode-700 before:content-[''] before:w-full before:h-px before:block">
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
              "rounded-[30px] md:rounded-[35px_35px_0px_0px] min-w-0 min-h-screen max-w-full md:max-w-none bg-slate-100 flex-1 pb-10 px-4 md:px-6 relative mt-8 dark:bg-darkmode-700",
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
          <div className="min-w-0 min-h-screen flex-1 pb-10 bg-slate-100 dark:bg-darkmode-700 px-4 md:px-[22px]">
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

        {/* TopBar específico do tema */}
        {renderTopBar()}

        {/* Header inline para Rubick e Tinker */}
        {(theme === "rubrick" || theme === "tinker") && renderInlineHeader()}

        {/* Navegação Superior (apenas para top-menu) */}
        {renderTopNavigation()}

        {/* Conteúdo Principal */}
        {renderContent()}
      </div>
    </forceActiveMenuContext.Provider>
  );
};

export default ResponsiveThemeLayout;
