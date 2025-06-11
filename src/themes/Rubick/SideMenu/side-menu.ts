import { NavigateFunction } from "react-router-dom";
import { createContext } from "react";
import { slideUp, slideDown } from "@/utils/helper";
import { type Menu } from "@/stores/menuSlice";

interface Location {
  pathname: string;
  forceActiveMenu?: string;
}

export interface FormattedMenu extends Menu {
  active?: boolean;
  activeDropdown?: boolean;
  subMenu?: FormattedMenu[];
}

const menu: Array<Menu | "divider"> = [
  // PAINEL
  {
    icon: "LayoutDashboard",
    pathname: "/dashboard-overview-1",
    title: "Dashboard",
  },
  "divider",
  // CRM
  {
    icon: "Users",
    title: "CRM",
    subMenu: [
      {
        icon: "UserCheck",
        pathname: "/users-layout-1",
        title: "Contatos",
      },
      {
        icon: "TrendingUp",
        pathname: "/crud-data-list",
        title: "Negócios (Pipelines)",
      },
      {
        icon: "CheckSquare",
        pathname: "/tabulator",
        title: "Tarefas",
      },
    ],
  },
  // JURÍDICO
  {
    icon: "Scale",
    title: "Jurídico",
    subMenu: [
      {
        icon: "FileText",
        title: "Processos",
        subMenu: [
          {
            icon: "LayoutDashboard",
            pathname: "/legal-cases",
            title: "Dashboard",
          },
          {
            icon: "List",
            pathname: "/legal-cases/list",
            title: "Listar Processos",
          },
          {
            icon: "Plus",
            pathname: "/legal-cases/create",
            title: "Novo Processo",
          },
          {
            icon: "Bell",
            pathname: "/legal-cases/intimations",
            title: "Intimações",
          },
          {
            icon: "BarChart3",
            pathname: "/legal-cases/analytics",
            title: "Relatórios",
          },
        ],
      },
      {
        icon: "FileSignature",
        pathname: "/wysiwyg-editor",
        title: "Contratos",
      },
      {
        icon: "Newspaper",
        pathname: "/blog-layout-1",
        title: "Publicações",
      },
      {
        icon: "Calendar",
        pathname: "/calendar",
        title: "Agenda Jurídica",
      },
    ],
  },
  // FINANCEIRO
  {
    icon: "DollarSign",
    pathname: "/financeiro",
    title: "Financeiro",
  },
  // DOCUMENTOS
  {
    icon: "HardDrive",
    pathname: "/file-manager",
    title: "GED (Arquivos)",
  },
  "divider",
  // IA JURÍDICA
  {
    icon: "Bot",
    title: "IA Jurídica",
    subMenu: [
      {
        icon: "MessageCircle",
        pathname: "/chat",
        title: "Assistente de IA",
      },
      {
        icon: "FileEdit",
        pathname: "/post",
        title: "Documentos Inteligentes",
      },
    ],
  },
  "divider",
  // ADMINISTRAÇÃO
  {
    icon: "Settings",
    title: "Administração",
    subMenu: [
      {
        icon: "Sliders",
        pathname: "/regular-form",
        title: "Configurações do Sistema",
      },
      {
        icon: "Users",
        pathname: "/users-layout-3",
        title: "Usuários e Equipe",
      },
      {
        icon: "Plug",
        pathname: "/regular-table",
        title: "Integrações",
      },
      {
        icon: "Activity",
        pathname: "/transaction-list",
        title: "Logs e Auditoria",
      },
    ],
  },
  // SUPORTE
  {
    icon: "HelpCircle",
    title: "Suporte",
    subMenu: [
      {
        icon: "BookOpen",
        pathname: "/faq-layout-1",
        title: "Central de Ajuda",
      },
      {
        icon: "Inbox",
        pathname: "/inbox",
        title: "Tickets de Suporte",
      },
    ],
  },
  "divider",
  // BETA/TESTES
  {
    icon: "TestTube",
    title: "Painel Beta (Obsoletos/Testes)",
    subMenu: [
      {
        icon: "Activity",
        title: "Dashboard Variants",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/dashboard-overview-2",
            title: "Overview 2",
          },
          {
            icon: "Zap",
            pathname: "/dashboard-overview-3",
            title: "Overview 3",
          },
          {
            icon: "Zap",
            pathname: "/dashboard-overview-4",
            title: "Overview 4",
          },
        ],
      },
      {
        icon: "Activity",
        title: "Profile Layouts",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/profile-overview-1",
            title: "Perfil Layout 1",
          },
          {
            icon: "Zap",
            pathname: "/profile-overview-2",
            title: "Perfil Layout 2",
          },
          {
            icon: "Zap",
            pathname: "/profile-overview-3",
            title: "Perfil Layout 3",
          },
        ],
      },
      {
        icon: "Activity",
        title: "Componentes",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/modal",
            title: "Modal",
          },
          {
            icon: "Zap",
            pathname: "/notification",
            title: "Notification",
          },
          {
            icon: "Zap",
            pathname: "/chart",
            title: "Chart",
          },
          {
            icon: "Zap",
            pathname: "/button",
            title: "Button",
          },
          {
            icon: "Zap",
            pathname: "/alert",
            title: "Alert",
          },
        ],
      },
    ],
  },
];

