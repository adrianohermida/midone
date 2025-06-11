import type {
  LegalArea,
  CaseStatus,
  CasePriority,
  MovementType,
  ProcessType,
} from "@/types/legal-cases";

// CNJ Process Number Validation
export const validateCNJNumber = (number: string): boolean => {
  const cleanNumber = number.replace(/\D/g, "");

  if (cleanNumber.length !== 20) {
    return false;
  }

  // CNJ validation algorithm
  const sequencial = cleanNumber.substring(0, 7);
  const dv = cleanNumber.substring(7, 9);
  const anoAjuizamento = cleanNumber.substring(9, 13);
  const segmentoJustica = cleanNumber.substring(13, 14);
  const tribunal = cleanNumber.substring(14, 16);
  const origem = cleanNumber.substring(16, 20);

  // Calculate verification digits
  const numbers =
    sequencial + anoAjuizamento + segmentoJustica + tribunal + origem;
  let soma = 0;

  for (let i = 0; i < numbers.length; i++) {
    soma += parseInt(numbers[i]) * (numbers.length - i + 1);
  }

  const resto = soma % 97;
  const dvCalculado = 98 - resto;
  const dvFormatado = dvCalculado.toString().padStart(2, "0");

  return dv === dvFormatado;
};

// Format CNJ Process Number
export const formatCNJNumber = (number: string): string => {
  const cleanNumber = number.replace(/\D/g, "");

  if (cleanNumber.length <= 7) {
    return cleanNumber;
  } else if (cleanNumber.length <= 9) {
    return `${cleanNumber.slice(0, 7)}-${cleanNumber.slice(7)}`;
  } else if (cleanNumber.length <= 13) {
    return `${cleanNumber.slice(0, 7)}-${cleanNumber.slice(7, 9)}.${cleanNumber.slice(9)}`;
  } else if (cleanNumber.length <= 14) {
    return `${cleanNumber.slice(0, 7)}-${cleanNumber.slice(7, 9)}.${cleanNumber.slice(9, 13)}.${cleanNumber.slice(13)}`;
  } else if (cleanNumber.length <= 16) {
    return `${cleanNumber.slice(0, 7)}-${cleanNumber.slice(7, 9)}.${cleanNumber.slice(9, 13)}.${cleanNumber.slice(13, 14)}.${cleanNumber.slice(14)}`;
  } else {
    return `${cleanNumber.slice(0, 7)}-${cleanNumber.slice(7, 9)}.${cleanNumber.slice(9, 13)}.${cleanNumber.slice(13, 14)}.${cleanNumber.slice(14, 16)}.${cleanNumber.slice(16, 20)}`;
  }
};

// Get Legal Area Label
export const getLegalAreaLabel = (area: LegalArea): string => {
  const labels: Record<LegalArea, string> = {
    civil: "Cível",
    trabalhista: "Trabalhista",
    criminal: "Criminal",
    tributario: "Tributário",
    familia: "Família",
    consumidor: "Consumidor",
    previdenciario: "Previdenciário",
    administrativo: "Administrativo",
    empresarial: "Empresarial",
    ambiental: "Ambiental",
  };
  return labels[area] || area;
};

// Get Case Status Label
export const getCaseStatusLabel = (status: CaseStatus): string => {
  const labels: Record<CaseStatus, string> = {
    ativo: "Ativo",
    suspenso: "Suspenso",
    arquivado: "Arquivado",
    finalizado: "Finalizado",
    em_recurso: "Em Recurso",
  };
  return labels[status] || status;
};

// Get Case Priority Label
export const getCasePriorityLabel = (priority: CasePriority): string => {
  const labels: Record<CasePriority, string> = {
    alta: "Alta",
    media: "Média",
    baixa: "Baixa",
  };
  return labels[priority] || priority;
};

// Get Movement Type Label
export const getMovementTypeLabel = (type: MovementType): string => {
  const labels: Record<MovementType, string> = {
    despacho: "Despacho",
    decisao: "Decisão",
    peticao: "Petição",
    sentenca: "Sentença",
    acordao: "Acórdão",
    intimacao: "Intimação",
    citacao: "Citação",
    julgamento: "Julgamento",
    audiencia: "Audiência",
    outros: "Outros",
  };
  return labels[type] || type;
};

