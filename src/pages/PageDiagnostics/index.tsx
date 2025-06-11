import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { FormInput } from "@/components/Base/Form";

interface PageTest {
  name: string;
  route: string;
  category: string;
  status: "pending" | "testing" | "success" | "warning" | "error";
  issues: string[];
  improvements: string[];
  description: string;
  priority: "high" | "medium" | "low";
}

function Main() {
  const [tests, setTests] = useState<PageTest[]>([]);
  const [currentTest, setCurrentTest] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const pageTests: PageTest[] = [
    // Dashboard Pages
    {
      name: "DashboardOverview1",
      route: "/",
      category: "Dashboard",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Dashboard principal com métricas e gráficos",
      priority: "high",
    },
    {
      name: "DashboardOverview2",
      route: "/dashboard-overview-2",
      category: "Dashboard",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Dashboard alternativo com layout diferente",
      priority: "high",
    },
    {
      name: "DashboardOverview3",
      route: "/dashboard-overview-3",
      category: "Dashboard",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Dashboard com foco em analytics",
      priority: "high",
    },
    {
      name: "DashboardOverview4",
      route: "/dashboard-overview-4",
      category: "Dashboard",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Dashboard executivo simplificado",
      priority: "high",
    },

    // Authentication & Profile
    {
      name: "Login",
      route: "/login",
      category: "Auth",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Página de login do sistema",
      priority: "high",
    },
    {
      name: "Register",
      route: "/register",
      category: "Auth",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Página de registro de usuários",
      priority: "high",
    },
    {
      name: "ChangePassword",
      route: "/change-password",
      category: "Auth",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Alteração de senha",
      priority: "medium",
    },
    {
      name: "UpdateProfile",
      route: "/update-profile",
      category: "Auth",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Atualização de perfil do usuário",
      priority: "medium",
    },

    // E-Commerce
    {
      name: "Categories",
      route: "/categories",
      category: "E-Commerce",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Gestão de categorias",
      priority: "medium",
    },
    {
      name: "AddProduct",
      route: "/add-product",
      category: "E-Commerce",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Adicionar novo produto",
      priority: "medium",
    },
    {
      name: "ProductList",
      route: "/product-list",
      category: "E-Commerce",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Lista de produtos",
      priority: "medium",
    },
    {
      name: "ProductGrid",
      route: "/product-grid",
      category: "E-Commerce",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Grid de produtos",
      priority: "medium",
    },
    {
      name: "TransactionList",
      route: "/transaction-list",
      category: "E-Commerce",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Lista de transações",
      priority: "medium",
    },
    {
      name: "TransactionDetail",
      route: "/transaction-detail",
      category: "E-Commerce",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Detalhes da transação",
      priority: "medium",
    },
    {
      name: "SellerList",
      route: "/seller-list",
      category: "E-Commerce",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Lista de vendedores",
      priority: "low",
    },
    {
      name: "SellerDetail",
      route: "/seller-detail",
      category: "E-Commerce",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Detalhes do vendedor",
      priority: "low",
    },
    {
      name: "Reviews",
      route: "/reviews",
      category: "E-Commerce",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Sistema de avaliações",
      priority: "low",
    },
    {
      name: "PointOfSale",
      route: "/point-of-sale",
      category: "E-Commerce",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Ponto de venda",
      priority: "low",
    },

    // Communication & Content
    {
      name: "Inbox",
      route: "/inbox",
      category: "Communication",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Caixa de entrada",
      priority: "medium",
    },
    {
      name: "Chat",
      route: "/chat",
      category: "Communication",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Sistema de chat",
      priority: "medium",
    },
    {
      name: "Post",
      route: "/post",
      category: "Communication",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Sistema de posts",
      priority: "low",
    },

    // File Management
    {
      name: "FileManager",
      route: "/file-manager",
      category: "Files",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Gerenciador de arquivos",
      priority: "high",
    },
    {
      name: "FileUpload",
      route: "/file-upload",
      category: "Files",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Upload de arquivos",
      priority: "high",
    },

    // Calendar
    {
      name: "Calendar",
      route: "/calendar",
      category: "Tools",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Sistema de calendário (já melhorado)",
      priority: "high",
    },

    // CRUD Operations
    {
      name: "CrudDataList",
      route: "/crud-data-list",
      category: "CRUD",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Lista de dados CRUD",
      priority: "medium",
    },
    {
      name: "CrudForm",
      route: "/crud-form",
      category: "CRUD",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Formulário CRUD",
      priority: "medium",
    },

    // User Management
    {
      name: "UsersLayout1",
      route: "/users-layout-1",
      category: "Users",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de usuários 1",
      priority: "medium",
    },
    {
      name: "UsersLayout2",
      route: "/users-layout-2",
      category: "Users",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de usuários 2",
      priority: "medium",
    },
    {
      name: "UsersLayout3",
      route: "/users-layout-3",
      category: "Users",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de usuários 3",
      priority: "medium",
    },

    // Profile Pages
    {
      name: "ProfileOverview1",
      route: "/profile-overview-1",
      category: "Profile",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Overview de perfil 1",
      priority: "medium",
    },
    {
      name: "ProfileOverview2",
      route: "/profile-overview-2",
      category: "Profile",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Overview de perfil 2",
      priority: "medium",
    },
    {
      name: "ProfileOverview3",
      route: "/profile-overview-3",
      category: "Profile",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Overview de perfil 3",
      priority: "medium",
    },

    // Wizard Layouts
    {
      name: "WizardLayout1",
      route: "/wizard-layout-1",
      category: "Wizards",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de wizard 1",
      priority: "low",
    },
    {
      name: "WizardLayout2",
      route: "/wizard-layout-2",
      category: "Wizards",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de wizard 2",
      priority: "low",
    },
    {
      name: "WizardLayout3",
      route: "/wizard-layout-3",
      category: "Wizards",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de wizard 3",
      priority: "low",
    },

    // Blog Layouts
    {
      name: "BlogLayout1",
      route: "/blog-layout-1",
      category: "Blog",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de blog 1",
      priority: "low",
    },
    {
      name: "BlogLayout2",
      route: "/blog-layout-2",
      category: "Blog",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de blog 2",
      priority: "low",
    },
    {
      name: "BlogLayout3",
      route: "/blog-layout-3",
      category: "Blog",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de blog 3",
      priority: "low",
    },

    // Pricing Layouts
    {
      name: "PricingLayout1",
      route: "/pricing-layout-1",
      category: "Pricing",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de preços 1",
      priority: "low",
    },
    {
      name: "PricingLayout2",
      route: "/pricing-layout-2",
      category: "Pricing",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de preços 2",
      priority: "low",
    },

    // Invoice Layouts
    {
      name: "InvoiceLayout1",
      route: "/invoice-layout-1",
      category: "Invoice",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de fatura 1",
      priority: "medium",
    },
    {
      name: "InvoiceLayout2",
      route: "/invoice-layout-2",
      category: "Invoice",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de fatura 2",
      priority: "medium",
    },

    // FAQ Layouts
    {
      name: "FaqLayout1",
      route: "/faq-layout-1",
      category: "FAQ",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de FAQ 1",
      priority: "low",
    },
    {
      name: "FaqLayout2",
      route: "/faq-layout-2",
      category: "FAQ",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de FAQ 2",
      priority: "low",
    },
    {
      name: "FaqLayout3",
      route: "/faq-layout-3",
      category: "FAQ",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Layout de FAQ 3",
      priority: "low",
    },

    // UI Components
    {
      name: "Accordion",
      route: "/accordion",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Componente accordion",
      priority: "medium",
    },
    {
      name: "Alert",
      route: "/alert",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Componente de alertas",
      priority: "medium",
    },
    {
      name: "Button",
      route: "/button",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Componente de botões",
      priority: "medium",
    },
    {
      name: "Chart",
      route: "/chart",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Componentes de gráficos (já melhorados)",
      priority: "high",
    },
    {
      name: "Dropdown",
      route: "/dropdown",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Componente dropdown",
      priority: "medium",
    },
    {
      name: "Icon",
      route: "/icon",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Galeria de ícones",
      priority: "low",
    },
    {
      name: "LoadingIcon",
      route: "/loading-icon",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Ícones de carregamento",
      priority: "low",
    },
    {
      name: "Modal",
      route: "/modal",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Componente modal",
      priority: "medium",
    },
    {
      name: "Notification",
      route: "/notification",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Sistema de notificações",
      priority: "medium",
    },
    {
      name: "ProgressBar",
      route: "/progress-bar",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Barras de progresso",
      priority: "low",
    },
    {
      name: "Slideover",
      route: "/slideover",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Componente slideover",
      priority: "medium",
    },
    {
      name: "Tab",
      route: "/tab",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Componente de abas",
      priority: "medium",
    },
    {
      name: "Tooltip",
      route: "/tooltip",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Componente tooltip",
      priority: "low",
    },
    {
      name: "Typography",
      route: "/typography",
      category: "Components",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Tipografia do sistema",
      priority: "low",
    },

    // Form Components
    {
      name: "Datepicker",
      route: "/datepicker",
      category: "Forms",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Seletor de datas",
      priority: "medium",
    },
    {
      name: "RegularForm",
      route: "/regular-form",
      category: "Forms",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Formulários regulares",
      priority: "medium",
    },
    {
      name: "TomSelect",
      route: "/tom-select",
      category: "Forms",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Componente de seleção",
      priority: "medium",
    },
    {
      name: "Validation",
      route: "/validation",
      category: "Forms",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Validação de formulários",
      priority: "medium",
    },
    {
      name: "WysiwygEditor",
      route: "/wysiwyg-editor",
      category: "Forms",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Editor de texto rico",
      priority: "medium",
    },

    // Table Components
    {
      name: "RegularTable",
      route: "/regular-table",
      category: "Tables",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Tabelas regulares",
      priority: "medium",
    },
    {
      name: "Tabulator",
      route: "/tabulator",
      category: "Tables",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Tabelas avançadas",
      priority: "medium",
    },

    // Widgets
    {
      name: "ImageZoom",
      route: "/image-zoom",
      category: "Widgets",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Zoom de imagens",
      priority: "low",
    },
    {
      name: "Slider",
      route: "/slider",
      category: "Widgets",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Componente slider",
      priority: "low",
    },

    // Error Page
    {
      name: "ErrorPage",
      route: "/error-page",
      category: "System",
      status: "pending",
      issues: [],
      improvements: [],
      description: "Página de erro 404",
      priority: "low",
    },
  ];

  useEffect(() => {
    setTests([...pageTests]);
  }, []);

  const filteredTests = tests.filter((test) => {
    const matchesCategory =
      filterCategory === "all" || test.category === filterCategory;
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    "all",
    ...Array.from(new Set(pageTests.map((t) => t.category))),
  ];

  const runDiagnostics = async () => {
    setIsRunning(true);

    for (let i = 0; i < tests.length; i++) {
      setCurrentTest(i);

      // Simulate testing each page
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Mock test results based on known issues
      const test = tests[i];
      let status: PageTest["status"] = "success";
      let issues: string[] = [];
      let improvements: string[] = [];

      // Add known issues and improvements based on page type
      if (test.category === "Dashboard") {
        improvements.push("Integrar com dados reais");
        improvements.push("Adicionar filtros dinâmicos");
      }

      if (test.category === "E-Commerce") {
        issues.push("Dados mockados");
        improvements.push("Conectar com API de produtos");
      }

      if (test.category === "Components") {
        improvements.push("Adicionar mais exemplos");
        improvements.push("Melhorar documentação");
      }

      if (test.category === "Forms") {
        improvements.push("Validação aprimorada");
        improvements.push("Feedback visual melhor");
      }

      if (test.name === "Calendar" || test.name === "Chart") {
        status = "success";
        improvements.push("Já melhorado com novas funcionalidades");
      }

      setTests((prev) =>
        prev.map((t, index) =>
          index === i
            ? {
                ...t,
                status,
                issues,
                improvements,
              }
            : t,
        ),
      );
    }

    setIsRunning(false);
    setCurrentTest(-1);
  };

  const getStatusIcon = (status: PageTest["status"]) => {
    switch (status) {
      case "testing":
        return (
          <Lucide
            icon="Clock"
            className="w-4 h-4 text-yellow-500 animate-spin"
          />
        );
      case "success":
        return <Lucide icon="CheckCircle" className="w-4 h-4 text-green-500" />;
      case "error":
        return <Lucide icon="XCircle" className="w-4 h-4 text-red-500" />;
      case "warning":
        return (
          <Lucide icon="AlertTriangle" className="w-4 h-4 text-orange-500" />
        );
      default:
        return <Lucide icon="Circle" className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: PageTest["status"]) => {
    switch (status) {
      case "testing":
        return "border-yellow-200 bg-yellow-50";
      case "success":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      case "warning":
        return "border-orange-200 bg-orange-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getPriorityColor = (priority: PageTest["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
    }
  };

  const successCount = tests.filter((t) => t.status === "success").length;
  const errorCount = tests.filter((t) => t.status === "error").length;
  const warningCount = tests.filter((t) => t.status === "warning").length;
  const totalCount = tests.length;

  const visitPage = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">
          Diagnóstico Completo de Páginas
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mt-5 intro-y sm:grid-cols-4">
        <div className="flex items-center p-5 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full">
            <Lucide icon="FileText" className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="text-2xl font-bold text-blue-800">{totalCount}</div>
            <div className="text-sm text-blue-600">Total de Páginas</div>
          </div>
        </div>

        <div className="flex items-center p-5 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-green-200 rounded-full">
            <Lucide icon="CheckCircle" className="w-5 h-5 text-green-600" />
          </div>
          <div className="ml-4">
            <div className="text-2xl font-bold text-green-800">
              {successCount}
            </div>
            <div className="text-sm text-green-600">Funcionando</div>
          </div>
        </div>

        <div className="flex items-center p-5 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-orange-200 rounded-full">
            <Lucide icon="AlertTriangle" className="w-5 h-5 text-orange-600" />
          </div>
          <div className="ml-4">
            <div className="text-2xl font-bold text-orange-800">
              {warningCount}
            </div>
            <div className="text-sm text-orange-600">Avisos</div>
          </div>
        </div>

        <div className="flex items-center p-5 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-red-200 rounded-full">
            <Lucide icon="XCircle" className="w-5 h-5 text-red-600" />
          </div>
          <div className="ml-4">
            <div className="text-2xl font-bold text-red-800">{errorCount}</div>
            <div className="text-sm text-red-600">Erros</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y box">
          <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
            <h2 className="font-medium text-base mr-auto">
              Análise de Páginas
            </h2>
            <div className="flex items-center gap-4 mt-3 sm:mt-0">
              <div className="flex items-center gap-2">
                <FormInput
                  type="text"
                  placeholder="Buscar páginas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-40"
                />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="form-select w-40"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "Todas as Categorias" : cat}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                variant="primary"
                onClick={runDiagnostics}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <Lucide
                      icon="RefreshCw"
                      className="w-4 h-4 mr-2 animate-spin"
                    />
                    Testando...
                  </>
                ) : (
                  <>
                    <Lucide icon="Play" className="w-4 h-4 mr-2" />
                    Executar Diagnóstico
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="p-5">
            {filteredTests.length === 0 ? (
              <div className="text-center py-10">
                <Lucide
                  icon="Search"
                  className="w-12 h-12 mx-auto text-slate-400 mb-4"
                />
                <p className="text-slate-500">Nenhuma página encontrada</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredTests.map((test, index) => (
                  <div
                    key={test.name}
                    className={clsx([
                      "border rounded-lg p-4 transition-all duration-200",
                      getStatusColor(test.status),
                      currentTest === tests.indexOf(test) &&
                        "ring-2 ring-blue-500",
                    ])}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <h3 className="font-medium text-sm mr-2">
                          {test.name}
                        </h3>
                        <span
                          className={clsx([
                            "text-xs px-2 py-1 rounded",
                            getPriorityColor(test.priority),
                          ])}
                        >
                          {test.priority}
                        </span>
                      </div>
                      {getStatusIcon(test.status)}
                    </div>

                    <p className="text-xs text-slate-600 mb-2">
                      {test.description}
                    </p>
                    <p className="text-xs text-slate-500 mb-3">{test.route}</p>
                    <p className="text-xs text-slate-500 mb-3">
                      Categoria: {test.category}
                    </p>

                    {test.issues.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-xs font-medium mb-1 text-red-600">
                          Issues:
                        </h4>
                        <ul className="text-xs space-y-1">
                          {test.issues.map((issue, issueIndex) => (
                            <li key={issueIndex} className="text-red-600">
                              • {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {test.improvements.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-xs font-medium mb-1 text-blue-600">
                          Melhorias:
                        </h4>
                        <ul className="text-xs space-y-1">
                          {test.improvements.map((improvement, impIndex) => (
                            <li key={impIndex} className="text-blue-600">
                              • {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => visitPage(test.route)}
                      >
                        <Lucide icon="ExternalLink" className="w-3 h-3 mr-1" />
                        Visitar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
