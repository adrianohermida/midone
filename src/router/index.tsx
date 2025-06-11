import { Routes, Route } from "react-router-dom";

// Import all pages from the original Midone template
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
import Debug from "@/pages/Debug";

// Layout wrapper that uses the theme system
import LayoutWrapper from "@/layouts/MainLayout";

const Router = () => {
  return (
    <Routes>
      {/* All routes wrapped with the layout */}
      <Route
        path="/"
        element={
          <LayoutWrapper>
            <DashboardOverview1 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/dashboard-overview-2"
        element={
          <LayoutWrapper>
            <DashboardOverview2 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/dashboard-overview-3"
        element={
          <LayoutWrapper>
            <DashboardOverview3 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/dashboard-overview-4"
        element={
          <LayoutWrapper>
            <DashboardOverview4 />
          </LayoutWrapper>
        }
      />

      <Route
        path="/categories"
        element={
          <LayoutWrapper>
            <Categories />
          </LayoutWrapper>
        }
      />
      <Route
        path="/add-product"
        element={
          <LayoutWrapper>
            <AddProduct />
          </LayoutWrapper>
        }
      />
      <Route
        path="/product-list"
        element={
          <LayoutWrapper>
            <ProductList />
          </LayoutWrapper>
        }
      />
      <Route
        path="/product-grid"
        element={
          <LayoutWrapper>
            <ProductGrid />
          </LayoutWrapper>
        }
      />
      <Route
        path="/transaction-list"
        element={
          <LayoutWrapper>
            <TransactionList />
          </LayoutWrapper>
        }
      />
      <Route
        path="/transaction-detail"
        element={
          <LayoutWrapper>
            <TransactionDetail />
          </LayoutWrapper>
        }
      />
      <Route
        path="/seller-list"
        element={
          <LayoutWrapper>
            <SellerList />
          </LayoutWrapper>
        }
      />
      <Route
        path="/seller-detail"
        element={
          <LayoutWrapper>
            <SellerDetail />
          </LayoutWrapper>
        }
      />
      <Route
        path="/reviews"
        element={
          <LayoutWrapper>
            <Reviews />
          </LayoutWrapper>
        }
      />

      <Route
        path="/inbox"
        element={
          <LayoutWrapper>
            <Inbox />
          </LayoutWrapper>
        }
      />
      <Route
        path="/file-manager"
        element={
          <LayoutWrapper>
            <FileManager />
          </LayoutWrapper>
        }
      />
      <Route
        path="/point-of-sale"
        element={
          <LayoutWrapper>
            <PointOfSale />
          </LayoutWrapper>
        }
      />
      <Route
        path="/chat"
        element={
          <LayoutWrapper>
            <Chat />
          </LayoutWrapper>
        }
      />
      <Route
        path="/post"
        element={
          <LayoutWrapper>
            <Post />
          </LayoutWrapper>
        }
      />
      <Route
        path="/calendar"
        element={
          <LayoutWrapper>
            <Calendar />
          </LayoutWrapper>
        }
      />

      <Route
        path="/crud-data-list"
        element={
          <LayoutWrapper>
            <CrudDataList />
          </LayoutWrapper>
        }
      />
      <Route
        path="/crud-form"
        element={
          <LayoutWrapper>
            <CrudForm />
          </LayoutWrapper>
        }
      />

      <Route
        path="/users-layout-1"
        element={
          <LayoutWrapper>
            <UsersLayout1 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/users-layout-2"
        element={
          <LayoutWrapper>
            <UsersLayout2 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/users-layout-3"
        element={
          <LayoutWrapper>
            <UsersLayout3 />
          </LayoutWrapper>
        }
      />

      <Route
        path="/profile-overview-1"
        element={
          <LayoutWrapper>
            <ProfileOverview1 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/profile-overview-2"
        element={
          <LayoutWrapper>
            <ProfileOverview2 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/profile-overview-3"
        element={
          <LayoutWrapper>
            <ProfileOverview3 />
          </LayoutWrapper>
        }
      />

      <Route
        path="/wizard-layout-1"
        element={
          <LayoutWrapper>
            <WizardLayout1 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/wizard-layout-2"
        element={
          <LayoutWrapper>
            <WizardLayout2 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/wizard-layout-3"
        element={
          <LayoutWrapper>
            <WizardLayout3 />
          </LayoutWrapper>
        }
      />

      <Route
        path="/blog-layout-1"
        element={
          <LayoutWrapper>
            <BlogLayout1 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/blog-layout-2"
        element={
          <LayoutWrapper>
            <BlogLayout2 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/blog-layout-3"
        element={
          <LayoutWrapper>
            <BlogLayout3 />
          </LayoutWrapper>
        }
      />

      <Route
        path="/pricing-layout-1"
        element={
          <LayoutWrapper>
            <PricingLayout1 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/pricing-layout-2"
        element={
          <LayoutWrapper>
            <PricingLayout2 />
          </LayoutWrapper>
        }
      />

      <Route
        path="/invoice-layout-1"
        element={
          <LayoutWrapper>
            <InvoiceLayout1 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/invoice-layout-2"
        element={
          <LayoutWrapper>
            <InvoiceLayout2 />
          </LayoutWrapper>
        }
      />

      <Route
        path="/faq-layout-1"
        element={
          <LayoutWrapper>
            <FaqLayout1 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/faq-layout-2"
        element={
          <LayoutWrapper>
            <FaqLayout2 />
          </LayoutWrapper>
        }
      />
      <Route
        path="/faq-layout-3"
        element={
          <LayoutWrapper>
            <FaqLayout3 />
          </LayoutWrapper>
        }
      />

      <Route
        path="/login"
        element={
          <LayoutWrapper>
            <Login />
          </LayoutWrapper>
        }
      />
      <Route
        path="/register"
        element={
          <LayoutWrapper>
            <Register />
          </LayoutWrapper>
        }
      />
      <Route
        path="/error-page"
        element={
          <LayoutWrapper>
            <ErrorPage />
          </LayoutWrapper>
        }
      />
      <Route
        path="/update-profile"
        element={
          <LayoutWrapper>
            <UpdateProfile />
          </LayoutWrapper>
        }
      />
      <Route
        path="/change-password"
        element={
          <LayoutWrapper>
            <ChangePassword />
          </LayoutWrapper>
        }
      />

      <Route
        path="/regular-table"
        element={
          <LayoutWrapper>
            <RegularTable />
          </LayoutWrapper>
        }
      />
      <Route
        path="/tabulator"
        element={
          <LayoutWrapper>
            <Tabulator />
          </LayoutWrapper>
        }
      />

      <Route
        path="/modal"
        element={
          <LayoutWrapper>
            <Modal />
          </LayoutWrapper>
        }
      />
      <Route
        path="/slideover"
        element={
          <LayoutWrapper>
            <Slideover />
          </LayoutWrapper>
        }
      />
      <Route
        path="/notification"
        element={
          <LayoutWrapper>
            <Notification />
          </LayoutWrapper>
        }
      />

      <Route
        path="/tab"
        element={
          <LayoutWrapper>
            <Tab />
          </LayoutWrapper>
        }
      />
      <Route
        path="/accordion"
        element={
          <LayoutWrapper>
            <Accordion />
          </LayoutWrapper>
        }
      />
      <Route
        path="/button"
        element={
          <LayoutWrapper>
            <Button />
          </LayoutWrapper>
        }
      />
      <Route
        path="/alert"
        element={
          <LayoutWrapper>
            <Alert />
          </LayoutWrapper>
        }
      />
      <Route
        path="/progress-bar"
        element={
          <LayoutWrapper>
            <ProgressBar />
          </LayoutWrapper>
        }
      />
      <Route
        path="/tooltip"
        element={
          <LayoutWrapper>
            <Tooltip />
          </LayoutWrapper>
        }
      />
      <Route
        path="/dropdown"
        element={
          <LayoutWrapper>
            <Dropdown />
          </LayoutWrapper>
        }
      />
      <Route
        path="/typography"
        element={
          <LayoutWrapper>
            <Typography />
          </LayoutWrapper>
        }
      />
      <Route
        path="/icon"
        element={
          <LayoutWrapper>
            <Icon />
          </LayoutWrapper>
        }
      />
      <Route
        path="/loading-icon"
        element={
          <LayoutWrapper>
            <LoadingIcon />
          </LayoutWrapper>
        }
      />

      <Route
        path="/regular-form"
        element={
          <LayoutWrapper>
            <RegularForm />
          </LayoutWrapper>
        }
      />
      <Route
        path="/datepicker"
        element={
          <LayoutWrapper>
            <Datepicker />
          </LayoutWrapper>
        }
      />
      <Route
        path="/tom-select"
        element={
          <LayoutWrapper>
            <TomSelect />
          </LayoutWrapper>
        }
      />
      <Route
        path="/file-upload"
        element={
          <LayoutWrapper>
            <FileUpload />
          </LayoutWrapper>
        }
      />
      <Route
        path="/wysiwyg-editor"
        element={
          <LayoutWrapper>
            <WysiwygEditor />
          </LayoutWrapper>
        }
      />
      <Route
        path="/validation"
        element={
          <LayoutWrapper>
            <Validation />
          </LayoutWrapper>
        }
      />

      <Route
        path="/chart"
        element={
          <LayoutWrapper>
            <Chart />
          </LayoutWrapper>
        }
      />
      <Route
        path="/slider"
        element={
          <LayoutWrapper>
            <Slider />
          </LayoutWrapper>
        }
      />
      <Route
        path="/image-zoom"
        element={
          <LayoutWrapper>
            <ImageZoom />
          </LayoutWrapper>
        }
      />

      <Route
        path="/debug"
        element={
          <LayoutWrapper>
            <Debug />
          </LayoutWrapper>
        }
      />

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <LayoutWrapper>
            <ErrorPage />
          </LayoutWrapper>
        }
      />
    </Routes>
  );
};

export default Router;
