import React from "react";
import { classNames } from "@/utils/helpers";

// Form Control
interface FormControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "success" | "warning" | "danger";
}

export const FormControl: React.FC<FormControlProps> = ({
  variant = "default",
  className,
  children,
  dangerouslySetInnerHTML,
  ...props
}) => {
  const baseClasses =
    "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:border-transparent transition-colors";

  const variantClasses = {
    default: "border-gray-300 focus:ring-primary focus:border-primary",
    success: "border-success focus:ring-success focus:border-success",
    warning: "border-warning focus:ring-warning focus:border-warning",
    danger: "border-danger focus:ring-danger focus:border-danger",
  };

  const classes = classNames(baseClasses, variantClasses[variant], className);

  return <input className={classes} {...props} />;
};

// Form Label
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  className,
  children,
  ...props
}) => {
  const classes = classNames(
    "block text-sm font-medium text-gray-700 mb-1",
    className,
  );

  return (
    <label className={classes} {...props}>
      {children}
    </label>
  );
};

// Form Help
interface FormHelpProps {
  children: React.ReactNode;
  className?: string;
}

export const FormHelp: React.FC<FormHelpProps> = ({ children, className }) => {
  const classes = classNames("mt-1 text-sm text-gray-500", className);

  return <div className={classes}>{children}</div>;
};

// Form Group
interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
}) => {
  const classes = classNames("mb-4", className);
  return <div className={classes}>{children}</div>;
};