// Get Process Type Label
export const getProcessTypeLabel = (type: ProcessType): string => {
  const labels: Record<ProcessType, string> = {
    principal: "Principal",
    cautelar: "Cautelar",
    tutela: "Tutela",
    recurso_apelacao: "Recurso de Apelação",
    recurso_agravo: "Recurso de Agravo",
    recurso_especial: "Recurso Especial",
    recurso_extraordinario: "Recurso Extraordinário",
    execucao: "Execução",
    incidente: "Incidente",
  };
  return labels[type] || type;
};

// Calculate Days Between Dates
export const calculateDaysDifference = (
  date1: string,
  date2: string,
): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Get Deadline Status
export const getDeadlineStatus = (
  deadlineDate: string,
): {
  status: "normal" | "warning" | "critical" | "overdue";
  daysRemaining: number;
  message: string;
} => {
  const now = new Date();
  const deadline = new Date(deadlineDate);
  const diffTime = deadline.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (daysRemaining < 0) {
    return {
      status: "overdue",
      daysRemaining: Math.abs(daysRemaining),
      message: `Vencido há ${Math.abs(daysRemaining)} dia${Math.abs(daysRemaining) !== 1 ? "s" : ""}`,
    };
  } else if (daysRemaining === 0) {
    return {
      status: "critical",
      daysRemaining: 0,
      message: "Vence hoje",
    };
  } else if (daysRemaining <= 3) {
    return {
      status: "critical",
      daysRemaining,
      message: `${daysRemaining} dia${daysRemaining !== 1 ? "s" : ""} restante${daysRemaining !== 1 ? "s" : ""}`,
    };
  } else if (daysRemaining <= 7) {
    return {
      status: "warning",
      daysRemaining,
      message: `${daysRemaining} dias restantes`,
    };
  } else {
    return {
      status: "normal",
      daysRemaining,
      message: `${daysRemaining} dias restantes`,
    };
  }
};

// Format Currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Format File Size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Extract Case Number from Text
export const extractCaseNumbers = (text: string): string[] => {
  const cnjPattern = /\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}/g;
  return text.match(cnjPattern) || [];
};

// Generate Case Summary
export const generateCaseSummary = (case_: any): string => {
  const client = case_.cliente?.nome || "Cliente não informado";
  const area = getLegalAreaLabel(case_.area);
  const tribunal = case_.tribunal;
  const status = getCaseStatusLabel(case_.status);

  return `Processo ${area} em ${tribunal}, representando ${client}. Status: ${status}.`;
};

// Color Utilities for Status
export const getStatusColors = (status: string) => {
  const colors: Record<string, { text: string; bg: string; border: string }> = {
    ativo: {
      text: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    suspenso: {
      text: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    arquivado: {
      text: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-200",
    },
    finalizado: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    em_recurso: {
      text: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
    alta: { text: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
    media: {
      text: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    baixa: {
      text: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    normal: {
      text: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    warning: {
      text: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    critical: {
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    overdue: {
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
  };

  return (
    colors[status] || {
      text: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-200",
    }
  );
};

// Generate Random ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Validate Email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate CPF
export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, "");

  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleanCPF)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF[i]) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF[i]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF[10])) return false;

  return true;
};

// Validate CNPJ
export const validateCNPJ = (cnpj: string): boolean => {
  const cleanCNPJ = cnpj.replace(/\D/g, "");

  if (cleanCNPJ.length !== 14) return false;
  if (/^(\d)\1+$/.test(cleanCNPJ)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9];

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCNPJ[i]) * weights1[i];
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;

  if (digit1 !== parseInt(cleanCNPJ[12])) return false;

  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanCNPJ[i]) * weights2[i];
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;

  return digit2 === parseInt(cleanCNPJ[13]);
};

// Format Phone Number
export const formatPhoneNumber = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, "");

  if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`;
  } else if (cleanPhone.length === 11) {
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7)}`;
  }

  return phone;
};

// Export all utilities
export default {
  validateCNJNumber,
  formatCNJNumber,
  getLegalAreaLabel,
  getCaseStatusLabel,
  getCasePriorityLabel,
  getMovementTypeLabel,
  getProcessTypeLabel,
  calculateDaysDifference,
  getDeadlineStatus,
  formatCurrency,
  formatFileSize,
  extractCaseNumbers,
  generateCaseSummary,
  getStatusColors,
  generateId,
  validateEmail,
  validateCPF,
  validateCNPJ,
  formatPhoneNumber,
};
