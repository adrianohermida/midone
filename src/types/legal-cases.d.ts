// Legal Cases Type Definitions for Lawdesk CRM

export interface LegalCase {
  id: string;
  numeroProcesso: string;
  titulo: string;
  tribunal: string;
  vara: string;
  classeProcessual: string;
  assuntoPrincipal: string;
  dataDistribuicao: string;
  valorCausa?: number;
  status: CaseStatus;
  prioridade: CasePriority;
  area: LegalArea;
  pasta: string;
  tags: string[];
  cliente: CaseParty;
  advogados: CaseParty[];
  parteContraria: CaseParty[];
  terceiros?: CaseParty[];
  createdAt: string;
  updatedAt: string;
}

export interface CaseParty {
  id: string;
  nome: string;
  tipo: "cliente" | "advogado" | "parte_contraria" | "terceiro";
  documento: string;
  email?: string;
  telefone?: string;
  endereco?: string;
}

export interface ProcessMovement {
  id: string;
  caseId: string;
  idMovProcessoCliente: number;
  dataMovimento: string;
  tipoMovimento: MovementType;
  descricao: string;
  conteudo: string;
  lido: boolean;
  anexos?: ProcessAttachment[];
  tribunal: string;
  vara: string;
}

export interface ProcessAttachment {
  id: string;
  movementId: string;
  nome: string;
  tipo: string;
  tamanho: number;
  url: string;
  isPublico: boolean;
  dataUpload: string;
}

export interface Intimation {
  id: string;
  idMovProcessoCliente: number;
  numeroProcesso: string;
  dataMovimento: string;
  conteudo: string;
  lido: boolean;
  urgente: boolean;
  tribunal: string;
  vara: string;
  fonte: string;
  dataLimitePrazo?: string;
}

export interface Publication {
  id: string;
  idPublicacaoCliente: number;
  numeroProcesso: string;
  dataPublicacao: string;
  conteudo: string;
  lido: boolean;
  palavrasChave: string[];
  diario: string;
  caderno: string;
  paginas: string;
  tribunal: string;
  relevancia: "alta" | "media" | "baixa";
}

export interface ProcessTreeNode {
  id: string;
  numeroProcesso: string;
  titulo: string;
  tipo: ProcessType;
  status: CaseStatus;
  pai?: string;
  filhos: ProcessTreeNode[];
  nivel: number;
  instancia: number;
}

export interface Deadline {
  id: string;
  caseId: string;
  titulo: string;
  descricao: string;
  dataLimite: string;
  tipo: DeadlineType;
  prioridade: CasePriority;
  status: "pendente" | "cumprido" | "vencido";
  responsavel: string;
  alertas: DeadlineAlert[];
}

export interface DeadlineAlert {
  id: string;
  deadlineId: string;
  tipo: "email" | "sms" | "push";
  diasAntecedencia: number;
  enviado: boolean;
  dataEnvio?: string;
}

export interface CaseAnalytics {
  totalCases: number;
  activeCases: number;
  archivedCases: number;
  unreadIntimations: number;
  overdueDeadlines: number;
  casesByArea: Record<LegalArea, number>;
  casesByStatus: Record<CaseStatus, number>;
  casesByPriority: Record<CasePriority, number>;
  monthlyTrends: {
    month: string;
    newCases: number;
    closedCases: number;
    intimations: number;
  }[];
}

// Enums
export type CaseStatus =
  | "ativo"
  | "suspenso"
  | "arquivado"
  | "finalizado"
  | "em_recurso";

export type CasePriority = "alta" | "media" | "baixa";

export type LegalArea =
  | "civil"
  | "trabalhista"
  | "criminal"
  | "tributario"
  | "familia"
  | "consumidor"
  | "previdenciario"
  | "administrativo"
  | "empresarial"
  | "ambiental";

export type MovementType =
  | "despacho"
  | "decisao"
  | "peticao"
  | "sentenca"
  | "acordao"
  | "intimacao"
  | "citacao"
  | "julgamento"
  | "audiencia"
  | "outros";

export type ProcessType =
  | "principal"
  | "cautelar"
  | "tutela"
  | "recurso_apelacao"
  | "recurso_agravo"
  | "recurso_especial"
  | "recurso_extraordinario"
  | "execucao"
  | "incidente";

export type DeadlineType =
  | "prazo_processual"
  | "prazo_recursal"
  | "audiencia"
  | "julgamento"
  | "pagamento"
  | "protocolo"
  | "outros";

// API Integration Types
export interface AdviseApiConfig {
  baseUrl: string;
  token: string;
  environment: "sandbox" | "production";
}

export interface AdviseIntimationSource {
  idFonteXTipoPesquisa: number;
  nome: string;
  ativo: boolean;
}

export interface AdviseProcessResponse {
  itens: {
    idSitPesqProcUsuarioCliente: number;
    processos: {
      numeroProcesso: string;
      FlNumUnicaCNJ: boolean;
      fontesPesquisa: any[];
    }[];
  }[];
}

export interface AdviseMovementResponse {
  id: number;
  numeroProcesso: string;
  dataMovimento: string;
  descricaoMovimento: string;
  conteudoMovimento: string;
  lido: boolean;
  anexos?: {
    id: number;
    nome: string;
    tipo: string;
    url: string;
  }[];
}

// Filter and Search Types
export interface CaseFilters {
  status?: CaseStatus[];
  prioridade?: CasePriority[];
  area?: LegalArea[];
  tribunal?: string[];
  advogado?: string[];
  cliente?: string[];
  dataInicio?: string;
  dataFim?: string;
  tags?: string[];
  search?: string;
}

export interface TimelineFilter {
  tipo?: MovementType[];
  periodo?: {
    inicio: string;
    fim: string;
  };
  tribunal?: string[];
  lido?: boolean;
}

// Form Types
export interface CaseFormData {
  numeroProcesso: string;
  titulo: string;
  tribunal: string;
  vara: string;
  classeProcessual: string;
  assuntoPrincipal: string;
  dataDistribuicao: string;
  valorCausa?: number;
  area: LegalArea;
  prioridade: CasePriority;
  pasta: string;
  tags: string[];
  cliente: Partial<CaseParty>;
  advogados: Partial<CaseParty>[];
  parteContraria: Partial<CaseParty>[];
  observacoes?: string;
}

export interface DeadlineFormData {
  titulo: string;
  descricao: string;
  dataLimite: string;
  tipo: DeadlineType;
  prioridade: CasePriority;
  responsavel: string;
  alertas: {
    tipo: "email" | "sms" | "push";
    diasAntecedencia: number;
  }[];
}

// UI State Types
export interface CaseListState {
  cases: LegalCase[];
  loading: boolean;
  error: string | null;
  filters: CaseFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface IntimationState {
  intimations: Intimation[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  filters: {
    lido?: boolean;
    dataInicio?: string;
    dataFim?: string;
    tribunal?: string[];
  };
}

export interface PublicationState {
  publications: Publication[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  filters: {
    lido?: boolean;
    dataInicio?: string;
    dataFim?: string;
    relevancia?: string[];
  };
}
