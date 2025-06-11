import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { loginAsync, clearError } from "@/stores/authSlice";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import logoUrl from "@/assets/images/logo.svg";
import illustrationUrl from "@/assets/images/illustration.svg";
import { FormInput, FormCheck } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import clsx from "clsx";

function Main() {
  const [email, setEmail] = useState("admin@lawdesk.com");
  const [password, setPassword] = useState("admin123");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  // Get the intended destination after login
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());

    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [dispatch, isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      await dispatch(loginAsync({ email, password })).unwrap();
      // Navigate to dashboard or intended destination
      navigate(from, { replace: true });
    } catch (error) {
      // Error handling is done by the store
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div
        className={clsx([
          "p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
          "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
          "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 before:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
        ])}
      >
        <ThemeSwitcher />
        <div className="container relative z-10 sm:px-10">
          <div className="block grid-cols-2 gap-4 xl:grid">
            {/* BEGIN: Login Info */}
            <div className="flex-col hidden min-h-screen xl:flex">
              <a href="" className="flex items-center pt-5 -intro-x">
                <img
                  alt="Lawdesk CRM - Sistema Jurídico"
                  className="w-6"
                  src={logoUrl}
                />
                <span className="ml-3 text-lg text-white"> Lawdesk CRM </span>
              </a>
              <div className="my-auto">
                <img
                  alt="Lawdesk CRM - Sistema Jurídico"
                  className="w-1/2 -mt-16 -intro-x"
                  src={illustrationUrl}
                />
                <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                  Acesse seu painel <br />
                  administrativo Lawdesk
                </div>
                <div className="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                  Gerencie todos os processos jurídicos em um só lugar
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
              <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                  Entrar no Sistema
                </h2>
                <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
                  Faça login para acessar o painel administrativo do Lawdesk CRM
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded intro-x">
                    {error}
                  </div>
                )}

                {/* Demo Credentials Info */}
                <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded intro-x">
                  <p className="text-sm font-medium">
                    Credenciais de demonstração:
                  </p>
                  <p className="text-sm">Email: admin@lawdesk.com</p>
                  <p className="text-sm">Senha: admin123</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 intro-x">
                  <FormInput
                    type="email"
                    className="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <FormInput
                    type="password"
                    className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                    <div className="flex items-center mr-auto">
                      <FormCheck.Input
                        id="remember-me"
                        type="checkbox"
                        className="mr-2 border"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label
                        className="cursor-pointer select-none"
                        htmlFor="remember-me"
                      >
                        Lembrar-me
                      </label>
                    </div>
                    <a href="#" className="text-primary hover:underline">
                      Esqueceu a senha?
                    </a>
                  </div>

                  <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                      disabled={isLoading}
                    >
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                  </div>
                </form>

                <div className="mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-left">
                  Ao fazer login, você concorda com nossos{" "}
                  <a
                    className="text-primary dark:text-slate-200 hover:underline"
                    href="#"
                  >
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a
                    className="text-primary dark:text-slate-200 hover:underline"
                    href="#"
                  >
                    Política de Privacidade
                  </a>
                </div>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
