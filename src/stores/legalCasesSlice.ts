import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type {
  LegalCase,
  CaseListState,
  CaseFilters,
  CaseFormData,
  ProcessMovement,
  ProcessTreeNode,
} from "@/types/legal-cases";
import { adviseApi } from "@/services/advise-api";

// Initial state
const initialState: CaseListState = {
  cases: [],
  loading: false,
  error: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
  },
  sortBy: "updatedAt",
  sortOrder: "desc",
};

// Async thunks
export const fetchCases = createAsyncThunk(
  "legalCases/fetchCases",
  async (
    params: { filters?: CaseFilters; page?: number; limit?: number } = {},
  ) => {
    // In a real implementation, this would call your backend API
    // For now, we'll simulate the data transformation from Advise API

    try {
      // Get process movements from Advise API
      const movements = await adviseApi.getProcessMovements({
        lido: false,
        registrosPorPagina: params.limit || 20,
        paginaAtual: params.page || 1,
      });

      // Transform Advise data to our LegalCase format
      const cases: LegalCase[] = movements.map((movement, index) => ({
        id: `case-${index}`,
        numeroProcesso: movement.numeroProcesso,
        titulo:
          movement.descricaoMovimento || `Processo ${movement.numeroProcesso}`,
        tribunal: "TJSP", // This would come from additional API calls
        vara: "1ª Vara Cível", // This would come from additional API calls
        classeProcessual: "Procedimento Comum",
        assuntoPrincipal: "Indenização por Danos Morais",
        dataDistribuicao: movement.dataMovimento,
        status: "ativo" as const,
        prioridade: "media" as const,
        area: "civil" as const,
        pasta: "Geral",
        tags: [],
        cliente: {
          id: "1",
          nome: "Cliente Exemplo",
          tipo: "cliente" as const,
          documento: "12345678901",
        },
        advogados: [
          {
            id: "1",
            nome: "Advogado Responsável",
            tipo: "advogado" as const,
            documento: "12345678901",
          },
        ],
        parteContraria: [
          {
            id: "1",
            nome: "Parte Contrária",
            tipo: "parte_contraria" as const,
            documento: "98765432101",
          },
        ],
        createdAt: movement.dataMovimento,
        updatedAt: movement.dataMovimento,
      }));

      return {
        cases,
        total: cases.length,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch cases",
      );
    }
  },
);

export const createCase = createAsyncThunk(
  "legalCases/createCase",
  async (caseData: CaseFormData) => {
    try {
      // Register process in Advise API
      await adviseApi.registerProcess({
        numeroProcesso: caseData.numeroProcesso,
        FlNumUnicaCNJ: true,
        nomePasta: caseData.pasta,
      });

      // Create case in our system (this would be your backend API)
      const newCase: LegalCase = {
        id: `case-${Date.now()}`,
        numeroProcesso: caseData.numeroProcesso,
        titulo: caseData.titulo,
        tribunal: caseData.tribunal,
        vara: caseData.vara,
        classeProcessual: caseData.classeProcessual,
        assuntoPrincipal: caseData.assuntoPrincipal,
        dataDistribuicao: caseData.dataDistribuicao,
        valorCausa: caseData.valorCausa,
        status: "ativo",
        prioridade: caseData.prioridade,
        area: caseData.area,
        pasta: caseData.pasta,
        tags: caseData.tags,
        cliente: caseData.cliente as any,
        advogados: caseData.advogados as any,
        parteContraria: caseData.parteContraria as any,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return newCase;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to create case",
      );
    }
  },
);

export const updateCase = createAsyncThunk(
  "legalCases/updateCase",
  async ({ id, updates }: { id: string; updates: Partial<LegalCase> }) => {
    // This would call your backend API to update the case
    return { id, updates };
  },
);

export const deleteCase = createAsyncThunk(
  "legalCases/deleteCase",
  async (caseId: string) => {
    // This would call your backend API to delete the case
    return caseId;
  },
);

