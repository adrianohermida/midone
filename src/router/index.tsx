import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import ProtectedRoute from "@/components/ProtectedRoute";
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

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <GeneralReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/general-report"
        element={
          <ProtectedRoute>
            <GeneralReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/overview-1"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/overview-2"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/overview-3"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/overview-4"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 page */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center min-h-screen text-xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
              <p className="text-slate-600 mb-6">Página não encontrada</p>
              <a
                href="/dashboard"
                className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
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
