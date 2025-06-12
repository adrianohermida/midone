import { Routes, Route } from "react-router-dom";
import { Themes } from "@/themes";

// Import all pages
import DashboardOverview1 from "@/pages/DashboardOverview1";
import DashboardOverview2 from "@/pages/DashboardOverview2";
import DashboardOverview3 from "@/pages/DashboardOverview3";
import DashboardOverview4 from "@/pages/DashboardOverview4";
import Categories from "@/pages/Categories";
import AddProduct from "@/pages/AddProduct";
import ProductList from "@/pages/ProductList";
import ProductGrid from "@/pages/ProductGrid";
import TransactionList from "@/pages/TransactionList";
import TransactionDetail from "@/pages/TransactionDetail";
import SellerList from "@/pages/SellerList";
import SellerDetail from "@/pages/SellerDetail";
import Reviews from "@/pages/Reviews";
import Inbox from "@/pages/Inbox";
import FileManager from "@/pages/FileManager";
import PointOfSale from "@/pages/PointOfSale";
import Chat from "@/pages/Chat";
import Post from "@/pages/Post";
import Calendar from "@/pages/Calendar";
import CrudDataList from "@/pages/CrudDataList";
import CrudForm from "@/pages/CrudForm";
import UsersLayout1 from "@/pages/UsersLayout1";
import UsersLayout2 from "@/pages/UsersLayout2";
import UsersLayout3 from "@/pages/UsersLayout3";
import ProfileOverview1 from "@/pages/ProfileOverview1";
import ProfileOverview2 from "@/pages/ProfileOverview2";
import ProfileOverview3 from "@/pages/ProfileOverview3";
import WizardLayout1 from "@/pages/WizardLayout1";
import WizardLayout2 from "@/pages/WizardLayout2";
import WizardLayout3 from "@/pages/WizardLayout3";
import BlogLayout1 from "@/pages/BlogLayout1";
import BlogLayout2 from "@/pages/BlogLayout2";
import BlogLayout3 from "@/pages/BlogLayout3";
import PricingLayout1 from "@/pages/PricingLayout1";
import PricingLayout2 from "@/pages/PricingLayout2";
import InvoiceLayout1 from "@/pages/InvoiceLayout1";
import InvoiceLayout2 from "@/pages/InvoiceLayout2";
import FaqLayout1 from "@/pages/FaqLayout1";
import FaqLayout2 from "@/pages/FaqLayout2";
import FaqLayout3 from "@/pages/FaqLayout3";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ErrorPage from "@/pages/ErrorPage";
import UpdateProfile from "@/pages/UpdateProfile";
import ChangePassword from "@/pages/ChangePassword";
import RegularTable from "@/pages/RegularTable";
import Tabulator from "@/pages/Tabulator";
import Modal from "@/pages/Modal";
import Slideover from "@/pages/Slideover";
import Notification from "@/pages/Notification";
import Tab from "@/pages/Tab";
import Accordion from "@/pages/Accordion";
import Button from "@/pages/Button";
import Alert from "@/pages/Alert";
import ProgressBar from "@/pages/ProgressBar";
import Tooltip from "@/pages/Tooltip";
import Dropdown from "@/pages/Dropdown";
import Typography from "@/pages/Typography";
import Icon from "@/pages/Icon";
import LoadingIcon from "@/pages/LoadingIcon";
import RegularForm from "@/pages/RegularForm";
import Datepicker from "@/pages/Datepicker";
import TomSelect from "@/pages/TomSelect";
import FileUpload from "@/pages/FileUpload";
import WysiwygEditor from "@/pages/WysiwygEditor";
import Validation from "@/pages/Validation";
import Chart from "@/pages/Chart";
import Slider from "@/pages/Slider";
import ImageZoom from "@/pages/ImageZoom";
import ComponentDiagnostics from "@/pages/ComponentDiagnostics";
import ComponentDiagnosticsReport from "@/pages/ComponentDiagnosticsReport";
import PageDiagnostics from "@/pages/PageDiagnostics";

// Legal Cases Pages
import LegalCasesDashboard from "@/pages/LegalCases/Dashboard";
import LegalCasesList from "@/pages/LegalCases/CaseList";
import LegalCaseForm from "@/pages/LegalCases/CaseForm";
import LegalCaseDetails from "@/pages/LegalCases/CaseDetails";
import LegalCasesIntimations from "@/pages/LegalCases/Intimations";
import LegalCasesAnalytics from "@/pages/LegalCases/Analytics";

