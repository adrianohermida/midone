import { type Menu } from "@/stores/menuSlice";

// Menu unificado que funciona tanto para top-menu quanto side-menu
// Automaticamente adapta estrutura baseado no tipo de layout
const unifiedMenu: Array<Menu | "divider"> = [
  // PAINEL PRINCIPAL
  {
    icon: "LayoutDashboard",
    pathname: "/dashboard-overview-3",
    title: "Painel Principal",
  },
  "divider",

  // MÓDULOS PRINCIPAIS
  {
    icon: "Users",
    pathname: "/crm",
    title: "CRM",
  },
  {
    icon: "Scale",
    pathname: "/juridico",
    title: "Jurídico",
  },
  {
    icon: "DollarSign",
    pathname: "/financeiro",
    title: "Financeiro",
  },
  {
    icon: "Settings",
    pathname: "/administracao",
    title: "Administração",
  },
  {
    icon: "HardDrive",
    pathname: "/file-manager",
    title: "Gestão de Documentos",
  },
  "divider",

  // IA E AUTOMAÇÃO
  {
    icon: "Bot",
    title: "Inteligência Artificial",
    subMenu: [
      {
        icon: "MessageCircle",
        pathname: "/chat",
        title: "Assistente Jurídico IA",
      },
      {
        icon: "FileEdit",
        pathname: "/post",
        title: "Geração de Documentos",
      },
    ],
  },

  // SUPORTE E AJUDA
  {
    icon: "HelpCircle",
    title: "Suporte",
    subMenu: [
      {
        icon: "BookOpen",
        pathname: "/faq-layout-1",
        title: "Base de Conhecimento",
      },
      {
        icon: "Inbox",
        pathname: "/inbox",
        title: "Tickets de Suporte",
      },
    ],
  },
];

// Menu adaptado para top-menu (mais compacto)
export const topMenuConfig: Array<Menu | "divider"> = [
  // PAINEL
  {
    icon: "LayoutDashboard",
    pathname: "/dashboard-overview-1",
    title: "Dashboard",
  },
  // MÓDULOS PRINCIPAIS
  {
    icon: "Users",
    pathname: "/crm",
    title: "CRM",
  },
  {
    icon: "Scale",
    pathname: "/juridico",
    title: "Jurídico",
  },
  {
    icon: "DollarSign",
    pathname: "/financeiro",
    title: "Financeiro",
  },
  // APLICAÇÕES
  {
    icon: "Grid3X3",
    title: "Apps",
    subMenu: [
      {
        icon: "HardDrive",
        pathname: "/file-manager",
        title: "GED",
      },
      {
        icon: "MessageCircle",
        pathname: "/chat",
        title: "IA Assistente",
      },
      {
        icon: "FileEdit",
        pathname: "/post",
        title: "Docs Inteligentes",
      },
    ],
  },
  // ADMINISTRAÇÃO
  {
    icon: "Settings",
    title: "Admin",
    subMenu: [
      {
        icon: "Sliders",
        pathname: "/regular-form",
        title: "Configurações",
      },
      {
        icon: "Users",
        pathname: "/users-layout-3",
        title: "Usuários",
      },
      {
        icon: "Plug",
        pathname: "/regular-table",
        title: "Integrações",
      },
      {
        icon: "Activity",
        pathname: "/transaction-list",
        title: "Logs",
      },
      {
        icon: "BookOpen",
        pathname: "/faq-layout-1",
        title: "Ajuda",
      },
      {
        icon: "Inbox",
        pathname: "/inbox",
        title: "Suporte",
      },
    ],
  },
  // BETA/DEV (Mais compacto)
  {
    icon: "TestTube",
    title: "Dev",
    subMenu: [
      {
        icon: "Activity",
        title: "Dashboards",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/dashboard-overview-2",
            title: "Dashboard 2",
          },
          {
            icon: "Zap",
            pathname: "/dashboard-overview-3",
            title: "Dashboard 3",
          },
          {
            icon: "Zap",
            pathname: "/dashboard-overview-4",
            title: "Dashboard 4",
          },
        ],
      },
      {
        icon: "Activity",
        title: "Profiles",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/profile-overview-1",
            title: "Perfil 1",
          },
          {
            icon: "Zap",
            pathname: "/profile-overview-2",
            title: "Perfil 2",
          },
          {
            icon: "Zap",
            pathname: "/profile-overview-3",
            title: "Perfil 3",
          },
        ],
      },
      {
        icon: "Activity",
        title: "Components",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/modal",
            title: "Modal",
          },
          {
            icon: "Zap",
            pathname: "/slideover",
            title: "Slide Over",
          },
          {
            icon: "Zap",
            pathname: "/notification",
            title: "Notification",
          },
          {
            icon: "Zap",
            pathname: "/tab",
            title: "Tab",
          },
          {
            icon: "Zap",
            pathname: "/accordion",
            title: "Accordion",
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
          {
            icon: "Zap",
            pathname: "/chart",
            title: "Chart",
          },
        ],
      },
    ],
  },
];

