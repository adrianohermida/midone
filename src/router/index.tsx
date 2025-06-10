import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Dashboard from "@/views/Dashboard";
import Login from "@/views/Login";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center min-h-screen text-xl">
            Page not found
          </div>
        }
      />
    </Routes>
  );
};

export default Router;
