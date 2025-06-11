import { type Menu } from "@/stores/menuSlice";

const menu: Array<Menu | "divider"> = [
  // PAINEL
  {
    icon: "LayoutDashboard",
    pathname: "/dashboard-overview-1",
    title: "Dashboard",
  },
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
  // APLICAÇÕES
  {
    icon: "Grid3X3",
    title: "Aplicações",
    subMenu: [
      {
        icon: "HardDrive",
        pathname: "/file-manager",
        title: "GED (Arquivos)",
      },
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
      {
        icon: "Inbox",
        pathname: "/inbox",
        title: "Tickets de Suporte",
      },
    ],
  },
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
      {
        icon: "BookOpen",
        pathname: "/faq-layout-1",
        title: "Central de Ajuda",
      },
    ],
  },
  // BETA/DESENVOLVIMENTO - Versão compacta para top menu
  {
    icon: "TestTube",
    title: "Beta/Dev",
    subMenu: [
      {
        icon: "Activity",
        title: "Dashboard Variants",
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
        title: "Profile Layouts",
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
      {
        icon: "Activity",
        title: "Forms & Tools",
        subMenu: [
          {
            icon: "Zap",
            pathname: "/regular-form",
            title: "Regular Form",
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
        ],
      },
    ],
  },
];

export default menu;
