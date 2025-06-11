import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import type { ProcessAttachment } from "@/types/legal-cases";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { FormInput, FormSelect } from "@/components/Base/Form";
import Progress from "@/components/Base/Progress";
import Alert from "@/components/Base/Alert";

interface DocumentUploaderProps {
  caseId: string;
  onUploadComplete?: (files: ProcessAttachment[]) => void;
}

interface UploadingFile {
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  caseId,
  onUploadComplete,
}) => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [documents, setDocuments] = useState<ProcessAttachment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("petições");
  const [dragActive, setDragActive] = useState(false);

  const documentCategories = [
    "petições",
    "decisões",
    "recursos",
    "anexos",
    "contratos",
    "procurações",
    "certidões",
    "comprovantes",
    "correspondências",
    "outros",
  ];

  const allowedFileTypes = {
    "application/pdf": ".pdf",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
    "image/jpeg": ".jpg,.jpeg",
    "image/png": ".png",
    "text/plain": ".txt",
  };

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setDragActive(false);

    const validFiles = acceptedFiles.filter((file) => {
      if (file.size > maxFileSize) {
        alert(`Arquivo ${file.name} é muito grande. Tamanho máximo: 10MB`);
        return false;
      }
      if (!Object.keys(allowedFileTypes).includes(file.type)) {
        alert(`Tipo de arquivo ${file.type} não suportado`);
        return false;
      }
      return true;
    });

    validFiles.forEach(uploadFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedFileTypes,
    maxSize: maxFileSize,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const uploadFile = async (file: File) => {
    const uploadingFile: UploadingFile = {
      file,
      progress: 0,
      status: "uploading",
    };

    setUploadingFiles((prev) => [...prev, uploadingFile]);

    try {
      // Simulate file upload with progress
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caseId", caseId);
      formData.append("category", selectedCategory);

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setUploadingFiles((prev) =>
          prev.map((uf) => (uf.file === file ? { ...uf, progress } : uf)),
        );
      }

      // Simulate successful upload
      const newDocument: ProcessAttachment = {
        id: Date.now().toString(),
        movementId: "",
        nome: file.name,
        tipo: file.type,
        tamanho: file.size,
        url: URL.createObjectURL(file),
        isPublico: false,
        dataUpload: new Date().toISOString(),
      };

      setDocuments((prev) => [...prev, newDocument]);
      setUploadingFiles((prev) =>
        prev.map((uf) =>
          uf.file === file ? { ...uf, status: "completed" } : uf,
        ),
      );

      if (onUploadComplete) {
        onUploadComplete([newDocument]);
      }

      // Remove from uploading list after 2 seconds
      setTimeout(() => {
        setUploadingFiles((prev) => prev.filter((uf) => uf.file !== file));
      }, 2000);
    } catch (error) {
      setUploadingFiles((prev) =>
        prev.map((uf) =>
          uf.file === file
            ? {
                ...uf,
                status: "error",
                error:
                  error instanceof Error ? error.message : "Erro no upload",
              }
            : uf,
        ),
      );
    }
  };

  const deleteDocument = (documentId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return "FileText";
    if (fileType.includes("word") || fileType.includes("document"))
      return "FileType";
    if (fileType.includes("image")) return "Image";
    return "File";
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Gestão de Documentos
          </h3>
          <div className="flex items-center space-x-3">
            <FormSelect
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-40"
            >
              {documentCategories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </FormSelect>
          </div>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 cursor-pointer ${
            isDragActive || dragActive
              ? "border-primary bg-primary/5"
              : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <Lucide
                icon="Upload"
                className="w-6 h-6 text-slate-600 dark:text-slate-300"
              />
            </div>
            <div>
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                Arraste arquivos aqui ou clique para selecionar
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Suporta PDF, DOC, DOCX, JPG, PNG (máx. 10MB cada)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Uploading Files */}
      {uploadingFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-slate-700 dark:text-slate-300">
            Enviando arquivos...
          </h4>
          {uploadingFiles.map((uploadingFile, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Lucide
                    icon={getFileIcon(uploadingFile.file.type) as any}
                    className="w-5 h-5 text-slate-600 dark:text-slate-300"
                  />
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">
                      {uploadingFile.file.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {formatFileSize(uploadingFile.file.size)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {uploadingFile.status === "completed" && (
                    <Lucide
                      icon="CheckCircle"
                      className="w-5 h-5 text-green-600"
                    />
                  )}
                  {uploadingFile.status === "error" && (
                    <Lucide icon="XCircle" className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>

              {uploadingFile.status === "uploading" && (
                <Progress value={uploadingFile.progress} className="h-2" />
              )}

              {uploadingFile.status === "error" && (
                <Alert variant="outline-danger" className="mt-2">
                  {uploadingFile.error}
                </Alert>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Documents List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-slate-700 dark:text-slate-300">
            Documentos ({documents.length})
          </h4>
          <div className="flex items-center space-x-2">
            <Button variant="outline-secondary" size="sm">
              <Lucide icon="Filter" className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="outline-secondary" size="sm">
              <Lucide icon="Search" className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>
        </div>

        {documents.length > 0 ? (
          <div className="space-y-3">
            {documents.map((document) => (
              <div
                key={document.id}
                className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-600 rounded-lg">
                      <Lucide
                        icon={getFileIcon(document.tipo) as any}
                        className="w-5 h-5 text-slate-600 dark:text-slate-300"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-slate-700 dark:text-slate-300">
                        {document.nome}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                        <span>{formatFileSize(document.tamanho)}</span>
                        <span>•</span>
                        <span>
                          {new Date(document.dataUpload).toLocaleDateString(
                            "pt-BR",
                          )}
                        </span>
                        <span>•</span>
                        <span
                          className={
                            document.isPublico
                              ? "text-green-600"
                              : "text-slate-500"
                          }
                        >
                          {document.isPublico ? "Público" : "Privado"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => window.open(document.url, "_blank")}
                    >
                      <Lucide icon="Eye" className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = document.url;
                        link.download = document.nome;
                        link.click();
                      }}
                    >
                      <Lucide icon="Download" className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteDocument(document.id)}
                    >
                      <Lucide icon="Trash2" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Lucide
              icon="FileText"
              className="w-12 h-12 text-slate-400 mx-auto mb-3"
            />
            <p className="text-slate-600 dark:text-slate-400">
              Nenhum documento encontrado
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Faça upload dos documentos relacionados ao processo
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploader;
