import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { FormGroup, FormLabel, FormControl } from "../base-components/Form";
import Button from "../base-components/Button";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Demo credentials
  const DEMO_EMAIL = "admin@midone.com";
  const DEMO_PASSWORD = "password123";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        // Store authentication state (simplified for demo)
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(
          "Email ou senha inválidos. Use: admin@midone.com / password123",
        );
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout>
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back to Midone Dashboard
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            🔑 Credenciais de Demonstração:
          </h3>
          <div className="text-sm text-blue-700">
            <p>
              <strong>Email:</strong> admin@midone.com
            </p>
            <p>
              <strong>Senha:</strong> password123
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormGroup>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <FormControl
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Digite: admin@midone.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormControl
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Digite: password123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
