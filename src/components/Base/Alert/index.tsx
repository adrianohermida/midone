import React from "react";
import { classNames } from "@/utils/helpers";
import Lucide from "@/components/Base/Lucide";

interface AlertProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "dark";
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  variant = "primary",
  dismissible = false,
  onDismiss,
  children,
  className,
}) => {
  const baseClasses = "relative px-4 py-3 border rounded-md";

  const variantClasses = {
    primary: "bg-primary/10 border-primary/20 text-primary",
    secondary: "bg-slate-100 border-slate-200 text-slate-600",
    success: "bg-success/10 border-success/20 text-success",
    warning: "bg-warning/10 border-warning/20 text-warning",
    danger: "bg-danger/10 border-danger/20 text-danger",
    dark: "bg-dark/10 border-dark/20 text-dark",
  };

  const classes = classNames(
    baseClasses,
    variantClasses[variant],
    dismissible && "pr-12",
    className,
  );

  return (
    <div className={classes} role="alert">
      <div>{children}</div>
      {dismissible && (
        <button
          type="button"
          className="absolute top-3 right-3 opacity-70 hover:opacity-100"
          onClick={onDismiss}
          aria-label="Close alert"
        >
          <Lucide icon="X" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
