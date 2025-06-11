import React from "react";
import { classNames } from "@/utils/helpers";

// Form Input
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "success" | "warning" | "danger";
  rounded?: boolean;
  formInputSize?: "sm" | "lg";
}

export const FormInput: React.FC<FormInputProps> = ({
  variant = "default",
  rounded = false,
  formInputSize,
  className,
  children,
  dangerouslySetInnerHTML,
  ...props
}) => {
  const baseClasses =
    "w-full text-sm border-slate-200 shadow-sm placeholder:text-slate-400/70 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80";

  const variantClasses = {
    default: "",
    success: "border-success focus:ring-success focus:border-success",
    warning: "border-warning focus:ring-warning focus:border-warning",
    danger: "border-danger focus:ring-danger focus:border-danger",
  };

  const classes = classNames(
    baseClasses,
    variantClasses[variant],
    rounded ? "rounded-full" : "rounded-md",
    formInputSize === "sm" && "text-xs py-1.5 px-2",
    formInputSize === "lg" && "text-lg py-1.5 px-4",
    className,
  );

  return <input className={classes} {...props} />;
};

// Form Label and Form Select - exported separately

// Form Textarea
interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "success" | "warning" | "danger";
  rounded?: boolean;
  formTextareaSize?: "sm" | "lg";
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  variant = "default",
  rounded = false,
  formTextareaSize,
  className,
  ...props
}) => {
  const baseClasses =
    "w-full text-sm border-slate-200 shadow-sm placeholder:text-slate-400/70 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80";

  const variantClasses = {
    default: "",
    success: "border-success focus:ring-success focus:border-success",
    warning: "border-warning focus:ring-warning focus:border-warning",
    danger: "border-danger focus:ring-danger focus:border-danger",
  };

  const classes = classNames(baseClasses, variantClasses[variant], className);

  return <textarea className={classes} {...props} />;
};

// Form Check with subcomponents
interface FormCheckProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

interface FormCheckComponent extends React.FC<FormCheckProps> {
  Label: React.FC<{
    children: React.ReactNode;
    className?: string;
    htmlFor?: string;
  }>;
  Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
}

const FormCheckMain: FormCheckComponent = ({
  label,
  className,
  id,
  children,
  dangerouslySetInnerHTML,
  ...props
}) => {
  const checkboxClasses =
    "transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50";

  return (
    <div className={classNames("flex items-center", className)}>
      <input type="checkbox" className={checkboxClasses} id={id} {...props} />
      {label && (
        <label htmlFor={id} className="ml-2 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
};

FormCheckMain.Label = ({ children, className, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        "cursor-pointer text-slate-600 dark:text-slate-400",
        className,
      )}
    >
      {children}
    </label>
  );
};

FormCheckMain.Input = ({
  className,
  children,
  dangerouslySetInnerHTML,
  ...props
}) => {
  const checkboxClasses =
    "transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50";

  return (
    <input
      type="checkbox"
      className={classNames(checkboxClasses, className)}
      {...props}
    />
  );
};

export const FormCheck = FormCheckMain;

// Form Switch with subcomponents
interface FormSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

interface FormSwitchComponent extends React.FC<FormSwitchProps> {
  Label: React.FC<{
    children: React.ReactNode;
    className?: string;
    htmlFor?: string;
  }>;
  Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
}

const FormSwitchMain: FormSwitchComponent = ({
  label,
  className,
  id,
  children,
  dangerouslySetInnerHTML,
  ...props
}) => {
  const switchClasses =
    "w-[38px] h-[24px] p-px rounded-full relative before:w-[20px] before:h-[20px] before:shadow-[1px_1px_3px_rgba(0,0,0,0.25)] before:transition-[margin-left] before:duration-200 before:ease-in-out before:absolute before:inset-y-0 before:my-auto before:rounded-full before:dark:bg-darkmode-600 checked:bg-primary checked:border-primary checked:bg-none before:checked:ml-[14px] before:checked:bg-white cursor-pointer focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 bg-slate-200 border-slate-200 before:bg-slate-500";

  return (
    <div className={classNames("flex items-center", className)}>
      <input type="checkbox" className={switchClasses} id={id} {...props} />
      {label && (
        <label
          htmlFor={id}
          className="ml-3 cursor-pointer text-slate-600 dark:text-slate-400"
        >
          {label}
        </label>
      )}
    </div>
  );
};

FormSwitchMain.Label = ({ children, className, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        "cursor-pointer text-slate-600 dark:text-slate-400",
        className,
      )}
    >
      {children}
    </label>
  );
};

FormSwitchMain.Input = ({
  className,
  children,
  dangerouslySetInnerHTML,
  ...props
}) => {
  const switchClasses =
    "w-[38px] h-[24px] p-px rounded-full relative before:w-[20px] before:h-[20px] before:shadow-[1px_1px_3px_rgba(0,0,0,0.25)] before:transition-[margin-left] before:duration-200 before:ease-in-out before:absolute before:inset-y-0 before:my-auto before:rounded-full before:dark:bg-darkmode-600 checked:bg-primary checked:border-primary checked:bg-none before:checked:ml-[14px] before:checked:bg-white cursor-pointer focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 bg-slate-200 border-slate-200 before:bg-slate-500";

  return (
    <input
      type="checkbox"
      className={classNames(switchClasses, className)}
      {...props}
    />
  );
};

export const FormSwitch = FormSwitchMain;

// Form Inline - exported separately

// Form Help
interface FormHelpProps {
  children: React.ReactNode;
  className?: string;
}

export const FormHelp: React.FC<FormHelpProps> = ({ children, className }) => {
  const classes = classNames(
    "mt-1 text-sm text-slate-500 dark:text-slate-400",
    className,
  );

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

// Re-export individual components
export { default as InputGroup } from "./InputGroup";
export { default as FormTextarea } from "./FormTextarea";
export { default as FormInline } from "./FormInline";