// Setup side menu
const findActiveMenu = (subMenu: Menu[], location: Location): boolean => {
  let match = false;
  subMenu.forEach((item) => {
    if (
      ((location.forceActiveMenu !== undefined &&
        item.pathname === location.forceActiveMenu) ||
        (location.forceActiveMenu === undefined &&
          item.pathname === location.pathname)) &&
      !item.ignore
    ) {
      match = true;
    } else if (!match && item.subMenu) {
      match = findActiveMenu(item.subMenu, location);
    }
  });
  return match;
};

const nestedMenu = (menu: Array<Menu | "divider">, location: Location) => {
  const formattedMenu: Array<FormattedMenu | "divider"> = [];
  menu.forEach((item) => {
    if (typeof item !== "string") {
      const menuItem: FormattedMenu = {
        icon: item.icon,
        title: item.title,
        pathname: item.pathname,
        subMenu: item.subMenu,
        ignore: item.ignore,
      };
      menuItem.active =
        ((location.forceActiveMenu !== undefined &&
          menuItem.pathname === location.forceActiveMenu) ||
          (location.forceActiveMenu === undefined &&
            menuItem.pathname === location.pathname) ||
          (menuItem.subMenu && findActiveMenu(menuItem.subMenu, location))) &&
        !menuItem.ignore;

      if (menuItem.subMenu) {
        menuItem.activeDropdown = findActiveMenu(menuItem.subMenu, location);

        // Nested menu
        const subMenu: Array<FormattedMenu> = [];
        nestedMenu(menuItem.subMenu, location).map(
          (menu) => typeof menu !== "string" && subMenu.push(menu),
        );
        menuItem.subMenu = subMenu;
      }

      formattedMenu.push(menuItem);
    } else {
      formattedMenu.push(item);
    }
  });

  return formattedMenu;
};

const linkTo = (menu: FormattedMenu, navigate: NavigateFunction) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    if (menu.pathname !== undefined) {
      navigate(menu.pathname);
    }
  }
};

const enter = (el: HTMLElement) => {
  if (el && el.style) {
    slideDown(el, 300);
  }
};

const leave = (el: HTMLElement) => {
  if (el && el.style) {
    slideUp(el, 300);
  }
};

// Force active menu context
const forceActiveMenuContext = createContext<{
  forceActiveMenu: (pathname: string) => void;
}>({
  forceActiveMenu: () => {},
});

const forceActiveMenu = (location: Location, pathname: string) => {
  location.forceActiveMenu = pathname;
};

export {
  menu as default,
  nestedMenu,
  linkTo,
  enter,
  leave,
  forceActiveMenuContext,
  forceActiveMenu,
};
