import React from "react";
import { classNames } from "@/utils/helpers";
import Lucide from "@/components/Base/Lucide";

interface AlertProps {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "dark"
    | "pending"
    | "outline-primary"
    | "outline-secondary"
    | "outline-success"
    | "outline-warning"
    | "outline-danger"
    | "outline-dark";
  dismissible?: boolean;
  onDismiss?: () => void;
  children:
    | React.ReactNode
    | ((props: { dismiss: () => void }) => React.ReactNode);
  className?: string;
}

interface AlertComponent extends React.FC<AlertProps> {
  DismissButton: React.FC<{
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
  }>;
}

const AlertMain: AlertComponent = ({
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
    pending: "bg-blue-50 border-blue-200 text-blue-600",
    "outline-primary": "bg-transparent border-primary text-primary",
    "outline-secondary": "bg-transparent border-slate-300 text-slate-600",
    "outline-success": "bg-transparent border-success text-success",
    "outline-warning": "bg-transparent border-warning text-warning",
    "outline-danger": "bg-transparent border-danger text-danger",
    "outline-dark": "bg-transparent border-dark text-dark",
  };

  const classes = classNames(
    baseClasses,
    variantClasses[variant],
    dismissible && "pr-12",
    className,
  );

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <div className={classes} role="alert">
      <div>
        {typeof children === "function"
          ? children({ dismiss: handleDismiss })
          : children}
      </div>
      {dismissible && (
        <button
          type="button"
          className="absolute top-3 right-3 opacity-70 hover:opacity-100"
          onClick={handleDismiss}
          aria-label="Close alert"
        >
          <Lucide icon="X" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

AlertMain.DismissButton = ({ onClick, className, children }) => {
  return (
    <button
      type="button"
      className={classNames(
        "absolute top-3 right-3 opacity-70 hover:opacity-100",
        className,
      )}
      onClick={onClick}
      aria-label="Close alert"
    >
      {children || <Lucide icon="X" className="w-4 h-4" />}
    </button>
  );
};

const Alert = AlertMain;
export default Alert;