// Financial Module Pages
import FinanceiroDashboard from "@/pages/Financeiro/Dashboard";
import FinanceiroFaturamento from "@/pages/Financeiro/Faturamento";
import FinanceiroTransacoes from "@/pages/Financeiro/Transacoes";
import FinanceiroTransacaoDetalhes from "@/pages/Financeiro/TransacaoDetalhes";
import FinanceiroProdutos from "@/pages/Financeiro/Produtos";
import FinanceiroProdutoNovo from "@/pages/Financeiro/ProdutoNovo";
import FinanceiroHonorarios from "@/pages/Financeiro/Honorarios";
import FinanceiroCustas from "@/pages/Financeiro/Custas";
import FinanceiroFluxoCaixa from "@/pages/Financeiro/FluxoCaixa";
import FinanceiroRelatorios from "@/pages/Financeiro/Relatorios";
import FinanceiroProcessoDetalhes from "@/pages/Financeiro/ProcessoDetalhes";
import FinanceiroAssinaturasCobrancas from "@/pages/Financeiro/AssinaturasCobrancas";

// CRM Module Pages
import CRMDashboard from "@/pages/CRM/Dashboard";
import CRMContatos from "@/pages/CRM/Contatos";
import CRMNegocios from "@/pages/CRM/Negocios";
import CRMSuporte from "@/pages/CRM/Suporte";

// Juridico Module Pages (New Implementation)
import JuridicoProcessos from "@/pages/Juridico/Processos";
import JuridicoPublicacoes from "@/pages/Juridico/Processos/Publicacoes";
import JuridicoIntimacoes from "@/pages/Juridico/Processos/Intimacoes";
import JuridicoAgenda from "@/pages/Juridico/Processos/Agenda";
import JuridicoRelatorios from "@/pages/Juridico/Processos/Relatorios";
import JuridicoProcessoDetalhes from "@/pages/Juridico/Processos/ProcessoDetalhes";
import ProcessoDetalhesModerno from "@/pages/Juridico/ProcessoDetalhesModerno";

// Administracao Module Pages
import AdministracaoDashboard from "@/pages/Administracao/Dashboard";

