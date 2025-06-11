import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  light?: boolean;
}

type BreadcrumbRef = React.ComponentPropsWithRef<"nav">["ref"];

const Breadcrumb = forwardRef((props: BreadcrumbProps, ref: BreadcrumbRef) => {
  const { light, ...computedProps } = props;
  return (
    <nav
      {...computedProps}
      ref={ref}
      className={twMerge(["flex", light && "text-white/70", props.className])}
    />
  );
});

interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  active?: boolean;
}

type BreadcrumbLinkRef = React.ComponentPropsWithRef<"a">["ref"];

const BreadcrumbLink = forwardRef(
  (props: BreadcrumbLinkProps, ref: BreadcrumbLinkRef) => {
    const { active, ...computedProps } = props;
    return (
      <a
        {...computedProps}
        ref={ref}
        className={twMerge([
          "text-primary dark:text-slate-400",
          active && "text-slate-600 dark:text-slate-400 cursor-text",
          props.className,
        ])}
      />
    );
  },
);

const BreadcrumbComponent = Object.assign(Breadcrumb, {
  Link: BreadcrumbLink,
});

export default BreadcrumbComponent;
