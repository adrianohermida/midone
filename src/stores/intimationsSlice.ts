import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Intimation, IntimationState } from "@/types/legal-cases";
import { adviseApi } from "@/services/advise-api";

// Initial state
const initialState: IntimationState = {
  intimations: [],
  unreadCount: 0,
  loading: false,
  error: null,
  filters: {
    lido: false,
  },
};

// Async thunks
export const fetchIntimations = createAsyncThunk(
  "intimations/fetchIntimations",
  async (
    filters: {
      lido?: boolean;
      dataInicioMovimento?: string;
      dataFimMovimento?: string;
      tribunal?: string[];
    } = {},
  ) => {
    try {
      const response = await adviseApi.getIntimations({
        lido: filters.lido,
        dataInicioMovimento: filters.dataInicioMovimento,
        dataFimMovimento: filters.dataFimMovimento,
      });

      // Transform API response to our Intimation format
      const intimations: Intimation[] = response.map(
        (item: any, index: number) => ({
          id: `intimation-${index}`,
          idMovProcessoCliente: item.idMovProcessoCliente || item.id,
          numeroProcesso: item.numeroProcesso || "",
          dataMovimento: item.dataHoraMovimento || item.dataMovimento,
          conteudo: item.conteudo || item.descricao || "",
          lido: item.lido || false,
          urgente: item.urgente || false,
          tribunal: item.tribunal || "TJSP",
          vara: item.vara || "",
          fonte: item.fonte || "Advise",
          dataLimitePrazo: item.dataLimitePrazo,
        }),
      );

      const unreadCount = intimations.filter((i) => !i.lido).length;

      return { intimations, unreadCount };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch intimations",
      );
    }
  },
);

export const markIntimationsAsRead = createAsyncThunk(
  "intimations/markAsRead",
  async (intimationIds: string[]) => {
    try {
      // Extract the movement IDs from intimation objects
      const movementIds = intimationIds.map((id) => {
        // In a real scenario, you'd need to map from intimation ID to movement ID
        return parseInt(id.replace("intimation-", ""));
      });

      await adviseApi.markIntimationsAsRead(movementIds);

      return intimationIds;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to mark intimations as read",
      );
    }
  },
);

export const markIntimationsAsUnread = createAsyncThunk(
  "intimations/markAsUnread",
  async (intimationIds: string[]) => {
    try {
      const movementIds = intimationIds.map((id) => {
        return parseInt(id.replace("intimation-", ""));
      });

      await adviseApi.markIntimationsAsUnread(movementIds);

      return intimationIds;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to mark intimations as unread",
      );
    }
  },
);

export const activateIntimationSearch = createAsyncThunk(
  "intimations/activateSearch",
  async (idPesqIntimacaoUsCliente: number) => {
    try {
      await adviseApi.activateIntimationSearch(idPesqIntimacaoUsCliente);
      return idPesqIntimacaoUsCliente;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to activate intimation search",
      );
    }
  },
);

export const deactivateIntimationSearch = createAsyncThunk(
  "intimations/deactivateSearch",
  async (idPesqIntimacaoUsCliente: number) => {
    try {
      await adviseApi.deactivateIntimationSearch(idPesqIntimacaoUsCliente);
      return idPesqIntimacaoUsCliente;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to deactivate intimation search",
      );
    }
  },
);

export const registerIntimationAccess = createAsyncThunk(
  "intimations/registerAccess",
  async (data: {
    nomeResponsavel?: string;
    idFonteXTipoPesquisa: number;
    dadoAcesso: string;
    senha: string;
    autenticacao?: string;
  }) => {
    try {
      const response = await adviseApi.registerIntimationAccess(data);
      return response;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to register intimation access",
      );
    }
  },
);

export const fetchIntimationSources = createAsyncThunk(
  "intimations/fetchSources",
  async (params: { page?: number; limit?: number } = {}) => {
    try {
      const response = await adviseApi.getIntimationSources(
        params.page || 1,
        params.limit || 100,
      );
      return response;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to fetch intimation sources",
      );
    }
  },
);

