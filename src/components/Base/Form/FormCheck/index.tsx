import { useContext, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface FormCheckProps extends React.ComponentPropsWithoutRef<"div"> {}

type FormCheckRef = React.ComponentPropsWithRef<"div">["ref"];

const FormCheck = forwardRef((props: FormCheckProps, ref: FormCheckRef) => {
  return (
    <div
      {...props}
      ref={ref}
      className={twMerge([
        "flex items-center text-slate-600 dark:text-slate-400",
        props.className,
      ])}
    />
  );
});

interface FormCheckInputProps extends React.ComponentPropsWithoutRef<"input"> {
  formCheckSize?: "sm" | "lg";
}

type FormCheckInputRef = React.ComponentPropsWithRef<"input">["ref"];

const FormCheckInput = forwardRef(
  (props: FormCheckInputProps, ref: FormCheckInputRef) => {
    const { formCheckSize, ...computedProps } = props;
    return (
      <input
        {...computedProps}
        ref={ref}
        className={twMerge([
          "transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&[type='radio']]:rounded-full [&[type='radio']]:border-slate-500",
          formCheckSize == "sm" && "text-xs py-1.5 px-2",
          formCheckSize == "lg" && "text-lg py-1.5 px-4",
          props.className,
        ])}
      />
    );
  },
);

export interface LabelProps extends React.ComponentPropsWithoutRef<"label"> {}

type FormCheckLabelRef = React.ComponentPropsWithRef<"label">["ref"];

const FormCheckLabel = forwardRef(
  (props: LabelProps, ref: FormCheckLabelRef) => {
    return (
      <label
        {...props}
        ref={ref}
        className={twMerge(["cursor-pointer ml-2", props.className])}
      />
    );
  },
);

FormCheck.Input = FormCheckInput;
FormCheck.Label = FormCheckLabel;

export default FormCheck;
