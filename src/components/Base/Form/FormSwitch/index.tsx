import React from "react";
import { classNames } from "@/utils/helpers";

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

const FormSwitch: FormSwitchComponent = ({
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

FormSwitch.Label = ({ children, className, htmlFor }) => {
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

FormSwitch.Input = ({ className, ...props }) => {
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

export default FormSwitch;
