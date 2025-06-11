import React from "react";
import { classNames } from "@/utils/helpers";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "dark"
    | "light";
  size?: "sm" | "md" | "lg";
  elevated?: boolean;
  rounded?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
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
      "bg-secondary text-dark hover:bg-secondary/90 focus:ring-secondary",
    success: "bg-success text-white hover:bg-success/90 focus:ring-success",
    warning: "bg-warning text-white hover:bg-warning/90 focus:ring-warning",
    danger: "bg-danger text-white hover:bg-danger/90 focus:ring-danger",
    dark: "bg-dark text-white hover:bg-dark/90 focus:ring-dark",
    light: "bg-light text-dark hover:bg-light/90 focus:ring-light",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
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

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
