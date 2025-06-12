import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import logoUrl from "@/assets/images/logo.svg";
import illustrationUrl from "@/assets/images/illustration.svg";
import justiceScaleUrl from "@/assets/images/justice-scale.svg";
import { FormInput, FormCheck } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";

// Validation schema
const schema = yup
  .object({
    email: yup
      .string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    password: yup
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .required("Senha é obrigatória"),
  })
  .required();

interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

function Main() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock authentication - in real app, this would call your auth API
      console.log("Login attempt:", data);

      // Store auth state (mock)
      if (data.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      // Redirect to dashboard
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    // Quick demo login
    navigate("/");
  };

  const handleForgotPassword = () => {
    // In real app, this would open forgot password modal or navigate to forgot password page
    alert("Funcionalidade de recuperação de senha seria implementada aqui");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div
        className={clsx([
          "p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
          "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
          "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
        ])}
      >
        <ThemeSwitcher />
        <div className="container relative z-10 sm:px-10">
          <div className="block grid-cols-2 gap-4 xl:grid">
            {/* BEGIN: Login Info */}
            <div className="flex-col hidden min-h-screen xl:flex">
              <a href="/" className="flex items-center pt-5 -intro-x">
                <img
                  alt="LawDesk Legal Management System"
                  className="w-6"
                  src={justiceScaleUrl}
                />
                <span className="ml-3 text-lg text-white font-semibold">
                  {" "}
                  LawDesk{" "}
                </span>
              </a>
              <div className="my-auto">
                <img
                  alt="LawDesk Legal Management System"
                  className="w-1/2 -mt-16 -intro-x"
                  src={illustrationUrl}
                />
                <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                  Sistema de Gestão <br />
                  Jurídica Completo
                </div>
                <div className="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                  Gerencie casos, clientes, processos e documentos em uma única
                  plataforma
                </div>
                <div className="mt-8 -intro-x">
                  <div className="flex items-center text-white text-opacity-70 mb-4">
                    <Lucide icon="CheckCircle" className="w-5 h-5 mr-3" />
                    <span>Gestão completa de casos jurídicos</span>
                  </div>
                  <div className="flex items-center text-white text-opacity-70 mb-4">
                    <Lucide icon="CheckCircle" className="w-5 h-5 mr-3" />
                    <span>Controle de prazos e audiências</span>
                  </div>
                  <div className="flex items-center text-white text-opacity-70 mb-4">
                    <Lucide icon="CheckCircle" className="w-5 h-5 mr-3" />
                    <span>Relatórios e analytics avançados</span>
                  </div>
                </div>
              </div>
            </div>
            {/* END: Login Info */}

            {/* BEGIN: Login Form */}
            <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
              <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
                {/* Mobile Logo */}
                <div className="flex items-center justify-center mb-6 xl:hidden">
                  <img
                    alt="LawDesk Legal Management System"
                    className="w-8 h-8"
                    src={justiceScaleUrl}
                  />
                  <span className="ml-3 text-xl font-semibold">LawDesk</span>
                </div>

                <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                  Entrar no Sistema
                </h2>
                <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
                  Acesse sua conta para gerenciar seus casos e processos
                  jurídicos
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-8 intro-x"
                >
                  {/* Email Field */}
                  <div className="mb-4">
                    <FormInput
                      {...register("email")}
                      type="email"
                      className={clsx([
                        "block px-4 py-3 intro-x min-w-full xl:min-w-[350px]",
                        errors.email && "border-danger",
                      ])}
                      placeholder="seu@email.com"
                    />
                    {errors.email && (
                      <div className="mt-2 text-danger text-sm">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-4 relative">
                    <FormInput
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      className={clsx([
                        "block px-4 py-3 pr-12 intro-x min-w-full xl:min-w-[350px]",
                        errors.password && "border-danger",
                      ])}
                      placeholder="Sua senha"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Lucide
                        icon={showPassword ? "EyeOff" : "Eye"}
                        className="w-5 h-5 text-slate-400 hover:text-slate-600"
                      />
                    </button>
                    {errors.password && (
                      <div className="mt-2 text-danger text-sm">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                    <div className="flex items-center mr-auto">
                      <FormCheck.Input
                        {...register("rememberMe")}
                        id="remember-me"
                        type="checkbox"
                        className="mr-2 border"
                      />
                      <FormCheck.Label
                        className="cursor-pointer select-none"
                        htmlFor="remember-me"
                      >
                        Lembrar de mim
                      </FormCheck.Label>
                    </div>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-primary hover:underline"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>

                  {/* Submit Buttons */}
                  <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isLoading}
                      className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                    >
                      {isLoading ? (
                        <>
                          <Lucide
                            icon="Loader"
                            className="w-4 h-4 mr-2 animate-spin"
                          />
                          Entrando...
                        </>
                      ) : (
                        "Entrar"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={handleRegister}
                      className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                    >
                      Registrar
                    </Button>
                  </div>

                  {/* Demo Access */}
                  <div className="mt-6 text-center intro-x">
                    <div className="text-slate-500 text-sm mb-3">
                      Ou acesse a demonstração
                    </div>
                    <Button
                      type="button"
                      variant="outline-primary"
                      onClick={handleDemoLogin}
                      className="w-full xl:w-auto"
                    >
                      <Lucide icon="Play" className="w-4 h-4 mr-2" />
                      Acesso Demo
                    </Button>
                  </div>
                </form>

                {/* Additional Info */}
                <div className="mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-left">
                  <div className="border-t pt-6 border-slate-200 dark:border-darkmode-400">
                    <div className="text-sm">
                      <p className="mb-2">
                        <strong>LawDesk</strong> - Sistema completo para gestão
                        jurídica
                      </p>
                      <p className="text-xs text-slate-500">
                        Versão 2.0 | © 2024 Todos os direitos reservados
                      </p>
                    </div>
                  </div>
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
