import React from "react";
import { classNames } from "@/utils/helpers";

interface LoadingProps {
  variant?: "spinner" | "dots" | "pulse";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  variant = "spinner",
  size = "md",
  className,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  if (variant === "spinner") {
    return (
      <div
        className={classNames(
          "animate-spin rounded-full border-2 border-gray-300 border-t-primary",
          sizeClasses[size],
          className,
        )}
      />
    );
  }

  if (variant === "dots") {
    return (
      <div className={classNames("flex space-x-1", className)}>
        <div
          className={classNames(
            "bg-primary rounded-full animate-bounce",
            sizeClasses[size],
          )}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={classNames(
            "bg-primary rounded-full animate-bounce",
            sizeClasses[size],
          )}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={classNames(
            "bg-primary rounded-full animate-bounce",
            sizeClasses[size],
          )}
          style={{ animationDelay: "300ms" }}
        />
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        className={classNames(
          "bg-primary rounded animate-pulse",
          sizeClasses[size],
          className,
        )}
      />
    );
  }

  return null;
};

export default Loading;
