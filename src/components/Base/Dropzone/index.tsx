import React, { useRef, useEffect, useState } from "react";
import { classNames } from "@/utils/helpers";
import Lucide from "@/components/Base/Lucide";

interface DropzoneProps {
  className?: string;
  options?: any;
  onUpload?: (files: File[]) => void;
  onError?: (error: string) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  disabled?: boolean;
  children?: React.ReactNode;
  getRef?: (ref: any) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({
  className,
  options = {},
  onUpload,
  onError,
  multiple = true,
  accept = "*",
  maxSize = 10,
  disabled = false,
  children,
  getRef,
}) => {
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (getRef && dropzoneRef.current) {
      getRef(dropzoneRef.current);
    }
  }, [getRef]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(fileList).forEach((file) => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        errors.push(`${file.name} is too large (max ${maxSize}MB)`);
        return;
      }

      // Check file type
      if (accept !== "*") {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const fileType = file.type;
        const fileExtension = "." + file.name.split(".").pop();

        const isAccepted = acceptedTypes.some((acceptType) => {
          if (acceptType.startsWith(".")) {
            return fileExtension.toLowerCase() === acceptType.toLowerCase();
          }
          return fileType.match(acceptType.replace("*", ".*"));
        });

        if (!isAccepted) {
          errors.push(`${file.name} is not an accepted file type`);
          return;
        }
      }

      validFiles.push(file);
    });

    if (errors.length > 0 && onError) {
      onError(errors.join(", "));
    }

    if (validFiles.length > 0) {
      const newFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(newFiles);
      if (onUpload) {
        onUpload(newFiles);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (onUpload) {
      onUpload(newFiles);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const baseClasses = `
    border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
    transition-colors duration-200 ease-in-out
    ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-primary"}
    ${isDragging ? "border-primary bg-primary/5" : "border-slate-200 dark:border-darkmode-400"}
  `;

  const classes = classNames(baseClasses, className);

  return (
    <div className="space-y-4">
      <div
        ref={dropzoneRef}
        className={classes}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleFileInput}
          disabled={disabled}
        />

        {children || (
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 bg-slate-100 dark:bg-darkmode-400 rounded-full flex items-center justify-center">
              <Lucide icon="Upload" className="w-8 h-8 text-slate-500" />
            </div>

            <div>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                Drop files here or click to upload
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {accept !== "*"
                  ? `Accepted formats: ${accept}`
                  : "Any file format"}
                {maxSize && ` • Max size: ${maxSize}MB`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Uploaded Files ({files.length})
          </h4>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-darkmode-400 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                  <Lucide icon="File" className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="p-1 text-slate-400 hover:text-danger transition-colors"
              >
                <Lucide icon="X" className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export type DropzoneElement = HTMLDivElement;
export default Dropzone;