export const fetchCaseMovements = createAsyncThunk(
  "legalCases/fetchCaseMovements",
  async (caseId: string) => {
    try {
      const movements = await adviseApi.getProcessMovements({
        lido: false,
      });

      // Transform to our ProcessMovement format
      const processMovements: ProcessMovement[] = movements.map(
        (movement, index) => ({
          id: `movement-${index}`,
          caseId,
          idMovProcessoCliente: movement.id,
          dataMovimento: movement.dataMovimento,
          tipoMovimento: "despacho" as const,
          descricao: movement.descricaoMovimento,
          conteudo: movement.conteudoMovimento,
          lido: movement.lido,
          anexos: movement.anexos?.map((anexo) => ({
            id: anexo.id.toString(),
            movementId: `movement-${index}`,
            nome: anexo.nome,
            tipo: anexo.tipo,
            tamanho: 0,
            url: anexo.url,
            isPublico: true,
            dataUpload: movement.dataMovimento,
          })),
          tribunal: "TJSP",
          vara: "1ª Vara Cível",
        }),
      );

      return processMovements;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch movements",
      );
    }
  },
);

// Legal Cases slice
const legalCasesSlice = createSlice({
  name: "legalCases",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<CaseFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {};
      state.pagination.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },
    setSorting: (
      state,
      action: PayloadAction<{ sortBy: string; sortOrder: "asc" | "desc" }>,
    ) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateCaseStatus: (
      state,
      action: PayloadAction<{ id: string; status: any }>,
    ) => {
      const caseIndex = state.cases.findIndex(
        (c) => c.id === action.payload.id,
      );
      if (caseIndex !== -1) {
        state.cases[caseIndex].status = action.payload.status;
        state.cases[caseIndex].updatedAt = new Date().toISOString();
      }
    },
    addCaseTag: (state, action: PayloadAction<{ id: string; tag: string }>) => {
      const caseIndex = state.cases.findIndex(
        (c) => c.id === action.payload.id,
      );
      if (
        caseIndex !== -1 &&
        !state.cases[caseIndex].tags.includes(action.payload.tag)
      ) {
        state.cases[caseIndex].tags.push(action.payload.tag);
        state.cases[caseIndex].updatedAt = new Date().toISOString();
      }
    },
    removeCaseTag: (
      state,
      action: PayloadAction<{ id: string; tag: string }>,
    ) => {
      const caseIndex = state.cases.findIndex(
        (c) => c.id === action.payload.id,
      );
      if (caseIndex !== -1) {
        state.cases[caseIndex].tags = state.cases[caseIndex].tags.filter(
          (tag) => tag !== action.payload.tag,
        );
        state.cases[caseIndex].updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch cases
    builder
      .addCase(fetchCases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.loading = false;
        state.cases = action.payload.cases;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchCases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cases";
      });

    // Create case
    builder
      .addCase(createCase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCase.fulfilled, (state, action) => {
        state.loading = false;
        state.cases.unshift(action.payload);
        state.pagination.total += 1;
      })
      .addCase(createCase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create case";
      });

    // Update case
    builder.addCase(updateCase.fulfilled, (state, action) => {
      const { id, updates } = action.payload;
      const caseIndex = state.cases.findIndex((c) => c.id === id);
      if (caseIndex !== -1) {
        state.cases[caseIndex] = {
          ...state.cases[caseIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    });

    // Delete case
    builder.addCase(deleteCase.fulfilled, (state, action) => {
      state.cases = state.cases.filter((c) => c.id !== action.payload);
      state.pagination.total -= 1;
    });
  },
});

export const {
  setFilters,
  clearFilters,
  setPage,
  setLimit,
  setSorting,
  clearError,
  updateCaseStatus,
  addCaseTag,
  removeCaseTag,
} = legalCasesSlice.actions;

export default legalCasesSlice.reducer;
