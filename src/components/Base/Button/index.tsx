import React from "react";
import { classNames } from "@/utils/helpers";

interface BaseButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "dark"
    | "light"
    | "pending"
    | "outline-primary"
    | "outline-secondary"
    | "outline-success"
    | "outline-warning"
    | "outline-danger"
    | "outline-dark";
  size?: "sm" | "md" | "lg";
  elevated?: boolean;
  rounded?: boolean;
}

interface ButtonAsButton
  extends BaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  as?: "button";
  children: React.ReactNode;
}

interface ButtonAsAnchor
  extends BaseButtonProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  as: "a";
  children: React.ReactNode;
}

interface ButtonAsDiv
  extends BaseButtonProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  as: "div";
  children: React.ReactNode;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsDiv;

const Button: React.FC<ButtonProps> = ({
  as = "button",
  variant = "primary",
  size = "md",
  elevated = false,
  rounded = false,
  className,
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
    secondary:
      "bg-secondary text-slate-500 hover:bg-secondary/90 focus:ring-secondary",
    success: "bg-success text-white hover:bg-success/90 focus:ring-success",
    warning: "bg-warning text-white hover:bg-warning/90 focus:ring-warning",
    danger: "bg-danger text-white hover:bg-danger/90 focus:ring-danger",
    dark: "bg-dark text-white hover:bg-dark/90 focus:ring-dark",
    light:
      "bg-slate-200 text-slate-500 hover:bg-slate-300 focus:ring-slate-200",
    pending: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    "outline-primary":
      "border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    "outline-secondary":
      "border border-secondary text-secondary hover:bg-secondary hover:text-white focus:ring-secondary",
    "outline-success":
      "border border-success text-success hover:bg-success hover:text-white focus:ring-success",
    "outline-warning":
      "border border-warning text-warning hover:bg-warning hover:text-white focus:ring-warning",
    "outline-danger":
      "border border-danger text-danger hover:bg-danger hover:text-white focus:ring-danger",
    "outline-dark":
      "border border-dark text-dark hover:bg-dark hover:text-white focus:ring-dark",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const classes = classNames(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    elevated && "shadow-lg",
    rounded ? "rounded-full" : "rounded-md",
    className,
  );

  const Component = as;

  return (
    <Component className={classes} {...(props as any)}>
      {children}
    </Component>
  );
};

export default Button;
