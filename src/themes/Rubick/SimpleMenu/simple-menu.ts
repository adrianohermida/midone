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
    icon: "UserCheck",
    pathname: "/users-layout-1",
    title: "Contatos",
  },
  {
    icon: "TrendingUp",
    pathname: "/crud-data-list",
    title: "Negócios",
  },
  {
    icon: "CheckSquare",
    pathname: "/tabulator",
    title: "Tarefas",
  },
  "divider",
  // JURÍDICO
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
  "divider",
  // FINANCEIRO
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
  // DOCUMENTOS
  {
    icon: "HardDrive",
    pathname: "/file-manager",
    title: "GED (Arquivos)",
  },
  "divider",
  // IA JURÍDICA
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
  "divider",
  // ADMINISTRAÇÃO
  {
    icon: "Sliders",
    pathname: "/regular-form",
    title: "Configurações",
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
  // SUPORTE
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
  "divider",
  // BETA/TESTES - Versão compacta para simple menu
  {
    icon: "TestTube",
    title: "Beta/Testes",
    subMenu: [
      {
        icon: "Activity",
        pathname: "/dashboard-overview-2",
        title: "Dashboard 2",
      },
      {
        icon: "Activity",
        pathname: "/profile-overview-1",
        title: "Perfil 1",
      },
      {
        icon: "Activity",
        pathname: "/modal",
        title: "Modal",
      },
      {
        icon: "Activity",
        pathname: "/chart",
        title: "Chart",
      },
    ],
  },
];

export default menu;
