import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CustomColors {
  primary: string;
  secondary: string;
}

export interface CustomTheme {
  id: string;
  name: string;
  colors: CustomColors;
  isCustom: boolean;
  createdAt: number;
}

interface CustomThemeState {
  customThemes: CustomTheme[];
  activeCustomTheme: CustomTheme | null;
  isUsingCustomTheme: boolean;
}

const getStoredCustomThemes = (): CustomTheme[] => {
  try {
    const stored = localStorage.getItem("lawdesk_custom_themes");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const getStoredActiveCustomTheme = (): CustomTheme | null => {
  try {
    const stored = localStorage.getItem("lawdesk_active_custom_theme");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const initialState: CustomThemeState = {
  customThemes: getStoredCustomThemes(),
  activeCustomTheme: getStoredActiveCustomTheme(),
  isUsingCustomTheme: !!getStoredActiveCustomTheme(),
};

export const customThemeSlice = createSlice({
  name: "customTheme",
  initialState,
  reducers: {
    addCustomTheme: (
      state,
      action: PayloadAction<Omit<CustomTheme, "id" | "createdAt">>,
    ) => {
      const newTheme: CustomTheme = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: Date.now(),
        isCustom: true,
      };

      state.customThemes.push(newTheme);
      localStorage.setItem(
        "lawdesk_custom_themes",
        JSON.stringify(state.customThemes),
      );
    },

    setActiveCustomTheme: (state, action: PayloadAction<CustomTheme>) => {
      state.activeCustomTheme = action.payload;
      state.isUsingCustomTheme = true;
      localStorage.setItem(
        "lawdesk_active_custom_theme",
        JSON.stringify(action.payload),
      );
    },

    clearCustomTheme: (state) => {
      state.activeCustomTheme = null;
      state.isUsingCustomTheme = false;
      localStorage.removeItem("lawdesk_active_custom_theme");
    },

    removeCustomTheme: (state, action: PayloadAction<string>) => {
      state.customThemes = state.customThemes.filter(
        (theme) => theme.id !== action.payload,
      );
      localStorage.setItem(
        "lawdesk_custom_themes",
        JSON.stringify(state.customThemes),
      );

      // If the removed theme was active, clear it
      if (state.activeCustomTheme?.id === action.payload) {
        state.activeCustomTheme = null;
        state.isUsingCustomTheme = false;
        localStorage.removeItem("lawdesk_active_custom_theme");
      }
    },

    updateCustomTheme: (state, action: PayloadAction<CustomTheme>) => {
      const index = state.customThemes.findIndex(
        (theme) => theme.id === action.payload.id,
      );
      if (index !== -1) {
        state.customThemes[index] = action.payload;
        localStorage.setItem(
          "lawdesk_custom_themes",
          JSON.stringify(state.customThemes),
        );

        // Update active theme if it's the same
        if (state.activeCustomTheme?.id === action.payload.id) {
          state.activeCustomTheme = action.payload;
          localStorage.setItem(
            "lawdesk_active_custom_theme",
            JSON.stringify(action.payload),
          );
        }
      }
    },
  },
});

export const {
  addCustomTheme,
  setActiveCustomTheme,
  clearCustomTheme,
  removeCustomTheme,
  updateCustomTheme,
} = customThemeSlice.actions;

export const selectCustomThemes = (state: RootState) =>
  state.customTheme.customThemes;
export const selectActiveCustomTheme = (state: RootState) =>
  state.customTheme.activeCustomTheme;
export const selectIsUsingCustomTheme = (state: RootState) =>
  state.customTheme.isUsingCustomTheme;

export default customThemeSlice.reducer;
