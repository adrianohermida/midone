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
    "inline-block mb-2 group-[.form-inline]:mb-2 group-[.form-inline]:sm:mb-0 group-[.form-inline]:sm:mr-5 group-[.form-inline]:sm:text-right",
    className,
  );

  return (
    <label className={classes} {...props}>
      {children}
    </label>
  );
};

// Form Select
interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: "default" | "success" | "warning" | "danger";
}

export const FormSelect: React.FC<FormSelectProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  const baseClasses =
    "disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50 [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50";

  const variantClasses = {
    default: "",
    success: "border-success focus:ring-success focus:border-success",
    warning: "border-warning focus:ring-warning focus:border-warning",
    danger: "border-danger focus:ring-danger focus:border-danger",
  };

  const classes = classNames(baseClasses, variantClasses[variant], className);

  return (
    <select className={classes} {...props}>
      {children}
    </select>
  );
};

// Form Textarea
interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "success" | "warning" | "danger";
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  variant = "default",
  className,
  ...props
}) => {
  const baseClasses =
    "disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/70 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80";

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

FormCheckMain.Input = ({ className, ...props }) => {
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

FormSwitchMain.Input = ({ className, ...props }) => {
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

// Form Inline
interface FormInlineProps {
  children: React.ReactNode;
  className?: string;
}

export const FormInline: React.FC<FormInlineProps> = ({
  children,
  className,
}) => {
  const classes = classNames("form-inline", className);
  return <div className={classes}>{children}</div>;
};

// Form Help
interface FormHelpProps {
  children: React.ReactNode;
  className?: string;
}

export const FormHelp: React.FC<FormHelpProps> = ({ children, className }) => {
  const classes = classNames("text-xs text-slate-500 mt-1", className);
  return <div className={classes}>{children}</div>;
};

// Export InputGroup from its separate file
export { default as InputGroup } from "./InputGroup";
