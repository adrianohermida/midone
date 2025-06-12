import React from "react";
import { Link } from "react-router-dom";
import { classNames } from "@/utils/helpers";
import Lucide from "@/components/Base/Lucide";

interface BreadcrumbItem {
  title: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: "slash" | "chevron" | "arrow";
  className?: string;
  children?: React.ReactNode;
  light?: boolean;
}

interface BreadcrumbComponent extends React.FC<BreadcrumbProps> {
  Link: React.FC<BreadcrumbLinkProps>;
}

interface BreadcrumbLinkProps {
  children: React.ReactNode;
  to?: string;
  active?: boolean;
  className?: string;
}

const Breadcrumb: BreadcrumbComponent = ({
  items,
  separator = "chevron",
  className,
  children,
  light = false,
}) => {
  const getSeparatorIcon = () => {
    switch (separator) {
      case "slash":
        return "/";
      case "arrow":
        return <Lucide icon="ArrowRight" className="w-4 h-4" />;
      case "chevron":
      default:
        return <Lucide icon="ChevronRight" className="w-4 h-4" />;
    }
  };

  const baseClasses = "flex items-center space-x-2 text-sm";
  const classes = classNames(baseClasses, className);

  // If children are provided, use them instead of items
  if (children) {
    return (
      <nav className={classes} aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">{children}</ol>
      </nav>
    );
  }

  // Fallback to items prop (with default empty array)
  const itemList = items || [];

  return (
    <nav className={classes} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {itemList.map((item, index) => {
          const isLast = index === itemList.length - 1;

          return (
            <li key={index} className="flex items-center space-x-2">
              {item.href && !item.active ? (
                <Link
                  to={item.href}
                  className="text-slate-600 hover:text-primary transition-colors dark:text-slate-400 dark:hover:text-primary"
                >
                  {item.title}
                </Link>
              ) : (
                <span
                  className={classNames(
                    item.active || isLast
                      ? "text-slate-800 font-medium dark:text-slate-200"
                      : "text-slate-600 dark:text-slate-400",
                  )}
                  aria-current={item.active || isLast ? "page" : undefined}
                >
                  {item.title}
                </span>
              )}

              {!isLast && (
                <span className="text-slate-400 dark:text-slate-600">
                  {getSeparatorIcon()}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({
  children,
  to,
  active = false,
  className,
}) => {
  const linkClasses = classNames(
    "transition-colors",
    active
      ? "text-slate-800 font-medium dark:text-slate-200"
      : "text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary",
    className,
  );

  if (to && !active) {
    return (
      <Link to={to} className={linkClasses}>
        {children}
      </Link>
    );
  }

  return (
    <span className={linkClasses} aria-current={active ? "page" : undefined}>
      {children}
    </span>
  );
};

Breadcrumb.Link = BreadcrumbLink;

export default Breadcrumb;
