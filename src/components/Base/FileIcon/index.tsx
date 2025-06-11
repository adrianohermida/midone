import React from "react";
import Lucide from "@/components/Base/Lucide";
import { classNames } from "@/utils/helpers";

interface FileIconProps {
  variant?: string;
  className?: string;
  file?: {
    name?: string;
    type?: string;
    size?: number;
  };
}

const FileIcon: React.FC<FileIconProps> = ({ variant, className, file }) => {
  const getIconByType = (filename: string = "", type: string = "") => {
    const extension = filename.split(".").pop()?.toLowerCase();

    // Image files
    if (
      type.startsWith("image/") ||
      ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension || "")
    ) {
      return "Image";
    }

    // Document files
    if (["pdf"].includes(extension || "")) {
      return "FileText";
    }

    if (["doc", "docx"].includes(extension || "")) {
      return "FileText";
    }

    if (["xls", "xlsx"].includes(extension || "")) {
      return "FileSpreadsheet";
    }

    if (["ppt", "pptx"].includes(extension || "")) {
      return "FileText";
    }

    // Media files
    if (
      type.startsWith("video/") ||
      ["mp4", "avi", "mov", "wmv", "flv"].includes(extension || "")
    ) {
      return "Video";
    }

    if (
      type.startsWith("audio/") ||
      ["mp3", "wav", "ogg", "flac"].includes(extension || "")
    ) {
      return "Music";
    }

    // Archive files
    if (["zip", "rar", "7z", "tar", "gz"].includes(extension || "")) {
      return "Archive";
    }

    // Code files
    if (
      ["js", "ts", "jsx", "tsx", "html", "css", "json", "xml"].includes(
        extension || "",
      )
    ) {
      return "Code";
    }

    // Default
    return "File";
  };

  const getIconColor = (filename: string = "", type: string = "") => {
    const extension = filename.split(".").pop()?.toLowerCase();

    if (
      type.startsWith("image/") ||
      ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension || "")
    ) {
      return "text-warning";
    }

    if (["pdf"].includes(extension || "")) {
      return "text-danger";
    }

    if (["doc", "docx"].includes(extension || "")) {
      return "text-primary";
    }

    if (["xls", "xlsx"].includes(extension || "")) {
      return "text-success";
    }

    if (
      type.startsWith("video/") ||
      ["mp4", "avi", "mov", "wmv", "flv"].includes(extension || "")
    ) {
      return "text-danger";
    }

    if (
      type.startsWith("audio/") ||
      ["mp3", "wav", "ogg", "flac"].includes(extension || "")
    ) {
      return "text-warning";
    }

    if (["zip", "rar", "7z", "tar", "gz"].includes(extension || "")) {
      return "text-dark";
    }

    if (
      ["js", "ts", "jsx", "tsx", "html", "css", "json", "xml"].includes(
        extension || "",
      )
    ) {
      return "text-pending";
    }

    return "text-slate-500";
  };

  const iconName = getIconByType(file?.name, file?.type);
  const iconColor = getIconColor(file?.name, file?.type);

  const baseClasses = "w-10 h-10";
  const classes = classNames(baseClasses, iconColor, className);

  if (variant === "file") {
    return (
      <div className="file-icon">
        <div className="file-icon__file-name truncate">
          {file?.name || "Unknown"}
        </div>
      </div>
    );
  }

  if (variant === "directory") {
    return (
      <div className="w-10 h-10 text-warning">
        <Lucide icon="Folder" className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className={classes}>
      <Lucide icon={iconName as any} className="w-full h-full" />
    </div>
  );
};

export default FileIcon;
