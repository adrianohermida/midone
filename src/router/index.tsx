import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import ProtectedRoute from "@/components/ProtectedRoute";
import EnigmaLayout from "@/layouts/EnigmaLayout";
import Dashboard from "@/views/Dashboard";
import GeneralReport from "@/views/GeneralReport";
import Login from "@/pages/Login";

const Router = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      {/* Root route - redirect based on authentication */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Login route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes with Enigma layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <EnigmaLayout>
              <GeneralReport />
            </EnigmaLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/general-report"
        element={
          <ProtectedRoute>
            <EnigmaLayout>
              <GeneralReport />
            </EnigmaLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/overview-1"
        element={
          <ProtectedRoute>
            <EnigmaLayout>
              <Dashboard />
            </EnigmaLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/overview-2"
        element={
          <ProtectedRoute>
            <EnigmaLayout>
              <Dashboard />
            </EnigmaLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/overview-3"
        element={
          <ProtectedRoute>
            <EnigmaLayout>
              <Dashboard />
            </EnigmaLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/overview-4"
        element={
          <ProtectedRoute>
            <EnigmaLayout>
              <Dashboard />
            </EnigmaLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 page */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center min-h-screen text-xl bg-slate-100">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
              <p className="text-slate-600 mb-6">Página não encontrada</p>
              <a
                href="/dashboard"
                className="inline-block px-6 py-3 bg-enigma-primary text-white rounded-lg hover:bg-enigma-secondary transition-all duration-200 font-medium"
              >
                Voltar ao Dashboard
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default Router;
