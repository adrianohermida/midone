import FormInput from "./FormInput";
import FormLabel from "./FormLabel";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import FormInline from "./FormInline";
import FormSwitch from "./FormSwitch";
import InputGroup from "./InputGroup";
import { useContext, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface FormCheckInputProps extends React.ComponentPropsWithoutRef<"input"> {
  size?: "sm" | "base" | "lg";
}

type FormCheckInputRef = React.ComponentPropsWithRef<"input">["ref"];

const FormCheckInput = forwardRef(
  (props: FormCheckInputProps, ref: FormCheckInputRef) => {
    const { size, ...computedProps } = props;
    return (
      <input
        {...computedProps}
        ref={ref}
        type="checkbox"
        className={twMerge([
          "transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&[type='radio']]:rounded-full [&[type='radio']]:border-slate-500",
          size == "sm" && "text-xs py-1.5 px-2",
          size == "lg" && "text-lg py-1.5 px-4",
          props.className,
        ])}
      />
    );
  },
);

interface FormCheckLabelProps extends React.ComponentPropsWithoutRef<"label"> {}

type FormCheckLabelRef = React.ComponentPropsWithRef<"label">["ref"];

const FormCheckLabel = forwardRef(
  (props: FormCheckLabelProps, ref: FormCheckLabelRef) => {
    return (
      <label
        {...props}
        ref={ref}
        className={twMerge(["cursor-pointer ml-2", props.className])}
      />
    );
  },
);

const FormCheck = {
  Input: FormCheckInput,
  Label: FormCheckLabel,
};

export {
  FormInput,
  FormLabel,
  FormSelect,
  FormTextarea,
  FormInline,
  FormSwitch,
  InputGroup,
  FormCheck,
};
