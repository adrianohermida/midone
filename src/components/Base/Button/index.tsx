import { useContext, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "dark"
    | "outline-primary"
    | "outline-secondary"
    | "outline-success"
    | "outline-warning"
    | "outline-danger"
    | "outline-dark"
    | "soft-primary"
    | "soft-secondary"
    | "soft-success"
    | "soft-warning"
    | "soft-danger"
    | "soft-dark";
  size?: "sm" | "lg";
  rounded?: boolean;
  elevated?: boolean;
  as?: React.ElementType;
}

type ButtonRef = React.ComponentPropsWithRef<"button">["ref"];

const Button = forwardRef((props: ButtonProps, ref: ButtonRef) => {
  const {
    variant = "primary",
    size,
    rounded,
    elevated,
    as: Component = "button",
    ...computedProps
  } = props;

  return (
    <Component
      {...computedProps}
      ref={ref}
      className={twMerge([
        "transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed",
        variant == "primary" &&
          "bg-primary border-primary text-white dark:border-primary",
        variant == "secondary" &&
          "bg-secondary/70 border-secondary/70 text-slate-500 dark:border-darkmode-400 dark:bg-darkmode-400 dark:text-slate-300",
        variant == "success" &&
          "bg-success border-success text-slate-900 dark:border-success",
        variant == "warning" &&
          "bg-warning border-warning text-slate-900 dark:border-warning",
        variant == "danger" &&
          "bg-danger border-danger text-white dark:border-danger",
        variant == "dark" &&
          "bg-dark border-dark text-white dark:bg-darkmode-800 dark:border-transparent dark:text-slate-300",
        variant == "outline-primary" &&
          "border-primary text-primary dark:border-primary",
        variant == "outline-secondary" &&
          "border-secondary text-slate-500 dark:border-darkmode-100/40",
        variant == "outline-success" &&
          "border-success text-success dark:border-success",
        variant == "outline-warning" &&
          "border-warning text-warning dark:border-warning",
        variant == "outline-danger" &&
          "border-danger text-danger dark:border-danger",
        variant == "outline-dark" &&
          "border-dark text-dark dark:border-darkmode-800 dark:text-slate-300",
        variant == "soft-primary" &&
          "bg-primary/20 border-primary/10 text-primary",
        variant == "soft-secondary" &&
          "bg-slate-300/20 border-slate-300/10 text-slate-500",
        variant == "soft-success" &&
          "bg-success/20 border-success/10 text-success",
        variant == "soft-warning" &&
          "bg-warning/20 border-warning/10 text-warning",
        variant == "soft-danger" && "bg-danger/20 border-danger/10 text-danger",
        variant == "soft-dark" && "bg-dark/20 border-dark/10 text-dark",
        size == "sm" && "py-1 px-2 text-xs",
        size == "lg" && "py-3 px-4 text-lg",
        rounded && "rounded-full",
        elevated && "shadow-md",
        props.className,
      ])}
    />
  );
});

export default Button;
