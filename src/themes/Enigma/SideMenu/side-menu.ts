import { type Menu } from "@/stores/menuSlice";

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
        pathname: "/crud-form",
        title: "Processos",
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
    title: "Financeiro",
    subMenu: [
      {
        icon: "CreditCard",
        pathname: "/point-of-sale",
        title: "Financeiro",
      },
      {
        icon: "Receipt",
        pathname: "/invoice-layout-1",
        title: "Faturamento",
      },
    ],
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

export default menu;
