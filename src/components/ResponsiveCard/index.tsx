import React from "react";
import { LucideIcon } from "lucide-react";

interface ResponsiveCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  color?: "blue" | "green" | "yellow" | "red" | "purple" | "indigo" | "emerald";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  color = "blue",
  size = "md",
  className = "",
  children,
  onClick,
  loading = false,
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    green:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    yellow:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    red: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    purple:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    indigo:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    emerald:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  };

  const sizeClasses = {
    sm: "p-3",
    md: "p-4 lg:p-6",
    lg: "p-6 lg:p-8",
  };

  const iconSizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconInnerSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const valueSizeClasses = {
    sm: "text-lg",
    md: "text-xl lg:text-2xl",
    lg: "text-2xl lg:text-3xl",
  };

  if (loading) {
    return (
      <div
        className={`bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400 ${sizeClasses[size]} ${className}`}
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`${iconSizeClasses[size]} bg-slate-200 dark:bg-darkmode-700 rounded-lg`}
            ></div>
            <div className="w-16 h-4 bg-slate-200 dark:bg-darkmode-700 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="w-20 h-8 bg-slate-200 dark:bg-darkmode-700 rounded"></div>
            <div className="w-24 h-4 bg-slate-200 dark:bg-darkmode-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        bg-white dark:bg-darkmode-600 rounded-xl shadow-sm border border-slate-200 dark:border-darkmode-400 
        hover:shadow-md transition-all duration-200 hover:scale-105
        ${sizeClasses[size]} 
        ${onClick ? "cursor-pointer" : ""} 
        ${className}
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        {Icon && (
          <div
            className={`${iconSizeClasses[size]} rounded-lg flex items-center justify-center ${colorClasses[color]}`}
          >
            <Icon className={iconInnerSizeClasses[size]} />
          </div>
        )}

        {change !== undefined && (
          <div
            className={`flex items-center text-xs font-medium ${
              change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <svg
              className={`w-3 h-3 mr-1 ${change >= 0 ? "transform rotate-0" : "transform rotate-180"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3
          className={`font-bold text-slate-900 dark:text-slate-100 ${valueSizeClasses[size]}`}
        >
          {value}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 font-medium truncate">
            {title}
          </p>
          {changeLabel && (
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {changeLabel}
            </p>
          )}
        </div>
      </div>

      {/* Children Content */}
      {children && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-darkmode-400">
          {children}
        </div>
      )}
    </div>
  );
};

export default ResponsiveCard;