// Menu para side-menu (estrutura completa)
export const sideMenuConfig: Array<Menu | "divider"> = unifiedMenu.concat([
  "divider",
  // BETA/DESENVOLVIMENTO - Completo para sidebar
  {
    icon: "TestTube",
    title: "Painel Beta (Dev/Testes)",
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
        title: "User Layouts",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/users-layout-2",
            title: "Users Layout 2",
          },
        ],
      },
      {
        icon: "Activity",
        title: "Wizards",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/wizard-layout-1",
            title: "Wizard 1",
          },
          {
            icon: "Zap",
            pathname: "/wizard-layout-2",
            title: "Wizard 2",
          },
          {
            icon: "Zap",
            pathname: "/wizard-layout-3",
            title: "Wizard 3",
          },
        ],
      },
      {
        icon: "Activity",
        title: "Blog Layouts",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/blog-layout-2",
            title: "Blog Layout 2",
          },
          {
            icon: "Zap",
            pathname: "/blog-layout-3",
            title: "Blog Layout 3",
          },
        ],
      },
      {
        icon: "Activity",
        title: "Pricing",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/pricing-layout-1",
            title: "Pricing 1",
          },
          {
            icon: "Zap",
            pathname: "/pricing-layout-2",
            title: "Pricing 2",
          },
        ],
      },
      {
        icon: "Activity",
        title: "Invoice Layouts",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/invoice-layout-2",
            title: "Invoice Layout 2",
          },
        ],
      },
      {
        icon: "Activity",
        title: "FAQ Layouts",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/faq-layout-2",
            title: "FAQ Layout 2",
          },
          {
            icon: "Zap",
            pathname: "/faq-layout-3",
            title: "FAQ Layout 3",
          },
        ],
      },
      {
        icon: "Activity",
        title: "E-Commerce (Obsoleto)",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/categories",
            title: "Categories",
          },
          {
            icon: "Zap",
            pathname: "/add-product",
            title: "Add Product",
          },
          {
            icon: "Zap",
            pathname: "/product-list",
            title: "Product List",
          },
          {
            icon: "Zap",
            pathname: "/product-grid",
            title: "Product Grid",
          },
          {
            icon: "Zap",
            pathname: "/transaction-detail",
            title: "Transaction Detail",
          },
          {
            icon: "Zap",
            pathname: "/seller-list",
            title: "Seller List",
          },
          {
            icon: "Zap",
            pathname: "/seller-detail",
            title: "Seller Detail",
          },
          {
            icon: "Zap",
            pathname: "/reviews",
            title: "Reviews",
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
            pathname: "/slideover",
            title: "Slide Over",
          },
          {
            icon: "Zap",
            pathname: "/notification",
            title: "Notification",
          },
          {
            icon: "Zap",
            pathname: "/tab",
            title: "Tab",
          },
          {
            icon: "Zap",
            pathname: "/accordion",
            title: "Accordion",
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
          {
            icon: "Zap",
            pathname: "/progress-bar",
            title: "Progress Bar",
          },
          {
            icon: "Zap",
            pathname: "/tooltip",
            title: "Tooltip",
          },
          {
            icon: "Zap",
            pathname: "/dropdown",
            title: "Dropdown",
          },
          {
            icon: "Zap",
            pathname: "/typography",
            title: "Typography",
          },
          {
            icon: "Zap",
            pathname: "/icon",
            title: "Icon",
          },
          {
            icon: "Zap",
            pathname: "/loading-icon",
            title: "Loading Icon",
          },
          {
            icon: "Zap",
            pathname: "/datepicker",
            title: "Datepicker",
          },
          {
            icon: "Zap",
            pathname: "/tom-select",
            title: "Tom Select",
          },
          {
            icon: "Zap",
            pathname: "/file-upload",
            title: "File Upload",
          },
          {
            icon: "Zap",
            pathname: "/validation",
            title: "Validation",
          },
          {
            icon: "Zap",
            pathname: "/chart",
            title: "Chart",
          },
          {
            icon: "Zap",
            pathname: "/slider",
            title: "Slider",
          },
          {
            icon: "Zap",
            pathname: "/image-zoom",
            title: "Image Zoom",
          },
        ],
      },
      {
        icon: "Activity",
        title: "Auth Pages",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/login",
            title: "Login",
          },
          {
            icon: "Zap",
            pathname: "/register",
            title: "Register",
          },
          {
            icon: "Zap",
            pathname: "/error-page",
            title: "Error Page",
          },
          {
            icon: "Zap",
            pathname: "/update-profile",
            title: "Update Profile",
          },
          {
            icon: "Zap",
            pathname: "/change-password",
            title: "Change Password",
          },
        ],
      },
    ],
  },
]);

// Função para obter menu baseado no layout
export const getMenuByLayout = (
  layout: "side-menu" | "top-menu" | "simple-menu",
) => {
  switch (layout) {
    case "top-menu":
      return topMenuConfig;
    case "side-menu":
      return sideMenuConfig;
    case "simple-menu":
      return unifiedMenu;
    default:
      return unifiedMenu;
  }
};

export default unifiedMenu;
