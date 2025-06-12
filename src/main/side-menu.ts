import { type Menu } from "@/stores/menuSlice";
import { sideMenuConfig } from "./unified-menu";

const menu: Array<Menu | "divider"> = sideMenuConfig;
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
    pathname: "/crm",
    title: "CRM",
  },
  // JURÍDICO
  {
    icon: "Scale",
    pathname: "/juridico",
    title: "Jurídico",
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
];

export default menu;