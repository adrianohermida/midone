import React, { useState, useEffect, Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import { selectMenu } from "@/stores/menuSlice";
import { selectTheme } from "@/stores/themeSlice";
import { FormInput } from "@/components/Base/Form";
import { Menu, Popover } from "@/components/Base/Headless";
import { Transition } from "@headlessui/react";
import Lucide from "@/components/Base/Lucide";
import Breadcrumb from "@/components/Base/Breadcrumb";
import MobileMenu from "@/components/MobileMenu";
import fakerData from "@/utils/faker";
import justiceScaleUrl from "@/assets/images/justice-scale.svg";
import { useResponsive } from "@/hooks/useResponsive";
import clsx from "clsx";
import _ from "lodash";

interface UnifiedTopMenuProps {
  theme: "rubick" | "enigma" | "icewall" | "tinker";
}

const UnifiedTopMenu: React.FC<UnifiedTopMenuProps> = ({ theme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { deviceType, isMobile, isTablet, isDesktop, isUltrawide } =
    useResponsive();

  // Estados responsivos
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Menu store
  const themeStore = useAppSelector(selectTheme);
  const menuStore = useAppSelector(selectMenu("top-menu"));

  // Configurações responsivas por tema
  const getThemeConfig = () => {
    const baseConfig = {
      mobile: {
        headerHeight: "h-14",
        logoSize: "w-6 h-6",
        showBreadcrumb: false,
        searchFullWidth: true,
        compactNotifications: true,
      },
      tablet: {
        headerHeight: "h-16",
        logoSize: "w-7 h-7",
        showBreadcrumb: true,
        searchFullWidth: false,
        compactNotifications: false,
      },
      desktop: {
        headerHeight: "h-16",
        logoSize: "w-8 h-8",
        showBreadcrumb: true,
        searchFullWidth: false,
        compactNotifications: false,
      },
      ultrawide: {
        headerHeight: "h-18",
        logoSize: "w-8 h-8",
        showBreadcrumb: true,
        searchFullWidth: false,
        compactNotifications: false,
      },
    };

    const themeSpecific = {
      rubick: {
        gradient:
          "before:bg-gradient-to-b before:from-theme-1 before:to-theme-2",
        headerBg: "bg-transparent",
        headerBorder: "border-white/[0.08]",
        textColor: "text-white",
        logoFilter: "justice-scale-white",
      },
      enigma: {
        gradient:
          "before:bg-gradient-to-b before:from-theme-1 before:to-theme-2",
        headerBg: "bg-transparent",
        headerBorder: "border-white/[0.08]",
        textColor: "text-white",
        logoFilter: "justice-scale-white",
      },
      icewall: {
        gradient: "after:bg-gradient-to-b after:from-theme-1 after:to-theme-2",
        headerBg: "bg-transparent",
        headerBorder: "border-white/[0.08]",
        textColor: "text-white",
        logoFilter: "justice-scale-white",
      },
      tinker: {
        gradient: "after:bg-gradient-to-b after:from-theme-1 after:to-theme-2",
        headerBg: "bg-transparent",
        headerBorder: "border-white/[0.08]",
        textColor: "text-white",
        logoFilter: "justice-scale-white",
      },
    };

    return {
      ...baseConfig[deviceType],
      ...themeSpecific[theme],
    };
  };

  const config = getThemeConfig();

  // Search handlers
  const showSearchDropdown = () => setSearchDropdown(true);
  const hideSearchDropdown = () => setSearchDropdown(false);

  // Responsive search component
  const renderSearch = () => {
    if (isMobile) {
      return (
        <div className="relative">
          {!isSearchExpanded ? (
            <button
              onClick={() => setIsSearchExpanded(true)}
              className={`${config.textColor}/70 hover:${config.textColor} transition-colors`}
            >
              <Lucide icon="Search" className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center space-x-2 w-full">
              <div className="relative flex-1">
                <FormInput
                  type="text"
                  className="w-full border-transparent shadow-none rounded-full bg-slate-200 pr-8 dark:bg-darkmode-400/70"
                  placeholder="Buscar..."
                  onFocus={showSearchDropdown}
                  onBlur={hideSearchDropdown}
                  autoFocus
                />
                <Lucide
                  icon="Search"
                  className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3 text-slate-600"
                />
              </div>
              <button
                onClick={() => {
                  setIsSearchExpanded(false);
                  setSearchValue("");
                }}
                className={`${config.textColor}/70 hover:${config.textColor}`}
              >
                <Lucide icon="X" className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      );
    }

    // Desktop/Tablet search
    return (
      <div className="relative">
        <FormInput
          type="text"
          className={`border-transparent shadow-none rounded-full bg-slate-200 pr-8 transition-[width] duration-300 ease-in-out focus:border-transparent dark:bg-darkmode-400/70 ${
            isDesktop || isUltrawide ? "w-56 focus:w-72" : "w-48 focus:w-64"
          }`}
          placeholder="Buscar..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={showSearchDropdown}
          onBlur={hideSearchDropdown}
        />
        <Lucide
          icon="Search"
          className="absolute inset-y-0 right-0 w-5 h-5 my-auto mr-3 text-slate-600"
        />
      </div>
    );
  };

  // Search dropdown component
  const renderSearchDropdown = () => (
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
        <div className={`${isMobile ? "w-[90vw]" : "w-[450px]"} p-5 box`}>
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

          {!isMobile && (
            <>
              <div className="mb-2 font-medium">Usuários Recentes</div>
              <div className="mb-5">
                {_.take(fakerData, 3).map((faker, fakerKey) => (
                  <a key={fakerKey} href="#" className="flex items-center mt-2">
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Lawdesk"
                        className="rounded-full"
                        src={faker.photos[0]}
                      />
                    </div>
                    <div className="ml-3">{faker.users[0].name}</div>
                    <div className="w-24 ml-auto text-xs text-right truncate text-slate-500">
                      {faker.users[0].email}
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Transition>
  );

  // Notifications component
  const renderNotifications = () => (
    <Popover className={`${isMobile ? "mr-2" : "mr-4 sm:mr-6"} intro-x`}>
      <Popover.Button
        className={`
          relative ${config.textColor}/70 outline-none block
          before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger
        `}
      >
        <Lucide icon="Bell" className={`${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
      </Popover.Button>
      <Popover.Panel
        className={`${isMobile ? "w-[280px]" : "w-[280px] sm:w-[350px]"} p-5 mt-2`}
      >
        <div className="mb-5 font-medium">Notificações</div>
        {_.take(fakerData, isMobile ? 3 : 5).map((faker, fakerKey) => (
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
                <a href="#" className="mr-5 font-medium truncate">
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
  );

  // User menu component
  const renderUserMenu = () => (
    <Menu>
      <Menu.Button
        className={`block ${config.logoSize} overflow-hidden scale-110 rounded-full shadow-lg image-fit zoom-in intro-x`}
      >
        <img alt="Lawdesk" src={fakerData[9].photos[0]} />
      </Menu.Button>
      <Menu.Items
        className={`w-56 mt-px relative bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white`}
      >
        <Menu.Header className="font-normal">
          <div className="font-medium">{fakerData[0].users[0].name}</div>
          <div className="text-xs text-white/70 mt-0.5">
            {fakerData[0].jobs[0]}
          </div>
        </Menu.Header>
        <Menu.Divider className="bg-white/[0.08]" />
        <Menu.Item className="hover:bg-white/5">
          <Lucide icon="User" className="w-4 h-4 mr-2" /> Perfil
        </Menu.Item>
        <Menu.Item className="hover:bg-white/5">
          <Lucide icon="Settings" className="w-4 h-4 mr-2" /> Configurações
        </Menu.Item>
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
  );

  return (
    <>
      <MobileMenu />

      {/* Header Bar */}
      <div
        className={`
        ${config.headerBorder} border-b mt-[2.2rem] md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 pt-3 md:pt-0 mb-10
        ${isMobile ? "mt-4 -mx-4 px-4" : ""}
      `}
      >
        <div
          className={`flex items-center ${config.headerHeight} z-[51] relative`}
        >
          {/* Logo Section */}
          <Link
            to="/"
            className={`${isMobile ? "flex" : "hidden md:flex"} -intro-x items-center`}
          >
            <img
              alt="Lawdesk Legal Management System"
              className={`${config.logoSize} ${config.logoFilter}`}
              src={justiceScaleUrl}
            />
            <span
              className={`ml-3 ${isMobile ? "text-base" : "text-lg"} font-semibold ${config.textColor}`}
            >
              Lawdesk
            </span>
          </Link>

          {/* Breadcrumb - Hidden on mobile */}
          {config.showBreadcrumb && (
            <Breadcrumb
              light
              className="h-full md:ml-10 md:pl-10 md:border-l border-white/[0.08] mr-auto -intro-x"
            >
              <Breadcrumb.Link to="/">Lawdesk</Breadcrumb.Link>
              <Breadcrumb.Link to="/" active={true}>
                Painel Principal
              </Breadcrumb.Link>
            </Breadcrumb>
          )}

          {/* Spacer for mobile */}
          {isMobile && <div className="flex-1" />}

          {/* Search Section */}
          <div
            className={`relative ${isMobile ? "mr-3" : "mr-3 sm:mr-6"} intro-x`}
          >
            {renderSearch()}
            {renderSearchDropdown()}
          </div>

          {/* Notifications */}
          {renderNotifications()}

          {/* User Menu */}
          {renderUserMenu()}
        </div>

        {/* Mobile expanded search results */}
        {isMobile && isSearchExpanded && searchValue && (
          <div className="pb-4 border-t border-white/[0.08] pt-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-white/80">
                Resultados da busca
              </div>
              <div className="space-y-1">
                <a
                  href="#"
                  className="block p-2 rounded bg-white/5 text-white/90 text-sm"
                >
                  Processo #{searchValue}
                </a>
                <a
                  href="#"
                  className="block p-2 rounded bg-white/5 text-white/90 text-sm"
                >
                  Cliente: {searchValue}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UnifiedTopMenu;
