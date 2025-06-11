// Advise API Integration Service for Lawdesk CRM
import type {
  AdviseApiConfig,
  AdviseProcessResponse,
  AdviseMovementResponse,
  Intimation,
  Publication,
} from "@/types/legal-cases";

class AdviseApiService {
  private baseUrl: string;
  private token: string;
  private environment: "sandbox" | "production";

  constructor(config: AdviseApiConfig) {
    this.baseUrl = config.baseUrl;
    this.token = config.token;
    this.environment = config.environment;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders = {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API Error ${response.status}: ${errorData.message || response.statusText}`,
      );
    }

    return response.json();
  }

  // ==================== INTIMATIONS API ====================

  /**
   * Get list of intimation sources
   */
  async getIntimationSources(page = 1, limit = 100) {
    return this.makeRequest(
      `/core/v1/intimacao/ConsultaFonteIntimacoes?RegistrosPorPagina=${limit}&PaginaAtual=${page}`,
    );
  }

  /**
   * Register login credentials for intimation capture
   */
  async registerIntimationAccess(data: {
    nomeResponsavel?: string;
    idFonteXTipoPesquisa: number;
    dadoAcesso: string;
    senha: string;
    autenticacao?: string;
  }) {
    return this.makeRequest("/core/v1/intimacao", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * Get intimations list
   */
  async getIntimations(
    filters: {
      lido?: boolean;
      dataInicioMovimento?: string;
      dataFimMovimento?: string;
      idMovProcUsuarioCliente?: number;
    } = {},
  ) {
    const params = new URLSearchParams();

    if (filters.lido !== undefined) {
      params.append("Lido", filters.lido.toString());
    }
    if (filters.dataInicioMovimento) {
      params.append("DataInicioMovimento", filters.dataInicioMovimento);
    }
    if (filters.dataFimMovimento) {
      params.append("DataFimMovimento", filters.dataFimMovimento);
    }
    if (filters.idMovProcUsuarioCliente) {
      params.append(
        "IdMovProcUsuarioCliente",
        filters.idMovProcUsuarioCliente.toString(),
      );
    }

    return this.makeRequest<Intimation[]>(
      `/core/v1/intimacoes-clientes?${params.toString()}`,
    );
  }

  /**
   * Get registered access credentials
   */
  async getRegisteredAccess(idUsuarioCliente: number, page = 1, limit = 50) {
    const params = new URLSearchParams({
      Campos: "*",
      idUsuarioCliente: idUsuarioCliente.toString(),
      RegistrosPorPagina: limit.toString(),
      paginaAtual: page.toString(),
    });

    return this.makeRequest(
      `/core/v1/intimacao/ConsultaCadastroAcessos?${params.toString()}`,
    );
  }

  /**
   * Activate intimation search
   */
  async activateIntimationSearch(idPesqIntimacaoUsCliente: number) {
    return this.makeRequest("/core/v1/intimacao/ativar-pesquisa", {
      method: "PUT",
      body: JSON.stringify({ idPesqIntimacaoUsCliente }),
    });
  }

  /**
   * Deactivate intimation search
   */
  async deactivateIntimationSearch(idPesqIntimacaoUsCliente: number) {
    return this.makeRequest("/core/v1/intimacao/inativar-pesquisa", {
      method: "PUT",
      body: JSON.stringify({ idPesqIntimacaoUsCliente }),
    });
  }

  /**
   * Delete intimation search
   */
  async deleteIntimationSearch(idPesqIntimacaoUsCliente: number) {
    return this.makeRequest("/core/v1/intimacao/excluir-pesquisa", {
      method: "PUT",
      body: JSON.stringify({ idPesqIntimacaoUsCliente }),
    });
  }

  /**
   * Mark intimations as read
   */
  async markIntimationsAsRead(movementIds: number[]) {
    const itens = movementIds.map((id) => ({ idMovProcessoCliente: id }));

    return this.makeRequest("/core/v1/movimento-processo-cliente-lido/marcar", {
      method: "PUT",
      body: JSON.stringify({ itens }),
    });
  }

  /**
   * Mark intimations as unread
   */
  async markIntimationsAsUnread(movementIds: number[]) {
    const itens = movementIds.map((id) => ({ idMovProcessoCliente: id }));

    return this.makeRequest(
      "/core/v1/movimento-processo-cliente-lido/desmarcar",
      {
        method: "PUT",
        body: JSON.stringify({ itens }),
      },
    );
  }

  // ==================== PROCESSES API ====================

  /**
   * Register new process
   */
  async registerProcess(data: {
    numeroProcesso: string;
    FlNumUnicaCNJ: boolean;
    nomePasta?: string;
    idSitPesqProcUsuarioCliente?: number;
    fontesPesquisa?: {
      idFonteXTipoPesquisa: number;
      idValorParamFonteProc: number;
    }[];
  }) {
    const body = {
      itens: [
        {
          idSitPesqProcUsuarioCliente: data.idSitPesqProcUsuarioCliente || -5,
          processos: [
            {
              numeroProcesso: data.numeroProcesso,
              FlNumUnicaCNJ: data.FlNumUnicaCNJ,
              nomePasta: data.nomePasta,
              fontesPesquisa: data.fontesPesquisa || [],
            },
          ],
        },
      ],
    };

    return this.makeRequest<AdviseProcessResponse>(
      "/core/v1/processos-clientes",
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );
  }

  /**
   * Get process sources for registration
   */
  async getProcessSources(active = true) {
    return this.makeRequest(
      `/core/v1/processos-clientes/consulta-fonte-processo?FLATIVO=${active}`,
    );
  }

  /**
   * Get process sources linked to a process
   */
  async getProcessLinkedSources(numeroProcesso: string) {
    const params = new URLSearchParams({
      Campos: "*",
      numeroProcesso: numeroProcesso.replace(/[^0-9]/g, ""),
    });

    return this.makeRequest(
      `/core/v1/processos-clientes/fontes-processos?${params.toString()}`,
    );
  }

  /**
   * Change process status (activate/deactivate)
   */
  async changeProcessStatus(data: {
    idUsuarioCliente: number;
    flAtivo: boolean;
    pesqProcAltSituacao: {
      idPesqProcUsuarioCliente: number;
    }[];
  }) {
    return this.makeRequest("/core/v1/processos-clientes/alterar-situacao", {
      method: "PUT",
      body: JSON.stringify({ itens: [data] }),
    });
  }

  /**
   * Get process movements
   */
  async getProcessMovements(
    params: {
      lido?: boolean;
      dataInicial?: string;
      dataFinal?: string;
      registrosPorPagina?: number;
      paginaAtual?: number;
    } = {},
  ) {
    const searchParams = new URLSearchParams({
      Campos: "*",
      Lido: (params.lido || false).toString(),
      "Registros por página": (params.registrosPorPagina || 100).toString(),
      PaginaAtual: (params.paginaAtual || 1).toString(),
    });

    if (params.dataInicial) {
      searchParams.append("DataInicial", params.dataInicial);
    }
    if (params.dataFinal) {
      searchParams.append("DataFinal", params.dataFinal);
    }

    return this.makeRequest<AdviseMovementResponse[]>(
      `/core/v1/processos-clientes/andamentos?${searchParams.toString()}`,
    );
  }

  /**
   * Get process movements with pagination info
   */
  async getProcessMovementsPaginated(
    params: {
      lido?: boolean;
      dataInicial?: string;
      dataFinal?: string;
      registrosPorPagina?: number;
      paginaAtual?: number;
    } = {},
  ) {
    const searchParams = new URLSearchParams({
      Campos: "*",
      Lido: (params.lido || false).toString(),
      "Registros por página": (params.registrosPorPagina || 100).toString(),
      PaginaAtual: (params.paginaAtual || 1).toString(),
    });

    if (params.dataInicial) {
      searchParams.append("DataInicial", params.dataInicial);
    }
    if (params.dataFinal) {
      searchParams.append("DataFinal", params.dataFinal);
    }

    return this.makeRequest(
      `/core/v1/processos-clientes/andamentos-paginado?${searchParams.toString()}`,
    );
  }

  /**
   * Mark process movements as read
   */
  async markMovementsAsRead(movementIds: number[]) {
    const itens = movementIds.map((id) => ({ idMovProcessoCliente: id }));

    return this.makeRequest("/core/v1/processos-clientes/marcar-lidos", {
      method: "PUT",
      body: JSON.stringify({ itens }),
    });
  }

  /**
   * Mark process movements as unread
   */
  async markMovementsAsUnread(movementIds: number[]) {
    const itens = movementIds.map((id) => ({ idMovProcessoCliente: id }));

    return this.makeRequest("/core/v1/processos-clientes/desmarcar-lidos", {
      method: "PUT",
      body: JSON.stringify({ itens }),
    });
  }

  /**
   * Get process header data
   */
  async getProcessHeader(idFonteProcesso: number) {
    return this.makeRequest(
      `/core/v1/cabecalhos-processos?Campos=*&IdFonteProcesso=${idFonteProcesso}`,
    );
  }

  /**
   * Get additional process information
   */
  async getProcessAdditionalInfo(numeroProcesso: string) {
    return this.makeRequest(
      `/core/v1/processos-clientes/informacoes-adicionais?Campos=*&NumeroProcesso=${numeroProcesso}`,
    );
  }

  /**
   * Search process attachments
   */
  async searchProcessAttachments(data: {
    fontesProcesso: {
      idFonteProcesso: number;
      idProcesso: number;
    }[];
    trazerAnexosAndamento: boolean;
    pagina: number;
    registrosPagina: number;
    idUsuarioCliente: number;
  }) {
    return this.makeRequest("/core/v1/processos-clientes/anexos", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * Download process attachment
   */
  async downloadProcessAttachment(id: number): Promise<Blob> {
    const response = await fetch(
      `${this.baseUrl}/core/v1/anexo-fonte-processo/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to download attachment: ${response.statusText}`);
    }

    return response.blob();
  }

  /**
   * Delete process
   */
  async deleteProcess(data: {
    idGrupoUsuarios?: number | null;
    idUsuarioClienteXFuncionalidade: number;
    processosExcluir: {
      idProcesso: number;
      numeroProcesso: string;
      flNumeracaoUnicaCNJ: boolean;
    }[];
  }) {
    return this.makeRequest(
      "/core/v1/processos-clientes/excluir-pesquisas-por-processos",
      {
        method: "POST",
        body: JSON.stringify({ itens: [data] }),
      },
    );
  }

  // ==================== PUBLICATIONS API ====================

  /**
   * Get publications
   */
  async getPublications(params: {
    dataInicioMovimento: string;
    dataFimMovimento: string;
    lido?: boolean;
    registrosPorPagina?: number;
    paginaAtual?: number;
  }) {
    const searchParams = new URLSearchParams({
      Campos: "*",
      DataInicioMovimento: params.dataInicioMovimento,
      DataFimMovimento: params.dataFimMovimento,
      Lido: (params.lido || false).toString(),
      RegistrosPorPagina: (params.registrosPorPagina || 100).toString(),
      paginaAtual: (params.paginaAtual || 1).toString(),
    });

    return this.makeRequest<Publication[]>(
      `/core/v1/publicacoes-clientes?${searchParams.toString()}`,
    );
  }

  /**
   * Get publications with pagination info
   */
  async getPublicationsPaginated(params: {
    dataInicioMovimento: string;
    dataFimMovimento: string;
    lido?: boolean;
    registrosPorPagina?: number;
    paginaAtual?: number;
  }) {
    const searchParams = new URLSearchParams({
      Campos: "*",
      DataInicioMovimento: params.dataInicioMovimento,
      DataFimMovimento: params.dataFimMovimento,
      Lido: (params.lido || false).toString(),
      RegistrosPorPagina: (params.registrosPorPagina || 100).toString(),
      paginaAtual: (params.paginaAtual || 1).toString(),
    });

    return this.makeRequest(
      `/core/v1/publicacoes-clientes/consulta-paginada?${searchParams.toString()}`,
    );
  }

  /**
   * Mark publications as read
   */
  async markPublicationsAsRead(publicationIds: number[]) {
    const itens = publicationIds.map((id) => ({ idMovProcessoCliente: id }));

    return this.makeRequest("/core/v1/publicacoes-clientes/marcar-lidos", {
      method: "PUT",
      body: JSON.stringify({ itens }),
    });
  }

  /**
   * Mark publications as unread
   */
  async markPublicationsAsUnread(publicationIds: number[]) {
    const itens = publicationIds.map((id) => ({ idMovProcessoCliente: id }));

    return this.makeRequest("/core/v1/publicacoes-clientes/desmarcar-lidos", {
      method: "PUT",
      body: JSON.stringify({ itens }),
    });
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Test API connection
   */
  async testConnection() {
    try {
      await this.getIntimationSources(1, 1);
      return { success: true, message: "Connection successful" };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Connection failed",
      };
    }
  }

  /**
   * Get API environment info
   */
  getEnvironment() {
    return {
      environment: this.environment,
      baseUrl: this.baseUrl,
      hasToken: !!this.token,
    };
  }
}

// Default instance for production use
export const adviseApi = new AdviseApiService({
  baseUrl: process.env.REACT_APP_ADVISE_API_URL || "https://api.advise.com.br",
  token: process.env.REACT_APP_ADVISE_API_TOKEN || "",
  environment:
    (process.env.REACT_APP_ADVISE_ENV as "sandbox" | "production") ||
    "production",
});

// Sandbox instance for testing
export const adviseApiSandbox = new AdviseApiService({
  baseUrl: "https://sandbox-api.advise.com.br",
  token: process.env.REACT_APP_ADVISE_SANDBOX_TOKEN || "",
  environment: "sandbox",
});

export default AdviseApiService;
