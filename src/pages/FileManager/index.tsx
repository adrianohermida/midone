import { useState } from "react";
import fakerData from "@/utils/faker";
import Button from "@/components/Base/Button";
import Pagination from "@/components/Base/Pagination";
import { FormCheck, FormInput, FormSelect } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import { Menu, Dialog } from "@/components/Base/Headless";
import FileIcon from "@/components/Base/FileIcon";
import clsx from "clsx";

interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  extension?: string;
  size?: number;
  modifiedDate: Date;
  owner: string;
  isShared: boolean;
  isStarred: boolean;
  thumbnail?: string;
}

function Main() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [uploadModal, setUploadModal] = useState(false);
  const [newFolderModal, setNewFolderModal] = useState(false);
  const [folderName, setFolderName] = useState("");

  // Mock file data
  const [files] = useState<FileItem[]>([
    {
      id: "1",
      name: "Documentos Jurídicos",
      type: "folder",
      modifiedDate: new Date("2024-01-15"),
      owner: "João Silva",
      isShared: true,
      isStarred: false,
    },
    {
      id: "2",
      name: "Contratos 2024",
      type: "folder",
      modifiedDate: new Date("2024-01-20"),
      owner: "Maria Santos",
      isShared: false,
      isStarred: true,
    },
    {
      id: "3",
      name: "Processo_123_2024.pdf",
      type: "file",
      extension: "pdf",
      size: 2.5 * 1024 * 1024, // 2.5MB
      modifiedDate: new Date("2024-01-18"),
      owner: "Carlos Lima",
      isShared: true,
      isStarred: false,
      thumbnail: fakerData[0].images[0],
    },
    {
      id: "4",
      name: "Petição_Inicial.docx",
      type: "file",
      extension: "docx",
      size: 1.2 * 1024 * 1024, // 1.2MB
      modifiedDate: new Date("2024-01-22"),
      owner: "Ana Costa",
      isShared: false,
      isStarred: true,
      thumbnail: fakerData[1].images[0],
    },
    {
      id: "5",
      name: "Audiência_Gravação.mp3",
      type: "file",
      extension: "mp3",
      size: 15.8 * 1024 * 1024, // 15.8MB
      modifiedDate: new Date("2024-01-25"),
      owner: "Pedro Alves",
      isShared: true,
      isStarred: false,
    },
    {
      id: "6",
      name: "Evidências_Caso_456",
      type: "folder",
      modifiedDate: new Date("2024-01-28"),
      owner: "Lucia Fernandes",
      isShared: true,
      isStarred: true,
    },
    {
      id: "7",
      name: "Relatório_Mensal.xlsx",
      type: "file",
      extension: "xlsx",
      size: 3.7 * 1024 * 1024, // 3.7MB
      modifiedDate: new Date("2024-01-30"),
      owner: "Roberto Silva",
      isShared: false,
      isStarred: false,
      thumbnail: fakerData[2].images[0],
    },
    {
      id: "8",
      name: "Imagens_Tribunal.zip",
      type: "file",
      extension: "zip",
      size: 25.4 * 1024 * 1024, // 25.4MB
      modifiedDate: new Date("2024-02-01"),
      owner: "Sandra Oliveira",
      isShared: true,
      isStarred: false,
    },
  ]);

  const categories = [
    { value: "all", label: "Todos os Arquivos" },
    { value: "documents", label: "Documentos" },
    { value: "images", label: "Imagens" },
    { value: "videos", label: "Vídeos" },
    { value: "audio", label: "Áudio" },
    { value: "folders", label: "Pastas" },
    { value: "shared", label: "Compartilhados" },
    { value: "starred", label: "Favoritos" },
  ];

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "folders" && file.type === "folder") ||
      (selectedCategory === "documents" &&
        file.extension &&
        ["pdf", "doc", "docx", "txt"].includes(file.extension)) ||
      (selectedCategory === "images" &&
        file.extension &&
        ["jpg", "jpeg", "png", "gif"].includes(file.extension)) ||
      (selectedCategory === "videos" &&
        file.extension &&
        ["mp4", "avi", "mov"].includes(file.extension)) ||
      (selectedCategory === "audio" &&
        file.extension &&
        ["mp3", "wav", "aac"].includes(file.extension)) ||
      (selectedCategory === "shared" && file.isShared) ||
      (selectedCategory === "starred" && file.isStarred);

    return matchesSearch && matchesCategory;
  });

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "-";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR");
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId],
    );
  };

  const selectAllFiles = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map((f) => f.id));
    }
  };

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      // In real app, this would create a folder via API
      console.log("Creating folder:", folderName);
      setFolderName("");
      setNewFolderModal(false);
    }
  };

  const handleFileUpload = () => {
    // In real app, this would handle file upload
    console.log("File upload triggered");
    setUploadModal(false);
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === "folder") {
      return <Lucide icon="Folder" className="w-8 h-8 text-blue-500" />;
    }

    return (
      <FileIcon variant="file" type={file.extension} className="w-8 h-8" />
    );
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 lg:col-span-3 2xl:col-span-2">
          <h2 className="mt-2 mr-auto text-lg font-medium intro-y">
            Gerenciador de Arquivos
          </h2>

          {/* File Manager Menu */}
          <div className="p-5 mt-6 intro-y box">
            <div className="space-y-2">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setUploadModal(true)}
              >
                <Lucide icon="Upload" className="w-4 h-4 mr-2" />
                Enviar Arquivo
              </Button>
              <Button
                variant="outline-secondary"
                className="w-full"
                onClick={() => setNewFolderModal(true)}
              >
                <Lucide icon="FolderPlus" className="w-4 h-4 mr-2" />
                Nova Pasta
              </Button>
            </div>

            <div className="mt-6 space-y-1">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={clsx([
                    "flex items-center w-full px-3 py-2 text-left rounded-md transition-colors",
                    selectedCategory === category.value
                      ? "bg-primary text-white"
                      : "hover:bg-slate-100 dark:hover:bg-darkmode-400",
                  ])}
                >
                  <Lucide
                    icon={
                      category.value === "documents"
                        ? "FileText"
                        : category.value === "images"
                          ? "Image"
                          : category.value === "videos"
                            ? "Video"
                            : category.value === "audio"
                              ? "Music"
                              : category.value === "folders"
                                ? "Folder"
                                : category.value === "shared"
                                  ? "Users"
                                  : category.value === "starred"
                                    ? "Star"
                                    : "Files"
                    }
                    className="w-4 h-4 mr-3"
                  />
                  {category.label}
                </button>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-darkmode-400">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-2 h-2 mr-3 rounded-full bg-blue-500"></div>
                  <span>Armazenamento</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="text-xs text-slate-500">
                  75GB de 100GB usado
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9 2xl:col-span-10">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 mt-8 intro-y box">
            <div className="flex items-center w-full sm:w-auto">
              <FormInput
                type="text"
                placeholder="Buscar arquivos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 mr-4"
              />
              <FormSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-32"
              >
                <option value="name">Nome</option>
                <option value="date">Data</option>
                <option value="size">Tamanho</option>
                <option value="type">Tipo</option>
              </FormSelect>
            </div>

            <div className="flex items-center mt-4 sm:mt-0 space-x-2">
              {selectedFiles.length > 0 && (
                <div className="flex items-center space-x-2 mr-4">
                  <span className="text-sm text-slate-600">
                    {selectedFiles.length} selecionado(s)
                  </span>
                  <Button variant="outline-danger" size="sm">
                    <Lucide icon="Trash2" className="w-4 h-4" />
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    <Lucide icon="Share2" className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={clsx([
                    "p-2 rounded-l-lg",
                    viewMode === "grid"
                      ? "bg-primary text-white"
                      : "text-slate-600",
                  ])}
                >
                  <Lucide icon="Grid3X3" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={clsx([
                    "p-2 rounded-r-lg",
                    viewMode === "list"
                      ? "bg-primary text-white"
                      : "text-slate-600",
                  ])}
                >
                  <Lucide icon="List" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* File Grid/List */}
          <div className="mt-5 intro-y">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className={clsx([
                      "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                      selectedFiles.includes(file.id)
                        ? "border-primary bg-primary/5"
                        : "border-slate-200 dark:border-darkmode-400",
                    ])}
                    onClick={() => toggleFileSelection(file.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <FormCheck.Input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => toggleFileSelection(file.id)}
                        className="mr-2"
                      />
                      {file.isStarred && (
                        <Lucide
                          icon="Star"
                          className="w-4 h-4 text-yellow-500 fill-current"
                        />
                      )}
                    </div>

                    <div className="flex flex-col items-center text-center">
                      {file.thumbnail ? (
                        <div className="w-16 h-16 mb-3 rounded-lg overflow-hidden">
                          <img
                            src={file.thumbnail}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="mb-3">{getFileIcon(file)}</div>
                      )}

                      <h3
                        className="text-sm font-medium truncate w-full"
                        title={file.name}
                      >
                        {file.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {file.type === "file"
                          ? formatFileSize(file.size)
                          : "Pasta"}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatDate(file.modifiedDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="box">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-darkmode-400">
                        <th className="p-4 text-left">
                          <FormCheck.Input
                            type="checkbox"
                            checked={
                              selectedFiles.length === filteredFiles.length
                            }
                            onChange={selectAllFiles}
                          />
                        </th>
                        <th className="p-4 text-left">Nome</th>
                        <th className="p-4 text-left">Proprietário</th>
                        <th className="p-4 text-left">Modificado</th>
                        <th className="p-4 text-left">Tamanho</th>
                        <th className="p-4 text-left">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFiles.map((file) => (
                        <tr
                          key={file.id}
                          className={clsx([
                            "border-b border-slate-200 dark:border-darkmode-400 hover:bg-slate-50 dark:hover:bg-darkmode-400",
                            selectedFiles.includes(file.id) && "bg-primary/5",
                          ])}
                        >
                          <td className="p-4">
                            <FormCheck.Input
                              type="checkbox"
                              checked={selectedFiles.includes(file.id)}
                              onChange={() => toggleFileSelection(file.id)}
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              {getFileIcon(file)}
                              <div className="ml-3">
                                <div className="font-medium">{file.name}</div>
                                {file.isShared && (
                                  <div className="text-xs text-slate-500 flex items-center mt-1">
                                    <Lucide
                                      icon="Users"
                                      className="w-3 h-3 mr-1"
                                    />
                                    Compartilhado
                                  </div>
                                )}
                              </div>
                              {file.isStarred && (
                                <Lucide
                                  icon="Star"
                                  className="w-4 h-4 text-yellow-500 fill-current ml-2"
                                />
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-slate-600">{file.owner}</td>
                          <td className="p-4 text-slate-600">
                            {formatDate(file.modifiedDate)}
                          </td>
                          <td className="p-4 text-slate-600">
                            {file.type === "file"
                              ? formatFileSize(file.size)
                              : "-"}
                          </td>
                          <td className="p-4">
                            <Menu>
                              <Menu.Button
                                as={Button}
                                variant="outline-secondary"
                                size="sm"
                              >
                                <Lucide
                                  icon="MoreVertical"
                                  className="w-4 h-4"
                                />
                              </Menu.Button>
                              <Menu.Items className="w-40">
                                <Menu.Item>
                                  <Lucide
                                    icon="Download"
                                    className="w-4 h-4 mr-2"
                                  />
                                  Download
                                </Menu.Item>
                                <Menu.Item>
                                  <Lucide
                                    icon="Share2"
                                    className="w-4 h-4 mr-2"
                                  />
                                  Compartilhar
                                </Menu.Item>
                                <Menu.Item>
                                  <Lucide
                                    icon="Edit"
                                    className="w-4 h-4 mr-2"
                                  />
                                  Renomear
                                </Menu.Item>
                                <Menu.Item>
                                  <Lucide
                                    icon="Trash2"
                                    className="w-4 h-4 mr-2"
                                  />
                                  Excluir
                                </Menu.Item>
                              </Menu.Items>
                            </Menu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center mt-6">
              <Pagination>
                <Pagination.Link>
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </Pagination.Link>
                <Pagination.Link active>1</Pagination.Link>
                <Pagination.Link>2</Pagination.Link>
                <Pagination.Link>3</Pagination.Link>
                <Pagination.Link>
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </Pagination.Link>
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={uploadModal} onClose={() => setUploadModal(false)}>
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">Enviar Arquivos</h2>
          </Dialog.Title>
          <Dialog.Description>
            <div className="text-center py-10">
              <Lucide
                icon="Upload"
                className="w-16 h-16 mx-auto text-slate-400 mb-4"
              />
              <h3 className="text-lg font-medium mb-2">
                Arraste arquivos aqui
              </h3>
              <p className="text-slate-500 mb-4">ou clique para selecionar</p>
              <Button variant="primary">Selecionar Arquivos</Button>
            </div>
          </Dialog.Description>
          <Dialog.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setUploadModal(false)}
              className="w-20 mr-1"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleFileUpload}
              className="w-20"
            >
              Enviar
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>

      {/* New Folder Modal */}
      <Dialog open={newFolderModal} onClose={() => setNewFolderModal(false)}>
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">Nova Pasta</h2>
          </Dialog.Title>
          <Dialog.Description>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nome da pasta:
                </label>
                <FormInput
                  type="text"
                  placeholder="Digite o nome da pasta"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </div>
            </div>
          </Dialog.Description>
          <Dialog.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setNewFolderModal(false)}
              className="w-20 mr-1"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateFolder}
              className="w-20"
            >
              Criar
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default Main;
