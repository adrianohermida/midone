import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { fetchCaseMovements, updateCaseStatus } from "@/stores/legalCasesSlice";
import type {
  LegalCase,
  ProcessMovement,
  CaseStatus,
} from "@/types/legal-cases";

// Components
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import Alert from "@/components/Base/Alert";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { Tab } from "@/components/Base/Headless";
import { Menu } from "@/components/Base/Headless";
import Breadcrumb from "@/components/Base/Breadcrumb";

// Legal Cases Components
import TimelineEvent from "@/components/LegalCases/TimelineEvent";
import DocumentUploader from "@/components/LegalCases/DocumentUploader";

const CaseDetails: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { cases, loading } = useAppSelector((state) => state.legalCases);
  const [case_, setCase] = useState<LegalCase | null>(null);
  const [movements, setMovements] = useState<ProcessMovement[]>([]);
  const [loadingMovements, setLoadingMovements] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (id) {
      const currentCase = cases.find((c) => c.id === id);
      setCase(currentCase || null);
    }
  }, [id, cases]);

  useEffect(() => {
    if (case_) {
      loadMovements();
    }
  }, [case_]);

  const loadMovements = async () => {
    if (!case_) return;

    setLoadingMovements(true);
    try {
      const result = await dispatch(fetchCaseMovements(case_.id)).unwrap();
      setMovements(result);
    } catch (error) {
      console.error("Error loading movements:", error);
    } finally {
      setLoadingMovements(false);
    }
  };

  const handleStatusChange = (newStatus: CaseStatus) => {
    if (!case_) return;

    dispatch(updateCaseStatus({ id: case_.id, status: newStatus }));
    setCase((prev) => (prev ? { ...prev, status: newStatus } : null));
  };

  const formatCurrency = (value?: number) => {
    if (!value) return "Não informado";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const getStatusColor = (status: CaseStatus) => {
    switch (status) {
      case "ativo":
        return "text-green-600 bg-green-50 border-green-200";
      case "suspenso":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "arquivado":
        return "text-slate-600 bg-slate-50 border-slate-200";
      case "finalizado":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "em_recurso":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "text-red-600 bg-red-50 border-red-200";
      case "media":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "baixa":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingIcon icon="oval" className="w-8 h-8 mr-3" />
        <span className="text-slate-600 dark:text-slate-400">
          Carregando processo...
        </span>
      </div>
    );
  }

  if (!case_) {
    return (
      <div className="text-center py-12">
        <Lucide
          icon="AlertCircle"
          className="w-16 h-16 text-slate-400 mx-auto mb-4"
        />
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
          Processo não encontrado
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          O processo solicitado não foi encontrado ou você não tem permissão
          para visualiz��-lo.
        </p>
        <Button variant="primary" onClick={() => navigate("/legal-cases/list")}>
          Voltar à Lista
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb className="hidden sm:flex">
        <Breadcrumb.Link to="/legal-cases">Casos Jurídicos</Breadcrumb.Link>
        <Breadcrumb.Link to="/legal-cases/list">
          Lista de Processos
        </Breadcrumb.Link>
        <Breadcrumb.Link to="#" active>
          Detalhes do Processo
        </Breadcrumb.Link>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {case_.titulo}
            </h1>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(case_.status)}`}
            >
              {case_.status}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(case_.prioridade)}`}
            >
              {case_.prioridade}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-mono">
            {case_.numeroProcesso}
          </p>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/legal-cases/list")}
          >
            <Lucide icon="ArrowLeft" className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <Menu>
            <Menu.Button as={Button} variant="outline-primary">
              <Lucide icon="MoreHorizontal" className="w-4 h-4 mr-2" />
              Ações
            </Menu.Button>
            <Menu.Items className="w-48">
              <Menu.Item
                onClick={() => navigate(`/legal-cases/${case_.id}/edit`)}
              >
                <Lucide icon="Edit3" className="w-4 h-4 mr-3" />
                Editar Processo
              </Menu.Item>
              <Menu.Item
                onClick={() => navigate(`/legal-cases/${case_.id}/timeline`)}
              >
                <Lucide icon="Clock" className="w-4 h-4 mr-3" />
                Ver Timeline
              </Menu.Item>
              <Menu.Item
                onClick={() => navigate(`/legal-cases/${case_.id}/documents`)}
              >
                <Lucide icon="FileText" className="w-4 h-4 mr-3" />
                Gerenciar Documentos
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Share" className="w-4 h-4 mr-3" />
                Compartilhar
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          {/* Tab Navigation */}
          <div className="border-b border-slate-200 dark:border-slate-700">
            <Tab.List className="flex space-x-8 px-6">
              <Tab
                className={({ selected }) =>
                  `py-4 px-1 border-b-2 font-medium text-sm ${
                    selected
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`
                }
              >
                Informações Gerais
              </Tab>
              <Tab
                className={({ selected }) =>
                  `py-4 px-1 border-b-2 font-medium text-sm ${
                    selected
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`
                }
              >
                Partes Envolvidas
              </Tab>
              <Tab
                className={({ selected }) =>
                  `py-4 px-1 border-b-2 font-medium text-sm ${
                    selected
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`
                }
              >
                Andamentos
              </Tab>
              <Tab
                className={({ selected }) =>
                  `py-4 px-1 border-b-2 font-medium text-sm ${
                    selected
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`
                }
              >
                Documentos
              </Tab>
            </Tab.List>
          </div>

          {/* Tab Content */}
          <Tab.Panels>
            {/* Tab 1: Informações Gerais */}
            <Tab.Panel className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                      Dados do Processo
                    </h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Tribunal
                        </dt>
                        <dd className="text-sm text-slate-900 dark:text-slate-100">
                          {case_.tribunal}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Vara
                        </dt>
                        <dd className="text-sm text-slate-900 dark:text-slate-100">
                          {case_.vara}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Classe Processual
                        </dt>
                        <dd className="text-sm text-slate-900 dark:text-slate-100">
                          {case_.classeProcessual}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Assunto Principal
                        </dt>
                        <dd className="text-sm text-slate-900 dark:text-slate-100">
                          {case_.assuntoPrincipal}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Data de Distribuição
                        </dt>
                        <dd className="text-sm text-slate-900 dark:text-slate-100">
                          {formatDate(case_.dataDistribuicao)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Valor da Causa
                        </dt>
                        <dd className="text-sm text-slate-900 dark:text-slate-100">
                          {formatCurrency(case_.valorCausa)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                      Classificação
                    </h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Área do Direito
                        </dt>
                        <dd className="text-sm text-slate-900 dark:text-slate-100 capitalize">
                          {case_.area}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Pasta
                        </dt>
                        <dd className="text-sm text-slate-900 dark:text-slate-100">
                          {case_.pasta}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Tags
                        </dt>
                        <dd className="flex flex-wrap gap-2 mt-1">
                          {case_.tags.length > 0 ? (
                            case_.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              Nenhuma tag
                            </span>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Última Atualização
                        </dt>
                        <dd className="text-sm text-slate-900 dark:text-slate-100">
                          {formatDate(case_.updatedAt)}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                      Alterar Status
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          "ativo",
                          "suspenso",
                          "arquivado",
                          "finalizado",
                          "em_recurso",
                        ] as CaseStatus[]
                      ).map((status) => (
                        <Button
                          key={status}
                          variant={
                            case_.status === status
                              ? "primary"
                              : "outline-secondary"
                          }
                          size="sm"
                          onClick={() => handleStatusChange(status)}
                          className="capitalize"
                        >
                          {status.replace("_", " ")}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Tab 2: Partes Envolvidas */}
            <Tab.Panel className="p-6">
              <div className="space-y-8">
                {/* Cliente */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Cliente
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Nome
                        </dt>
                        <dd className="text-sm text-slate-900 dark:text-slate-100">
                          {case_.cliente.nome}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Documento
                        </dt>
                        <dd className="text-sm text-slate-900 dark:text-slate-100 font-mono">
                          {case_.cliente.documento}
                        </dd>
                      </div>
                      {case_.cliente.email && (
                        <div>
                          <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Email
                          </dt>
                          <dd className="text-sm text-slate-900 dark:text-slate-100">
                            {case_.cliente.email}
                          </dd>
                        </div>
                      )}
                      {case_.cliente.telefone && (
                        <div>
                          <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Telefone
                          </dt>
                          <dd className="text-sm text-slate-900 dark:text-slate-100">
                            {case_.cliente.telefone}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>

                {/* Advogados */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Advogados Responsáveis
                  </h3>
                  <div className="space-y-4">
                    {case_.advogados.map((advogado, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4"
                      >
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                              Nome
                            </dt>
                            <dd className="text-sm text-slate-900 dark:text-slate-100">
                              {advogado.nome}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                              Documento
                            </dt>
                            <dd className="text-sm text-slate-900 dark:text-slate-100 font-mono">
                              {advogado.documento}
                            </dd>
                          </div>
                          {advogado.email && (
                            <div>
                              <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Email
                              </dt>
                              <dd className="text-sm text-slate-900 dark:text-slate-100">
                                {advogado.email}
                              </dd>
                            </div>
                          )}
                          {advogado.telefone && (
                            <div>
                              <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Telefone
                              </dt>
                              <dd className="text-sm text-slate-900 dark:text-slate-100">
                                {advogado.telefone}
                              </dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parte Contrária */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    Parte Contrária
                  </h3>
                  <div className="space-y-4">
                    {case_.parteContraria.map((parte, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4"
                      >
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                              Nome
                            </dt>
                            <dd className="text-sm text-slate-900 dark:text-slate-100">
                              {parte.nome}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                              Documento
                            </dt>
                            <dd className="text-sm text-slate-900 dark:text-slate-100 font-mono">
                              {parte.documento}
                            </dd>
                          </div>
                          {parte.email && (
                            <div>
                              <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Email
                              </dt>
                              <dd className="text-sm text-slate-900 dark:text-slate-100">
                                {parte.email}
                              </dd>
                            </div>
                          )}
                          {parte.telefone && (
                            <div>
                              <dt className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Telefone
                              </dt>
                              <dd className="text-sm text-slate-900 dark:text-slate-100">
                                {parte.telefone}
                              </dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Tab 3: Andamentos */}
            <Tab.Panel className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  Andamentos Processuais
                </h3>
                <Button
                  variant="outline-primary"
                  onClick={loadMovements}
                  disabled={loadingMovements}
                >
                  {loadingMovements ? (
                    <LoadingIcon icon="oval" className="w-4 h-4 mr-2" />
                  ) : (
                    <Lucide icon="RefreshCw" className="w-4 h-4 mr-2" />
                  )}
                  Atualizar
                </Button>
              </div>

              {loadingMovements ? (
                <div className="flex items-center justify-center py-12">
                  <LoadingIcon icon="oval" className="w-8 h-8 mr-3" />
                  <span className="text-slate-600 dark:text-slate-400">
                    Carregando andamentos...
                  </span>
                </div>
              ) : movements.length > 0 ? (
                <div className="space-y-4">
                  {movements.map((movement) => (
                    <TimelineEvent key={movement.id} movement={movement} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Lucide
                    icon="FileText"
                    className="w-12 h-12 text-slate-400 mx-auto mb-3"
                  />
                  <p className="text-slate-600 dark:text-slate-400">
                    Nenhum andamento encontrado
                  </p>
                </div>
              )}
            </Tab.Panel>

            {/* Tab 4: Documentos */}
            <Tab.Panel className="p-6">
              <DocumentUploader caseId={case_.id} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default CaseDetails;
