import React from "react";
import { classNames } from "@/utils/helpers";

interface FormCheckProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "dark";
}

const FormCheck: React.FC<FormCheckProps> = ({
  label,
  variant = "default",
  className,
  id,
  type = "checkbox",
  children,
  dangerouslySetInnerHTML,
  ...props
}) => {
  const baseClasses =
    "transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50";

  const variantClasses = {
    default: "text-primary",
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    dark: "text-dark",
  };

  const typeClasses = {
    checkbox: "rounded",
    radio: "rounded-full",
  };

  const checkClasses = classNames(
    baseClasses,
    variantClasses[variant],
    typeClasses[type as "checkbox" | "radio"],
    className,
  );

  return (
    <div className="flex items-center">
      <input type={type} className={checkClasses} id={id} {...props} />
      {label && (
        <label
          htmlFor={id}
          className="ml-2 cursor-pointer text-slate-600 dark:text-slate-400"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormCheck;