const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<Themes />}>
        {/* Dashboard Routes */}
        <Route index element={<DashboardOverview1 />} />
        <Route path="dashboard-overview-2" element={<DashboardOverview2 />} />
        <Route path="dashboard-overview-3" element={<DashboardOverview3 />} />
        <Route path="dashboard-overview-4" element={<DashboardOverview4 />} />

        {/* E-Commerce Routes */}
        <Route path="categories" element={<Categories />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="product-grid" element={<ProductGrid />} />
        <Route path="transaction-list" element={<TransactionList />} />
        <Route path="transaction-detail" element={<TransactionDetail />} />
        <Route path="seller-list" element={<SellerList />} />
        <Route path="seller-detail" element={<SellerDetail />} />
        <Route path="reviews" element={<Reviews />} />

        {/* Legal Cases Routes */}
        <Route path="legal-cases" element={<LegalCasesDashboard />} />
        <Route path="legal-cases/dashboard" element={<LegalCasesDashboard />} />
        <Route path="legal-cases/list" element={<LegalCasesList />} />
        <Route path="legal-cases/create" element={<LegalCaseForm />} />
        <Route path="legal-cases/:id" element={<LegalCaseDetails />} />
        <Route path="legal-cases/:id/edit" element={<LegalCaseForm />} />
        <Route
          path="legal-cases/intimations"
          element={<LegalCasesIntimations />}
        />
        <Route path="legal-cases/analytics" element={<LegalCasesAnalytics />} />

        {/* Financial Module Routes */}
        <Route path="financeiro" element={<FinanceiroDashboard />} />
        <Route path="financeiro/dashboard" element={<FinanceiroDashboard />} />
        <Route
          path="financeiro/honorarios"
          element={<FinanceiroHonorarios />}
        />
        <Route path="financeiro/custas" element={<FinanceiroCustas />} />
        <Route
          path="financeiro/processo/:id"
          element={<FinanceiroProcessoDetalhes />}
        />
        <Route
          path="financeiro/fluxo-caixa"
          element={<FinanceiroFluxoCaixa />}
        />
        <Route
          path="financeiro/relatorios"
          element={<FinanceiroRelatorios />}
        />
        <Route
          path="financeiro/faturamento"
          element={<FinanceiroFaturamento />}
        />
        <Route path="financeiro/notas" element={<InvoiceLayout2 />} />
        <Route
          path="financeiro/transacoes"
          element={<FinanceiroTransacoes />}
        />
        <Route
          path="financeiro/transacoes/:id"
          element={<FinanceiroTransacaoDetalhes />}
        />
        <Route path="financeiro/produtos" element={<FinanceiroProdutos />} />
        <Route
          path="financeiro/produtos/novo"
          element={<FinanceiroProdutoNovo />}
        />
        <Route path="financeiro/produtos/grade" element={<ProductGrid />} />
        <Route path="financeiro/pdv" element={<PointOfSale />} />
        <Route path="financeiro/planos" element={<PricingLayout1 />} />
        <Route
          path="financeiro/assinaturas"
          element={<FinanceiroAssinaturasCobrancas />}
        />
        <Route path="financeiro/fornecedores" element={<SellerList />} />
        <Route path="financeiro/fornecedores/:id" element={<SellerDetail />} />

        {/* CRM Module Routes - Direct Access */}
        <Route path="crm" element={<CRMDashboard />} />

        {/* Juridico Module Routes - Direct Access */}
        <Route path="juridico" element={<JuridicoProcessos />} />
        <Route path="juridico/:id" element={<ProcessoDetalhesModerno />} />
        {/* Main Pages Routes */}
        <Route path="inbox" element={<Inbox />} />
        <Route path="file-manager" element={<FileManager />} />
        <Route path="point-of-sale" element={<PointOfSale />} />
        <Route path="chat" element={<Chat />} />
        <Route path="post" element={<Post />} />
        <Route path="calendar" element={<Calendar />} />

        {/* CRUD Routes */}
        <Route path="crud-data-list" element={<CrudDataList />} />
        <Route path="crud-form" element={<CrudForm />} />

        {/* Users Routes */}
        <Route path="users-layout-1" element={<UsersLayout1 />} />
        <Route path="users-layout-2" element={<UsersLayout2 />} />
        <Route path="users-layout-3" element={<UsersLayout3 />} />

        {/* Profile Routes */}
        <Route path="profile-overview-1" element={<ProfileOverview1 />} />
        <Route path="profile-overview-2" element={<ProfileOverview2 />} />
        <Route path="profile-overview-3" element={<ProfileOverview3 />} />

        {/* Wizard Routes */}
        <Route path="wizard-layout-1" element={<WizardLayout1 />} />
        <Route path="wizard-layout-2" element={<WizardLayout2 />} />
        <Route path="wizard-layout-3" element={<WizardLayout3 />} />

        {/* Blog Routes */}
        <Route path="blog-layout-1" element={<BlogLayout1 />} />
        <Route path="blog-layout-2" element={<BlogLayout2 />} />
        <Route path="blog-layout-3" element={<BlogLayout3 />} />

        {/* Pricing Routes */}
        <Route path="pricing-layout-1" element={<PricingLayout1 />} />
        <Route path="pricing-layout-2" element={<PricingLayout2 />} />

        {/* Invoice Routes */}
        <Route path="invoice-layout-1" element={<InvoiceLayout1 />} />
        <Route path="invoice-layout-2" element={<InvoiceLayout2 />} />

        {/* FAQ Routes */}
        <Route path="faq-layout-1" element={<FaqLayout1 />} />
        <Route path="faq-layout-2" element={<FaqLayout2 />} />
        <Route path="faq-layout-3" element={<FaqLayout3 />} />

        {/* Auth & Profile Management Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="error-page" element={<ErrorPage />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="change-password" element={<ChangePassword />} />

        {/* Table Components Routes */}
        <Route path="regular-table" element={<RegularTable />} />
        <Route path="tabulator" element={<Tabulator />} />

        {/* Overlay Components Routes */}
        <Route path="modal" element={<Modal />} />
        <Route path="slideover" element={<Slideover />} />
        <Route path="notification" element={<Notification />} />

        {/* UI Components Routes */}
        <Route path="tab" element={<Tab />} />
        <Route path="accordion" element={<Accordion />} />
        <Route path="button" element={<Button />} />
        <Route path="alert" element={<Alert />} />
        <Route path="progress-bar" element={<ProgressBar />} />
        <Route path="tooltip" element={<Tooltip />} />
        <Route path="dropdown" element={<Dropdown />} />
        <Route path="typography" element={<Typography />} />
        <Route path="icon" element={<Icon />} />
        <Route path="loading-icon" element={<LoadingIcon />} />

        {/* Form Components Routes */}
        <Route path="regular-form" element={<RegularForm />} />
        <Route path="datepicker" element={<Datepicker />} />
        <Route path="tom-select" element={<TomSelect />} />
        <Route path="file-upload" element={<FileUpload />} />
        <Route path="wysiwyg-editor" element={<WysiwygEditor />} />
        <Route path="validation" element={<Validation />} />

        {/* Widget Components Routes */}
        <Route path="chart" element={<Chart />} />
        <Route path="slider" element={<Slider />} />
        <Route path="image-zoom" element={<ImageZoom />} />

        {/* Diagnostics Route */}
        <Route
          path="component-diagnostics"
          element={<ComponentDiagnostics />}
        />
        <Route
          path="component-report"
          element={<ComponentDiagnosticsReport />}
        />
        <Route path="page-diagnostics" element={<PageDiagnostics />} />

        {/* 404 Route - Needs to be inside the nested route */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