// Intimations slice
const intimationsSlice = createSlice({
  name: "intimations",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<IntimationState["filters"]>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { lido: false };
    },
    clearError: (state) => {
      state.error = null;
    },
    markAsReadLocally: (state, action: PayloadAction<string[]>) => {
      state.intimations = state.intimations.map((intimation) =>
        action.payload.includes(intimation.id)
          ? { ...intimation, lido: true }
          : intimation,
      );
      state.unreadCount = state.intimations.filter((i) => !i.lido).length;
    },
    markAsUnreadLocally: (state, action: PayloadAction<string[]>) => {
      state.intimations = state.intimations.map((intimation) =>
        action.payload.includes(intimation.id)
          ? { ...intimation, lido: false }
          : intimation,
      );
      state.unreadCount = state.intimations.filter((i) => !i.lido).length;
    },
    addIntimation: (state, action: PayloadAction<Intimation>) => {
      state.intimations.unshift(action.payload);
      if (!action.payload.lido) {
        state.unreadCount += 1;
      }
    },
    removeIntimation: (state, action: PayloadAction<string>) => {
      const intimationIndex = state.intimations.findIndex(
        (i) => i.id === action.payload,
      );
      if (intimationIndex !== -1) {
        const intimation = state.intimations[intimationIndex];
        if (!intimation.lido) {
          state.unreadCount -= 1;
        }
        state.intimations.splice(intimationIndex, 1);
      }
    },
    toggleUrgent: (state, action: PayloadAction<string>) => {
      const intimation = state.intimations.find((i) => i.id === action.payload);
      if (intimation) {
        intimation.urgente = !intimation.urgente;
      }
    },
    updateUnreadCount: (state) => {
      state.unreadCount = state.intimations.filter((i) => !i.lido).length;
    },
  },
  extraReducers: (builder) => {
    // Fetch intimations
    builder
      .addCase(fetchIntimations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIntimations.fulfilled, (state, action) => {
        state.loading = false;
        state.intimations = action.payload.intimations;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(fetchIntimations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch intimations";
      });

    // Mark as read
    builder
      .addCase(markIntimationsAsRead.fulfilled, (state, action) => {
        state.intimations = state.intimations.map((intimation) =>
          action.payload.includes(intimation.id)
            ? { ...intimation, lido: true }
            : intimation,
        );
        state.unreadCount = state.intimations.filter((i) => !i.lido).length;
      })
      .addCase(markIntimationsAsRead.rejected, (state, action) => {
        state.error = action.error.message || "Failed to mark as read";
      });

    // Mark as unread
    builder
      .addCase(markIntimationsAsUnread.fulfilled, (state, action) => {
        state.intimations = state.intimations.map((intimation) =>
          action.payload.includes(intimation.id)
            ? { ...intimation, lido: false }
            : intimation,
        );
        state.unreadCount = state.intimations.filter((i) => !i.lido).length;
      })
      .addCase(markIntimationsAsUnread.rejected, (state, action) => {
        state.error = action.error.message || "Failed to mark as unread";
      });

    // Register access
    builder
      .addCase(registerIntimationAccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerIntimationAccess.fulfilled, (state) => {
        state.loading = false;
        // Could add success message or update UI state
      })
      .addCase(registerIntimationAccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to register access";
      });

    // Activate search
    builder.addCase(activateIntimationSearch.rejected, (state, action) => {
      state.error = action.error.message || "Failed to activate search";
    });

    // Deactivate search
    builder.addCase(deactivateIntimationSearch.rejected, (state, action) => {
      state.error = action.error.message || "Failed to deactivate search";
    });
  },
});

export const {
  setFilters,
  clearFilters,
  clearError,
  markAsReadLocally,
  markAsUnreadLocally,
  addIntimation,
  removeIntimation,
  toggleUrgent,
  updateUnreadCount,
} = intimationsSlice.actions;

export default intimationsSlice.reducer;
